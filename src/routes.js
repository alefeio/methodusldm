import { Router } from 'express';

import UsuarioController from './app/controllers/UsuarioController';
import SessionController from './app/controllers/SessionController';
import AlunoController from './app/controllers/AlunosController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/usuarios', UsuarioController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/usuarios', UsuarioController.update);

routes.get('/alunos', AlunoController.index);

export default routes;
