import Usuario from '../models/Usuario';

class AdminController {
  async index(req, res) {
    const admins = await Usuario.findAll({
      where: { admin: true },
      attributes: ['id', 'nome', 'email', 'cpf'],
    });

    return res.json(admins);
  }
}

export default new AdminController();
