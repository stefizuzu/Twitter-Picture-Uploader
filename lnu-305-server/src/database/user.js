const Database = require('./connection')

module.exports = {
  getUser,
  createUser
}

const db = Database.getConnection()

async function getUser (email) {
  const [rows] = await db.connection.query(`
    SELECT *
    FROM User
    WHERE email = ?
  `, [email]
  )

  return rows[0]
}

async function createUser (username, email, photoURL, roleID) {
  const [insertResults] = await db.connection.query(`
    INSERT INTO User (username, email, photoURL, Role_IDrole)
    VALUES (?, ?, ?, ?)
  `, [username, email, photoURL, roleID]
  )

  const [rows] = await db.connection.query(`
    SELECT *
    FROM User
    WHERE userID = ?
  `, [insertResults.insertId]
  )

  return rows[0]
}
