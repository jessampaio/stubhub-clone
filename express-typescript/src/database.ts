import mysql from 'mysql2'
import mysqlPromise from 'mysql2/promise'

// ASYNC AWAIT:

export const connection = mysqlPromise.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME
})

// CALLBACK:

const database = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME
})

export default database
