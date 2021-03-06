'use strict';

const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
    const PollsVersions = sequelize.define(
        'PollsVersions',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            name: {
                type: DataTypes.TEXT,
                unique: true,
            },
            poll: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: sequelize.models.Polls,
                    key: 'id',
                },
            },
            view_url: {
                type: DataTypes.TEXT,
            },
            download_url: {
                type: DataTypes.TEXT,
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
        },
        {
            tableName: 'Polls_versions',
            timestamps: true,
            paranoid: true,
            underscored: true,
            indexes: [
                {
                    unique: true,
                    fields: ['poll', 'active'],
                },
            ],
        }
    );
    PollsVersions.associate = function(models) {
        PollsVersions.belongsTo(models.Polls, { foreignKey: 'poll' });
        // PollsVersions.hasOne(models.Polls, {foreignKey: 'poll'});
    };

    return PollsVersions;
};
