import * as Yup from 'yup';
import Exercicio from '../models/Exercicio';
import Prova from '../models/Prova';
import Usuario from '../models/Usuario';
import Resposta from '../models/Resposta';
import Categoria from '../models/Categoria';
import Modulo from '../models/Modulo';
import Tipo from '../models/Tipo';

class RespostaController {
  async store(req, res) {
    const schema = Yup.object().shape({
      resposta: Yup.number().required(),
      prova_id: Yup.number().required(),
      exercicio_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Falha na validação!' });
    }

    if (req.usuarioAdmin) {
      return res.status(401).json({ erro: 'Operação não autorizada!' });
    }

    const { resposta, prova_id, exercicio_id } = req.body;

    const provaExiste = await Prova.findByPk(prova_id);

    if (!provaExiste) {
      return res.status(400).json({ erro: 'A prova não existe!' });
    }

    if (req.usuarioId !== provaExiste.usuario_id) {
      return res.status(401).json({ erro: 'Operação não autorizada!' });
    }

    if (provaExiste.finalizada) {
      return res.status(400).json({ erro: 'A prova já foi finalizada!' });
    }

    const exercicioExiste = await Exercicio.findByPk(exercicio_id);

    if (!exercicioExiste) {
      return res.status(400).json({ erro: 'Exercício não encontrado!' });
    }

    const respostaExiste = await Resposta.findOne({
      where: { prova_id: prova_id, exercicio_id: exercicio_id },
    });

    if (respostaExiste) {
      return res.status(400).json({ erro: 'A questão já foi respondida!' });
    }

    await Resposta.create({
      resposta,
      prova_id,
      exercicio_id,
    });

    if (provaExiste.nota >= 100) {
      return res.json({
        erro: 'Você atingiu a nota máxima. Finalize a prova!',
      });
    }

    const qtd = (await Exercicio.findAll()).length;

    let respondidas = (await Resposta.findAll({ where: { prova_id } })).length;

    const novanota = 100 / qtd;

    let acerto = false;

    if (resposta === exercicioExiste.resposta) {
      if (provaExiste.nota < 100) {
        provaExiste.nota = provaExiste.nota + novanota;
        if (provaExiste.nota > 100) provaExiste.nota = 100;
      }

      await provaExiste.update({ nota: provaExiste.nota });

      acerto = true;
    }

    if (qtd === respondidas) {
      await provaExiste.update({ finalizada: true });
    }

    const objResposta = {
      acertoResposta: acerto,
      provaNota: provaExiste.nota,
      provaFinalizada: provaExiste.finalizada,
    };

    return res.json(objResposta);
  }

  async index(req, res) {
    const { page } = req.query;

    const respostas = await Resposta.findAll({
      order: ['id'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'resposta'],
      include: [
        {
          model: Prova,
          as: 'prova',
          attributes: ['id', 'nota', 'finalizada'],
          include: [
            {
              model: Usuario,
              as: 'usuario',
              attributes: ['nome'],
            },
          ],
        },
        {
          model: Exercicio,
          as: 'exercicio',
          attributes: ['questao', 'subquestao', 'resposta'],
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
          ],
        },
      ],
    });

    return res.json(respostas);
  }

  async update(req, res) {
    const resp = await Resposta.findByPk(req.params.id);

    if (!resp) {
      return res.status(400).json({ erro: 'Resposta não existe!' });
    }

    const exercicio = await Exercicio.findByPk(resp.exercicio_id);

    if (!exercicio) {
      return res.status(400).json({ erro: 'Exercício não existe!' });
    }

    await resp.update(req.body);

    return res.json(resp);
  }
}

export default new RespostaController();
