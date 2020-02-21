'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    title: DataTypes.STRING
  }, {});
  Topic.associate = function(models) {
    Topic.belongsTo(models.Forum, {
      foreignKey: 'forumId', as: 'forum'
    });
    Topic.hasMany(models.Reply, {
      foreignKey: 'topicId',
      as: 'replies',
    });
  };
  return Topic;
};
