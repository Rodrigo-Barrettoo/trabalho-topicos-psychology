import { Router } from "express";
import CallController from "./app/controllers/CallController";
import PatientController from "./app/controllers/PatientController";
import PsychologistController from "./app/controllers/PsychologistController";

const routes = new Router();

routes.use("/sala/:sala", function (req, res) {
  var room = req.params.sala;
  return res.render("index", { title: "Sala " + room, rooms: room });
});

// Cadastro de rotas
// Cadastro de rotas
routes.get("/Psychologist/:id", PsychologistController.show);
routes.post("/Psychologist", PsychologistController.store);
routes.put("/Psychologist/:id", PsychologistController.update);
routes.get("/Psychologist", PsychologistController.index);
routes.delete("/Psychologist/:id", PsychologistController.delete);

routes.get("/Call/:id", CallController.show);
routes.post("/Call", CallController.store);

routes.get("/Patient/:id", PatientController.show);
routes.post("/Patient", PatientController.store);
routes.put("/Patient/:id", PatientController.update);
routes.delete("/Patient/:id", PatientController.delete);

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
