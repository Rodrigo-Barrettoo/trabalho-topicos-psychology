module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('attendance_history', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      call_id: {
        type: Sequelize.INTEGER,
        references: { model: 'calls', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      ath_user: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      ath_text: {
        type: Sequelize.STRING,
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
    return await queryInterface.dropTable('attendance_history');
  }
};

