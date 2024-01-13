const signup = document.getElementById("signup");
signup.addEventListener("click", (e) => {
  e.preventDefault();

  const dontMatch = document.getElementById("match");
  // Get the current values inside the event listener
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document
    .getElementById("comfirmpassword")
    .value.trim();

  if (email !== "" && password !== "" && confirmPassword !== "") {
    if (password === confirmPassword) {
      console.log("Creating user object");

      const user = [
        {
          userEmail: email,
          userPassword: password,
        },
      ];

      localStorage.setItem("user", JSON.stringify(user));

      // Optionally, you can redirect to another page after successful sign-up
      window.location.href = "checkout.html";
    } else {
      dontMatch.textContent = "Password do not match!";
      console.log("Passwords do not match");
    }
  } else {
    dontMatch.textContent = "empty fileds!";

    console.log("Empty fields");
  }
});
