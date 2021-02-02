require('dotenv').config()

const path = require('path')
const http = require('http')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const socketio = require('socket.io')

const database = require('./database/connection')
const constants = require('./utils/constants')
const passportConfig = require('./config/passport.config')
const serverConfig = require('./config/server.config')

const authRouter = require('./routers/auth.router')
const twitterRouter = require('./routers/twitter.router')

async function start () {
  const app = express()
  const server = http.createServer(app);
  const io = socketio(server, {
    cors: {
      origin: process.env.ORIGIN_URL,
      methods: ['OPTIONS', 'HEAD', 'GET', 'POST', 'PUT', 'DELETE'],
      credentials: true
    }
  })

  app.use(cors(serverConfig.cors))
  app.use(bodyParser.json())
  app.use(passport.initialize())
  app.use(session(serverConfig.session))

  passportConfig()

  app.use('/', authRouter)
  app.use('/twitter', twitterRouter)
  if (constants.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'build')))
  }

  app.set('io', io)

  app.get('/wake-up', (req, res) => res.status(200).send('👍'))

  await database.connect()

  server.listen(constants.PORT, () => console.info(`Server up on port ${constants.PORT}`))
}

module.exports = {
  start
}
