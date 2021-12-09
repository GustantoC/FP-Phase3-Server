const { QuarantineDetail, User, QuarantineLocation } = require('../models')

class QuarantineController {
  //PUT Update QuarantineDeail untuk userId
  static async updateQuarantineDetail(req, res, next) {
    try {
      if (req.user.role == 'User' || req.user.role == 'Admin') {
        throw { name: '403', message: 'You can\'t access this' }
      }
      let { locationId, roomNumber, quarantineUntil, tripOrigin, tripDestination } = req.body
      let { userId } = req.params

      if (locationId) {
        if (req.user.role !== 'OfficerAirport') {
          throw { name: '403', message: 'You can\'t access this' }
        }
      }
      const checkLocation = await QuarantineLocation.findByPk(locationId)
      if (!checkLocation) {
        throw { name: '404', message: `Quarantine Location with ID ${locationId} not found` }
      }

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
        locationId,
        roomNumber,
        quarantineUntil,
        tripOrigin,
        tripDestination
      }, {
        where: {
          id: currentQuarantineDetail.id
        },
        fields: ['locationId', 'roomNumber', 'quarantineUntil', 'tripOrigin', 'tripDestination'],
        returning: true,
        individualHooks: true,
        createdBy: req.user.id,
        locationName: checkLocation.name
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
      if (req.user.role !== 'User') {
        throw { name: '403', message: 'You can\'t access this' }
      }
      const response = await QuarantineDetail.findAll({
        where: {
          userId: req.user.id
        },
        attributes: ['id', 'userId', 'locationId', 'roomNumber', 'quarantineUntil', 'tripOrigin', 'tripDestination', 'isQuarantined', 'createdAt'],
        include: [{
          model: User,
          attributes: ['id', 'name', 'email', 'phoneNumber']
        }, {
          model: QuarantineLocation,
          attributes: ['id', 'name', 'address', 'type']
        }]
      })
      if (response.length === 0) {
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