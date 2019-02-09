module.exports = function(sequelize, DataTypes) {
  var Goal = sequelize.define("Goal", {
    goal: {
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
  };
  return Goal;
};
