'use strict';

const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
    const PollsVersions = sequelize.define(
        'PollsVersions',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: uuid(),
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
            active: DataTypes.BOOLEAN,
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            deleted_at: DataTypes.DATE,
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
        PollsVersions.belongsTo(models.Polls);
    };

    return PollsVersions;
};
