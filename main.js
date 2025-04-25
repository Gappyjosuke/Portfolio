const input = document.getElementById("usernameInput");

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const username = input.value.trim();
    if (username !== "") {
      localStorage.setItem("portfolioUsername", username);
      window.location.href = "boot.html";
    }
  }
});
