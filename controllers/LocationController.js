const { QuarantineLocation, QuarantineDetail, User } = require("../models");
const { getPagination, getPagingData } = require("../helpers/PaginationHelper");

class LocationController {
  //POST QuarantineLocation = Yang diisi oleh admin doang
  static async createNewLocation(req, res, next) {
    try {
      let { name, address, type } = req.body;
      if (type !== "Wisma" && type !== "Hotel") {
        throw { name: "400", message: "Type must be Wisma or Hotel" };
      }
      let newLocation = await QuarantineLocation.create(
        {
          name,
          address,
          type,
        },
        {
          createdBy: req.user.id,
        }
      );
      res.status(201).json({
        id: newLocation.id,
        name: newLocation.name,
        address: newLocation.address,
        type: newLocation.type,
      });
    } catch (error) {
      next(error);
    }
  }

  //GET User location detail untuk user
  static async getUserLocation(req, res, next) {
    try {
      let { userId } = req.params;
      userId = parseInt(userId);
      const checkUser = await User.findByPk(userId);
      if (!checkUser) {
        throw { name: "404", message: "User not found" };
      }
      const response = await QuarantineLocation.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: QuarantineDetail,
            where: {
              userId: userId,
              isQuarantined: false,
            },
          },
        ],
      });
      if (response.length === 0) {
        throw { name: "404", message: "User is not on any location" };
      }
      res.status(200).json({
        id: response[0].id,
        name: response[0].name,
        address: response[0].address,
        type: response[0].type,
      });
    } catch (error) {
      next(error);
    }
  }

  //GET All location
  static async getAllLocations(req, res, next) {
    try {
      let { page, size } = req.query;
      const { limit, offset } = getPagination(page, size);
      const locations = await QuarantineLocation.findAndCountAll({
        limit,
        offset,
        attributes: ["id", "name", "address", "type"],
      });
      res.status(200).json(getPagingData(locations, page, limit));
    } catch (error) {
      next(error);
    }
  }

  //PUT Quarantine Location
  static async updateLocation(req, res, next) {
    try {
      let { id } = req.params;
      id = parseInt(id);
      const checkLocation = await QuarantineLocation.findByPk(id);
      if (!checkLocation) {
        throw { name: "404", message: "Location not found" };
      }
      let { name, address, type } = req.body;
      if (type) {
        if (type !== "Wisma" && type !== "Hotel") {
          throw { name: "400", message: "Type must be Wisma or Hotel" };
        }
      }
      const response = await QuarantineLocation.update(
        {
          name,
          address,
          type,
        },
        {
          where: {
            id,
          },
          returning: true,
          individualHooks: true,
          createdBy: req.user.id,
        }
      );
      res.status(200).json({
        id: response[1][0].id,
        name: response[1][0].name,
        address: response[1][0].address,
        type: response[1][0].type,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = LocationController;
