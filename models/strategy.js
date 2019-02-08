module.exports = function(sequelize, DataTypes) {
  var Strategy = sequelize.define("Strategy", {
    strategy: {
      type: DataTypes.TEXT
    },
    body: {
      type: DataTypes.TEXT
    },
    owner: {
      type: DataTypes.STRING
    },
    source: {
      type: DataTypes.STRING
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

    Strategy.hasMany(models.Tactic, {
      foreignKey: {
        name: "uid"
      }
    });
    return Strategy;
  };
};
