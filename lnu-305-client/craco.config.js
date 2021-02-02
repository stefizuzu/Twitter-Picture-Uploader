const path = require("path");

module.exports = {
  plugins: [{ plugin: require("@semantic-ui-react/craco-less") }],
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        app: path.resolve(paths.appSrc, `${paths.appSrc}`),
      };
      return webpackConfig;
    },
  },
};
