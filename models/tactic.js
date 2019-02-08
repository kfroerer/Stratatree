module.exports = function(sequelize, DataTypes) {
  var Tactic = sequelize.define("Tactic", {
    tactic: DataTypes.STRING,
    body: DataTypes.TEXT,
    source: DataTypes.STRING,
    owner: DataTypes.STRING
  });

  Tactic.associate = function(models) {
    Tactic.belongsTo(models.Strategy, {
      foreignKey: {
        name: "uid"
      }
    });
  };
  return Tactic;
};
