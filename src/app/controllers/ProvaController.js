import Prova from '../models/Prova';
import Usuario from '../models/Usuario';

class ProvaController {
  async index(req, res) {
    const usuario_id = req.usuarioId;

    const provas = await Prova.findOne({
      where: { usuario_id, finalizada: false },
    });

    return res.json(provas);
  }

  async finalizadas(req, res) {
    const usuario_id = req.usuarioId;

    const provas = await Prova.findAll({
      where: { usuario_id, finalizada: true },
      order: ['id'],
    });

    return res.json(provas);
  }

  async create(req, res) {
    const usuario_id = req.usuarioId;

    const prova = await Prova.create({ usuario_id });

    return res.json(prova);
  }
}

export default new ProvaController();
