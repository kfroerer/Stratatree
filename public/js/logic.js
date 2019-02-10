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
   
  });
  //grabs the log in info from newUser Modal
 
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
});
