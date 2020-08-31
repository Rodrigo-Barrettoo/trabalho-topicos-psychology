import Patient from '../models/Patient';

class PatientController {
  async index(request, response) {
    const patient = await Patient.findAll();

    return response.json(patient);
  }

  async store(request, response) {
    const { pat_email } = request.body;

    const patientExists = await Patient.findOne({where: { pat_email }});

    if (patientExists) {
      return response.send('Já existe um paciente com este e-mail!');
    }

    const { id, pat_name } = await Patient.create(request.body);

    return response.json({ id, pat_name, pat_email });
  }
}

export default new PatientController();
