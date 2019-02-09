$(document).ready(function() {
  //grabs the info from new user
  $("#save").on("click", function(event) {
    event.preventDefault;
    var newUser = {
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      email: $("#email").val(),
      username: $("#username").val(),
      password: $("#password").val()
    };

    console.log(newUser);
    // $('.newUserForm').trigger(reset);
    // need ajax post call
    //
  });
  //grabs the log in info from newUser Modal
  $("#newUserSave").on("click", function(event) {
    event.preventDefault;
    var user = {
      username: $("#newUserName").val(),
      password: $("#newPassword").val()
    };

    console.log(user);

    login(user);
    // $(".userLogin").reset()
  });
  //grabs the login info from existing user
  $("#enter").on("click", function(event) {
    event.preventDefault;
    var user = {
      username: $("#estUsername").val(),
      password: $("#estPassword").val()
    };

    console.log(user);
    login(user);
    $(".userLogin").reset();
  });

  function login(user) {
    $.post("/api/auth", user, function() {
      console.log("posted");
    }).then(
      console.log("logged in")
      //call function to authenticate user (I think this is found in auth routes)
      //route to accounts.handlebars//should display all accounts
      //render "something"
    );
    //
  }
});
