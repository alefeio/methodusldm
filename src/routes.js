import { Router } from 'express';

import UsuarioController from './app/controllers/UsuarioController';
import SessionController from './app/controllers/SessionController';
import AlunoController from './app/controllers/AlunoController';
import CategoriaController from './app/controllers/CategoriaController';
import ModuloController from './app/controllers/ModuloController';
import TipoController from './app/controllers/TipoController';
import AdminController from './app/controllers/AdminController';
import ExercicioController from './app/controllers/ExercicioController';
import ExerciciosporcategoriaController from './app/controllers/ExercicioporcategoriaController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/usuarios', UsuarioController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/usuarios', UsuarioController.update);
routes.get('/admins', AdminController.index);
routes.get('/alunos', AlunoController.index);

routes.get('/categorias', CategoriaController.index);
routes.post('/categorias', CategoriaController.store);
routes.put('/categorias/:id', CategoriaController.update);

routes.get('/modulos', ModuloController.index);
routes.post('/modulos', ModuloController.store);
routes.put('/modulos/:id', ModuloController.update);

routes.get('/tipos', TipoController.index);
routes.post('/tipos', TipoController.store);
routes.put('/tipos/:id', TipoController.update);

routes.get('/exercicios', ExercicioController.index);
routes.post('/exercicios', ExercicioController.store);
routes.put('/exercicios/:id', ExercicioController.update);

routes.get('/exerciciosporcategoria', ExerciciosporcategoriaController.index);

export default routes;
