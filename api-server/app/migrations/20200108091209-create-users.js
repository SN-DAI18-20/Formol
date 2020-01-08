'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
            },
            username: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            email: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            password: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            is_activated: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            is_suspended: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            suspend_reason: {
                type: Sequelize.TEXT,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deleted_at: {
                type: Sequelize.DATE,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    },
};
