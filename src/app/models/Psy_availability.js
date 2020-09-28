import Sequelize, { Model } from "sequelize";

class Psy_availability extends Model {
  static init(sequelize) {
    super.init(
      {
        psychologist_id: Sequelize.INTEGER,
        week_day: Sequelize.INTEGER,
        from: Sequelize.INTEGER,
        to: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Psychologist, {
      foreignKey: "psychologist_id",
      as: "fk2_psychologists",
    });
  }
}

export default Psy_availability;
