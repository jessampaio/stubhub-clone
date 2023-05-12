import { connection } from "../database";
import { type Request, type Response } from "express";
import Stripe from 'stripe'

export async function initiatePurchase(req: Request, res: Response) {
  try {
    const stripe = new Stripe(`sk_test_51N6aFrHsmvWJAjUnb6mRYsTfMymuxMrcS7vmFIj4qZDk9SAaMyfLHMpupONgEHt7yZPqWlgJrZ2IQYuNfJvNixD400ZFwruwSK`, {
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

  } catch (err) {
    if (err) {
      console.log(err)
      return res.json(err)
    }
  }
}