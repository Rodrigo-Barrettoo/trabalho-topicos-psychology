import { Router } from 'express';
import Patient from './app/models/Patient'

const routes = new Router();

routes.get('/', async (request, response) => {
  try {
    const patient = await Patient.create({
      pat_name: "rodrigo",
      pat_password_hash: "123456",
      pat_email: "teset@email.com",
    })
    return response.json(patient);
  } catch (error) {
    console.log(error);
  }
});

export default routes;
