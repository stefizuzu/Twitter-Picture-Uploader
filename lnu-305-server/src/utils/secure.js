const crypto = require('crypto')

module.exports = {
  generateToken
}

function generateToken () {
  return crypto.randomBytes(20).toString('hex')
}
