import moment from "moment";
import Psychologist from "../models/Psychologist";

class PsychologistController {
  async index(request, response) {
    try {
      var id = request.params.id;
      const psychologist = await Psychologist.findAll({ psy_ativo: true });
      return response.json(psychologist);
    } catch (error) {
      console.log(error);
      return response.json(error.message);
    }
  }

  async show(request, response) {
    try {
      var id = request.params.id;
      const psychologist = await Psychologist.findOne({}).where({ id: id });
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
        where: { pat_email: email },
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
        name,
        email,
        password,
        cpf,
        crp,
        data_nasc,
        city,
        availability,
      } = request.body;

      const psychologist = await Psychologist.create({
        psy_name: name,
        psy_email: email,
        psy_password_hash: password,
        psy_cpf: cpf,
        psy_crp: crp,
        psy_data_nasc: data_nasc,
        psy_city: city,
        psy_availability: [availability],
      });

      if (psychologist) {
        return response.json(Psychologist);
      }
    } catch (error) {
      console.log(error);
      return response.json(error.message);
    }
  }

  async delete(request, response) {
    try {
      var id = request.params.id;

      const psychologist = await Psychologist.findByPk(id, {
        attributes: { exclude: ["password", "pat_password_hash"] },
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
