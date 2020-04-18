import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import UserLocationController from './app/controllers/UserLocationController';
import SearchController from './app/controllers/SearchController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/user-location', UserLocationController.index);
routes.post('/user-location', UserLocationController.store);

routes.get('/search', SearchController.index);

export default routes;
