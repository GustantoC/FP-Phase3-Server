'use strict';
const {
  Model
} = require('sequelize');
const PasswordHelper = require('../helpers/PasswordHelper');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name is required"
        },
        notNull: {
          msg: "Name is required"
        }
      }
    },
    passportNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Passport is required"
        },
        notNull: {
          msg: "Passport is required"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Role is required"
        },
        notNull: {
          msg: "Role is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Email is required"
        },
        notNull: {
          msg: "Email is required"
        },
        isEmail: {
          msg: "Email is not valid"
        },
        isUnique: function (value, next) {
          User.find({
            where: {
              Email: value
            }
          }).then(user => {
            if (user) {
              return next('Email is already used');
            }
            return next();
          })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required"
        },
        notNull: {
          msg: "Password is required"
        },
        min: {
          args: [6],
          msg: "Password must be at least 6 characters"
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Phone Number is required"
        },
        notNull: {
          msg: "Phone Number is required"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Status is required"
        },
        notNull: {
          msg: "Status is required"
        }
      }
    }
  }, {
    hooks:{
      beforeCreate: (instance, options) => {
        instance.Password = PasswordHelper.hashPassword(instance.Password);
      },
      afterCreate: (instance, options) => {
        // let historyObj = {
        //   UserId: instance.id,
        //   UpdatedBy: options.userId,
        //   Description: `New user created`,
        // }
        // await sequelize.models.HistoryLog.create(historyObj)
      },
      afterUpdate: (instance, options) => {

      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};