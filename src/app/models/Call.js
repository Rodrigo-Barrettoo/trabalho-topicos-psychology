import Sequelize, { Model } from 'sequelize';

class Call extends Model {
  static init(sequelize) {
    super.init(
      {
        patient_id: Sequelize.INTEGER,
        psychologist_id: Sequelize.INTEGER,
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

  static associate(models) {
    this.belongsTo(models.Patient, {
      foreignKey: 'patient_id',
      as: 'fk_patients',
    });
    this.belongsTo(models.Psychologist, {
      foreignKey: 'psychologist_id',
      as: 'fk_psychologists',
    });
  }
}

export default Call;
