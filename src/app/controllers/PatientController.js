import Patient from "../models/Patient";
import Call from "../models/Call";
import Psychologist from "../models/Psychologist";
const { Op } = require("sequelize");

class PatientController {
  async show(request, response) {
    const id = request.auth_id;

    const patient = await Patient.findByPk(id, {
      attributes: { exclude: ["pat_password", "pat_password_hash"] },
    });

    if (!patient) {
      return response.status(401).json({ error: "Usuário não encontrado!" });
    }

    return response.json(patient);
  }

  async scheduledCalls(request, response) {
    try {
      const id = request.auth_id;
      const call = await Call.findAll({
        where: {
          [Op.and]: [
            { patient_id: id },
            { cal_start: { [Op.gt]: Date.now() } },
          ],
        },
        order: [["cal_start", "DESC"]],
        limit: 10,
        include: [
          {
            model: Patient,
            as: "fk_patients",
            attributes: { exclude: ["pat_password_hash"] },
          },
          {
            model: Psychologist,
            as: "fk_psychologists",
            attributes: { exclude: ["psy_password_hash"] },
          },
        ],
      });

      return response.json(call);
    } catch (error) {
      console.log(error);
    }
  }

  async calls(request, response) {
    try {
      const id = request.auth_id;
      const call = await Call.findAll({
        where: { patient_id: id },
        attributes: { exclude: ["cal_note"] },
        order: [["cal_start", "DESC"]],
        include: [
          {
            model: Patient,
            as: "fk_patients",
            attributes: { exclude: ["pat_password_hash"] },
          },
          {
            model: Psychologist,
            as: "fk_psychologists",
            attributes: { exclude: ["psy_password_hash"] },
          },
        ],
      });

      return response.json(call);
    } catch (error) {
      console.log(error);
    }
  }

  async store(request, response) {
    const { pat_name, pat_password, pat_email } = request.body;

    const patientExists = await Patient.findOne({
      where: { pat_email },
    });

    if (patientExists) {
      return response.status(401).json({ error: "Usuário já cadastrado" });
    }

    const { id } = await Patient.create({
      pat_name,
      pat_password,
      pat_email,
    });

    return response.json({ id, pat_name, pat_email });
  }

  async update(request, response) {
    const { pat_password, pat_email, pat_name } = request.body;
    const id = request.auth_id;

    const patient = await Patient.findByPk(id);

    if (!patient) {
      return response.status(401).json({ error: "Usuário não encontrado!" });
    }

    if (pat_email !== patient.pat_email) {
      const emailExists = await Patient.findOne({ where: { pat_email } });

      if (emailExists) {
        return response.status(401).json({ error: "E-mail já cadastrado!" });
      }
    }

    await patient.update({ pat_email, pat_password, pat_name });

    return response.json({ pat_email, pat_name });
  }

  async delete(request, response) {
    const id = request.auth_id;

    const patient = await Patient.findByPk(id);

    await patient.destroy();

    return response
      .status(201)
      .json({ success: "Usuário excluido com sucesso!" });
  }
}

export default new PatientController();
