'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(
            'Polls_versions',
            {
                id: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    primaryKey: true,
                },
                name: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                poll: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    references: {
                        model: {
                            tableName: 'Polls',
                        },
                        key: 'id',
                    },
                },
                active: {
                  type: Sequelize.BOOLEAN,
                  allowNull: false,
                  defaultValue: false,
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                updated_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                deleted_at: {
                    type: Sequelize.DATE,
                },
            },
            {
                uniqueKeys: {
                    active_unique: {
                        fields: ['poll', 'active'],
                    },
                },
            }
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Polls_versions');
    },
};
