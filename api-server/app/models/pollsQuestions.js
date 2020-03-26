'use strict';

const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
    const PollsQuestions = sequelize.define(
        'PollsQuestions',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: uuid(),
            },
            poll_version: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: sequelize.models.PollsVersions,
                    key: 'id',
                },
            },
            question: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            type: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            parameters: DataTypes.JSON,
            required: DataTypes.BOOLEAN,
            order: DataTypes.INTEGER,
        },
        {
            tableName: 'Polls_questions',
            underscored: true,
            timestamps: true,
            updatedAt: false,
        }
    );
    PollsQuestions.associate = function(models) {
        // associations can be defined here
    };
    return PollsQuestions;
};
