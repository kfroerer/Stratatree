'use strict'

var fs = require('fs')
var path = require('path')
var Sequelize = require('sequelize')
var basename = path.basename(module.filename)
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env]
var db = {}

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable])
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )
}

fs.readdirSync(__dirname)
  .filter(function (file) {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

  // let modules = [
  //   require('./account.js'),
  //   require('./goal.js'),
  //   require('./strategy.js'),
  //   require('./tactic.js'),
  //   require('./user.js')
  
  // ];

  // // Initialize models
  // modules.forEach((module) => {
  //   const model = module(sequelize, Sequelize, config);
  //   db[model.name] = model;
  // });

  // // Apply associations
  // Object.keys(db).forEach((key) => {
  //   if ('associate' in db[key]) {
  //     db[key].associate(db);
  //   }
  // });

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db

// function getModels (config, force = false) {
//   if (Object.keys(db).length && !force) {
//     return db;
//   }

//   const sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config.options
//   );

//   let modules = [
//     require('./account.js'),
//     require('./goal.js'),
//     require('./strategy.js'),
//     require('./tactic.js'),
//     require('./user.js')
  
//   ];

//   // Initialize models
//   modules.forEach((module) => {
//     const model = module(sequelize, Sequelize, config);
//     db[model.name] = model;
//   });

//   // Apply associations
//   Object.keys(db).forEach((key) => {
//     if ('associate' in db[key]) {
//       db[key].associate(db);
//     }
//   });

//   db.sequelize = sequelize;
//   db.Sequelize = Sequelize;

//   return db;
// }

// module.exports = {
//   getModels
// };
