module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define("Account", {
    name: DataTypes.STRING,
    allowNull: false
  });

  Account.associate = function(models) {
    Account.belongsTo(models.User, {
      foreignKey: {
        name: "uid"
      }
    });
<<<<<<< HEAD

    Account.hasMany(models.Goal, {
=======
    Account.belongsTo(models.User, {
>>>>>>> master
      foreignKey: {
        name: "uid"
      }
    });

    return Account;
  };
};
