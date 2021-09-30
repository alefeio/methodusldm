'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('usuarios', 'ativo', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('usuarios', 'ativo');
  },
};
