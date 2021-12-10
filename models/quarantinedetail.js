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
      // userId references to User model
      QuarantineDetail.belongsTo(models.QuarantineLocation, { foreignKey: 'locationId' });
      QuarantineDetail.belongsTo(models.User, { foreignKey: 'userId' });
    }
  };
  QuarantineDetail.init({
    userId: {
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
    locationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'QuarantineLocations',
        key: 'id'
      }
    },
    roomNumber: DataTypes.STRING,
    quarantineUntil: DataTypes.DATE,
    tripOrigin: DataTypes.STRING,
    tripDestination: DataTypes.STRING,
    isQuarantined: DataTypes.BOOLEAN,
  }, {
    hooks: {
      afterCreate: async (instance, options) => {
        let descriptionText = `New Quarantine Detail created for ${instance.userId}`;
        let historyObj = {
          userId: instance.userId,
          updatedBy: options.createdBy,
          description: descriptionText,
        }
        await sequelize.models.HistoryLog.create(historyObj)
      },
      afterUpdate: async (instance, options) => {
        let descriptionText = `Quarantine for ${instance.userId} updated to: `;

        if (instance.locationId) {
          descriptionText += `LocaionId: ${instance.locationId};`;
        }
        if(instance.roomNumber) {
          descriptionText += `Room Number: ${instance.roomNumber};`;
        }
        if(instance.quarantineUntil) {
          descriptionText += `Quarantine Until: ${instance.quarantineUntil};`;
        }
        if(instance.tripOrigin) {
          descriptionText += `Trip Origin: ${instance.tripOrigin};`;
        }
        if(instance.tripDestination) {
          descriptionText += `Trip Destination: ${instance.tripDestination};`;
        }
        if(instance.isQuarantined) {
          descriptionText += `Is Quarantined!`;
        }
        let historyObj = {
          userId: instance.userId,
          updatedBy: options.createdBy,
          description: descriptionText,
        }
        await sequelize.models.HistoryLog.create(historyObj)
      }
    },
    sequelize,
    modelName: 'QuarantineDetail',
  });
  return QuarantineDetail;
};