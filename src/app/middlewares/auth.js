import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido!' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.usuarioId = decoded.id;
    req.usuarioAdmin = decoded.admin;

    return next();
  } catch (error) {
    return res.status(401).json({ erro: 'Token inválido!' });
  }
};
