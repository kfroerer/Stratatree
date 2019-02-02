module.exports = function(sequelize, DataTypes) {
    var Tactic = sequelize.define("Tactic", {
        tactic: {
            type: DataTypes.text
        }
    })
    return Tactic;
}