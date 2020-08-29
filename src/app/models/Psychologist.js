import Sequelize, { Model } from 'sequelize';
import { DATE } from 'sequelize';

class Psychologist extends Model {
  static init(sequelize) {
    super.init(
      {
        psy_name: Sequelize.STRING,
        psy_email: Sequelize.STRING,
        psy_password: Sequelize.VIRTUAL,
        psy_password_hash: Sequelize.STRING,
        psy_cpf: Sequelize.STRING,
        psy_crp: Sequelize.STRING,
        psy_data_nasc: Sequelize.DATEONLY,
        psy_city: Sequelize.STRING,
        psy_availability: Sequelize.ARRAY({type: Sequelize.DATE}),
        psy_ativo: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Psychologist;
