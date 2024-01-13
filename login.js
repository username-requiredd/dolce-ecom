const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const login = document.getElementById("login");

login.addEventListener("click", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email !== "" && password !== "") {
    const user = [
      {
        userEmail: email,
        userPassword: password,
      },
    ];
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "userDashBoard.html";
  } else {
    alert("email or password field cannot be left empty");
  }
});
