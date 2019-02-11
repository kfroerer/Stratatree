var db = require("../models");

module.exports = function(app) {
  app.post("/api/users", function(request, response) {
    var newUser = {
      username: request.body.username,
      password: request.body.password,
      email: request.body.email,
      firstname: request.body.firstname,
      lastname: request.body.lastname
    };

    console.log(newUser);

    db.User.create(newUser).then(function() {
      response.render("login");
    });
  });
};
