import bcrypt from 'bcryptjs'

export function genHash (password: string): string {
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  return hashedPassword
}
