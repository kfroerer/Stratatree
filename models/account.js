module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define("Account", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Account.associate = function(models) {
    Account.belongsTo(models.User, {
      foreignKey: {
        name: "uid"
      }
    });
    Account.belongsTo(models.User, {
      foreignKey: {
        name: "uid"
      }
    });

    return Account;
  };
};
