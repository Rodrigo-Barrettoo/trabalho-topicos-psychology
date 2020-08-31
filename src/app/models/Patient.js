import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';

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
        patient.pat_password_hash = await bcrypt.hash(patient.pat_password, 8);
      }
    });

    return this;
  }

  checkPasswordPatient(password) {
    return bcrypt.compare(password, this.pat_password_hash);
  }
}

export default Patient;
