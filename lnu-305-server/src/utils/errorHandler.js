const APIError = require('./APIError')

module.exports = {
  upgradeMiddleware,
  upgradeController
}

const defaultMessage = {
  message: 'Internal server error'
}

function upgradeMiddleware (middleware) {
  return async (req, res, next) => {
    try {
      await middleware(req, res, next)
    } catch (err) {
      if (err instanceof APIError) {
        const [status, message] = err.output

        res.status(status).send(message)
      } else {
        res.status(500).send(defaultMessage)
      }
    }
  }
}

function upgradeController (routes) {
  return Object.fromEntries(Object.entries(routes).map(([key, fn]) => [key, upgradeMiddleware(fn)]))
}
