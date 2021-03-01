'use strict';
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    date: DataTypes.STRING,
    service: DataTypes.STRING,
    email: DataTypes.STRING,
    instagramName: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {});
  Service.associate = function(models) {
    // associations can be defined here
  };
  return Service;
};