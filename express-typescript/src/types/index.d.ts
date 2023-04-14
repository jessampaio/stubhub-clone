import { type JwtPayload } from 'jsonwebtoken'

export {}

declare global {
  namespace Express {
    interface Request {
      token: JwtPayload | string
      userId: number
    }
  }
}
