const TwitterService = require('../services/twitter.service')

module.exports = {
    uploadImage
}

async function uploadImage (req, res) {
  const response = await TwitterService.uploadImage(req.body.image);
  res.status(200).send(response);
}
