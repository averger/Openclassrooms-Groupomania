'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT,
    messageId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });
  
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
     
    });
    Comment.belongsTo(models.Publication, {
      foreignKey: 'publicationId',
      onDelete: 'CASCADE',
    });
  }
  return Comment;
};