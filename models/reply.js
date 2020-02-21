'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    text: DataTypes.STRING
  }, {});
  Reply.associate = function(models) {
    Reply.belongsTo(models.Topic, {
      foreignKey: 'topicId'
    });
  };
  return Reply;
};
