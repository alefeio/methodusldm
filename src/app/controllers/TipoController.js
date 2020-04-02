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

  async delete(req, res) {
    if (!req.usuarioAdmin) {
      return res.status(401).json({ erro: 'Operação não autorizada!' });
    }

    const tipoExiste = await Tipo.findOne({ where: { id: req.params.id } });

    if (tipoExiste) {
      await Tipo.destroy({ where: { id: tipoExiste.id } });

      return res.json({ msg: 'Operação realizada com sucesso!' });
    }

    return res.json();
  }
}

export default new TipoController();
