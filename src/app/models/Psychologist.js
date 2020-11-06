import Sequelize, { Model } from "sequelize";
import bcrypt from "bcrypt";

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
        psy_ativo: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    this.addHook("beforeSave", async (psychologist) => {
      if (psychologist.psy_password) {
        psychologist.psy_password_hash = await bcrypt.hash(
          psychologist.psy_password,
          8
        );
      }
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.Psy_availability, {
      foreignKey: "psychologist_id",
      as: "fk_psy_availability",
    });

    this.hasMany(models.Call, {
      foreignKey: "psychologist_id",
      as: "fk_calls",
    });
  }

  checkPasswordPsychologist(password) {
    return bcrypt.compare(password, this.psy_password_hash);
  }
}

export default Psychologist;
