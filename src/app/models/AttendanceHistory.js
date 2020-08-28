import Sequelize, { Model } from 'sequelize';

class Call extends Model {
  static init(sequelize) {
    super.init(
      {
        call_id: Sequelize.INTEGER,
        ath_user: Sequelize.BOOLEAN,
        ath_text: Sequelize.VIRTUAL,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Call, {
      foreignKey: 'call_id',
      as: 'fk_calls',
    });

  }
}

export default Call;
