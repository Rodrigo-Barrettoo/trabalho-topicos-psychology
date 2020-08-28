module.exports = {
  up: async (queryInterface, Sequelize) => {
    return  queryInterface.createTable('calls', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      patient_id: {
        type: Sequelize.INTEGER,
        references: { model: 'patients', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      psychologist_id: {
        type: Sequelize.INTEGER,
        references: { model: 'psychologists', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      cal_start: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      cal_end: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: true,
      },
      cal_note: {
        type: Sequelize.STRING(2000),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    return await queryInterface.dropTable('calls');
  }
};
