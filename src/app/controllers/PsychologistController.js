import Psychologist from "../models/Psychologist";

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

  async store(request, response) {
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

    const psychologistExists = await Psychologist.findOne({
      where: { psy_email },
    });

    if (psychologistExists) {
      return response.status(401).json({ error: "psicólogo já cadastrado" });
    }
    console.log(psy_availability);


    const { id } = await Psychologist.create({
      psy_name,
      psy_email,
      psy_password,
      psy_cpf,
      psy_crp,
      psy_data_nasc,
      psy_city,
      psy_availability
    });


    return response.json({
      id,
      psy_name,
      psy_email,
      psy_cpf,
      psy_crp,
      psy_data_nasc,
      psy_city,
      psy_availability
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
      psy_availability,
    } = request.body;

    const id = request.auth_id;

    const psychologist = await Psychologist.findByPk(id);

    if (!psychologist) {
      return response.status(401).json({ error: "Psicológo não existente" });
    }

    if (psy_email !== psychologist.psy_email) {
      const emailExists = await Psychologist.findOne({ where: { psy_email }});

      if (emailExists) {
        return response.status(401).json({ error: "E-mail já cadastrado!"})
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
      psy_availability,
    });

    return response.json({
      psy_name,
      psy_email,
      psy_cpf,
      psy_crp,
      psy_data_nasc,
      psy_city,
      psy_availability,
    });
  }

  async delete(request, response) {
    const id = request.auth_id;

    const psychologist = await Psychologist.findByPk(id);

    await psychologist.destroy();

    return response.status(201).json({ success: "Psicológo excluido com sucesso!" });
  }
}

export default new PsychologistController();
