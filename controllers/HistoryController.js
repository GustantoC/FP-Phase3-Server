const { Op } = require("sequelize");
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
  const { count: totalItems, rows: histories } = data;
  let currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, histories, totalPages, currentPage };
};
class HistoryController {
  //GET all history log for CMS
  static async getHistory(req, res, next) {
    try {
      let { email, emailUpdater } = req.query;
      let { page, size } = req.query;
      let options = { email: { [Op.like]: `%%` } };
      if (email) {
        options = { email: { [Op.like]: `%${email}%` } };
      }
      let updaterOptions = { email: { [Op.like]: `%%` } };
      if (emailUpdater) {
        updaterOptions = { email: { [Op.like]: `%${emailUpdater}%` } };
      }
      const { limit, offset } = getPagination(page, size);

      const history = await HistoryLog.findAndCountAll({
        limit,
        offset,
        attributes: {
          exclude: ['updatedAt']
        },
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'email'],
            where: options,
            key: 'userId',
            as: 'updatedUser'
          },
          {
            model: User,
            attributes: ['id', 'name', 'email'],
            where: updaterOptions,
            key: 'updatedBy',
            as: 'updater'
          }
        ],
        order: [["createdAt", "DESC"]]
      });
      res.status(200).json(getPagingData(history, page, limit));
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = HistoryController;
