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
    Name: {
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
    idNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Passport/NIK is required"
        },
        notNull: {
          msg: "Passport/NIK is required"
        }
      }
    },
    Role: {
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
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "E-mail is required"
        },
        notNull: {
          msg: "E-mail is required"
        },
        isEmail: {
          msg: "E-mail is not valid"
        },
        isUnique: function (value, next) {
          User.find({
            where: {
              Email: value
            }
          }).then(user => {
            if (user) {
              return next('Email already exists');
            }
            return next();
          })
        }
      }
    },
    Password: {
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
    Status: {
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