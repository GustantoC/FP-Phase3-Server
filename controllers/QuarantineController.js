const { QuarantineDetail } = require('../models')

class QuarantineController {
  //POST QuarantineDetail = Yang di panggil jika user sudah dipindahkan ke wisma
  static async createQuarantineDetail(req, res, next) {

  }
  /*returns
  {
    "id": "integer",
    "userId": "integer",
    "locationId": "integer",
    "roomNumber": null
  }
  */

  //PUT Update QuarantineDeail untuk userId
  static async updateQuarantineDetail(req, res, next) {
    let { roomNumber, totalDays, tripOrigin, tripDestination } = req.body
    //Ambil yang isQuarantined = false
    
  }
  /*returns
  {
    "id": "integer",
    "userId": "integer",
    "locationId": "integer",
    "roomNumber": "string",
    "totalDays": "integer",
    "tripOrigin": "string",
    "tripDestination": "string",
    "isQuarantined": "boolean"
  }
  */
}

module.exports = QuarantineController