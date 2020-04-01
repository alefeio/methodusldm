import * as Yup from 'yup';
import Modulo from '../models/Modulo';

class ModuloController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Falha na validação!' })
    }

    const { nome } = req.body;

    const moduloExiste = await Modulo.findOne({ where: { nome } });

    if (moduloExiste) {
      return res.json({ erro: 'Módulo já existe!' });
    }

    const { id } = await Modulo.create({
      nome,
    });

    return res.json({
      id,
      nome,
    });
  }

  async index(req, res) {
    const modulos = await Modulo.findAll();

    return res.json(modulos);
  }

  async update(req, res) {
    const { nome } = req.body;

    const modulo = await Modulo.findByPk(req.params.id);

    if (nome !== modulo.nome) {
      const moduloExiste = await Modulo.findOne({ where: { nome } });

      if (moduloExiste) {
        return res.status(400).json({ erro: 'Módulo já existe!' });
      }

      const { id } = await modulo.update(req.body);

      return res.json({
        id,
        nome,
      });
    }

    return res.json({ nome });
  }
}

export default new ModuloController();
