const constants = require('../utils/constants')
const CLIENT_ORIGIN = constants.ORIGIN_URL

const session = {
  resave: true,
  saveUninitialized: true,
  secret: constants.SESSION_SECRET
}

const cors = {
  methods: 'OPTIONS,HEAD,GET,POST,PUT,DELETE',
  origin: CLIENT_ORIGIN,
  optionsSuccessStatus: 204
}

module.exports = {
  session,
  cors
}
