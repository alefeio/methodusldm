import Sequelize from 'sequelize';
// import mongoose from 'mongoose';

import Usuario from '../app/models/Usuario';
import Categoria from '../app/models/Categoria';
import Modulo from '../app/models/Modulo';
import Tipo from '../app/models/Tipo';
import Exercicio from '../app/models/Exercicio';
import Prova from '../app/models/Prova';
import Resposta from '../app/models/Resposta';

import databaseConfig from '../config/database';

const models = [Usuario, Categoria, Modulo, Tipo, Exercicio, Prova, Resposta];

class Database {
  constructor() {
    this.init();
    // this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  // mongo() {
  //   this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
  //     useNewUrlParser: true,
  //     useFindAndModify: true,
  //   });
  // }
}

export default new Database();
