import Sequelize, { Model } from 'sequelize';

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
    return this;
  }
}

export default Patient;
