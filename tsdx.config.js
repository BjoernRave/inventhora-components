const analyze = require('rollup-plugin-visualizer')
module.exports = {
  rollup(config, options) {
    config.plugins.push(analyze())
    return config
  },
}
