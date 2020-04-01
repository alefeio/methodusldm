import Usuario from '../models/Usuario';

class AlunoController {
  async index(req, res) {
    const usuarios = await Usuario.findAll({
      where: { admin: false },
      attributes: ['id', 'nome', 'email', 'cpf'],
    });

    return res.json(usuarios);
  }
}

export default new AlunoController();
