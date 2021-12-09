"use strict";
const PasswordHelper = require("../helpers/PasswordHelper");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Admin",
          passportNumber: "Staff",
          role: "Admin",
          email: "admin@admin.com",
          password: PasswordHelper.hashPassword("admin"),
          phoneNumber: "08123456789",
          status: "Active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Officer Airport",
          passportNumber: "Staff",
          role: "OfficerAirport",
          email: "officer@airport.com",
          password: PasswordHelper.hashPassword("admin"),
          phoneNumber: "08123456789",
          status: "Active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Driver Wisma",
          passportNumber: "Staff",
          role: "DriverWisma",
          email: "driver@wisma.com",
          password: PasswordHelper.hashPassword("admin"),
          phoneNumber: "08123456789",
          status: "Active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Driver Hotel",
          passportNumber: "Staff",
          role: "DriverHotel",
          email: "driver@hotel.com",
          password: PasswordHelper.hashPassword("admin"),
          phoneNumber: "08123456789",
          status: "Active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Officer Hotel",
          passportNumber: "Staff",
          role: "OfficerHotel",
          email: "officer@hotel.com",
          password: PasswordHelper.hashPassword("admin"),
          phoneNumber: "08123456789",
          status: "Active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Officer Wisma",
          passportNumber: "Staff",
          role: "OfficerWisma",
          email: "officer@wisma.com",
          password: PasswordHelper.hashPassword("admin"),
          phoneNumber: "08123456789",
          status: "Active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Health Official",
          passportNumber: "Staff",
          role: "HealthOfficial",
          email: "health@official.com",
          password: PasswordHelper.hashPassword("admin"),
          phoneNumber: "08123456789",
          status: "Active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "John Doe",
          passportNumber: "B0123456",
          role: "User",
          email: "john@doe.com",
          password: PasswordHelper.hashPassword("user"),
          phoneNumber: "08123456789",
          status: "ArrivalProcedure",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
