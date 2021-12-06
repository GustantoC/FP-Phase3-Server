const { User } = require('../models')

async function AuthorizeAdmin(req, res, next) {
  try {
    const FindUser = await User.findOne({ where: { email: req.user.email } })
    if (req.user.role != "admin") {
      throw { name: "403", message: "You can't access this"}
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = AuthorizeAdmin