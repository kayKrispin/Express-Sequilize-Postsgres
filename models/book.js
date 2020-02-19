'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Book.associate = function(models) {
    Book.belongsTo(models.User, {
      foreignKey: 'userId', as: 'userBook'
    })
  };
  return Book;
};
