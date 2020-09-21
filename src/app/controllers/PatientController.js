import Patient from "../models/Patient";

class PatientController {
  async show(request, response) {
    try {
      const { id } = request.params;

      const patient = await Patient.findByPk(id, {
        attributes: { exclude: ["pat_password", "pat_password_hash"] },
      });

      return response.json(patient);
    } catch (error) {
      console.log(error);
      return response.json(error);
    }
  }

  async store(request, response) {
    try {
      const { name, password, email } = request.body;

      const patientExists = await Patient.findOne({
        where: { pat_email: email },
      });

      if (patientExists) {
        return response.status(401).json({ error: "Usuário já cadastrado" });
      }

      await Patient.create({
        pat_name: name,
        pat_password: password,
        pat_email: email,
      });
      const patientCreated = await Patient.findOne({
        where: { pat_email: email },
        attributes: { exclude: ["pat_password_hash"] },
      });

      return response.json(patientCreated);
    } catch (error) {
      console.log(error);
      return response.json(error);
    }
  }

  async update(request, response) {
    try {
      const { pat_password, pat_email } = request.body;
      const { id } = request.params;

      const patient = await Patient.findByPk(id, {
        attributes: { exclude: ["pat_password", "pat_password_hash"] },
      });

      const emailExists = await Patient.findOne(
        { where: { pat_email: pat_email } },
        {
          attributes: { exclude: ["pat_password", "pat_password_hash"] },
        }
      );

      if (!patient) {
        return response.status(401).json({ error: "Usuário não cadastrado" });
      }

      if (emailExists) {
        return response.status(401).json({ error: "Email  já cadastrado" });
      }

      patient.pat_password = password;
      patient.pat_email = email;

      patient.save();

      return response.json(patient);
    } catch (error) {
      console.log(error);
      return response.json(error);
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      const patient = await Patient.findByPk(id, {
        attributes: { exclude: ["pat_password", "pat_password_hash"] },
      });
      patient.pat_ativo = false;
      patient.save();

      return response.json(patient);
    } catch (error) {
      console.log(error);
      return response.json(error);
    }
  }
}

export default new PatientController();
