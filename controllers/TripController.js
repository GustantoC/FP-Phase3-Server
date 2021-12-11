const { QuarantineDetail, User } = require("../models");

class TripController {
  static async getAllTrips(req, res, next) {
    try {
      if (req.user.role !== "User") {
        throw { name: "403", message: "You are not allowed to get trips" };
      }
      const userData = await User.findByPk(req.user.id);
      let trips = await QuarantineDetail.findAll({
        where: {
          userId: req.user.id,
        },
      });
      trips = trips.map((trip) => {
        return {
          id: userData.id,
          name: userData.name,
          tripOrigin: trip.tripOrigin,
          tripDestination: trip.tripDestination,
          startedAt: trip.createdAt,
        };
      });
      res.status(200).json(trips);
    } catch (error) {
      next(error);
    }
  }

  static async createTrip(req, res, next) {
    try {
      let { tripOrigin, tripDestination } = req.body;
      if (!tripOrigin || !tripDestination) {
        throw { name: "400", message: "Please provide origin and destination" };
      }
      if (req.user.role !== "User") {
        throw { name: "403", message: "You are not allowed to create a trip" };
      }
      const findQuarantineNow = await QuarantineDetail.findOne({
        where: {
          userId: req.user.id,
          isQuarantined: false,
        },
      });
      if (findQuarantineNow) {
        throw { name: "403", message: "You are not allowed to create a trip" };
      }
      let newTrip = await QuarantineDetail.create(
        {
          userId: req.user.id,
          tripOrigin,
          tripDestination,
          isQuarantined: false,
        },
        {
          createdBy: req.user.id,
        }
      );
      await User.update(
        {
          status: "ArrivalProcedure",
        },
        {
          where: {
            id: req.user.id,
          },
          fields: ["status"],
          returning: true,
          individualHooks: true,
          updateType: "user",
          updatedBy: req.user.id,
        }
      );
      res.status(201).json({
        id: newTrip.id,
        tripOrigin,
        tripDestination,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = TripController;
