const { QuarantineLocation, QuarantineDetail } = require('../models')


class LocationController {
  //POST QuarantineDetail = Yang diisi oleh admin doang
  static async createNewLocation(req, res, next) {
  }

  //POST QuarantineLocation = Yang di panggil jika user sudah dipindahkan ke wisma
  static async createUserLocation(req, res, next) {

  }

  //PUT QuarantineLocation = Update RoomNumber UserId
  static async updateRoomNumber(req, res, next) {
    
  }

  //GET User location detail untuk user
  static async getUserLocation(req, res, next) {
    
  }
}

module.exports = LocationController