import registerHandler from "./RegisterHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("registration-button")
    .addEventListener("click", registerHandler.submitRegister);
});
