module.exports = function(sequelize, DataTypes) {
  var Tactic = sequelize.define("Tactic", {
    tactic: {
      type: DataTypes.TEXT
    },
    owner: {
      type: DataTypes.STRING
    },
    source: {
      type: DataTypes.STRING
    }
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
