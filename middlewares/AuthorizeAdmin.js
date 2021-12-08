const { User } = require('../models')

async function AuthorizeAdmin(req, res, next) {
  try {
    if (req.user.role !== "Admin") {
      throw { name: "403", message: "You can't access this"}
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = AuthorizeAdmin