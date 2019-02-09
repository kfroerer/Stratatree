module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define("Account", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Account.associate = function(models) {
    Account.belongsTo(models.User);
    // Account.belongsTo(models.User, {
    //   foreignKey: {
    //     name: "userId"
    //   }
    // });
    Account.hasMany(models.Goal, {
      foreignKey: {
        name: "uid"
      }
    });
  };

  return Account;
};
