import { Router } from "express";
import Call from "../app/models/Call";

const routes = new Router();

routes.get("/:id", async (request, response) => {
  try {
    var id = request.params.id;
    const call = await Call.findOne({}).where({ id: id });
    return response.json(call);
  } catch (error) {
    console.log(error);
  }
});

routes.post("/", async (request, response) => {
  try {
    const { patient_id, psychologist_id } = request.body;

    const call = await Call.create({
      patient_id: patient_id,
      psychologist_id: psychologist_id,
      cal_start: Date.now(),
      cal_end: Date.now(),
    });

    return response.json(call);
  } catch (error) {
    console.log(error);
  }
});

export default routes;
