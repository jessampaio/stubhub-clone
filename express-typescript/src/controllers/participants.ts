import { connection } from '../database'
import { type Request, type Response } from 'express'

export async function getParticipants (req: Request, res: Response) {
  try {
    const conn = await connection
    const [data]: any = await conn.execute('SELECT * FROM participants')
    if (data.length === 0) {
      return res.status(204).send()
    }
    return res.status(200).json(data)
  } catch (err) {
    if (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  }
}

export async function addParticipant (req: Request, res: Response) {
  try {
    const conn = await connection
    await conn.execute('INSERT INTO participants (name) VALUES (?)', [req.body.name])
    const [result]: any = await conn.execute('SELECT * FROM participants WHERE name = ?', [req.body.name])
    if (result) {
      console.log('ADDING PARTICIPANT NODE', result[0])
      return res.status(200).json(result[0])
    }
  } catch (err) {
    if (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  }
}

export async function getParticipant (req: Request, res: Response) {
  try {
    const conn = await connection
    const data = await conn.execute('SELECT * FROM participants WHERE participant_id = ?', req.params.id)
    console.log(data[0])
    if (data[0]) {
      return res.status(200).send(data)
    }
  } catch (err) {
    if (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  }
}

export async function deleteParticipant (req: Request, res: Response) {
  try {
    const conn = await connection
    const data = await conn.execute('DELETE * FROM participants WHERE participant_id = ?', req.params.id)
    console.log(data[0])
    if (data[0]) {
      return res.status(200).send(data)
    }
  } catch (err) {
    if (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  }
}
