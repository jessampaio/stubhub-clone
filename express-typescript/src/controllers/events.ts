import database from "../database";
import { connection } from "../database";
import { type Request, type Response } from "express";

interface ParticipantObj {
  value: number;
  event_id: number;
}

export async function getEvents(req: Request, res: Response) {
  try {
    let getEventsQuery = `SELECT * FROM events`;

    const values = [];

    const categoryMap: Record<string, any> = {
      sports: 57,
      concerts: 56,
      testing1: 58,
    };

    if (req.query.category) {
      const { category } = req.query;
      getEventsQuery = getEventsQuery + " WHERE category_id = ?";
      values.push(categoryMap[String(category)]);
    }

    const conn = await connection;
    const [data]: any = await conn.execute(getEventsQuery, values);

    if (data) {
      return res.status(200).send(data);
    }
  } catch (err) {
    if (err != null) {
      return res.status(500).json(err);
    }
  }
}

export function addEvent(req: Request, res: Response) {
  const addEventQuery = `INSERT INTO events (
      event_name, 
      event_date, 
      event_time,
      venue_id, 
      category_id, 
      ticket_amount,
      event_img
    ) VALUES (?)`;

  const values = [
    req.body.eventName,
    req.body.eventDate,
    req.body.eventTime,
    req.body.venueId,
    req.body.categoryId,
    req.body.ticketAmount,
    req.body.eventImg,
  ];

  database.query(addEventQuery, [values], (err, data) => {
    console.log("Event being added", data);
    if (err != null) {
      return res.status(500).json(err);
    }

    const getEventIdQuery = `SELECT LAST_INSERT_ID() AS event_id`;

    database.query(getEventIdQuery, (err, eventId: any) => {
      console.log("getting the id back from db", eventId);
      if (err) {
        return res.status(500).json(err);
      }

      const addParticipantsEventsQuery = `INSERT INTO participants_in_events (
        participant_id, 
        event_id
        ) VALUES ?`;

      const participants = req.body.participants.map(
        (participantObj: ParticipantObj) => {
          return [participantObj.value, eventId[0].event_id];
        }
      );

      console.log("the participants", participants);

      database.query(
        addParticipantsEventsQuery,
        [participants],
        (err, data) => {
          console.log(data);
          if (err !== null) {
            console.log(err);
            return res.status(500).json(err);
          }
          return res.status(200).send(data);
        }
      );
    });
  });
}

export function getEvent(req: Request, res: Response) {
  const getEventQuery = `SELECT *,
	(	SELECT MAX(ticket_amount) - SUM(ticket_quantity) as tickets_remaining
	  FROM tickets
	  JOIN events
		USING (event_id) 
	  HAVING tickets_remaining > 0) as tickets_remaining
  FROM events
  JOIN venues 
	USING (venue_id)
  WHERE event_id = ?`;

  database.query(getEventQuery, [req.params.id], (err, data: any) => {
    if (data.length === 0) {
      return res.status(200).send("No event has been added yet.");
    }
    if (data) {
      return res.send(data);
    }
    if (err != null) {
      return res.status(500).json(err);
    }
  });
}

export function updateEvent(req: Request, res: Response) {
  const updateEventQuery = `UPDATE events
    SET event_name = ?, 
    event_date = ?, 
    event_time = ?, 
    venue_id = ?, 
    category_id = ? 
    ticket_amount = ? 
    WHERE event_id = ?`;

  const values = [
    req.body.event_name,
    req.body.event_date,
    req.body.event_time,
    req.body.venue_id,
    req.body.category_id,
    req.body.ticket_amount,
  ];

  database.query(updateEventQuery, [values], (err, data: any) => {
    if (err != null) {
      return res.json(err);
    }
    if (data.affectedRows === 0) {
      return res.status(404).send("This event doesn't exist.");
    }
    return res.send("Event has been updated succesfully.");
  });
}

export function deleteEvent(req: Request, res: Response) {
  const deleteEventQuery = "DELETE FROM events WHERE event_id = ?";

  database.query(deleteEventQuery, [req.params.id], (err, data) => {
    if (err != null) {
      return res.json(err);
    }
    return res.send("Event has been deleted successfully.");
  });
}
