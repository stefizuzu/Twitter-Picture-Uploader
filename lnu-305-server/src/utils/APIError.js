class APIError extends Error {
  constructor (code, message) {
    super(message)
    this.code = code
  }

  get output () {
    return [
      this.code,
      { message: this.message }
    ]
  }
}

module.exports = APIError
