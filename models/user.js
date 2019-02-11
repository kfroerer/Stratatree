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

  User.associate = function(models) {
    User.hasMany(models.Account);
    User.create({
      username: "bball",
      password: "something",
      email: "something@email.com",
      firstname: "John",
      lastname: "Doe"
    }).then(function(users) {
      models.Account.create({ name: "Titan" })
        .then(function(account) {
          models.Account.update(
            { UserId: users.dataValues.id },
            { where: { id: account.dataValues.id } }
          );
        })
        .then(function() {
          return models.Account.findAll();
        })
        .then(function() {
          //this can be used to test what is returning, put a callback in the future
          console.log("ACCCOUUUUUNTS");
        });
    });
  };

  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.sync();
  return User;
};
