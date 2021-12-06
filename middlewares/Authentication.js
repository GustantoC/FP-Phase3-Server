const TokenHelper = require('../helpers/TokenHelper')
const { User } = require('../models')
async function Authenticate (req, res, next) {
  try {
    let { access_token } = req.headers;
    if (!access_token) {
      throw { name: "401" }
    }
    const payload = TokenHelper.returnPayload(access_token)
    const response = await User.findOne({ where: { email: payload.email } })
    if (!response) {
      throw { name: "401" }
    }
    req.user = {
      id: response.id,
      email: response.email,
      role: response.role
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = Authenticate