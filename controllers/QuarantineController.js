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
      if (!req.user.role.startsWith('officer')) {
        throw { name: '403', message: 'Forbidden' }
      }
      let { roomNumber, quarantineUntil, tripOrigin, tripDestination } = req.body
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
        quarantineUntil,
        tripOrigin,
        tripDestination
      }, {
        where: {
          id: currentQuarantineDetail.id
        },
        fields: ['roomNumber', 'quarantineUntil', 'tripOrigin', 'tripDestination'],
        returning: true,
        individualHooks: true
      })
      res.status(200).json({
        id: response[1][0].id,
        userId: response[1][0].userId,
        locationId: response[1][0].locationId,
        roomNumber: response[1][0].roomNumber,
        quarantineUntil: response[1][0].quarantineUntil,
        tripOrigin: response[1][0].tripOrigin,
        tripDestination: response[1][0].tripDestination,
        isQuarantined: response[1][0].isQuarantined,
      })

    } catch (error) {
      next(error)
    }

  }

  //GET getAllQuarantineDetails
  static async getAllQuarantineDetails(req, res, next) {
    try {
      if(req.user.role !== 'User'){
        throw { name: '403', message: 'You can\'t access this' }
      }
      const response = await QuarantineDetail.findAll({
        where: {
          userId: req.user.id
        },
        attributes: ['id', 'userId', 'locationId', 'roomNumber', 'quarantineUntil', 'tripOrigin', 'tripDestination', 'isQuarantined','createdAt'],
        include: [{
          model: User,
          attributes: ['id', 'name', 'email', 'phoneNumber']
        }, {
          model: QuarantineLocation,
          attributes: ['id', 'name', 'address', 'type']
        }]
      })
      if(response.length === 0){
        throw { name: '404', message: `Can\'t find any data` }
      }
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  /*returns
  {
    "id": "integer",
    "userId": "integer",
    "locationId": "integer",
    "roomNumber": "string",
    "quarantineUntil": "date",
    "tripOrigin": "string",
    "tripDestination": "string",
    "isQuarantined": "boolean"
  }
  */
}

module.exports = QuarantineController