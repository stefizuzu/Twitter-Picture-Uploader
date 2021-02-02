const mysql = require('mysql2/promise')
const constants = require('../utils/constants')

module.exports = {
  connect,
  disconnect,
  getConnection
}

const db = {
  connection: null
}

async function connect () {
  if (!db.connection) {
    try {
      db.connection = await mysql.createConnection(constants.DB_CONNECTION_STRING)
    } catch (err) {
      console.error('* Error caught while establishing connection.', err)
    }
  }

  return db
}

async function disconnect () {
  if (db.connection) {
    await db.connection.end()
  }

  db.connection = null
}

function getConnection () {
  return db
}
