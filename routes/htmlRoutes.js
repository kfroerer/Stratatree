var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("accounts", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load all accounts for a specific user
  app.get("/user/:id/accounts", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Account]
    }).then(function(dbUser) {
      res.render("account", {
        goal: dbUser.accounts
      });
    });
  });

  // Load all goals for a specific account
  app.get("/accounts/:id/goals", function(req, res) {
    db.Account.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Goal]
    }).then(function(dbAccount) {
      res.render("goal", {
        goal: dbAccount.goals
      });
    });
  });

  // Load all strategies for a specific goal
  app.get("/goals/:id/strategies", function(req, res) {
    db.Goal.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Strategy]
    }).then(function(dbGoal) {
      res.render("strategy", {
        strategy: dbGoal.strategies
      });
    });
  });

  // Load all tactics for a specific strategy
  app.get("/stragegies/:id/tactics", function(req, res) {
    db.Strategy.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Tactic]
    }).then(function(dbStrategy) {
      res.render("tactic", {
        tactic: dbStrategy.tactics
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
