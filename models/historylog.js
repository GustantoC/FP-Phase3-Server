'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistoryLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  HistoryLog.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      validate:{
        notEmpty:{
          msg: "User Id is required"
        },
        notNull: {
          msg: "User Id is required"
        }
      }
    },
    UpdatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      validate:{
        notEmpty:{
          msg: "Updated By is required"
        },
        notNull: {
          msg: "Updated By is required"
        }
      }
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: "Description is required"
        },
        notNull: {
          msg: "Description is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'HistoryLog',
  });
  return HistoryLog;
};