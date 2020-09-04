import Patient from "../models/Patient";

class PatientController {
  async show(request, response) {
    try {
      var id = request.params.id;
      const patient = await Patient.findByPk(id, {
        attributes: { exclude: ["password", "pat_password_hash"] },
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
      return response.json(error);
    }
  }

  async update(request, response) {
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
      return response.json(error);
    }
  }

  async delete(request, response) {
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
      return response.json(error);
    }
  }
}

export default new PatientController();
