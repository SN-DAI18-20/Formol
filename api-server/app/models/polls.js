'use strict';

const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
    const Polls = sequelize.define(
        'Polls',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: uuid(),
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            description: DataTypes.TEXT,
            location: DataTypes.TEXT,
            is_published: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            published_at: DataTypes.DATE,
            depublished_at: DataTypes.DATE,
        },
        {
            tableName: 'Polls',
            timestamps: true,
            paranoid: true,
            underscored: true,
        }
    );
    Polls.associate = function(models) {
        // associations can be defined here
        Polls.hasMany(models.PollsVersions);

    };
    return Polls;
};
