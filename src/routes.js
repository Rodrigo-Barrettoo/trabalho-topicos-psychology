import { Router } from 'express';

import PatientController from './app/controllers/PatientController';
import SessionControllerPatient from './app/controllers/SessionControllerPatient';
import SessionControllerPsychologist from './app/controllers/SessionControllerPsychologist';

import Psychologist from './app/models/Psychologist';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessionpatient', SessionControllerPatient.store);
routes.post('/sessionpsychologist', SessionControllerPsychologist.store);

routes.use(authMiddleware);

routes.post('/patients', PatientController.store);
routes.get('/patients', PatientController.index);

export default routes;
