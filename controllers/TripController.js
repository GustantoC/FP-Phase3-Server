const { QuarantineDetail } = require('../models');

class TripController {
  static async createTrip(req, res, next){
    try {
      let { tripOrigin, tripDestination } = req.body;
      if(!tripOrigin || !tripDestination){
        throw { name: '400', message: 'Please provide origin and destination' };
      }
      if(req.user.role !== 'User'){
        throw { name: '403', message: 'You are not allowed to create a trip' };
      }
      let newTrip = await QuarantineDetail.create({
        userId :  req.user.id,
        tripOrigin,
        tripDestination
      });
      res.status(201).json({
        id: newTrip.id,
        tripOrigin,
        tripDestination
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TripController;