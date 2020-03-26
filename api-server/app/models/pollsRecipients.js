'use strict';

const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
    const PollsRecipients = sequelize.define(
        'PollsRecipients',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: uuid(),
            },
            poll: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: sequelize.models.Polls,
                    key: 'id',
                },
            },
            recipient: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            tableName: 'Polls_recipients',
            underscored: true,
            timestamps: true,
            updatedAt: false,
        }
    );
    PollsRecipients.associate = function(models) {
        // associations can be defined here
    };
    return PollsRecipients;
};
