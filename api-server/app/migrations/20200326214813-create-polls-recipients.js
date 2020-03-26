'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Polls_recipients', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            poll: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'Polls_versions',
                    },
                    key: 'id',
                },
            },
            recipient: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Polls_recipients');
    },
};
