module.exports = {
  saveSocketSession
}

function saveSocketSession (req, res, next) {
  req.session.socketId = req.query.socketId

  next()
}
