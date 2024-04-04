"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("contact", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      phoneNumber: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
        defaultValue: null,
      },
      linkedId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      linkPrecedence: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "primary",
        validate: {
          isIn: [["primary", "secondary"]], // Validate that the value is one of the enum values
        },
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("contact");
  },
};
