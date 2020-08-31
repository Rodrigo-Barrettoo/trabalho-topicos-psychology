import Sequelize, { Model } from 'sequelize';
import crypto from 'crypto';

class Patient extends Model {
  static init(sequelize) {
    super.init(
      {
        pat_name: Sequelize.STRING,
        pat_password: Sequelize.VIRTUAL,
        pat_password_hash: Sequelize.STRING,
        pat_email: Sequelize.STRING,
        pat_ativo: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async (patient) => {
      if (patient.pat_password) {
        patient.pat_password_hash = await crypto.createHash('sha256').update(patient.pat_password).digest('hex');
      }
    });

    return this;
  }
}

export default Patient;
