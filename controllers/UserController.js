const PasswordHelper = require('../helpers/PasswordHelper');
const TokenHelper = require('../helpers/TokenHelper');
const { User } = require('../models');

class UserController {
  //GET All User ()
  static async getAllUsers(req, res, next) {
    //Query role
  }

  //GET User by ID
  static async getUserById(req, res, next) {

  }

  //POST User
  /**
   * List of roles:
   * - Admin
   * - OfficerAirport
   * - DriverWisma
   * - DriverHotel
   * - OfficerHotel
   * - OfficerWisma
   * - HealthOfficial
   * - User
   */
  static async createUser(req, res, next) {
    //TODO: Ini function untuk membuat user baru 

  }

  static async createStaff(req, res, next) {
    //TODO: Ini function untuk membuat Staff baru
    try {
      
    } catch (err) {
      next(err);
    }
  }

  //PUT Status User
  static async changeStatus(req, res, next) {
    //TODO: Ini fucntion yang ganti status user berdasarkan yang ganti dan status sekarang
  }


  //PUT Role Staff
  static async changeStaffRole(req, res, next) {
    //TODO: Ini fucntion yang ganti role staff 
  }

  //POST /login
  static async Login(req, res, next) {
    try {
      const { email, password } = req.body;
      if(!email){
        throw { name: '400', message: 'Email is required' };
      }
      if(!password){
        throw { name: '400', message: 'Password is required' };
      }
      const user = await User.findOne({
        where: {
          email: email
        }
      });
      if (!user || user.password !== PasswordHelper.comparePassword(password, user.password)) {
        throw { name: '401', message: 'Invalid email or password' };
      }
      else {
        let token = TokenHelper.signPayload({
          id: user.id,
          email: user.email,
          role: user.role,
        })
        res.status(200).json({
          access_token: token
        });
      }
    }
    catch (err) {
      next(err);
    }
  }
}


module.exports = UserController;