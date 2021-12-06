const jwt = require('jsonwebtoken');

class TokenHelper{
  static returnPayload(accessToken){
    return jwt.verify(accessToken, process.env.JWT_SIGNATURE)
  }
  static signPayload(payload){
    return jwt.sign(payload, process.env.JWT_SIGNATURE)
  }
}

module.exports = TokenHelper;