'use strict';

const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
    const PollsAnswers = sequelize.define(
        'PollsAnswers',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            question: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: sequelize.models.PollsQuestions,
                    key: 'id',
                },
            },
            client_addr: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            user_agent: DataTypes.TEXT,
            answer: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            tableName: 'Polls_answers',
            underscored: true,
            timestamps: true,
            updatedAt: false,
        }
    );
    PollsAnswers.associate = function(models) {
        // associations can be defined here
    };
    return PollsAnswers;
};
