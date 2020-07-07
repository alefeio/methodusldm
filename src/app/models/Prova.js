import Sequelize, { Model } from 'sequelize';

class Prova extends Model {
  static init(sequelize) {
    super.init(
      {
        nota: Sequelize.INTEGER,
        finalizada: Sequelize.BOOLEAN,
        monitor01: Sequelize.INTEGER,
        monitor02: Sequelize.INTEGER,
        monitor03: Sequelize.INTEGER,
        monitor04: Sequelize.INTEGER,
        monitor05: Sequelize.INTEGER,
        monitor06: Sequelize.INTEGER,
        monitor07: Sequelize.INTEGER,
        monitor08: Sequelize.INTEGER,
        monitor09: Sequelize.INTEGER,
        percepcao01: Sequelize.INTEGER,
        percepcao02: Sequelize.INTEGER,
        percepcao03: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' })
  }
}

export default Prova;
