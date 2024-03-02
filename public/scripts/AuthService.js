import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";

class AuthService {
  constructor() {
    this.authToken = null;
  }

  getAuthToken = () => {
    return this.authToken;
  };

  setAuthToken = (token) => {
    this.authToken = token;
  };

  clearAuthToken = () => {
    this.authToken = null;
  };

  handleAuth = async (username, password) => {
    try {
      const response = await axios.post("/", { username, password });
      const data = response.data;

      if (response.status === 200) {
        this.setAuthToken(data.token);
        console.log("User logged in successfully");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  makeAuthenticatedRequest = async (method, route) => {
    const token = this.getAuthToken();

    if (!token) {
      console.error("No token available. User is not authenticated.");
      return;
    }

    try {
      let response;
      const httpHeaders = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      switch (method) {
        case "GET":
          response = await axios.get(route, httpHeaders);
          break;
        case "POST":
          response = await axios.post(route, httpHeaders);
          break;
        case "PUT":
          response = await axios.put(route, httpHeaders);
          break;
        case "DELETE":
          response = await axios.delete(route, httpHeaders);
          break;
      }

      if (response.status === 200) {
        const responseData = response.data;
        console.log("Authenticated request successful:", responseData);
      } else {
        console.error("Authenticated request failed:", response.status);
      }
    } catch (error) {
      console.error("Authenticated request failed:", error.message);
    }
  };

  handleLogout = () => {
    this.clearAuthToken();
    console.log("User logged out");
  };
}

const authService = new AuthService();

export default authService;
