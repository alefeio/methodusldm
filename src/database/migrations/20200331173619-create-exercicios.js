'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('exercicios', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      questao: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      subquestao: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      resposta: {
        type: Sequelize.INTEGER,
      },
      categoria_id: {
        type: Sequelize.INTEGER,
        references: { model: 'categoria', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      modulo_id: {
        type: Sequelize.INTEGER,
        references: { model: 'modulos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      tipo_id: {
        type: Sequelize.INTEGER,
        references: { model: 'tipos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      admin_id: {
        type: Sequelize.INTEGER,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('exercicios');
  },
};
