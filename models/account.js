module.exports = function (sequelize, DataTypes) {
  var Account = sequelize.define('Account', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    } })

  Account.associate = function (models) {
    Account.hasMany(models.Goal, {
      foreignKey: {
        name: 'uid',
        allowNull: false
      }
    })
    Account.belongsTo(models.User, {
      foreignKey: {
        name: 'uid'
      }
    })
    return Account
  }
}
