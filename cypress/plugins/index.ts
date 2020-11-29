const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor')
const cypressImageDiff = require('cypress-image-diff-js/dist/plugin')

module.exports = (on: any, config: any) => {
  on('file:preprocessor', cypressTypeScriptPreprocessor)

  cypressImageDiff(on, config)
}
