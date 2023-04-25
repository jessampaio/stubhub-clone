import mysql from 'mysql2'
import mysqlPromise from 'mysql2/promise'

// ASYNC AWAIT:

export const connection = mysqlPromise.createConnection({
  host:'localhost', 
  user: 'root',
  password: process.env.DATABASE_PASS, 
  database: 'stubhub'
})

// CALLBACK:

const database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DATABASE_PASS,
  database: 'stubhub'
})

export default database


