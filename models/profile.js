'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    user_id: DataTypes.INTEGER,
    fullname: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    gender: DataTypes.STRING,
    position: DataTypes.STRING
  }, {});
  Profile.associate = function (models) {
    Profile.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: "user"
    });
  };

  return Profile;

};
