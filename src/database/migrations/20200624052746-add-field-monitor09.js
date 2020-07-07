'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('provas', 'monitor09', {
      type: Sequelize.DOUBLE,
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('provas', 'monitor09');
  },
};
