// Get references to page elements
/* global $ */
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $accountButton = $("#account-add");
var $exampleList = $("#example-list");
var $enter = $("#enter");

// The API object contains methods for each kind of request we'll make
var API = {
  authenticateUser: function (username, password) {
    return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/auth",
        data: JSON.stringify(
            {
                username: username,
                password: password
            }
          )
    })
  },

  createAccount: function(newAccount) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/accounts",
      data: JSON.stringify(newAccount)
    });
  },
  getAccounts: function() {
    var token = document.cookie.split(";")
        .filter(
            function(element){
              return element.indexOf('token=') === 0
            }
          )[0].split("=")[1];
    return $.ajax({
      url: "api/accounts",
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    });
  },
  deleteAccount: function(id) {
    return $.ajax({
      url: "api/accounts/" + id,
      type: "DELETE"
    });
  },
  createGoal: function(newAccount) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/goals",
      data: JSON.stringify(newAccount)
    });
  },
  getGoals: function(accountID) {
    var token = document.cookie.split(";")
        .filter(
            function(element){
              return element.indexOf('token=') === 0
            }
          )[0].split("=")[1];
    return $.ajax({
      url: "api/accounts/" + accountID + "/goals",
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    });
  },
  deleteGoal: function(id) {
    return $.ajax({
      url: "api/goals/" + id,
      type: "DELETE"
    });
  },
  createStrategy: function(newStrat) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/strategies",
      data: JSON.stringify(newStrat)
    });
  },
  getStrategies: function(goalID) {
    var token = document.cookie.split(";")
        .filter(
            function(element){
              return element.indexOf('token=') === 0
            }
          )[0].split("=")[1];
    return $.ajax({
      url: "api/goals/" + goalID + "/strategies",
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    });
  },
  deleteStrategy: function(id) {
    return $.ajax({
      url: "api/strategy/" + id,
      type: "DELETE"
    });
  },
  createTactic: function(newTactic) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/tactics",
      data: JSON.stringify(newTactic)
    });
  },
  getTactics: function(stratID) {
    var token = document.cookie.split(";")
        .filter(
            function(element){
              return element.indexOf('token=') === 0
            }
          )[0].split("=")[1];
    return $.ajax({
      url: "api/strategy/" + stratID + "/tactics",
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    });
  },
  deleteTactic: function(id) {
    return $.ajax({
      url: "api/tactic/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
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

  username.val("");
  password.val("");


};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$enter.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
