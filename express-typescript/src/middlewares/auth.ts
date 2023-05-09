import jwt from 'jsonwebtoken';
import { type Request, type Response, type NextFunction } from 'express';

export default function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header('x-auth-token');
  console.log(token)
  if (!token) return res.status(401).send('ACCESS DENIED. NO TOKEN.');

  try {
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY || '');

    console.log('TESTING Decoded Token:', decoded);

    req.token = decoded;
    req.userId = decoded.id;

    next();
  } catch (err) {
    console.log(err)
    res.status(400).send('Invalid Token.');
  }
}
