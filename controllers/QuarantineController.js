const { QuarantineDetail, User, QuarantineLocation } = require('../models')

class QuarantineController {
  //POST QuarantineDetail = Yang di panggil jika user sudah dipindahkan ke wisma
  static async createQuarantineDetail(req, res, next) {
    try {
      let { userId, locationId } = req.params
      const checkUser = await User.findByPk(userId)

      if (!checkUser || checkUser.role !== 'User') {
        throw { name: '404', message: `User with ID ${userId} not found` }
      }

      const checkLocation = await QuarantineLocation.findByPk(locationId)
      if (!checkLocation) {
        throw { name: '404', message: `Quarantine Location with ID ${locationId} not found` }
      }

      const response = await QuarantineDetail.create({
        userId,
        locationId,
        isQuarantined: false
      })
      res.status(201).json(response)
    } catch (error) {
      next(error)
    }
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
    try {
      let { roomNumber, totalDays, tripOrigin, tripDestination } = req.body
      let { userId } = req.params

      const currentQuarantineDetail = await QuarantineDetail.findOne({
        where: {
          userId,
          isQuarantined: false
        }
      })
      if (!currentQuarantineDetail) {
        throw { name: '404', message: `Can't find User with ID in quarantine` }
      }
      const response = await QuarantineDetail.update({
        roomNumber,
        totalDays,
        tripOrigin,
        tripDestination
      }, {
        where: {
          id: currentQuarantineDetail.id
        },
        fields: ['roomNumber','totalDays','tripOrigin','tripDestination'],
        returning: true,
        individualHooks: true
      })
      res.status(200).json({
        id: response[1][0].id,
        userId: response[1][0].userId,
        locationId: response[1][0].locationId,
        roomNumber: response[1][0].roomNumber,
        totalDays: response[1][0].totalDays,
        tripOrigin: response[1][0].tripOrigin,
        tripDestination: response[1][0].tripDestination,
        isQuarantined: response[1][0].isQuarantined,
      })

    } catch (error) {
      next(error)
    }

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