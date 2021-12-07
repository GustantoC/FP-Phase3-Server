const PasswordHelper = require('../helpers/PasswordHelper');
const TokenHelper = require('../helpers/TokenHelper');
const acceptedRoles = require('../helpers/AcceptedStaffRoles');
const { User } = require('../models');
const progressStatus = require('../helpers/ProgressStatus');

class UserController {
  //GET All User ()
  static async getAllUsers(req, res, next) {
    try {
      let { role } = req.query;
      let options = {};
      if (role) options = { role: role };
      const response = await User.findAll({
        where: options,
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt']
        }
      })
      if (response.length === 0) {
        throw { name: '404', message: 'Can\'t find user' }
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  //GET User by ID
  static async getUserById(req, res, next) {
    try {
      let { id } = req.params;
      const response = await User.findByPk(id, {
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      });
      if (!response) {
        throw { name: '404', message: 'Can\'t find user' }
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  //POST User
  static async createUser(req, res, next) {
    try {
      let { name, passportNumber, email, password, phoneNumber } = req.body;
      const response = await User.create({
        name: name,
        passportNumber: passportNumber,
        role: "User",
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        status: "ArrivalProcedure",
      });
      res.status(200).json({
        id: response.id,
        name: response.name,
        passportNumber: response.passportNumber,
        role: response.role,
        email: response.email,
        phoneNumber: response.phoneNumber,
        status: response.status,
      });
    } catch (error) {
      next(error);
    }
  }

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
  static async createStaff(req, res, next) {
    //TODO: Ini function untuk membuat Staff baru
    try {
      const { name, role, email, password, phoneNumber } = req.body;
      //role has to be included in acceptedRoles
      if (!acceptedRoles.includes(role)) {
        throw { name: "400", message: "Role is not accepted" };
      }
      const response = await User.create({
        name: name,
        passportNumber: "Staff",
        role: role,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        status: "Active",
      });
      res.status(200).json({
        id: response.id,
        name: response.name,
        passportNumber: response.passportNumber,
        role: response.role,
        email: response.email,
        phoneNumber: response.phoneNumber,
        status: response.status,
      });
    } catch (error) {
      next(error);
    }
  }

  //PUT Status User
  static async changeStatus(req, res, next) {
    //TODO: Ini fucntion yang ganti status user berdasarkan yang ganti dan status sekarang
    try {
      let { id } = req.params;
      const user = await User.findByPk(id);

      if (!user || user.role !== "User") {
        throw { name: '404', message: 'Can\'t find user' };
      }
      const currStatus = user.status;
      const nextStatus = progressStatus(currStatus, req.user.role);
      if(!nextStatus){
        throw { name: '403', message: 'You can\'t change user status' };
      }
      const response = await User.update({ status: nextStatus }, {
        where: {
          id: id
        }, 
        fields: ['status'],
        returning: true, 
        individualHooks: true
      });
      res.status(200).json({
        id: response[1][0].id,
        name: response[1][0].name,
        passportNumber: response[1][0].passportNumber,
        role: response[1][0].role,
        email: response[1][0].email,
        phoneNumber: response[1][0].phoneNumber,
        status: response[1][0].status
      })
    } catch (error) {
      next(error);
    }
  }

  //PUT Role Staff
  static async changeStaffRole(req, res, next) {
    try {
      let { role } = req.body;
      let { id } = req.params;

      if (!acceptedRoles.includes(role)) {
        throw { name: '400', message: 'Role is not accepted' };
      }

      const user = await User.findByPk(id);
      if (!user) {
        throw { name: '404', message: 'Can\'t find user' };
      }

      const response = await User.update({ role: role }, {
        where: {
          id: id
        }, 
        fields: ['role'],
        returning: true, 
        individualHooks: true
      });
      res.status(200).json({
        id: response[1][0].id,
        name: response[1][0].name,
        passportNumber: response[1][0].passportNumber,
        role: response[1][0].role,
        email: response[1][0].email,
        phoneNumber: response[1][0].phoneNumber,
        status: response[1][0].status
      })
    } catch (error) {
      next(error);
    }
  }

  //POST /login
  static async Login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "400", message: "Email is required" };
      }
      if (!password) {
        throw { name: "400", message: "Password is required" };
      }
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user || !PasswordHelper.comparePassword(password, user.password)) {
        throw { name: "401", message: "Invalid email or password" };
      } else {
        let token = TokenHelper.signPayload({
          id: user.id,
          email: user.email,
          role: user.role,
        });
        res.status(200).json({
          access_token: token,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  //POST /regisAdmin
  static async regisAdmin(req, res, next) {
    try {
      const resposne = await User.create({
        name: "Admin",
        passportNumber: "ADMIN-12345",
        role: "Admin",
        email: "admin@admin.com",
        password: "adminn",
        phoneNumber: "081234567890",
        status: "Active",
      });
      res.status(201).json({
        message: "Created admin@admin.com with password *****",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
