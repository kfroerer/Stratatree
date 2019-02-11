var db = require("../models");

module.exports = function(app) {
  app.post("/api/users", function(request, response) {
    var newUser = {
      username: request.body.username,
      password: request.body.password,
      email: request.body.email,
      firstName: request.body.firstName,
      lastName: request.body.lastName
    };

    db.User.create(newUser).then(function() {
      console.log("user created");
      response.render("login");
      response.status(204).end();
    });
  });
};
