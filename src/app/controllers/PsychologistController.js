import moment from "moment";
import Psychologist from "../models/Psychologist";

class PsychologistController {
  async index(request, response) {
    try {
      const { id } = request.params;
      const psychologist = await Psychologist.findAll({ psy_ativo: true });

      return response.json(psychologist);
    } catch (error) {
      console.log(error);
      return response.json(error.message);
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      const psychologist = await Psychologist.findOne({ where: { id: id } });

      if (!psychologist) {
        return response.status(404).json({ error: "Psicologo não existe" });
      }

      return response.json(psychologist);
    } catch (error) {
      console.log(error);
      return response.error(error.message);
    }
  }

  async store(request, response) {
    try {
      const {
        name,
        email,
        password,
        cpf,
        crp,
        data_nasc,
        city,
        availability,
      } = request.body;

      const psychologistExists = await Psychologist.findOne({
        where: { psy_email: email },
      });

      if (psychologistExists) {
        return response.status(401).json({ error: "Paciente já cadastrado" });
      }

      const psychologist = await Psychologist.create({
        psy_name: name,
        psy_email: email,
        psy_password_hash: password,
        psy_cpf: cpf,
        psy_crp: crp,
        psy_data_nasc: moment(data_nasc).toISOString(),
        psy_city: city,
        psy_availability: [moment(availability).toISOString()],
      });

      return response.json(psychologist);
    } catch (error) {
      console.log(error);
      return response.json(error.message);
    }
  }

  async update(request, response) {
    try {
      const {
        psy_name,
        psy_email,
        psy_password,
        psy_cpf,
        psy_crp,
        psy_data_nasc,
        psy_city,
        psy_availability,
      } = request.body;

      const { id } = request.params;

      const psychologist = await Psychologist.findByPk(id, {
        attributes: { exclude: ["password", "pat_password_hash"] },
      });

      if (!psychologist) {
        return response.status(401).json({ error: "Paciente não existente" });
      }

      psychologist.psy_name = psy_name;
      psychologist.psy_email = psy_email;
      psychologist.psy_password = psy_password;
      psychologist.psy_cpf = psy_cpf;
      psychologist.psy_crp = psy_crp;
      psychologist.psy_data_nasc = psy_data_nasc;
      psychologist.psy_city = psy_city;
      psychologist.psy_availability = [psy_availability];

      await psychologist.save();

      return response.json(psychologist);
    } catch (error) {
      console.log(error);
      return response.json(error.message);
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      const psychologist = await Psychologist.findByPk(id, {
        attributes: { exclude: ["pat_password", "pat_password_hash"] },
      });

      if (psychologist) {
        psychologist.psy_ativo = false;

        psychologist.save();

        return response.json(psychologist);
      } else {
        return response.status(401).json({ error: "Psicologo invalido" });
      }
    } catch (error) {
      return response.json(error.message);
    }
  }
}

export default new PsychologistController();
