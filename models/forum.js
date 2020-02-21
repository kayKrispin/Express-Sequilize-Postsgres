'use strict';
module.exports = (sequelize, DataTypes) => {
  const Forum = sequelize.define('Forum', {
    title: DataTypes.STRING
  }, {});
  Forum.associate = function(models) {
    Forum.hasMany(models.Topic, {
      foreignKey: 'forumId',
      as: 'topics',
    });
  };
  return Forum;
};
