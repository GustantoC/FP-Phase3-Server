const { QuarantineLocation, QuarantineDetail, User } = require('../models')


class LocationController {
  //POST QuarantineLocation = Yang diisi oleh admin doang
  static async createNewLocation(req, res, next) {
    try {
      let { name, address, type } = req.body
      if(type !== 'Wisma' && type !== 'Hotel'){
        throw { name: '400', message: 'Type must be Wisma or Hotel' }
      }
      let newLocation = await QuarantineLocation.create({
        name,
        address,
        type
      })
      res.status(201).json({
        id: newLocation.id,
        name: newLocation.name,
        address: newLocation.address,
        type: newLocation.type
      })
    } catch (error) {
      next(error)
    }
  }


  //GET User location detail untuk user
  static async getUserLocation(req, res, next) {
    try {
      let { userId } = req.params
      userId = parseInt(userId)
      const checkUser = await User.findByPk(userId)
      if(!checkUser){
        throw { name: '404', message: 'User not found' }
      }
      const response = await QuarantineLocation.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [{
          model: QuarantineDetail,
          where: {
            userId: userId,
            isQuarantined: false
          }
        }]
      })
      if(response.length === 0){
        throw { name: '404', message: 'User is not on any location' }
      }
      res.status(200).json({
        id: response[0].id,
        name: response[0].name,
        address: response[0].address,
        type: response[0].type
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  //GET All location
  static async getAllLocations(req, res, next) {
    try {
      const locations = await QuarantineLocation.findAll({
        attributes: ['id', 'name', 'address', 'type']
      })
      res.status(200).json(locations)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = LocationController