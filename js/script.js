// Tadawul Academy - external script (shared by all pages)

// Shows the current year in the footer (called by <body onload>)
function showYear() {
  document.getElementById("year").innerHTML = new Date().getFullYear();
}

// Returns a greeting that depends on the hour (0 to 23)
function getGreeting(hour) {
  var text;
  if (hour < 12) {
    text = "Good morning";
  } else if (hour < 18) {
    text = "Good afternoon";
  } else {
    text = "Good evening";
  }
  return text;
}

// Shows the greeting on the home page
function showGreeting() {
  var hour = new Date().getHours();
  document.getElementById("greeting").innerHTML = getGreeting(hour) + ", and welcome to Tadawul Academy!";
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

// Returns how much money you would have after saving every month
function futureValue(start, monthly, rate, years) {
  var balance = start;
  for (var month = 1; month <= years * 12; month++) {
    balance = balance * (1 + rate / 1200) + monthly;
  }
  return balance;
}

// Returns a short message that compares the final amount with the money put in
function growthMessage(balance, deposited) {
  var message;
  if (balance > deposited * 2) {
    message = " Your money would more than double.";
  } else if (balance > deposited) {
    message = " Your money would grow.";
  } else {
    message = " Your money would not grow with these numbers.";
  }
  return message;
}

// Colors a text box: dark border when it is correct, red when it has a problem
function markField(fieldId, ok) {
  var box = document.getElementById(fieldId);
  if (ok) {
    box.style.borderColor = "#111111";
  } else {
    box.style.borderColor = "#9B1C1C";
  }
}

// Growth calculator on the Market Data page (all values are checked by script first)
function calculate() {
  var startText = document.forms["calcForm"]["initial"].value;
  var monthlyText = document.forms["calcForm"]["monthly"].value;
  var rateText = document.forms["calcForm"]["rate"].value;
  var yearsText = document.forms["calcForm"]["years"].value;
  var result = document.getElementById("calcResult");

  var start = parseFloat(startText);
  var monthly = parseFloat(monthlyText);
  var rate = parseFloat(rateText);
  var years = parseFloat(yearsText);
  var error = "";

  if (startText == "" || monthlyText == "" || rateText == "" || yearsText == "") {
    error = "Please fill in all four boxes.";
  } else if (start < 0 || monthly < 0) {
    error = "The amounts cannot be negative.";
  } else if (rate < 0 || rate > 50) {
    error = "The yearly return must be between 0 and 50.";
  } else if (years < 1 || years > 50 || years != parseInt(years)) {
    error = "Years must be a whole number from 1 to 50.";
  }

  markField("initial", startText != "" && start >= 0);
  markField("monthly", monthlyText != "" && monthly >= 0);
  markField("rate", rateText != "" && rate >= 0 && rate <= 50);
  markField("years", yearsText != "" && years >= 1 && years <= 50 && years == parseInt(years));

  if (error != "") {
    result.innerHTML = error;
    result.style.borderColor = "#9B1C1C";
    return false;
  }

  var deposited = start + monthly * years * 12;
  var balance = futureValue(start, monthly, rate, years);
  result.innerHTML = "After " + years + " years you could have about SAR " + parseInt(balance) +
    " (you would have put in SAR " + parseInt(deposited) + "). This is an example, not a promise." + growthMessage(balance, deposited);
  result.style.borderColor = "#0B6B45";
  return false;
}

// Turns the full name into capital letters when the user leaves the box
function formatName(field) {
  field.value = field.value.toUpperCase();
}