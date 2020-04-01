import Exercicio from '../models/Exercicio';
import Usuario from '../models/Usuario';
import Categoria from '../models/Categoria';
import Modulo from '../models/Modulo';
import Tipo from '../models/Tipo';

class ExercicioporcategoriaController {
  async index(req, res) {
    const { page = 1, categoria } = req.query;

    const exercicios = await Exercicio.findAll({
      where: { categoria_id: categoria },
      order: ['created_at'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'questao', 'subquestao', 'resposta'],
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
        {
          model: Usuario,
          as: 'admin',
          attributes: ['nome'],
        },
      ],
    });

    return res.json(exercicios);
  }
}

export default new ExercicioporcategoriaController();
