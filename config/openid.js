const appConfig = require('./app')

exports.facebook = {
  appID: '1234777286624803',
  appSecret: 'bd8a132b033d3d72609593ca5f23a224',
  callbackURI: `http://127.0.0.1:${appConfig.port}/openid/facebook-callback`,
}
