const Session = require('../database/session')

module.exports = {
  getUserForSession,
  createSession,
  deleteSession
}

async function getUserForSession (sessionToken) {
    
  const user = await Session.getUserForSession(sessionToken)

  return user
}

async function createSession (userID, sessionToken) {
  await Session.createSession(userID, sessionToken)
}

async function deleteSession (sessionToken) {
  await Session.deleteSession(sessionToken)
}
