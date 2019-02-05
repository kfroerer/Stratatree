module.exports = function (sequelize, DataTypes) {
  var Tactic = sequelize.define('Tactic', {
    tactic: {
      type: DataTypes.TEXT
    },
    body: {
      type: DataTypes.TEXT
    }
  })

  Tactic.associate = function (models) {
    Tactic.belongsTo(models.Strategy, {
      foreignKey: {
        name: 'uid'
      }
    })
  }
  return Tactic
}
