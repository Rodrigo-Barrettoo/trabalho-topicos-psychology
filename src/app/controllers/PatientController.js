import Patient from "../models/Patient";

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
      const emailExists = await Patient.findOne({ where: { pat_email }});

      if (emailExists) {
        return response.status(401).json({ error: "E-mail já cadastrado!"})
      }
    }

    await patient.update({ pat_email, pat_password, pat_name });

    return response.json({ pat_email, pat_name });
  }

  async delete(request, response) {
    const id = request.auth_id;

    const patient = await Patient.findByPk(id);

    await patient.destroy();

    return response.status(201).json({ success: "Usuário excluido com sucesso!" });
  }
}

export default new PatientController();
