import database from '../database'
import { type Request, type Response } from 'express'

export function getTickets (req: Request, res: Response) {
  const getTicketsQuery = 'SELECT * FROM tickets'

  database.query(getTicketsQuery, (err, data: any) => {
    if (data) {
      return res.send(data)
    }
    if (err != null) {
      return res.send(err)
    }
  })
}

export function createTicket (req: Request, res: Response) {
  const createTicketQuery = `INSERT INTO tickets (
      ticket_price, 
      event_id, 
      ticket_tier,
      ticket_quantity
      ) VALUES (?)`

  const values = [
    req.body.ticketPrice,
    req.body.eventSelected,
    req.body.ticketTier,
    req.body.ticketQuantity
  ]

  database.query(createTicketQuery, [values], (err: any, data: any) => {
    if (err != null) {
      return res.status(500).json(err)
    }
    return res.status(200).send('Ticket has been added successfully.')
  })
}

export function getTieredTickets (req: Request, res: Response) {
  const getTieredTicketQuery = 'SELECT * FROM tickets WHERE ticket_tier = ?'

  database.query(getTieredTicketQuery, req.body.ticketTier, (err, data: any) => {
    if (data) {
      res.send(data)
    }
    if (data.length === 0) {
      return res.status(200).send('No ticket has been added yet.')
    }
    if (err != null) {
      return res.status(500).json(err)
    }
  })
}

export function updateTicket (req: Request, res: Response) {
  const updateTicketQuery = `UPDATE tickets
    SET ticket_quantity = ?, 
    ticket_tier = ?,
    ticket_price = ?
    WHERE ticket_id = ?`

  const values = [
    req.body.ticketQuantity,
    req.body.ticketTier,
    req.body.ticketPrice,
    req.body.ticketId
  ]

  database.query(updateTicketQuery, [values], (err, data: any) => {
    if (err != null) {
      return res.json(err)
    }
    if (data.affectedRows === 0) {
      return res.status(404).send("This ticket doesn't exist.")
    }
    return res.send('Ticket has been updated succesfully.')
  })
}

export function deleteTicket (req: Request, res: Response) {
  const deleteTicketQuery = 'DELETE FROM tickets WHERE ticket_id = ?'

  database.query(deleteTicketQuery, [req.params.id], (err, data) => {
    if (err != null) {
      return res.json(err)
    }
    return res.send('Ticket has been deleted successfully.')
  })
}
