module.exports = function(sequelize, DataTypes) {
  var Goal = sequelize.define("Goal", {
    goal: DataTypes.STRING,
    body: DataTypes.TEXT,
    source: DataTypes.STRING,
    owner: DataTypes.STRING
  });

  Goal.associate = function(models) {
    Goal.belongsTo(models.Account, {
      foreignKey: {
        name: "uid"
      }
    });

    Goal.hasMany(models.Strategy, {
      foreignKey: {
        name: "uid"
      }
    });
    return Goal;
  };
};
