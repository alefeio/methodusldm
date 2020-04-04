import Sequelize, { Model } from 'sequelize';

class Prova extends Model {
  static init(sequelize) {
    super.init(
      {
        nota: Sequelize.INTEGER,
        finalizada: Sequelize.BOOLEAN,
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
