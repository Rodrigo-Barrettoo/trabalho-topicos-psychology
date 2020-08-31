import { Router } from "express";
import Patient from "./routes/Patient";
import Call from "./routes/Call";

const routes = new Router();

routes.use("/Call", Call);
routes.use("/Patient", Patient);
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
