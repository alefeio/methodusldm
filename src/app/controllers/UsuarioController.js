import * as Yup from 'yup';
import Usuario from '../models/Usuario';

class UsuarioController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      cpf: Yup.string().required(),
      admin: Yup.boolean().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Falha na validação!' });
    }

    const { nome, email, cpf, admin } = req.body;

    const usuarioExiste = await Usuario.findOne({ where: { email } });

    if (usuarioExiste) {
      return res.status(400).json({ erro: 'Usuário já existe!' });
    }

    const password = cpf;

    const { id } = await Usuario.create({
      nome,
      email,
      cpf,
      password,
      admin,
    });

    return res.json({
      id,
      nome,
      email,
      cpf,
      admin,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Falha na validação!' });
    }

    const { email, oldPassword } = req.body;

    const usuario = await Usuario.findByPk(req.usuarioId);

    if (email && email !== usuario.email) {
      const usuarioExiste = await Usuario.findOne({ where: { email } });

      if (usuarioExiste) {
        return res.status(400).json({ erro: 'Usuário já existe!' });
      }
    }

    if (oldPassword && !(await usuario.checarPassword(oldPassword))) {
      return res.status(401).json({ erro: 'Senha não confere!' });
    }

    const { id, nome, cpf, admin } = await usuario.update(req.body);

    return res.json({
      id,
      nome,
      email,
      cpf,
      admin,
    });
  }

  // async delete(req, res) {
  //   if (!req.usuarioAdmin) {
  //     return res.status(401).json({ erro: 'Operação não autorizada!' });
  //   }

  //   const usuarioExiste = await Usuario.findOne({
  //     where: { id: req.params.id },
  //   });

  //   if (usuarioExiste) {
  //     await Usuario.destroy({ where: { id: usuarioExiste.id } });

  //     return res.json({ msg: 'Operação realizada com sucesso!' });
  //   }

  //   return res.json();
  // }

  async delete(req, res) {
    if (!req.usuarioAdmin) {
      return res.status(401).json({ erro: 'Operação não autorizada!' });
    }

    const usuarioExiste = await Usuario.findByPk(req.params.id);

    if (usuarioExiste) {
      
      await usuarioExiste.update({ ativo: false });

      return res.json({ msg: 'Operação realizada com sucesso!' });
    }

    return res.json();
  }
}

export default new UsuarioController();
