// https://github.com/nozzle/react-static/blob/master/docs/plugins/node-api.md

// Paths Aliases defined through tsconfig.json
const customWebpackConfig = require('./webpack.config.js')

export default pluginOptions => ({
  webpack: (config, { defaultLoaders }) => {
    config.resolve.alias = customWebpackConfig.resolve.alias
    // config.plugins = [...config.plugins, ...customWebpackConfig.plugins]
    return config
  },
})
