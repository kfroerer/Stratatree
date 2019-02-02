module.exports = function(sequelize, DataTypes) {
    var Strategy = sequelize.define("Strategy", {
        strategy: {
            type: DataTypes.TEXT,

        }
    })
    return Strategy;
}