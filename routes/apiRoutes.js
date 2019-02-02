var db = require("../models");

module.exports = function(app) {
  // Get all Accounts
  app.get("/api/accounts", function(req, res) {
    db.Account.findAll({}).then(function(accounts) {
      res.json(accounts);
    });
  });

  // Create a new Account
  app.post("/api/accounts", function(req, res) {
    db.Account.create(req.body).then(function(newAccount) {
      res.json(newAccount);
    });
  });

  // Create a new Goal
  app.post("/api/goals", function(req, res) {
    db.Goal.create(req.body).then(function(newGoal) {
      res.json(newGoal);
    });
  });

  // Create a new Strategy
  app.post("/api/strategies", function(req, res) {
    db.Strategy.create(req.body).then(function(newStrategy) {
      res.json(newStrategy);
    });
  });

  // Create a new Tactic
  app.post("/api/tactics", function(req, res) {
    db.Tactic.create(req.body).then(function(newTactic) {
      res.json(newTactic);
    });
  });

  // Delete an Account by id
  app.delete("/api/accounts/:id", function(req, res) {
    db.Account.destroy({ where: { id: req.params.id } }).then(function(
      accountByID
    ) {
      res.json(accountByID);
    });
  });

  // Delete a Goal by id
  app.delete("/api/goals/:id", function(req, res) {
    db.Goal.destroy({ where: { id: req.params.id } }).then(function(goalByID) {
      res.json(goalByID);
    });
  });

  // Delete a Strategy by id
  app.delete("/api/strategy/:id", function(req, res) {
    db.Strategy.destroy({ where: { id: req.params.id } }).then(function(
      strategyByID
    ) {
      res.json(strategyByID);
    });
  });

  // Delete a Tactic by id
  app.delete("/api/tactic/:id", function(req, res) {
    db.Tactic.destroy({ where: { id: req.params.id } }).then(function(
      tacticByID
    ) {
      res.json(tacticByID);
    });
  });

  // Update an Account by id
  app.put("/api/accounts/:id", function(req, res) {
    db.Account.update({ where: { id: req.params.id } }).then(function(
      accountByID
    ) {
      res.json(accountByID);
    });
  });

  // Update a Goal by id
  app.put("/api/goals/:id", function(req, res) {
    db.Goal.update({ where: { id: req.params.id } }).then(function(goalByID) {
      res.json(goalByID);
    });
  });

  // Update a Strategy by id
  app.put("/api/strategies/:id", function(req, res) {
    db.Strategy.update({ where: { id: req.params.id } }).then(function(
      strategyByID
    ) {
      res.json(strategyByID);
    });
  });

  // Update a Tactic by id
  app.put("/api/tactics/:id", function(req, res) {
    db.Tactic.update({ where: { id: req.params.id } }).then(function(
      tacticByID
    ) {
      res.json(tacticByID);
    });
  });

  // Get all goals for a specific account
  app.get("/api/accounts/:id/goals", function(req, res) {
    db.Account.findOne({
      where: {
        id: request.params.id
      },
      include: [db.Goals]
    }).then(function(account) {
      res.json(account.goals);
    });
  });

  // Get all strategies for a specific goal
  app.get("/api/goal/:id/strategies", function(req, res) {
    db.Goal.findOne({
      where: {
        id: request.params.id
      },
      include: [db.Strategies]
    }).then(function(goals) {
      res.json(goals.strateigies);
    });
  });

  // Get all tactics for a specific strategy
  app.get("/api/strategy/:id/tactics", function(req, res) {
    db.Strategy.findOne({
      where: {
        id: request.params.id
      },
      include: [db.Tactics]
    }).then(function(strategies) {
      res.json(strategies.tactics);
    });
  });
};
