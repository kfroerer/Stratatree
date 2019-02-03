'use strict';

var bcrypt = require('bcrypt');



module.exports = function (sequelize, DataTypes) {
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
                instanceMethods: {
                    validPassword(password) {
                        return bcrypt.compare(
                            password,
                            this.password
                        )
                    }
                },
                hooks: {
                    beforeCreate: (user) => {
                    const salt = bcrypt.genSaltSync();
                    user.password = bcrypt.hashSync(user.password, salt);
                    }
                }
            }
    );
  User.associate = function(models) {
    User.hasMany(models.Account, {
        onDelete: "cascade"
    })
  };

  User.sync();

  return User;
};


