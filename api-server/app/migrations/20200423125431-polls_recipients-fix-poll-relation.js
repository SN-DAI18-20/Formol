'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.removeConstraint(
                'Polls_recipients',
                'Polls_recipients_poll_fkey'
            );

            await queryInterface.changeColumn('Polls_recipients', 'poll', {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'Polls',
                    },
                    key: 'id',
                },
            });
        } catch (err) {
            return Promise.reject();
        }
    },
    down: async (queryInterface, Sequelize) => {
        // No down script, Here's is a fix that fix an unintended error
        // (quick reseale of the database)
        Promise.resolve();
    },
};
