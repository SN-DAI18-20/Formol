'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Polls_questions', {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
            },
            poll_version: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'Polls_versions',
                    },
                    key: 'id',
                },
            },
            question: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            type: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            parameters: {
                type: Sequelize.JSON,
            },
            required: {
                type: Sequelize.BOOLEAN,
            },
            order: {
                type: Sequelize.INTEGER,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Polls_questions');
    },
};
