import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";
import authService from "./AuthService.js";

class RegisterHandler {
  submitRegister = async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const email = document.getElementById("email").value;
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const birthday = document.getElementById("birthday").value;
    const country = document.getElementById("country").value;
    const isAdmin = document.getElementById("is-admin").checked;

    if (password !== confirmPassword) return;

    await axios.post("/register", {
      username: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
      country: country,
      isAdmin: isAdmin,
    });

    const recipient = {
      address: email,
    };

    const emailData = {
      subject: "Greetings from Postify!",
      content: `Hello, dear ${username}! If you see this letter, it will mean that you successfully registered on our platform. Congratulations!`,
    };

    await axios.post("/email", {
      recipient: recipient,
      emailData: emailData,
    });

    await authService.handleAuth(username, password).then(() => {
      console.log(authService.getAuthToken());
      window.location.href = "/posts";
    });
  };
}

export default new RegisterHandler();
