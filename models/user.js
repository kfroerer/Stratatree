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
      username: "John",
      password: "something",
      email: "something@email.com",
      firstname: "John",
      lastname: "witherington"
    }).then(function(users) {
      models.Account.bulkCreate([{ name: "Titan" }])
        .then(function(account) {
          models.Account.update(
            { UserId: users.dataValues.id },
            { where: { id: account[0].dataValues.id } }
          );
        })
        .then(function() {
          return models.Account.findAll();
        })
        .then(function(accounts) {
          console.log("ACCCOUUUUUNTS", accounts);
        });
    });
  };

  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.sync();
  return User;
};
