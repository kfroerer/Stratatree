"use strict";
var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING
    },
    {
      hooks: {
        beforeCreate: function(user) {
          var salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    }
  );
  // User.associate = function(models) {
  //   // associations can be defined here
  // };

  User.prototype.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
  };

  User.sync();

  return User;
};
