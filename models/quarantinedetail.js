'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuarantineDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  QuarantineDetail.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'UserId is required'
        },
        notEmpty: {
          msg: 'UserId is required'
        }
      },
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    LocationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'LocationId is required'
        },
        notEmpty: {
          msg: 'LocationId is required'
        }
      },
      references: {
        model: 'QuarantineLocations',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    RoomNumber: DataTypes.STRING
  }, {
    hooks: {
      afterCreate: (instance, options) => {
        // let historyObj = {
        //   userId: instance.id,
        //   title: "Created",
        //   description: `New room with ID: ${instance.id} created`,
        //   updatedBy: instance.authorId
        // }
        // await sequelize.models.HistoryLog.create(historyObj)
      },
      afterUpdate: (instance, options) => {
        
      }
    },
    sequelize,
    modelName: 'QuarantineDetail',
  });
  return QuarantineDetail;
};