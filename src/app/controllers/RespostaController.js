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

    // if (req.usuarioAdmin) {
    //   return res.status(401).json({ erro: 'Operação não autorizada!' });
    // }

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

    console.log(`Exercício: ${exercicioExiste}`);

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

    const questao = exercicioExiste.questao;

    const categoria_id = exercicioExiste.categoria_id;

    const modulo_id = exercicioExiste.modulo_id;

    const tipo_id = exercicioExiste.tipo_id;

    const qtdEspecifica = (
      await Exercicio.findAll({
        where: { questao, categoria_id, modulo_id, tipo_id },
      })
    ).length;

    let respondidas = (await Resposta.findAll({ where: { prova_id } })).length;

    const novanota = 100 / qtd;

    const novanotaespecifica = 100 / qtdEspecifica;

    let acerto = false;

    if (resposta === exercicioExiste.resposta) {
      if (provaExiste.nota < 100) {
        provaExiste.nota = provaExiste.nota + novanota;

        if (provaExiste.nota > 100) provaExiste.nota = 100;
      }

      if (
        questao === 1 &&
        categoria_id === 1 &&
        modulo_id === 1 &&
        tipo_id === 1
      )
        provaExiste.monitor01 = provaExiste.monitor01 + novanotaespecifica;
      if (
        questao === 2 &&
        categoria_id === 1 &&
        modulo_id === 1 &&
        tipo_id === 1
      )
        provaExiste.monitor02 = provaExiste.monitor02 + novanotaespecifica;
      if (
        questao === 3 &&
        categoria_id === 1 &&
        modulo_id === 1 &&
        tipo_id === 1
      )
        provaExiste.monitor03 = provaExiste.monitor03 + novanotaespecifica;
      if (
        questao === 4 &&
        categoria_id === 1 &&
        modulo_id === 1 &&
        tipo_id === 1
      )
        provaExiste.monitor04 = provaExiste.monitor04 + novanotaespecifica;
      if (
        questao === 5 &&
        categoria_id === 1 &&
        modulo_id === 1 &&
        tipo_id === 1
      )
        provaExiste.monitor05 = provaExiste.monitor05 + novanotaespecifica;
      if (
        questao === 6 &&
        categoria_id === 1 &&
        modulo_id === 1 &&
        tipo_id === 1
      )
        provaExiste.monitor06 = provaExiste.monitor06 + novanotaespecifica;
      if (
        questao === 7 &&
        categoria_id === 1 &&
        modulo_id === 1 &&
        tipo_id === 1
      )
        provaExiste.monitor07 = provaExiste.monitor07 + novanotaespecifica;
      if (
        questao === 8 &&
        categoria_id === 1 &&
        modulo_id === 1 &&
        tipo_id === 1
      )
        provaExiste.monitor08 = provaExiste.monitor08 + novanotaespecifica;

      if (questao === 1 && categoria_id === 1 && modulo_id === 2)
        provaExiste.percepcao01 = provaExiste.percepcao01 + novanotaespecifica;
      if (questao === 2 && categoria_id === 1 && modulo_id === 2)
        provaExiste.percepcao02 = provaExiste.percepcao02 + novanotaespecifica;
      if (questao === 3 && categoria_id === 1 && modulo_id === 2)
        provaExiste.percepcao03 = provaExiste.percepcao03 + novanotaespecifica;

      await provaExiste.update({
        nota: provaExiste.nota,
        monitor01: provaExiste.monitor01,
        monitor02: provaExiste.monitor02,
        monitor03: provaExiste.monitor03,
        monitor04: provaExiste.monitor04,
        monitor05: provaExiste.monitor05,
        monitor06: provaExiste.monitor06,
        monitor07: provaExiste.monitor07,
        monitor08: provaExiste.monitor08,
        percepcao01: provaExiste.percepcao01,
        percepcao02: provaExiste.percepcao02,
        percepcao03: provaExiste.percepcao03,
      });

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
          ],
        },
      ],
    });

    return res.json(respostas);
  }

  async detail(req, res) {
    const { prova_id, exercicio_id } = req.query;

    const respostas = await Resposta.findOne({
      where: { prova_id, exercicio_id },
    });

    return res.json(respostas);
  }

  async respostasProva(req, res) {
    const { prova_id } = req.query;

    const respostas = await Resposta.findAll({
      where: { prova_id },
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
