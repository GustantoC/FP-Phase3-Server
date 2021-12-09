const { HistoryLog } = require("../models");

class HistoryController {
  //GET all history log for CMS
  static async getHistory(req, res, next) {
    try {
      const history = await HistoryLog.findAll({},{
        attributes: {
          exclude: ['updatedAt']
        }
      });
      res.status(200).json(history);
    } catch (err) {
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
      },{
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
