import database from '../database';
import { type Request, type Response } from 'express';

export function getVenues(req: Request, res: Response) {
  const getVenuesQuery = 'SELECT * FROM venues';

  database.query(getVenuesQuery, (err, data: any) => {
    if (err != null) {
      return res.status(500).json(err);
    }
    return res.send(data);
  });
}

export function addVenue(req: Request, res: Response) {
  const { venueCapacity: capacity, venueName: name, venueCity: city, venueState: state } = req.body;

  const checkDuplicateQuery = `SELECT venue_name, 
    venue_city, 
    venue_state 
    FROM venues 
    WHERE venue_name = ? 
    AND venue_city = ? 
    AND venue_state = ?`;

  // QUERY FOR CHECKING VENUE DUPLICATE:

  database.query(checkDuplicateQuery, [name, city, state], (err, data: any) => {
    if (data.length) {
      return res.status(409).send('This venue has already been added.');
    }

    const addVenueQuery = 'INSERT INTO venues (venue_name, venue_capacity, venue_city, venue_state) VALUES (?)';

    const values = [name, capacity, city, state];

    database.query(addVenueQuery, [values], (err, data) => {
      if (err != null) {
        return res.status(500).json(err);
      }
      // QUERY TO RETURN THE VENUE ID BACK:

      database.query('SELECT * FROM venues WHERE venue_name = ?', req.body.venueName, (err, id: any) => {
        if (err != null) {
          return res.status(500).json(err);
        }
        if (id) {
          console.log('data from query', id);
        }

        // FUNCTION THAT GENERATES FAKE SEATS:

        function generateSeats(sectionNum: number, venueId: number, seatNum: number) {
          const seatArray = [];

          for (let i = 1; i <= sectionNum; i++) {
            for (let j = 1; j <= seatNum; j++) {
              seatArray.push([i, venueId, j]);
            }
          }
          return seatArray;
        }

        const values = generateSeats(req.body.section, id[0].venue_id, req.body.seatNumber);

        const createSeatQuery = `INSERT INTO seats (
          section, 
          venue_id, 
          seat_number
          ) VALUES ?`;

        // QUERY TO CREATE THE SEAT:

        database.query(createSeatQuery, [values], (err: any, data: any) => {
          if (err != null) {
            return res.status(500).json(err);
          }
          console.log(id);
          return res.status(200).json(id);
        });
      });
    });
  });
}

export function getVenue(req: Request, res: Response) {
  const getVenueQuery = 'SELECT * FROM venues WHERE venue_id = ?';

  database.query(getVenueQuery, [req.params.id], (err, data: any) => {
    if (data.length === 0) {
      return res.status(200).send('No venue has been added yet.');
    }
    if (err != null) {
      return res.status(500).json(err);
    }
    return res.send(data);
  });
}

export function updateVenue(req: Request, res: Response) {
  const updateVenueQuery = `UPDATE venues SET 
  venue_name = ?, 
  venue_capacity = ?, 
  venue_city = ?, 
  venue_state = ? 
  WHERE venue_id = ?`;

  const values = [req.body.venue_name, req.body.venue_capacity, req.body.venue_city, req.body.venue_state];

  database.query(updateVenueQuery, [values], (err, data: any) => {
    if (err != null) {
      return res.json(err);
    }
    if (data.affectedRows === 0) {
      return res.status(404).send("This venue doesn't exist.");
    }
    return res.send('Venue has been updated succesfully.');
  });
}

export function deleteVenue(req: Request, res: Response) {
  const deleteVenueQuery = 'DELETE FROM venues WHERE venue_id = ?';

  database.query(deleteVenueQuery, [req.params.id], (err, data) => {
    if (err != null) {
      return res.json(err);
    }
    return res.send('Venue has been deleted successfully.');
  });
}
