'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.removeColumn('Polls', 'location');
            await queryInterface.renameColumn('Polls', 'is_published', 'draft');
            await queryInterface.changeColumn('Polls', 'draft', {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            });

            Promise.resolve();
        } catch (err) {
            Promise.reject(err);
        }
    },

    down: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.addColumn('Polls', 'location', {
                type: Sequelize.TEXT,
            });
            await queryInterface.renameColumn('Polls', 'draft', 'is_published');
            await queryInterface.changeColumn('Polls', 'is_published', {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            });

            Promise.resolve();
        } catch (err) {
            Promise.reject(err);
        }
    },
};
