import Sequelize, { Model } from "sequelize";

class Call extends Model {
  static init(sequelize) {
    super.init(
      {
        patient_id: Sequelize.INTEGER,
        psychologist_id: Sequelize.INTEGER,
        cal_start: Sequelize.DATE,
        cal_end: Sequelize.DATE,
        cal_note: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Patient, {
      foreignKey: "patient_id",
      as: "fk_patients",
    });
    this.belongsTo(models.Psychologist, {
      foreignKey: "psychologist_id",
      as: "fk_psychologists",
    });
  }
}

export default Call;
