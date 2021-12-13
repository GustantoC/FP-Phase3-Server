"use strict";
const PasswordHelper = require("../helpers/PasswordHelper");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Julius Caesar",
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
          name: "Yanni Balloulis",
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
          name: "David Tripeas",
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
          name: "Fotios Siskakos",
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
          name: "Eftichios Ganallis",
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
          name: "Panagiotis Nicolatsis",
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
