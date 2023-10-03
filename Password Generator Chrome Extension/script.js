// Creater a firebase accoutnt and then create an app and Get your firebase app details and change here
var firebaseConfig = {
  apiKey: "Your_API_Key",
  authDomain: "Your_Domain",
  projectId: "Your_Project_Id",
  storageBucket: "Your_Storage_bucket",
  messagingSenderId: "Your_Sender_ID",
  appId: "Your_App_Id",
  measurementId: "Your_measurementId"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase database
var database = firebase.database();

// Get references to the HTML elements
var urlInput = document.getElementById("url");
var usernameInput = document.getElementById("username");
var passwordLengthInput = document.getElementById("password-length");
var uppercaseCheckbox = document.getElementById("uppercase");
var lowercaseCheckbox = document.getElementById("lowercase");
var numbersCheckbox = document.getElementById("numbers");
var symbolsCheckbox = document.getElementById("symbols");
var generateButton = document.getElementById("generate");
var passwordResultDiv = document.getElementById("password-result");
var saveButton = document.getElementById("save");
var saveResultDiv = document.getElementById("save-result");
var retrieveButton = document.getElementById("retrieve");
var retrieveResultDiv = document.getElementById("retrieve-result");

// Generate a random password
function generatePassword() {
  var length = parseInt(passwordLengthInput.value);
  var uppercase = uppercaseCheckbox.checked;
  var lowercase = lowercaseCheckbox.checked;
  var numbers = numbersCheckbox.checked;
  var symbols = symbolsCheckbox.checked;

  var uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  var numberChars = "0123456789";
  var symbolChars = "!@#$%^&*()_-+=[]{}|:;<>?,.";

  var allChars = "";
  if (uppercase) {
    allChars += uppercaseChars;
  }
  if (lowercase) {
    allChars += lowercaseChars;
  }
  if (numbers) {
    allChars += numberChars;
  }
  if (symbols) {
    allChars += symbolChars;
  }

  var password = "";
  for (var i = 0; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  passwordResultDiv.innerHTML = password;
}

// Save the password to the Firebase database
function savePassword() {
  var url = urlInput.value;
  var username = usernameInput.value;
  var password = passwordResultDiv.innerHTML;

  // Push the data to the Firebase database
  database.ref("passwords").push({
    url: url,
    username: username,
    password: password
  });

  // Display a success message
  saveResultDiv.innerHTML = "Password saved successfully!";
}

// Retrieve the saved passwords from the Firebase database
function retrievePasswords() {
  // Get a reference to the "passwords" node in the Firebase database
  var passwordsRef = database.ref("passwords");

  // Retrieve the data from the Firebase database
  passwordsRef.on("value", function(snapshot) {
    // Clear the retrieveResultDiv
    retrieveResultDiv.innerHTML = "";

    // Loop through the passwords and display them in the retrieveResultDiv
    snapshot.forEach(function(childSnapshot) {
      var password = childSnapshot.val();
      retrieveResultDiv.innerHTML += "URL: " + password.url + "<br>" +
                                  "Username: " + password.username + "<br>" +
                                  "Password: " + password.password + "<br><br>";
    });
  });
}

// Add event listeners to the generate, save, and retrieve buttons
generateButton.addEventListener("click", generatePassword);
saveButton.addEventListener("click", savePassword);
retrieveButton.addEventListener("click", retrievePasswords);

// Retrieve the saved passwords when the page loads
retrievePasswords();
