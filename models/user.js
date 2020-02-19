'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasOne(models.Profile, {
      foreignKey: 'user_id',
      as: 'profile',
    });
    User.hasMany(models.Book, {
      foreignKey: 'userId',
      as: 'books',
    });
    User.belongsToMany(models.Role, {
      through: 'UserRole',
      as: 'roles',
      foreignKey: 'user_id'
    });
  };

  return User;

};
