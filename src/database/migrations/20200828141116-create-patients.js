module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('patients', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      pat_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pat_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      pat_password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pat_ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
    return await queryInterface.dropTable('patients');
  }
};
