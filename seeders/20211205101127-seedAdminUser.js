'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    //Login   : admin@admin.com
    //Password: admin
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync('admin', salt);
    const userObject = {
      Name: 'Admin',
      idNumber: '123456789',
      Role: 'Admin',
      Email: 'admin@admin.com',
      Password: hashedPassword,
      phoneNumber: '0712345678',
      Status: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await queryInterface.bulkInsert('Users', [userObject], {});
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
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
