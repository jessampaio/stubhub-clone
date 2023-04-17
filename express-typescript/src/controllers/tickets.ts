import database from '../database'
import { type Request, type Response } from 'express'

export function getPricedTickets(req: Request, res: Response) {
  const getPricedTicketsQuery = `SELECT * FROM tickets`

  database.query(getPricedTicketsQuery, (err, data: any) => {
    if (err != null) {
      return res.status(500).json(err)
    }
    if (data) {
      return res.send(data)
    }
  })
}

export function createTicket (req: Request, res: Response) {

    const selectTicketAmountQuery = `SELECT ticket_amount, 
    FROM events e, tickets t
    WHERE e.event_id = t.event_id`

    database.query(selectTicketAmountQuery, [req.body.eventId, req.body.eventId], (err, data) => {
        if (err) {
            console.log(err)
        }
        if (data) {
            res.send(data)
        }
    })
}
//   const createTicketQuery = `INSERT INTO tickets (
//       ticket_price, 
//       event_id, 
//       ticket_tier,
//       ticket_quantity
//     ) VALUES (?)`

//   const values = [
//     req.body.ticket_price,
//     req.body.event_id,
//     req.body.ticket_tier,
//     req.body.ticket_quantity,
//   ]

//   database.query(createTicketQuery, [values], (err, data) => {
//     if (err != null) {
//       console.log(err)
//       return res.status(500).json(err)
//     }
//     return res.status(200).send('Ticket has been added successfully.')
//   })
// }

export function getTicket (req: Request, res: Response) {
  const getTicketQuery = `SELECT * FROM events WHERE event_id = ?`

  database.query(getTicketQuery, (err, data: any) => {
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
    SET event_name = ?, 
    event_date = ?, 
    event_time = ?, 
    venue_id = ?, 
    category_id = ? 
    ticket_amount = ? 
    WHERE event_id = ?`

  const values = [
    req.body.event_name,
    req.body.event_date,
    req.body.event_time,
    req.body.venue_id,
    req.body.category_id,
    req.body.ticket_amount
  ]

  database.query(updateTicketQuery, [values], (err, data: any) => {
    if (err != null) {
      return res.json(err)
    }
    if (data.affectedRows === 0) {
      console.log(data)
      return res.status(404).send("This ticket doesn't exist.")
    }
    return res.send('Ticket has been updated succesfully.')
  })
}

export function deleteTicket (req: Request, res: Response) {
  const deleteTicketQuery = `DELETE FROM tickets WHERE ticket_id = ?`

  database.query(deleteTicketQuery, [req.params.id], (err, data) => {
    if (err != null) {
      console.log(err)
      return res.json(err)
    }
    return res.send('Ticket has been deleted successfully.')
  })
}
