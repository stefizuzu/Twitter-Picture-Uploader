const Database = require('./connection')

module.exports = {
  getUserForSession,
  createSession,
  deleteSession
}

const db = Database.getConnection()

async function getUserForSession (sessionToken) {
    
  const [rows] = await db.connection.query(`
    SELECT User.*
    FROM Session
    INNER JOIN User ON User.userID=Session.userID
    WHERE Session.sessionToken = ?
  `, [sessionToken]
  )
  return rows[0]
}

async function createSession (userID, sessionToken) {
  await db.connection.query(`
    INSERT INTO Session (userID, sessionToken)
    VALUES (?, ?)
  `, [userID, sessionToken]
  )
}

async function deleteSession (sessionToken) {
  await db.connection.query(`
    DELETE FROM Session
    WHERE sessionToken = ?
  `, [sessionToken]
  )
}
