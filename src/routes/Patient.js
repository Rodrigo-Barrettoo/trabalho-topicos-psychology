import { Router } from "express";
import Patient from "../app/models/Patient";

const routes = new Router();

routes.get("/:id", async (request, response) => {
  try {
    var id = request.params.id;
    const patient = await Patient.findByPk(id, {
      attributes: { exclude: ["password", "pat_password_hash"] },
    });
    return response.json(patient);
  } catch (error) {
    console.log(error);
    return error;
  }
});

routes.post("/", async (request, response) => {
  try {
    const { name, password, email } = request.body;

    const patient = await Patient.create(
      {
        pat_name: name,
        pat_password_hash: password,
        pat_email: email,
      },
      {
        attributes: { exclude: ["password", "pat_password_hash"] },
      }
    );

    return response.json(patient);
  } catch (error) {
    console.log(error);
  }
});

routes.put("/:id", async (request, response) => {
  try {
    const { password, email, ativo } = request.body;
    var id = request.params.id;

    const patient = await Patient.findByPk(id, {
      attributes: { exclude: ["password", "pat_password_hash"] },
    });

    patient.pat_password_hash = password;
    patient.pat_email = email;
    patient.save();

    return response.json(patient);
  } catch (error) {
    console.log(error);
  }
});

routes.delete("/:id", async (request, response) => {
  try {
    var id = request.params.id;

    const patient = await Patient.findByPk(id, {
      attributes: { exclude: ["password", "pat_password_hash"] },
    });
    patient.pat_ativo = false;
    patient.save();

    return response.json(patient);
  } catch (error) {
    console.log(error);
  }
});

export default routes;
