import { connection } from "../database";
import { type Request, type Response } from "express";
import Stripe from 'stripe'
import jwt from 'jsonwebtoken'

export async function initiatePurchase(req: Request, res: Response) {
  try {
    const stripe = new Stripe(process.env.STRIPE_KEY as string, {
      apiVersion: '2022-11-15',
    });

    console.log('the body', req.body)
    const conn = await connection
    const [data]: any = await conn.execute(
      `SELECT ticket_price FROM tickets WHERE ticket_id = ?`,
      [req.body.ticket.ticket_id]
    )
    if (data) {
      console.log("the data", parseFloat(req.body.ticket.ticket_price))
      console.log("the quantity", req.body.ticketQuantity)

      const ticketPrice = parseFloat(req.body.ticket.ticket_price)
      const amount = ticketPrice * req.body.ticketQuantity * 100

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"]
      });

      return res.send({
        clientSecret: paymentIntent.client_secret,
      });
    }
  } catch (err) {
    if (err) {
      console.log(err)
      return res.json(err)
    }
  }
}

export async function completePurchase(req: Request, res: Response) {
  try {
    console.log('answering', req.body)

    const token = req.cookies.token
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY || '')
    const userId = decoded.id

    const conn = await connection

    const [seatsQuery]: any = await conn.execute(`
    SELECT *
    FROM seats
    WHERE seat_id NOT IN 
    (SELECT seat_id FROM purchases WHERE event_id = ?)
    LIMIT ?`, [req.body.ticket.event_id, req.body.ticketQuantity])

    await conn.execute(`
    UPDATE tickets SET ticket_quantity = (ticket_quantity - ?)
    WHERE ticket_id = ?`, [parseInt(req.body.ticketQuantity), req.body.ticket.ticket_id])

    const purchase = seatsQuery.map((seat: any) => {
      return [userId, seat.seat_id, req.body.ticket.event_id, 1]
    })

    console.log(purchase)

    const [purchaseQuery]: any = await conn.query(`
    INSERT INTO purchases (user_id, seat_id, event_id, payment_method_id)
    VALUES ?`, [purchase])

    console.log(purchaseQuery)
    return res.send('success')

  } catch (err) {
    if (err) {
      console.log(err)
      return res.json(err)
    }
  }
}
