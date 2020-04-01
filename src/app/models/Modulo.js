import Sequelize, { Model } from 'sequelize';

class Modulo extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Modulo;
