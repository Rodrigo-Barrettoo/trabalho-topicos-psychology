import { Router } from "express";
import CallController from "./app/controllers/CallController";
import PatientController from "./app/controllers/PatientController";
import PsychologistController from "./app/controllers/PsychologistController";
import SessionControllerPatient from "./app/controllers/SessionControllerPatient";
import SessionControllerPsychologist from "./app/controllers/SessionControllerPsychologist";
import Psy_availabilityController from "./app/controllers/Psy_availabilityController";

import autenticacaoMiddleware from "./app/middlewares/auth";

const routes = new Router();

routes.use("/sala/:sala", function (req, res) {
  var room = req.params.sala;
  var isPsicologo = req.query.psicologo;

  return res.render("index", {
    title: "Sala " + room,
    isPsicologo: isPsicologo != null,
    rooms: room,
  });
});

routes.post("/sessionpatient", SessionControllerPatient.store);
routes.post("/sessionpsychologist", SessionControllerPsychologist.store);

routes.post("/psychologist", PsychologistController.store);
routes.post("/patient", PatientController.store);

routes.post("/call", CallController.store);
routes.get("/call/:id/history", CallController.history);
routes.get("/call/:id", CallController.show);

routes.use(autenticacaoMiddleware);

routes.get("/patient", PatientController.show);
routes.put("/patient", PatientController.update);
routes.delete("/Patient", PatientController.delete);
routes.get("/patient/calls", PatientController.calls);
routes.get("/patient/scheduled-calls", PatientController.scheduledCalls);

routes.get("/psychologist", PsychologistController.show);
routes.put("/psychologist", PsychologistController.update);
routes.delete("/psychologist", PsychologistController.delete);
routes.get("/psychologist/calls", PsychologistController.calls);

routes.get("/psy-availability", Psy_availabilityController.show);
routes.post("/psy-availability", Psy_availabilityController.store);
routes.delete("/psy-availability/:id", Psy_availabilityController.delete);

routes.put("/call/:id", CallController.edit);
routes.post("/call/:id", CallController.close);

export default routes;
