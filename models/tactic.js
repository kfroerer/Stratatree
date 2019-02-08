module.exports = function(sequelize, DataTypes) {
  var Tactic = sequelize.define("Tactic", {
<<<<<<< HEAD
    tactic: DataTypes.STRING,
    body: DataTypes.TEXT,
    source: DataTypes.STRING,
    owner: DataTypes.STRING
=======
    tactic: {
      type: DataTypes.TEXT
    },
    body: {
      type: DataTypes.TEXT
    }
>>>>>>> master
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
