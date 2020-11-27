const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor')

module.exports = (on: any, config: any) => {
  on('file:preprocessor', cypressTypeScriptPreprocessor)

  require('cypress-image-diff-js/dist/plugin')(on, config)
}
