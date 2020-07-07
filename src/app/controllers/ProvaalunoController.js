import Prova from '../models/Prova';
import Exercicio from '../models/Exercicio';

class ProvaalunoController {
  async store(req, res) {
    if (req.usuarioAdmin) {
      return res.status(401).json({ erro: 'Operação não autorizada!' });
    }

    const usuario_id = req.usuarioId;

    const ultimaProva = await Prova.findOne({
      where: { usuario_id: usuario_id, finalizada: false },
    });

    if (ultimaProva) {
      return res.json({
        erro: 'Finalize a última prova antes de iniciar a próxima.',
      });
    }

    const prova = await Prova.create({ usuario_id });

    return res.json(prova);
  }

  async index(req, res) {
    if (req.usuarioAdmin) {
      return res.status(401).json({ erro: 'Operação não autorizada!' });
    }

    const provas = await Prova.findAll({
      where: { usuario_id: req.usuarioId },
      attributes: ['id', 'nota', 'finalizada'],
    });

    return res.json(provas);
  }

  async update(req, res) {
    if (req.usuarioAdmin) {
      return res
        .status(401)
        .json({ erro: 'Operação não autorizada para admin!' });
    }

    const prova = await Prova.findByPk(req.params.id);

    if (!prova) {
      return res.status(400).json({ erro: 'A prova não existe!' });
    }

    if (prova.usuario_id !== req.usuarioId) {
      return res.json({ erro: 'Operação não autorizada!' });
    }

    if (prova.finalizada) {
      return res.status(400).json({ erro: 'A prova já está finalizada!' });
    }

    if (prova.nota >= 100) {
      return res.json({
        erro: 'Você atingiu a nota máxima. Finalize a prova!',
      });
    }

    const qtd = (await Exercicio.findAll()).length;
    const novanota = 100 / qtd;

    if (prova.nota < 100) {
      prova.nota = prova.nota + novanota;

      if (prova.nota > 100) prova.nota = 100;
    }

    await prova.update({
      nota: prova.nota,
    });

    return res.json({ prova });
  }

  async delete(req, res) {
    // if (req.usuarioAdmin) {
    //   return res
    //     .status(401)
    //     .json({ erro: 'Operação não autorizada para admin!' });
    // }

    const prova = await Prova.findByPk(req.params.id);

    if (!prova) {
      return res.status(400).json({ erro: 'A prova não existe!' });
    }

    if (prova.usuario_id !== req.usuarioId) {
      return res.json({ erro: 'Operação não autorizada!' });
    }

    if (prova.finalizada) {
      return res.status(400).json({ erro: 'A prova já está finalizada!' });
    }

    prova.finalizada = true;

    prova.save();

    return res.json(prova);
  }
}

export default new ProvaalunoController();
