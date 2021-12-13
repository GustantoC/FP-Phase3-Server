"use strict";
const { Model } = require("sequelize");
const PasswordHelper = require("../helpers/PasswordHelper");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.QuarantineDetail, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required",
          },
          notNull: {
            msg: "Name is required",
          },
        },
      },
      passportNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Passport is required",
          },
          notNull: {
            msg: "Passport is required",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Role is required",
          },
          notNull: {
            msg: "Role is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email is already used",
        },
        validate: {
          notEmpty: {
            msg: "Email is required",
          },
          notNull: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Email is not valid",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required",
          },
          notNull: {
            msg: "Password is required",
          },
          len: {
            args: [6],
            msg: "Password must be at least 6 characters",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Phone Number is required",
          },
          notNull: {
            msg: "Phone Number is required",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Status is required",
          },
          notNull: {
            msg: "Status is required",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (instance, options) => {
          instance.password = PasswordHelper.hashPassword(instance.password);
        },
        afterCreate: async (instance, options) => {
          let descriptionText = ``;
          if (options.createType == "staff") {
            descriptionText = `New staff with Email: ${instance.email} created by ${options.createdBy}`;
          } else {
            descriptionText = `New user with Email: ${instance.email} created`;
          }
          let historyObj = {
            userId: instance.id,
            updatedBy: options.createdBy || instance.id,
            description: descriptionText,
          };
          await sequelize.models.HistoryLog.create(historyObj);
        },
        afterUpdate: async (instance, options) => {
          let descriptionText = ``;
          if (options.updateType == "user") {
            descriptionText = `Status changed from ${instance.previous(
              "status"
            )} to ${instance.status}`;
          } else if (options.updateType == "staff") {
            descriptionText = `Role changed from ${options.oldRole} to ${instance.role}`;
          }
          let historyObj = {
            userId: instance.id,
            updatedBy: options.updatedBy,
            description: descriptionText,
          };
          await sequelize.models.HistoryLog.create(historyObj);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
