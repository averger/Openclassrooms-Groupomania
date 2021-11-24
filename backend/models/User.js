'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        pseudo: { type: DataTypes.STRING, allowNull: false },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: { type: DataTypes.STRING, allowNull: false },
        photo: { type: DataTypes.STRING, allowNull: true },
        bio: DataTypes.STRING(500),
        admin: { type: DataTypes.BOOLEAN, allowNull: false, default: false },
    });
    User.associate = function (models) {
        User.hasMany(models.Post);
        User.hasMany(models.Comment);
    };
    return User;
};