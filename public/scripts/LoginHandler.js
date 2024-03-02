import authService from "./AuthService.js";

class LoginHandler {
  submitLogin = async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    await authService.handleAuth(username, password).then(() => {
      console.log(authService.getAuthToken());
      window.location.href = "/posts";
    });
  };
}

export default new LoginHandler();
