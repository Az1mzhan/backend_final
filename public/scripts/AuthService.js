import axios from "axios";

class AuthService {
  constructor() {
    this.authToken = null;
  }

  getAuthToken() {
    return this.authToken;
  }

  setAuthToken(token) {
    this.authToken = token;
  }

  clearAuthToken() {
    this.authToken = null;
  }

  async handleLogin(username, password) {
    try {
      const response = await axios.post("/login", { username, password });
      const data = response.data;

      if (response.status === 200) {
        this.setAuthToken(data.token);
        console.log("User logged in successfully");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  }

  async makeAuthenticatedRequest() {
    const token = this.getAuthToken();

    if (!token) {
      console.error("No token available. User is not authenticated.");
      return;
    }

    try {
      const response = await axios.get("/api/some-protected-endpoint", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const responseData = response.data;
        console.log("Authenticated request successful:", responseData);
      } else {
        console.error("Authenticated request failed:", response.status);
      }
    } catch (error) {
      console.error("Authenticated request failed:", error.message);
    }
  }

  handleLogout() {
    this.clearAuthToken();
    console.log("User logged out");
  }
}

export default new AuthService();
