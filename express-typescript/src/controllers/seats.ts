import database from "../database";
import { connection } from "../database";
import { type Request, type Response } from "express";

export function getSeats(req: Request, res: Response) {
  const getSeatsQuery = "SELECT * FROM seats";

  database.query(getSeatsQuery, (err, data: any) => {
    if (data) {
      return res.send(data);
    }
    if (err != null) {
      return res.send(err);
    }
  });
}

export function createSeat(req: Request, res: Response) {
  function generateSeats(sectionNum: number, venueId: number, seatNum: number) {
    const array = [];

    for (let i = 1; i <= sectionNum; i++) {
      for (let j = 1; j <= seatNum; j++) {
        array.push([i, venueId, j]);
      }
    }
    return array;
  }

  const values = generateSeats(
    req.body.section,
    req.body.venueId,
    req.body.seatNumber
  );

  const createSeatQuery = `INSERT INTO seats (
    section, 
    venue_id, 
    seat_number
    ) VALUES (?)`;

  database.query(createSeatQuery, values, (err: any, data: any) => {
    if (err != null) {
      return res.status(500).json(err);
    }
    return res.status(200).send("Seat has been added successfully.");
  });
}

export async function getSectionAndSeats(req: Request, res: Response) {
  try {
    const conn = await connection;
    const [data]: any = await conn.execute(
      `SELECT section,
      count(*) as seats_per_section 
      FROM seats
      WHERE venue_id = ?
      GROUP BY section`,
      [req.params.id]
    );

    console.log("THE PARAMS", req.params);

    if (data) {
      console.log(data);
      return res.json(data);
    }
  } catch (err) {
    if (err) {
      console.log(err);
      return res.json(err);
    }
  }
}

export function getSeat(req: Request, res: Response) {
  const getSeatQuery = "SELECT * FROM seats WHERE seat_id = ?";

  database.query(getSeatQuery, req.body.seatId, (err, data: any) => {
    if (data) {
      res.send(data);
    }
    if (data.length === 0) {
      return res.status(200).send("No ticket has been added yet.");
    }
    if (err != null) {
      return res.status(500).json(err);
    }
  });
}

export function deleteSeat(req: Request, res: Response) {
  const deleteSeatQuery = "DELETE FROM seats WHERE seat_id = ?";

  database.query(deleteSeatQuery, [req.params.id], (err, data) => {
    if (err != null) {
      return res.json(err);
    }
    return res.send("Ticket has been deleted successfully.");
  });
}
