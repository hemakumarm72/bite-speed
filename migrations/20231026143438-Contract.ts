'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('member', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        unique: true,
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      // meme: {
      //   allowNull: true,
      //   type: Sequelize.STRING,
      // },
      password: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      role: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: 'General',
      },
      refreshToken: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
    // await queryInterface.changeColumn('Person', 'foo', {
    //   type: Sequelize.FLOAT,
    //   defaultValue: 3.14,
    //   allowNull: false,
    // });
    // await queryInterface.addColumn('member', 'meme', {
    //   allowNull: true,
    //   type: Sequelize.STRING,
    // });
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.dropTable('member');
    await queryInterface.removeColumn('member', 'meme');
    // return Promise.all([
    //   queryInterface.removeColumn('Users', 'linkedin'),
    //   queryInterface.removeColumn('Users', 'twitter'),
    //   queryInterface.removeColumn('Users', 'bio'),
    // ]);
  },
};
