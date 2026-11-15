// Tadawul Academy - external script (shared by all pages)

// Shows the current year in the footer (called by <body onload>)
function showYear() {
  document.getElementById("year").innerHTML = new Date().getFullYear();
}

// Sign-up form: HTML5 handles required fields, email and password length.
// This function only checks that the two passwords match.
function validateSignup() {
  var pw = document.forms["signupForm"]["password"].value;
  var pw2 = document.forms["signupForm"]["password2"].value;
  if (pw != pw2) {
    document.getElementById("pw2Err").innerHTML = "Passwords do not match.";
    document.getElementById("signupMsg").innerHTML = "";
  } else {
    document.getElementById("pw2Err").innerHTML = "";
    document.getElementById("signupMsg").innerHTML = "Account created (demo only, nothing is saved). Welcome to Tadawul Academy!";
  }
  return false; // stay on the page, there is no server
}

// Login form: HTML5 checks the email format and required fields
function validateLogin() {
  document.getElementById("loginMsg").innerHTML = "Logged in (demo only, no server is used).";
  return false;
}

// Growth calculator on the Market Data page
function calculate() {
  var balance = parseFloat(document.forms["calcForm"]["initial"].value);
  var monthly = parseFloat(document.forms["calcForm"]["monthly"].value);
  var rate = parseFloat(document.forms["calcForm"]["rate"].value);
  var years = parseInt(document.forms["calcForm"]["years"].value);
  var deposited = balance + monthly * years * 12;

  for (var month = 1; month <= years * 12; month++) {
    balance = balance * (1 + rate / 1200) + monthly;
  }

  document.getElementById("calcResult").innerHTML = "After " + years + " years you could have about SAR " + parseInt(balance) +
    " (you would have put in SAR " + parseInt(deposited) + "). This is an example, not a promise.";
  return false;
}
