import jwt from 'jsonwebtoken';

import Patient from '../models/Patient';

import authConfig from '../../config/auth';

class SessionControllerPatient {
  async store(request, response) {
    const { pat_email, pat_password } = request.body;

    const patient = await Patient.findOne({where: { pat_email }})

    if (!patient) {
      return response.status(401).json({error: 'E-mail e/ou senha incorreto! Verifique seus dados'});
    }

    if (!(await patient.checkPasswordPatient(pat_password))) {
      return response.status(401).json({error: 'E-mail e/ou senha incorreto! Verifique seus dados' });
    }

    const { id, pat_name } = patient;

    return response.json({
      patient : {
        id,
        pat_name,
        pat_email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      })

    });
  }
}

export default new SessionControllerPatient();
