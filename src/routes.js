import { Router } from "express";
import CallController from "./app/controllers/CallController";
import PatientController from "./app/controllers/PatientController";
import PsychologistController from "./app/controllers/PsychologistController";

const routes = new Router();

// Cadastro de rotas
routes.use("/Psychologist", PsychologistController);
routes.use("/Call", CallController);
routes.use("/Patient", PatientController);

/*
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
}); */

export default routes;
