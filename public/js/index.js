// Get references to page elements
/* global $ */

var $enter = $("#enter");

// The API object contains methods for each kind of request we'll make
var API = {
  authenticateUser: function(username, password) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/auth",
      data: JSON.stringify({
        username: username,
        password: password
      })
    });
  },

  createUser: function(newUser) {
    return $.ajax({
      headers: {
        "Content-type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(newUser)
    });
  },

  createAccount: function(newAccount) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/accounts",
      data: JSON.stringify(newAccount)
    });
  },
  getAccounts: function() {
    var token = document.cookie
      .split(";")
      .filter(function(element) {
        return element.indexOf("token=") === 0;
      })[0]
      .split("=")[1];
    return $.ajax({
      url: "/api/accounts",
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });
  },
  deleteAccount: function(id) {
    return $.ajax({
      url: "/api/accounts/" + id,
      type: "DELETE"
    });
  },
  createGoal: function(newGoal) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/goals",
      data: JSON.stringify(newGoal)
    });
  },
  getGoals: function(accountID) {
    var token = document.cookie
      .split(";")
      .filter(function(element) {
        return element.indexOf("token=") === 0;
      })[0]
      .split("=")[1];
    return $.ajax({
      url: "/api/accounts/" + accountID + "/goals",
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });
  },
  deleteGoal: function(id) {
    return $.ajax({
      url: "/api/goals/" + id,
      type: "DELETE"
    });
  },
  createStrategy: function(newStrat) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/strategies",
      data: JSON.stringify(newStrat)
    });
  },
  getStrategies: function(goalID) {
    var token = document.cookie
      .split(";")
      .filter(function(element) {
        return element.indexOf("token=") === 0;
      })[0]
      .split("=")[1];
    return $.ajax({
      url: "/api/goals/" + goalID + "/strategies",
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });
  },
  deleteStrategy: function(id) {
    return $.ajax({
      url: "/api/strategy/" + id,
      type: "DELETE"
    });
  },
  createTactic: function(newTactic) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/tactics",
      data: JSON.stringify(newTactic)
    });
  },
  getTactics: function(stratID) {
    var token = document.cookie
      .split(";")
      .filter(function(element) {
        return element.indexOf("token=") === 0;
      })[0]
      .split("=")[1];
    return $.ajax({
      url: "/api/strategy/" + stratID + "/tactics",
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });
  },
  deleteTactic: function(id) {
    return $.ajax({
      url: "/api/tactic/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
// var refreshAccounts = function() {
//   API.getAccounts().then(function() {
//   });
// };

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var username = $("#estUsername").val();
  var password = $("#estPassword").val();

  API.authenticateUser(username, password).then(function(token) {
    document.cookie = "token=" + token.token;
    location.reload();
  });

  // username.val("");
  // password.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     location.reload();
//   });
// };
var createNewUser = function() {
  var newUser = {
    firstName: $("#firstName").val(),
    lastName: $("#lastName").val(),
    email: $("#email").val(),
    username: $("#username").val(),
    password: $("#password").val()
  };
  console.log(newUser);

  API.createUser(newUser).then(function() {
    console.log("user created");
  });
};

//Account creation
var handleAddAccountBtn = function() {
  var accountToAdd = {
    name: $("#inputName").val(),
    UserId: getParent()
  };
  API.createAccount(accountToAdd).then(function() {
    location.reload();
    console.log(accountToAdd + " added");
  });
};

$("#save").on("click", createNewUser);
// Add event listeners to the submit and delete buttons
$("#enter").on("click", handleFormSubmit);

$("#accountAdd").on("click", handleAddAccountBtn);

//Goal creation
var handleAddGoalBtn = function() {
  var goalToAdd = {
    goal: $("#inputGoal").val(),
    owner: $("#inputOwner").val(),
    source: $("#inputSource").val(),
    uid: getParent()
  };
  API.createGoal(goalToAdd).then(function() {
    location.reload();
    console.log(goalToAdd + " added");
  });
};

$("#goalAdd").on("click", handleAddGoalBtn);

//Strategy creation
var handleAddStrategyBtn = function() {
  var strategyToAdd = {
    strategy: $("#inputStrategy").val(),
    owner: $("#inputOwner").val(),
    source: $("#inputSource").val(),
    uid: getParent()
  };
  API.createStrategy(strategyToAdd).then(function() {
    location.reload();
    console.log(strategyToAdd + " added");
  });
};

$("#strategyAdd").on("click", handleAddStrategyBtn);

//Tactic creation
var handleAddTacticBtn = function() {
  var tacticToAdd = {
    tactic: $("#inputTactic").val(),
    owner: $("#inputOwner").val(),
    source: $("#inputSource").val(),
    uid: getParent()
  };
  API.createTactic(tacticToAdd).then(function() {
    location.reload();
    console.log(tacticToAdd + " added");
  });
};

$("#tacticAdd").on("click", handleAddTacticBtn);

//Account deletion
var handleDeleteAccount = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteAccount(idToDelete).then(function() {
    location.reload();
  });
};
$(".account-delete").on("click", handleDeleteAccount);

//Goal deletion
var handleDeleteGoal = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteGoal(idToDelete).then(function() {
    location.reload();
  });
};
$(".goal-delete").on("click", handleDeleteGoal);

//Strategy deletion
var handleDeleteStrategy = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteStrategy(idToDelete).then(function() {
    location.reload();
  });
};
$(".strategy-delete").on("click", handleDeleteStrategy);

//Tactic deletion
var handleDeleteTactic = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteTactic(idToDelete).then(function() {
    location.reload();
  });
};
$(".tactic-delete").on("click", handleDeleteTactic);

console.log(
  "CONNECTED_________________________________________________________"
);

//function for parsing url into variables
function getParent() {
  var url = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi);
  var parts = url.split("/");
  return parts[4];
}
