import { Router } from 'express';

import PatientController from './app/controllers/PatientController';
import SessionControllerPatient from './app/controllers/SessionControllerPatient';
import SessionControllerPsychologist from './app/controllers/SessionControllerPsychologist';

import Psychologist from './app/models/Psychologist';

const routes = new Router();

routes.post('/sessionpatient', SessionControllerPatient.store);
routes.post('/sessionpsychologist', SessionControllerPsychologist.store);
routes.post('/patients', PatientController.store);
routes.get('/patients', PatientController.index);

routes.get('/', async (request, response) => {
  await Psychologist.create({
    psy_name: 'rodrigokakjs',
    psy_email: 'rodrigo@123teste.com',
    psy_password: '123456',
    psy_cpf: '097998734',
    psy_crp: '345345345',
    psy_data_nasc: '2020-08-31T13',
    psy_city: '12wefrsdfs',
    psy_availability: ['2020-08-29T20:50:51.853Z'],
  })
})

export default routes;
