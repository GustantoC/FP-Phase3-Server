const bcrypt = require('bcryptjs');

class PasswordHelper {
  static hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}

module.exports = PasswordHelper
