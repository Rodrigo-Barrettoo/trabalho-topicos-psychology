import jwt from 'jsonwebtoken';

import Psychologist from '../models/Psychologist';

import authConfig from '../../config/auth';

class SessionControllerPsychologist {
  async store(request, response) {
    const { psy_email, psy_password } = request.body;

    const psychologist = await Psychologist.findOne({where: { psy_email }})

    if (!psychologist) {
      return response.status(401).json({error: 'Não existe um psicólogo com este e-mail!'});
    }

    if (!(await psychologist.checkPasswordPsychologist(psy_password))) {
      return response.status(401).json({error: 'Senha não bate!' });
    }

    const { id, psy_name } = psychologist;

    return response.json({
      psychologist : {
        id,
        psy_name,
        psy_email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      })
    });
  }
}

export default new SessionControllerPsychologist();
