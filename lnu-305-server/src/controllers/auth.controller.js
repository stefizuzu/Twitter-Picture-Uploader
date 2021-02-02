const Secure = require('../utils/secure')
const SessionService = require('../services/session.service')
const ErrorHandler = require('../utils/errorHandler')

module.exports = {
  route
}

function route ({ provider }) {
  return ErrorHandler.upgradeMiddleware(async (req, res) => {
    const io = req.app.get('io')

    const user = {
      userID: req.user.userID,
      email: req.user.email,
      username: req.user.username,
      photo: req.user.photoURL,
      role: 'poweruser'
    }
    const token = Secure.generateToken()
    await SessionService.createSession(user.userID, token)
    io.in(req.session.socketId).emit(provider, { user, token })
    req.session.destroy()
    res.status(200).end()
  })
}
