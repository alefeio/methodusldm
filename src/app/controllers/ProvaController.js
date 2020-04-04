import Prova from '../models/Prova';
import Usuario from '../models/Usuario';

class ProvaController {
  async index(req, res) {
    if (!req.usuarioAdmin) {
      return res.status(401).json({ erro: 'Operação não autorizada!' });
    }

    const provas = await Prova.findAll({
      attributes: ['id', 'nota', 'finalizada'],
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['nome'],
        },
      ],
    });

    return res.json(provas);
  }
}

export default new ProvaController();
