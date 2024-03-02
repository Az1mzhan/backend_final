import loginHandler from "./LoginHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("login-button")
    .addEventListener("click", loginHandler.submitLogin);
});
