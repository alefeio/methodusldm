import Usuario from '../models/Usuario';

class AlunoController {
  async index(req, res) {
    const usuarios = await Usuario.findAll({
      where: { admin: false, ativo: true },
      order: [['updated_at', 'DESC']],
      // attributes: ['id', 'nome', 'email', 'cpf', 'created_at'],
    });

    return res.json(usuarios);
  }
}

export default new AlunoController();
