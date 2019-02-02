module.exports = function(sequelize, DataTypes) {
    var Goal = sequelize.define("Goal", {
        goal: {
            type: DataTypes.TEXT,
        },
        body: {
            type: DataTypes.TEXT
        }})
        Goal.associate = function(models) {
            Goal.belongsTo(Account, {
        }
        Goal.associate = function(models)
    });
    return Goal;
}