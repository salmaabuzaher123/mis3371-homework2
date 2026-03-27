/*
Name: Salma Abuzaher
Date Created: 02/26/2026
Date Modified: 03/27/2026
Purpose: JS for Homework 2 Patient Registration Form
*/

//dynamic date code
const d = new Date();
let text = d.toLocaleDateString();
document.getElementById("today").innerHTML = text;

//name slider code
let slider = document.getElementById("range");
let output = document.getElementById("range_slider");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
};

//validating DOB
function validateDob() {
    dob = document.getElementById("dob");
    let date = new Date(dob.value);
    let maxDate = new Date().setFullYear(new Date().getFullYear() - 120);

    if (date > new Date()) {
        document.getElementById("dob-error").innerHTML = 
        "Date can't be in the future";
        dob.value = "";
        return false;
    } else if (date < new Date(maxDate)) {
        document.getElementById("dob-error").innerHTML = 
        "Date can't be more than 120 years ago";
        dob.value = "";
        return false;
    } else {
        document.getElementById("dob-error").innerHTML = "";
        return true;
    }
}

//validating SSN
function validateSsn() {
    const ssn = document.getElementById("ssn").value;
    const ssnR = /^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/;

    if (!ssnR.test(ssn)) {
        document.getElementById("ssn-error").innerHTML = 
        "Please enter a valid SSN";
        return false;
    } else {
        document.getElementById("ssn-error").innerHTML = "";
        return true;
    }
}

//validating zip
function validateZipcode() {
    const zipInput = document.getElementById("zipcode");
    let zip = zipInput.value.replace(/[^\d-]/g, "");

    if (!zip) {
        document.getElementById("zcode-error").innerHTML = 
        "Zip code can't be blank";
        return false;
    }

    if (zip.length > 5) {
        zip = zip.slice(0, 5) + "-" + zip.slice(5, 9);
    } else {
        zip = zip.slice(0, 5);
    }

    zipInput.value = zip;
    document.getElementById("zipcode-error").innerHTML = "";
    return true;
}

//validating address
function validateAddress1() {
  var ad1 = document.getElementById("address1").value;
  console.log(ad1);
  console.log(ad1.length);

  if (ad1.length < 2) {
    document.getElementById("address1-error").innerHTML =
    "Please enter your address on address line";
    return false;
  } else {
    document.getElementById("address1-error").innerHTML = "";
    return true;
  }
}

//validating email
function validateEmail() {
  email = document.getElementById("email").value;
  var emailR = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //regular expression pattern for email

  if (email == "") {
    document.getElementById("email-error").innerHTML =
    "Email Address cannot be empty";
    return false;
  } else if (!email.match(emailR)) {
    document.getElementById("email-error").innerHTML =
    "Please enter a valid Email Address";
    return false;
  } else {
    document.getElementById("email-error").innerHTML = "";
    return true;
  }
}

//validating phone number
function validatePhonenum() {
  const phoneInput = document.getElementById("phonenum");
  const phone = phoneInput.value.replace(/\D/g,""); //removes non-number characters

  if (phone.length !=10) {
    document.getElementById("phonenum-error").innerHTML =
    "Phone Number cannot be left blank";
    return false;
  }

  const formattedPhone =
  phone.slice(0,3) +"-"+ phone.slice(3,6) +"-"+ phone.slice(6,10)
  phoneInput.value = formattedPhone;
  document.getElementById("phonenum-error").innerHTML = "";
  return true;
}

//validating username
function validateUsername() {
  username = document.getElementById("username").value;

  //converts username to lowercase
  username = username.toLowerCase();
  document.getElementById("username").value = username;

  if (username.length === 0) {
    document.getElementById("username-error").innerHTML =
    "Username field cannot be empty";
    return false;
  }

  //checks that username doesn't start with a number
  if (!isNaN(username.charAt(0))){
    document.getElementById("username-error").innerHTML =
    "Username cannot begin with a number";
    return false;
  }

  //checks if username consists of only letters, numbers, or underscores
  let regex = /^[a-zA-Z0-9_-]+$/;
  if (!regex.test(username)) {
    document.getElementById("username-error").innerHTML =
    "Username can only contain letters, numbers, or underscores";
    return false;

  } else if (username.length < 5) {
    document.getElementById("username-error").innerHTML =
    "Username cannot be less than 5 characters";
    return false;
  } else if (username.length > 30) {
    document.getElementById("username-error").innerHTML =
    "Username cannot exceed 30 characters";
    return false;
  } else {
    document.getElementById("username-error").innerHTML = "";
    return true;
  }
}

//validating password
function validatePassword() {
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;

  //sets up and initializes array
  const errorMessage = [];

  //checks for lowercase letters
  if (!password.match(/[a-z]/)) {
    errorMessage.push("Enter at least one lowercase letter");
  }
  //checks for uppercase letters
  if (!password.match(/[A-Z]/)) {
    errorMessage.push("Enter at least one uppercase letter");
  }
  //checks for numbers
  if (!password.match(/[0-9]/)) {
    errorMessage.push("Enter at least one number");
  }
  //checks for special characters
  if (!password.match(/[!\@#\$%&*\-_\\.+\(\)]/)) {
    errorMessage.push("Enter at least one special character");
  }
  //checks for username not in password
  if (password == username || password.includes(username)) {
    errorMessage.push("Password cannot contain username");
  }
  //displays error message if theres errors
  const errorContainer = document.querySelector(".pass-message");
  errorContainer.innerHTML = errorMessage
  .map(msg => `<span>${msg}</span><br>`)
  .join("");
}

//validating confirm password
function confirmPassword() {
  password1 = document.getElementById("password").value;
  password2 = document.getElementById("confirm").value;

  if (password1 !== password2) {
    document.getElementById("password2-error").innerHTML =
    "Passwords do not match";
    return false;
  } else {
    document.getElementById("password2-error").innerHTML =
    "Passwords match";
    return true;
  }
}

//review button 
function reviewInput() {
    var formcontent = document.getElementById("signup");
    var formoutput = "<table class='output'><tr><th colspan='2'>Review Your Information:</th></tr>";

    for (var i = 0; i < formcontent.elements.length; i++) {
        var el = formcontent.elements[i];
        var datatype = el.type;
        var name = el.name;
        var value = el.value;

        // skip elements with no name
        if (!name) continue;

        switch (datatype) {
            case "checkbox":
                if (el.checked) {
                    formoutput += "<tr><td align='right'>" + name + "</td>";
                    formoutput += "<td class='outputdata'>&#x2713;</td></tr>";
                }
                break;

            case "radio":
                if (el.checked) {
                    formoutput += "<tr><td align='right'>" + name + "</td>";
                    formoutput += "<td class='outputdata'>" + value + "</td></tr>";
                }
                break;

            case "range":
                // Only show the slider if the user moved it off the default (0)
                if (value !== "0") {
                    formoutput += "<tr><td align='right'>" + name + "</td>";
                    formoutput += "<td class='outputdata'>" + value + "</td></tr>";
                }
                break;

            case "button":
            case "submit":
            case "reset":
                // skip
                break;

            default:
                if (value !== "") {
                    formoutput += "<tr><td align='right'>" + name + "</td>";
                    formoutput += "<td class='outputdata'>" + value + "</td></tr>";
                }
        }
    }

    formoutput += "</table>";
    document.getElementById("showInput").innerHTML = formoutput;
}

//remove user input
function removeReview() {
  document.getElementById("showInput").innerHTML = "";
}
                                      
