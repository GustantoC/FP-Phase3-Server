'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuarantineLocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      QuarantineLocation.hasMany(models.QuarantineDetail, { foreignKey: 'locationId' });
    }
  };
  QuarantineLocation.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: "Please enter a name for the location"
        },
        notNull:{
          msg: "Please enter a name for the location"
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: "Please enter an address for the location"
        },
        notNull:{
          msg: "Please enter an address for the location"
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks:{
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
    modelName: 'QuarantineLocation',
  });
  return QuarantineLocation;
};