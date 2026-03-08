const userName = document.getElementById("username");
const password = document.getElementById("password");
const signInBtn = document.getElementById("sign-in-btn");

//Sign In Authentication
signInBtn.addEventListener("click", () => {
  if (userName.value === "admin" && password.value === "admin123") {
    window.location.href = "./home.html";
  } else {
    alert("Invalid Username or Password! Please try again");
  }
});

// Enter key Sign In
[userName, password].forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      signInBtn.click();
    }
  });
});
