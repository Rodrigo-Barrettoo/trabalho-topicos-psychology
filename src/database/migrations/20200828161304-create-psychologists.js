module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('psychologists', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      psy_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      psy_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      psy_password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      psy_cpf: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      psy_crp: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      psy_data_nasc: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      psy_city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      psy_ativo: {
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
    return await queryInterface.dropTable('psychologists');
  }
};
