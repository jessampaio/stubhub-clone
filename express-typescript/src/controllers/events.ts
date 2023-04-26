import database from '../database'
import { type Request, type Response } from 'express'

export function getEvents (req: Request, res: Response) {
  const getEventsQuery = 'SELECT * FROM events'

  database.query(getEventsQuery, (err, data: any) => {
    if (err != null) {
      return res.status(500).json(err)
    }
    if (data) {
      return res.send(data)
    }
  })
}

export function addEvent (req: Request, res: Response) {
  const addEventQuery = `INSERT INTO events (
      event_name, 
      event_date, 
      event_time,
      venue_id, 
      category_id, 
      ticket_amount
    ) VALUES (?)`

  const values = [
    req.body.eventName,
    req.body.eventDate,
    req.body.eventTime,
    req.body.venueId,
    req.body.categoryId,
    req.body.ticketAmount
  ]

  database.query(addEventQuery, [values], (err, data) => {
    console.log(req)
    if (err != null) {
      return res.status(500).json(err)
    }
    return res.status(200).send('Event has been added successfully.')
  })
}

export function getEvent (req: Request, res: Response) {
  const getEventQuery = `SELECT *,
	(	SELECT MAX(ticket_amount) - SUM(ticket_quantity) as tickets_remaining
	  FROM tickets
	  JOIN events
		USING (event_id) 
	  HAVING tickets_remaining > 0) as tickets_remaining
  FROM events
  WHERE event_id = ?`

  database.query(getEventQuery, [req.params.id], (err, data: any) => {
    if (data.length === 0) {
      return res.status(200).send('No event has been added yet.')
    }
    if (data) {
      return res.send(data)
    }
    if (err != null) {
      return res.status(500).json(err)
    }
  })
}

export function updateEvent (req: Request, res: Response) {
  const updateEventQuery = `UPDATE events
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

  database.query(updateEventQuery, [values], (err, data: any) => {
    if (err != null) {
      return res.json(err)
    }
    if (data.affectedRows === 0) {
      return res.status(404).send("This event doesn't exist.")
    }
    return res.send('Event has been updated succesfully.')
  })
}

export function deleteEvent (req: Request, res: Response) {
  const deleteEventQuery = 'DELETE FROM events WHERE event_id = ?'

  database.query(deleteEventQuery, [req.params.id], (err, data) => {
    if (err != null) {
      return res.json(err)
    }
    return res.send('Event has been deleted successfully.')
  })
}

