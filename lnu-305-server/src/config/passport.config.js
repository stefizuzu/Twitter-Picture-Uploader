const passport = require('passport')

const { Strategy: TwitterStrategy } = require('passport-twitter')
const { Strategy: BearerStrategy } = require('passport-http-bearer')

const UserService = require('../services/user.service')
const SessionService = require('../services/session.service')

const OAuthConfig = require('./oauth.config')

module.exports = init

function init () {
  // Allowing passport to serialize and deserialize users into sessions
  passport.serializeUser((user, callback) => callback(null, user))
  passport.deserializeUser((obj, callback) => callback(null, obj))

  // Adding each OAuth provider's strategy to passport
  passport.use(new TwitterStrategy(OAuthConfig.TWITTER_CONFIG, oauthCallback('LNU University')))
  passport.use(new BearerStrategy(bearerCallback))

  // The callback that is invoked when an OAuth provider sends back user
  // information. Normally, you would save the user to the database
  // in this callback and it would be customized for each provider
  function oauthCallback () {
    return async (accessToken, refreshToken, profile, callback) => {
      try {
        const username = profile.displayName
        const email = profile.emails[0].value
        const photoURL = profile.photos[0].value.replace(/sz=50/gi, 'sz=250')
        const role = 'poweruser'
 
        const user = await UserService.upsertUser(username, email, photoURL, role)

        callback(null, user)
      } catch (err) {
        callback(err)
      }
    }
  }

  async function bearerCallback (token, callback) {
    try {
      const user = await SessionService.getUserForSession(token)

      if (!user) {
        callback(null, false, { message: 'Provided token is invalid' })
      } else {
        callback(null, user)
      }
    } catch (err) {
      callback(err)
    }
  }
}
