var db = require("../models");
var router = require("express").Router();

// Get all Accounts
router.get("/accounts", function(req, res) {
  db.Account.findAll({}).then(function(accounts) {
    res.json(accounts);
  });
});
//Create a new User
// router.post("/users", function(req, res) {
//   var newUser = {
//     username: req.body.username,
//     password: req.body.password,
//     email: req.body.email,
//     firstname: req.body.firstName,
//     lastname: req.body.lastName
//   };
//   db.User.create(newUser).then(function() {
//     console.log("posted");
//     res.render("login");
//   });
// });

// Create a new Account
router.post("/accounts", function(req, res) {
  var accountToCreate = {
    name: req.body.name,
    UserId: req.user.id
  };
  db.Account.create(accountToCreate).then(function(newAccount) {
    res.json(newAccount);
  });
});

// Create a new Goal
router.post("/goals", function(req, res) {
  db.Goal.create(req.body).then(function(newGoal) {
    res.json(newGoal);
  });
});

// Create a new Strategy
router.post("/strategies", function(req, res) {
  db.Strategy.create(req.body).then(function(newStrategy) {
    res.json(newStrategy);
  });
});

// Create a new Tactic
router.post("/tactics", function(req, res) {
  db.Tactic.create(req.body).then(function(newTactic) {
    res.json(newTactic);
  });
});

// Delete an Account by id
router.delete("/accounts/:id", function(req, res) {
  db.Account.destroy({ where: { id: req.params.id } }).then(function(
    accountByID
  ) {
    res.json(accountByID);
  });
});

// Delete a Goal by id
router.delete("/goals/:id", function(req, res) {
  db.Goal.destroy({ where: { id: req.params.id } }).then(function(goalByID) {
    res.json(goalByID);
  });
});

// Delete a Strategy by id
router.delete("/strategy/:id", function(req, res) {
  db.Strategy.destroy({ where: { id: req.params.id } }).then(function(
    strategyByID
  ) {
    res.json(strategyByID);
  });
});

// Delete a Tactic by id
router.delete("/tactic/:id", function(req, res) {
  db.Tactic.destroy({ where: { id: req.params.id } }).then(function(
    tacticByID
  ) {
    res.json(tacticByID);
  });
});

// Update an Account by id
router.put("/accounts/:id", function(req, res) {
  db.Account.update({ where: { id: req.params.id } }).then(function(
    accountByID
  ) {
    res.json(accountByID);
  });
});

// Update a Goal by id
router.put("/goals/:id", function(req, res) {
  db.Goal.update({ where: { id: req.params.id } }).then(function(goalByID) {
    res.json(goalByID);
  });
});

// Update a Strategy by id
router.put("/strategies/:id", function(req, res) {
  db.Strategy.update({ where: { id: req.params.id } }).then(function(
    strategyByID
  ) {
    res.json(strategyByID);
  });
});

// Update a Tactic by id
router.put("/tactics/:id", function(req, res) {
  db.Tactic.update({ where: { id: req.params.id } }).then(function(tacticByID) {
    res.json(tacticByID);
  });
});

// Get all goals for a specific account
router.get("/accounts/:id/goals", function(req, res) {
  db.Account.findOne({
    where: {
      id: req.params.id
    },
    include: [db.Goal]
  }).then(function(account) {
    res.json(account.goals);
  });
});

// Get all strategies for a specific goal
router.get("/goal/:id/strategies", function(req, res) {
  db.Goal.findOne({
    where: {
      id: req.params.id
    },
    include: [db.Strategy]
  }).then(function(goals) {
    res.json(goals.strateigies);
  });
});

// Get all tactics for a specific strategy
router.get("/strategy/:id/tactics", function(req, res) {
  db.Strategy.findOne({
    where: {
      id: req.params.id
    },
    include: [db.Tactic]
  }).then(function(strategies) {
    res.json(strategies.tactics);
  });
});

module.exports = router;
