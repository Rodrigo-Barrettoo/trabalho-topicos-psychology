import Psychologist from "../models/Psychologist";
import Call from "../models/Call";
import Patient from "../models/Patient";
const { Op } = require("sequelize");

class PsychologistController {
  async show(request, response) {
    const id = request.auth_id;

    const psychologist = await Psychologist.findByPk(id, {
      attributes: { exclude: ["psy_password", "psy_password_hash"] },
    });

    if (!psychologist) {
      return response.status(401).json({ error: "Psicologo não existe" });
    }

    return response.json(psychologist);
  }

  async calls(request, response) {
    try {
      const id = request.auth_id;
      const call = await Call.findAll({
        where: { psychologist_id: id },
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

  async store(request, response) {
    const {
      psy_name,
      psy_email,
      psy_password,
      psy_cpf,
      psy_crp,
      psy_data_nasc,
      psy_city,
    } = request.body;

    const psychologistExists = await Psychologist.findOne({
      where: { psy_email },
    });

    if (psychologistExists) {
      return response.status(401).json({ error: "psicólogo já cadastrado" });
    }

    const { id } = await Psychologist.create({
      psy_name,
      psy_email,
      psy_password,
      psy_cpf,
      psy_crp,
      psy_data_nasc,
      psy_city,
    });

    return response.json({
      id,
      psy_name,
      psy_email,
      psy_cpf,
      psy_crp,
      psy_data_nasc,
      psy_city,
    });
  }

  async update(request, response) {
    const {
      psy_name,
      psy_email,
      psy_password,
      psy_cpf,
      psy_crp,
      psy_data_nasc,
      psy_city,
    } = request.body;

    const id = request.auth_id;

    const psychologist = await Psychologist.findByPk(id);

    if (!psychologist) {
      return response.status(401).json({ error: "Psicológo não existente" });
    }

    if (psy_email !== psychologist.psy_email) {
      const emailExists = await Psychologist.findOne({ where: { psy_email } });

      if (emailExists) {
        return response.status(401).json({ error: "E-mail já cadastrado!" });
      }
    }

    await psychologist.update({
      psy_name,
      psy_email,
      psy_password,
      psy_cpf,
      psy_crp,
      psy_data_nasc,
      psy_city,
    });

    return response.json({
      psy_name,
      psy_email,
      psy_cpf,
      psy_crp,
      psy_data_nasc,
      psy_city,
    });
  }

  async delete(request, response) {
    const id = request.auth_id;

    const psychologist = await Psychologist.findByPk(id);

    await psychologist.destroy();

    return response
      .status(201)
      .json({ success: "Psicológo excluido com sucesso!" });
  }
}

export default new PsychologistController();
