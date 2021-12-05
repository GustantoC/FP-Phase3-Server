const { User } = require('../models');

class UserController {
  //GET All User ()
  static async getAllUser(req, res, next){
    //Query role
  }

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
   * - User
   */
  static async createUser(req, res, next){
    //TODO: Ini function untuk membuat user baru 
    
  }

  static async createStaff(req,res,next){
    //TODO: Ini function untuk membuat Staff baru
  }

  //PUT Status User
  static async changeStatus(req, res, next){
    //TODO: Ini fucntion yang ganti status user berdasarkan yang ganti dan status sekarang
  }

  //POST /login
  static async Login(req,res,next){

  }
}


module.exports = UserController;