'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.changeColumn('Polls_versions', 'active', {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: null,
        });
    },

    down: async (queryInterface, Sequelize) => {},
};
