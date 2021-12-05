const { User } = require('../models');

class UserController {
  //GET User by ID
  static async getUserById(req, res, next){

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
   */
  static async createUser(req, res, next){
    //TODO: Ini function untuk membuat user baru 
    
  }

  //PUT Status User
  static async changeStatus(req, res, next){
    //TODO: Ini fucntion yang ganti status user berdasarkan yang ganti dan status sekarang
  }
}


module.exports = UserController;