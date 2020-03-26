'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Polls_answers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      id: {
        type: Sequelize.UUID
      },
      question: {
        type: Sequelize.UUID
      },
      client_addr: {
        type: Sequelize.TEXT
      },
      user_agent: {
        type: Sequelize.TEXT
      },
      answer: {
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Polls_answers');
  }
};