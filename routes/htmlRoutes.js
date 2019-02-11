var db = require("../models");
var jwt = require("jsonwebtoken");

module.exports = function(app) {
  app.get("/", function(req, res) {
    if (req.cookies.token) {
      var user = jwt.verify(req.cookies.token, "your_jwt_secret");
      console.log(user);
      if (user) {
        db.User.findOne({
          where: {
            id: user.id
          },
          include: [db.Account]
        }).then(function(dbUser) {
          return res.render("account", {
            account: dbUser.Accounts
          });
        });
      } else {
        return res.render("login");
      }
    } else {
      return res.render("login");
    }
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
        goal: dbAccount.Goals
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
        strategy: dbGoal.Strategies
      });
    });
  });

  // Load all tactics for a specific strategy
  app.get("/strategies/:id/tactics", function(req, res) {
    db.Strategy.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Tactic]
    }).then(function(dbStrategy) {
      res.render("tactic", {
        tactic: dbStrategy.Tactics
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
