module.exports = function(sequelize, DataTypes) {
  var Strategy = sequelize.define("Strategy", {
    strategy: DataTypes.STRING,
    body: DataTypes.TEXT,
    source: DataTypes.STRING,
    owner: DataTypes.STRING
  });

  Strategy.associate = function(models) {
    Strategy.belongsTo(models.Goal, {
      foreignKey: {
        name: "uid"
      }
    });

    Strategy.hasMany(models.Tactic, {
      foreignKey: {
        name: "uid"
      }
    });
    return Strategy;
  };
};
