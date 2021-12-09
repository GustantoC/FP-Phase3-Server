'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //change description to text
    await queryInterface.changeColumn('HistoryLogs', 'description', {
      type: Sequelize.TEXT
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    //change description to string
    await queryInterface.changeColumn('HistoryLogs', 'description', {
      type: Sequelize.STRING
    });
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
