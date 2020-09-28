module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('psy_availabilities', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      psychologist_id: {
        type: Sequelize.INTEGER,
        references: { model: "psychologists", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: true,
      },
      week_day: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      from: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      to: {
        type: Sequelize.INTEGER,
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
    return await queryInterface.dropTable('psy_availabilities');
  }
};
