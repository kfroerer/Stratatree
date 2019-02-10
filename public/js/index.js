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
      url: "api/auth",
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
      url: "api/accounts",
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
      url: "api/accounts",
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
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
    var token = document.cookie
      .split(";")
      .filter(function(element) {
        return element.indexOf("token=") === 0;
      })[0]
      .split("=")[1];
    return $.ajax({
      url: "api/accounts/" + accountID + "/goals",
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
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
    var token = document.cookie
      .split(";")
      .filter(function(element) {
        return element.indexOf("token=") === 0;
      })[0]
      .split("=")[1];
    return $.ajax({
      url: "api/goals/" + goalID + "/strategies",
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
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
    var token = document.cookie
      .split(";")
      .filter(function(element) {
        return element.indexOf("token=") === 0;
      })[0]
      .split("=")[1];
    return $.ajax({
      url: "api/strategy/" + stratID + "/tactics",
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
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
var refreshAccounts = function() {
  API.getAccounts().then(function() {
    
  
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var username = $("#estUsername").val();
  var password = $("#estPassword").val();

  API.authenticateUser(username, password).then(function(token) {
    document.cookie = "token=" + token.token;
    //then what???
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
    location.reload();
  });
};
var createNewUser = function () {
  var newUser = {
    firstName: $("#firstName").val(),
    lastName: $("#lastName").val(),
    email: $("#email").val(),
    username: $("#username").val(),
    password: $("#password").val()
  };

  API.createUser(newUser)
  };


var handleAddAccountBtn = function() {
  var accountToAdd = {
    name: $("#inputName").val()
  };
  API.createAccount(accountToAdd).then(function() {
    refreshAccounts();
  });
};

$("account-add").on("click", handleAddAccountBtn);

// Add event listeners to the submit and delete buttons
$enter.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};
