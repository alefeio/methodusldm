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
      tipo_id: Yup.number().required(),
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
      tipo_id,
      admin_id,
    } = req.body;

    const isAdmin = await Usuario.findOne({
      where: { id: admin_id, admin: true },
    });

    if (!isAdmin) {
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
    const { page = 1, categoria } = req.query;

    const exercicios = await Exercicio.findAll({
      order: ['created_at'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'questao', 'subquestao', 'resposta'],
      include: [
        {
          model: Categoria,
          as: 'categoria',
          attributes: ['id', 'nome'],
        },
        {
          model: Modulo,
          as: 'modulo',
          attributes: ['id', 'nome'],
        },
        {
          model: Tipo,
          as: 'tipo',
          attributes: ['id', 'nome'],
        },
        {
          model: Usuario,
          as: 'admin',
          attributes: ['id', 'nome'],
        },
      ],
    });

    return res.json(exercicios);
  }

  async delete(req, res) {
    if (!req.usuarioAdmin) {
      return res.status(401).json({ erro: 'Operação não autorizada!' });
    }

    const exercicioExiste = await Exercicio.findOne({
      where: { id: req.params.id },
    });

    if (exercicioExiste) {
      await Exercicio.destroy({ where: { id: exercicioExiste.id } });

      return res.json({ msg: 'Operação realizada com sucesso!' });
    }

    return res.json();
  }
}

export default new ExercicioController();
