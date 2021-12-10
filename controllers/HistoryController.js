const { HistoryLog, User } = require("../models");

const getPagination = (page, size) => {
  if (page <= 0) {
    page = 1;
  }
  if (size <= 0) {
    size = 0
  }
  page--
  const limit = size ? +size : 4;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};


const getPagingData = (data, page, limit) => {
  if (page <= 0) {
    page = 1;
  }
  const { count: totalItems, rows: rooms } = data;
  let currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, rooms, totalPages, currentPage };
};
class HistoryController {
  //GET all history log for CMS
  static async getHistory(req, res, next) {
    try {
      let { email } = req.query;
      let { page, size } = req.query;

      const { limit, offset } = getPagination(page, size);
      
      const history = await HistoryLog.findAll({
        attributes: {
          exclude: ['updatedAt']
        },
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'email'],
            key: 'userId',
            as: 'updatedUser'
          },
          {
            model: User,
            attributes: ['id', 'name', 'email'],
            key: 'updatedBy',
            as: 'updater'
          }
        ],
        order: [["createdAt", "DESC"]]
      });
      res.status(200).json(history);
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  //GET all history log by user
  static async getHistoryByUser(req, res, next) {
    try {
      const history = await HistoryLog.findAll({
        where: {
          userId: req.params.userId
        }
      }, {
        attributes: {
          exclude: ['updatedAt']
        }
      });
      res.status(200).json(history);
    } catch (err) {
      next(err)
    }
  }
}

module.exports = HistoryController;
