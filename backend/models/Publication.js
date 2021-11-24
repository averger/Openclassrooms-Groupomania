'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  var Publication = sequelize.define('Publication', {
    userId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    content: DataTypes.TEXT,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER,
    userLiked: DataTypes.ARRAY(DataTypes.STRING),
    userDisliked: DataTypes.ARRAY(DataTypes.STRING)
  });

  Publication.associate = function (models) {
    Publication.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
  });
  Publication.hasMany(models.Comment, {
    foreignKey: 'publicationId',
    as: 'comments',
  }); 
}
  return Publication;
};