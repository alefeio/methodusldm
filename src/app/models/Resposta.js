import Sequelize, { Model } from 'sequelize';

class Resposta extends Model {
  static init(sequelize) {
    super.init(
      {
        resposta: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Prova, { foreignKey: 'prova_id', as: 'prova' });
    this.belongsTo(models.Exercicio, {
      foreignKey: 'exercicio_id',
      as: 'exercicio',
    });
  }
}

export default Resposta;
