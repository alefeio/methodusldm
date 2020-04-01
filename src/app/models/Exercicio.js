import Sequelize, { Model } from 'sequelize';

class Exercicio extends Model {
  static init(sequelize) {
    super.init(
      {
        questao: Sequelize.INTEGER,
        subquestao: Sequelize.INTEGER,
        resposta: Sequelize.INTEGER
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Categoria, { foreignKey: 'categoria_id', as: 'categoria' });
    this.belongsTo(models.Modulo, { foreignKey: 'modulo_id', as: 'modulo' });
    this.belongsTo(models.Tipo, { foreignKey: 'tipo_id', as: 'tipo' });
    this.belongsTo(models.Usuario, { foreignKey: 'admin_id', as: 'admin' });
  }
}

export default Exercicio;
