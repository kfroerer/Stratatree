module.exports = function(sequelize, DataTypes) {
  var Strategy = sequelize.define("Strategy", {
    strategy: {
      type: DataTypes.TEXT
    },
    body: {
      type: DataTypes.TEXT
    }
  });

  Strategy.associate = function(models) {
    Strategy.belongsTo(models.Goal, {
      foreignKey: {
        name: "uid"
      }
    });
  };
  return Strategy;
};
