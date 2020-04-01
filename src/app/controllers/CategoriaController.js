import Categoria from '../models/Categoria';

class CategoriaController {
  async store(req, res) {
    const { nome } = req.body;

    const categoriaExiste = await Categoria.findOne({ where: { nome } })

    if(categoriaExiste) {
      return res.status(400).json({ erro: 'Categoria já existe!' })
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
}

export default new CategoriaController();
