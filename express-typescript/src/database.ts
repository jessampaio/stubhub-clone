import mysql from 'mysql2'

const database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DATABASE_PASS,
  database: 'stubhub'
})

export default database
