  // Function to redirect to the homepage if the user is logged in
  function redirectToHomepage() {
    // Retrieve user data from local storage
    var users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the logged-in user
    var loggedInUser = users.find(function(u) {
      return u.isLoggedIn === true;
    });

    if (loggedInUser) {
      // Redirect to homepage
      window.location.href = "homepage.html";
    }
  }

  // Function to handle login
  function handleLogin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Check if the user is an admin or not
    if (username === "admin" && password === "admin") {
      // Redirect to the admin page
      window.location.href = "admin.html";
      return;
    }

    // Retrieve user data from local storage
    var users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user with the entered username and password
    var user = users.find(function(u) {
      return u.username === username && u.password === password;
    });

    if (user) {
      // Mark the user as logged in
      user.isLoggedIn = true;

      // Store the updated user data in local storage
      localStorage.setItem("users", JSON.stringify(users));

      // Store the logged-in user in local storage
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      // Redirect to the homepage
      window.location.href = "homepage.html";
    } else {
      // Login failed
      alert("Invalid username or password");
    }
  }

  function handleRegistration() {
    var username = document.getElementById("txtUserName").value;
    var email = document.getElementById("txtEmail").value;
    var password = document.getElementById("txtPwd").value;
  
    // Validate email format
    if (!isValidEmail(email)) {
      alert("Invalid email format. Please enter a valid email address.");
      return;
    }
  
    // Validate password length
    if (password.length < 6) {
      alert("Password should be at least 6 characters long.");
      return;
    }
  
    // Retrieve user data from local storage
    var users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Check if the entered username already exists
    var existingUser = users.find(function(u) {
      return u.username === username;
    });
  
    if (existingUser) {
      alert("Username already exists. Please choose a different username.");
    } else {
      // Find the maximum guest ID in the existing users
      var maxGuestId = Math.max(...users.map(function(u) { return u.guestId; }), 0);
  
      // Generate the new guest ID
      var guestId = maxGuestId + 1;
  
      // Create a new user object with the guest ID
      var newUser = {
        username: username,
        email: email,
        password: password,
        isLoggedIn: false,
        guestId: guestId
      };
  
      // Add the new user to the user data
      users.push(newUser);
  
      // Store the updated user data in local storage
      localStorage.setItem("users", JSON.stringify(users));
  
      alert("Registration successful! Please log in.");
      // Switch to the login form
      showLoginForm();
    }
  }


  function showRegForm(event) {
    event.preventDefault(); // Prevent the default behavior of the link
    document.getElementById("login-Form").style.display = "none";
    document.getElementById("registrationForm").style.display = "block";
    document.getElementById("txtUserName").value = ""; // Clear the username field
    document.getElementById("txtEmail").value = ""; // Clear the email field
    document.getElementById("txtPwd").value = ""; // Clear the password field
  }


  function showLoginForm(event) {
    event.preventDefault(); // Prevent the default behavior of the link
    document.getElementById("registrationForm").style.display = "none";
    document.getElementById("login-Form").style.display = "block";
    document.getElementById("username").value = ""; // Clear the username field
    document.getElementById("password").value = ""; // Clear the password field
  }

  // Attach event listeners to the login and registration buttons

  document.getElementById("submit").addEventListener("click", handleLogin);
  document.getElementById("btnSignUp").addEventListener("click", handleRegistration);

  const signupLink = document.getElementById('signup-link');
  signupLink.addEventListener('click', showRegForm);

  const loginLink = document.getElementById("login-link");
  loginLink.addEventListener('click', showLoginForm);


  function isValidEmail(email){
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }

