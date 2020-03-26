'use strict';

const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(
        'Users',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: uuid(),
            },
            username: DataTypes.TEXT,
            email: DataTypes.TEXT,
            password: DataTypes.TEXT,
            is_activated: {
                type: DataTypes.BOOLEAN,
                defaultValue: true, // Until emails are not implemented
            },
            is_suspended: DataTypes.BOOLEAN,
            suspend_reason: DataTypes.TEXT,
        },
        {
            tableName: 'Users',
            timestamps: true,
            paranoid: true,
            underscored: true,
        }
    );

    Users.associate = function(models) {
        // associations can be defined here
    };

    return Users;
};
