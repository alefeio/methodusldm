import Categoria from '../models/Categoria';

class CategoriaController {
  async store(req, res) {
    const { nome } = req.body;

    const categoriaExiste = await Categoria.findOne({ where: { nome } });

    if (categoriaExiste) {
      return res.status(400).json({ erro: 'Categoria já existe!' });
    }

    const { id } = await Categoria.create({
      nome,
    });

    return res.json({
      id,
      nome,
    });
  }

  async index(req, res) {
    const categorias = await Categoria.findAll();

    return res.json(categorias);
  }

  async update(req, res) {
    const { nome } = req.body;

    const categoria = await Categoria.findByPk(req.params.id);

    if (nome !== categoria.nome) {
      const categoriaExiste = await Categoria.findOne({ where: { nome } });

      if (categoriaExiste) {
        return res.status(400).json({ erro: 'Categoria já existe!' });
      }

      const { id } = await categoria.update(req.body);

      return res.json({
        id,
        nome,
      });
    }

    return res.json({ nome });
  }

  async delete(req, res) {
    if (!req.usuarioAdmin) {
      return res.status(401).json({ erro: 'Operação não autorizada!' });
    }

    const categoriaExiste = await Categoria.findOne({
      where: { id: req.params.id },
    });

    if (categoriaExiste) {
      await Categoria.destroy({ where: { id: categoriaExiste.id } });

      return res.json({ msg: 'Operação realizada com sucesso!' })
    }

    return res.json();
  }
}

export default new CategoriaController();
