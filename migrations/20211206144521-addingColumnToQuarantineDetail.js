'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('QuarantineDetails', 'totalDays', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('QuarantineDetails', 'tripOrigin', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('QuarantineDetails', 'tripDestination', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('QuarantineDetails', 'isQuarantined', {
        type: Sequelize.BOOLEAN,
      }),
    ])
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('QuarantineDetails', 'totalDays', {}),
      queryInterface.removeColumn('QuarantineDetails', 'tripOrigin', {}),
      queryInterface.removeColumn('QuarantineDetails', 'tripDestination', {}),
      queryInterface.removeColumn('QuarantineDetails', 'isQuarantined', {}),
    ])
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
