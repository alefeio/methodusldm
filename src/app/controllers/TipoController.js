import Tipo from '../models/Tipo';

class TipoController {
  async store(req, res) {
    const { nome } = req.body;

    const tipoExiste = await Tipo.findOne({ where: { nome } });

    if (tipoExiste) {
      return res.json({ erro: 'Tipo já existe!' });
    }

    const { id } = await Tipo.create({
      nome,
    });

    return res.json({
      id,
      nome,
    });
  }

  async index(req, res) {
    const tipos = await Tipo.findAll();

    return res.json(tipos);
  }

  async update(req, res) {
    const { nome } = req.body;

    const tipo = await Tipo.findByPk(req.params.id);

    if (nome !== tipo.nome) {
      const tipoExiste = await Tipo.findOne({ where: { nome } });

      if (tipoExiste) {
        return res.status(400).json({ erro: 'Tipo já existe!' });
      }

      const { id } = await tipo.update(req.body);

      return res.json({
        id,
        nome,
      });
    }

    return res.json({
      nome,
    });
  }
}

export default new TipoController();
