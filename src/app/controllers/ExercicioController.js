import * as Yup from 'yup';
import Exercicio from '../models/Exercicio';
import Usuario from '../models/Usuario';
import Categoria from '../models/Categoria';
import Modulo from '../models/Modulo';
import Tipo from '../models/Tipo';

class ExercicioController {
  async store(req, res) {
    const schema = Yup.object().shape({
      questao: Yup.number().required(),
      subquestao: Yup.number().required(),
      resposta: Yup.number().required(),
      categoria_id: Yup.number().required(),
      modulo_id: Yup.number().required(),
      tipo_id: Yup.number(),
      admin_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Falha na validação!' });
    }

    const {
      questao,
      subquestao,
      resposta,
      categoria_id,
      modulo_id,
      tipo_id = null,
      admin_id,
    } = req.body;

    if (!req.usuarioAdmin) {
      return res.status(401).json({ erro: 'Operação não autorizada!' });
    }

    const exercicioExiste = await Exercicio.findOne({
      where: { questao, subquestao, categoria_id, modulo_id, tipo_id },
    });

    if (exercicioExiste) {
      return res.status(400).json({ erro: 'Exercício já existe!' });
    }

    const exercicio = await Exercicio.create({
      questao,
      subquestao,
      resposta,
      categoria_id,
      modulo_id,
      tipo_id,
      admin_id,
    });

    return res.json(exercicio);
  }

  async index(req, res) {
    // const { page = 1 } = req.query;

    const exercicios = await Exercicio.findAll();

    return res.json(exercicios);
  }

  async detail(req, res) {
    const { page = 1 } = req.query;

    const id = req.params.id;

    const exercicios = await Exercicio.findOne({
      where: { id },
      include: [
        {
          model: Categoria,
          as: 'categoria',
          attributes: ['nome'],
        },
        {
          model: Modulo,
          as: 'modulo',
          attributes: ['nome'],
        },
        {
          model: Tipo,
          as: 'tipo',
          attributes: ['nome'],
        },
        // {
        //   model: Usuario,
        //   as: 'admin',
        //   attributes: ['nome'],
        // },
      ],
    });

    return res.json(exercicios);
  }

  async update(req, res) {
    if (!req.usuarioAdmin) {
      return res.status(401).json({ erro: 'Operação não autorizada!' });
    }

    const exercicio = await Exercicio.findByPk(req.params.id);

    if (!exercicio) {
      return res.status(400).json({ erro: 'Exercício não existe!' });
    }

    await exercicio.update(req.body);

    return res.json(exercicio);
  }

  async delete(req, res) {
    if (!req.usuarioAdmin) {
      return res.status(401).json({ erro: 'Operação não autorizada!' });
    }

    const exercicioExiste = await Exercicio.findByPk(req.params.id);

    if (!exercicioExiste) {
      return res.status(400).json({ erro: 'Exercício não existe!' });
    }

    await Exercicio.destroy({ where: { id: exercicioExiste.id } });

    return res.json();
  }
}

export default new ExercicioController();
