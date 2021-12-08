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
      afterCreate: async (instance, options) => {
        let descriptionText = `New location created: ${instance.name}`;
        let historyObj = {
          userId: instance.id,
          updatedBy: options.createdBy,
          description: descriptionText,
        }
        await sequelize.models.HistoryLog.create(historyObj)
      },
      afterUpdate: async (instance, options) => {
        let descriptionText = `Location Updated to: ${instance.name}-${instance.address}-${instance.type} from ${instance.previous('name')}-${instance.previous('address')}-${instance.previous('type')}`;
        let historyObj = {
          userId: options.createdBy,
          updatedBy: options.createdBy,
          description: descriptionText,
        }
        await sequelize.models.HistoryLog.create(historyObj)
        
      }
    },
    sequelize,
    modelName: 'QuarantineLocation',
  });
  return QuarantineLocation;
};