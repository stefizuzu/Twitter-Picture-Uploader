const constants = require("../utils/constants");
const providers = ["twitter"];

const callbacks = providers.map((provider) =>
  constants.CALLBACK_URL.replace("$(provider)", provider)
);

const [twitterURL] = callbacks;

const TWITTER_CONFIG = {
  consumerKey: constants.TWITTER_CONSUMER_KEY,
  consumerSecret: constants.TWITTER_CONSUMER_SECRET,
  callbackURL: twitterURL,
  includeEmail: true,
};

module.exports = {
  TWITTER_CONFIG,
};
