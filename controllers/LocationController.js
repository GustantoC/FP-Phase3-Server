const { QuarantineLocation, QuarantineDetail } = require('../models')


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