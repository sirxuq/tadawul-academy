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

// ----- Login form: every check is done by script -----

// Runs when the login form is submitted
function validateLogin() {
  var email = document.forms["loginForm"]["email"].value;
  var pw = document.forms["loginForm"]["password"].value;
  var emailMessage = "";
  var pwMessage = "";

  if (isEmpty(email)) {
    emailMessage = "Please enter your email.";
  } else if (isValidEmail(email) == false) {
    emailMessage = "Enter a valid email, like name@example.com.";
  }
  if (isEmpty(pw)) {
    pwMessage = "Please enter your password.";
  }

  var emailOk = showResult("loginEmailErr", "loginEmail", emailMessage);
  var pwOk = showResult("loginPwErr", "loginPassword", pwMessage);

  if (emailOk && pwOk) {
    document.getElementById("loginMsg").innerHTML = "Logged in (demo only, no server is used).";
  } else {
    document.getElementById("loginMsg").innerHTML = "";
  }
  return false; // stay on the page, there is no server
}

// Runs when the login form is reset: removes every message and red border
function clearLogin() {
  document.getElementById("loginEmailErr").innerHTML = "";
  document.getElementById("loginPwErr").innerHTML = "";
  document.getElementById("loginMsg").innerHTML = "";
  markField("loginEmail", true);
  markField("loginPassword", true);
}

// ----- Sign-up form: every check is done by script -----

// Returns true when nothing was typed
function isEmpty(text) {
  return text == "";
}

// Returns true when the text looks like an email address (name@site.com)
function isValidEmail(email) {
  var at = email.indexOf("@");
  if (at < 1) {
    return false;
  }
  if (email.indexOf("@", at + 1) != -1) {
    return false;
  }
  if (email.indexOf(".", at) < at + 2) {
    return false;
  }
  return true;
}

// Shows a message under a box and colors the box. Returns true when there is no message.
function showResult(errorId, fieldId, message) {
  document.getElementById(errorId).innerHTML = message;
  markField(fieldId, message == "");
  return message == "";
}

function checkName() {
  var name = document.forms["signupForm"]["fullname"].value;
  var message = "";
  if (isEmpty(name)) {
    message = "Please enter your full name.";
  } else if (name.length < 3) {
    message = "Your name must have at least 3 letters.";
  }
  return showResult("nameErr", "fullname", message);
}

function checkEmail() {
  var email = document.forms["signupForm"]["email"].value;
  var message = "";
  if (isEmpty(email)) {
    message = "Please enter your email.";
  } else if (isValidEmail(email) == false) {
    message = "Enter a valid email, like name@example.com.";
  }
  return showResult("emailErr", "email", message);
}

function checkPassword() {
  var pw = document.forms["signupForm"]["password"].value;
  var hasNumber = false;
  for (var i = 0; i < pw.length; i++) {
    var letter = pw.charAt(i);
    if (letter >= "0" && letter <= "9") {
      hasNumber = true;
    }
  }
  var message = "";
  if (isEmpty(pw)) {
    message = "Please choose a password.";
  } else if (pw.length < 8) {
    message = "The password needs at least 8 characters.";
  } else if (hasNumber == false) {
    message = "The password needs at least one number.";
  }
  return showResult("pwErr", "password", message);
}

function checkPassword2() {
  var pw = document.forms["signupForm"]["password"].value;
  var pw2 = document.forms["signupForm"]["password2"].value;
  var message = "";
  if (isEmpty(pw2)) {
    message = "Please type the password again.";
  } else if (pw != pw2) {
    message = "The two passwords do not match.";
  }
  return showResult("pw2Err", "password2", message);
}

function checkLevel() {
  var level = document.forms["signupForm"]["level"].value;
  var message = "";
  if (isEmpty(level)) {
    message = "Please choose your experience.";
  }
  return showResult("levelErr", "level", message);
}

function checkTerms() {
  var message = "";
  if (document.forms["signupForm"]["terms"].checked == false) {
    message = "Please tick the box to continue.";
  }
  document.getElementById("termsErr").innerHTML = message;
  return message == "";
}

// Light green background while the user is typing in a box
function highlight(field) {
  field.style.backgroundColor = "#E3EEE7";
}

// Normal background when the user leaves the box
function unhighlight(field) {
  field.style.backgroundColor = "#FBF8F1";
}

// Runs when the sign-up form is reset: removes every message and red border
function clearSignup() {
  document.getElementById("nameErr").innerHTML = "";
  document.getElementById("emailErr").innerHTML = "";
  document.getElementById("pwErr").innerHTML = "";
  document.getElementById("pw2Err").innerHTML = "";
  document.getElementById("levelErr").innerHTML = "";
  document.getElementById("termsErr").innerHTML = "";
  document.getElementById("signupMsg").innerHTML = "";
  markField("fullname", true);
  markField("email", true);
  markField("password", true);
  markField("password2", true);
  markField("level", true);
}

// Runs when the sign-up form is submitted
function validateSignup() {
  var ok = checkName();
  ok = checkEmail() && ok;
  ok = checkPassword() && ok;
  ok = checkPassword2() && ok;
  ok = checkLevel() && ok;
  ok = checkTerms() && ok;

  if (ok) {
    var name = document.forms["signupForm"]["fullname"].value;
    document.getElementById("signupMsg").innerHTML = "Account created (demo only, nothing is saved).";
    window.alert("Welcome to Tadawul Academy, " + name + "!");
  } else {
    document.getElementById("signupMsg").innerHTML = "";
  }
  return false; // stay on the page, there is no server
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