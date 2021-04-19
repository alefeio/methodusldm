'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('prova2s_id', 'resposta', {
      type: Sequelize.INTEGER,
      references: { model: 'provas2s', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: false,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('prova2s_id', 'resposta');
  },
};
