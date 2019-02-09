require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, cb) {
    models.User.findOne({ username: username }).then(
        function(user) {
          if (!user || !user.validatePassword(password)) {
              return cb(null, false, {message: 'Incorrect email or password.'});
          }
            return cb(null, user, {message: 'Logged In Successfully'});
        }
      ).catch(function(error) {
        cb(error)
        throw error;
      });
    }
  ));

  passport.use(
      new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret'
      }, function(jwtPayload, done) {
          //find the user in db if needed
        try {
            return done(null, jwtPayload)
        } catch (error) {
            console.log(error);

            done(error);
        }
      }
  ));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
var secureRoute = require("./routes/apiRoutes");
require("./routes/htmlRoutes")(app);
require("./routes/authRoutes")(app);
app.use('/api/examples', passport.authenticate('jwt', {session: false}), secureRoute);


var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
