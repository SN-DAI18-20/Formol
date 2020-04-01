'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.addColumn('Polls_versions', 'view_url', {
                type: Sequelize.TEXT,
            });
            await queryInterface.addColumn('Polls_versions', 'download_url', {
                type: Sequelize.TEXT,
            });

            Promise.resolve();
        } catch (err) {
            Promise.reject(err);
        }
    },

    down: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.removeColumn('Polls_versions', 'view_url');
            await queryInterface.removeColumn('Polls_versions', 'download_url');

            Promise.resolve();
        } catch (err) {
            Promise.reject(err);
        }
    },
};
