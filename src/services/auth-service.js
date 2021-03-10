import axios from "axios";

class AuthService {
  constructor() {
    this.auth = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true
    });
  }

  signup(username, email, password) {
    const pr = this.auth
      .post("/auth/signup", { username, email, password })
      .then((response) => response.data);
    // .then(({ data }) => data); // Shorter way of `.then((response) => response.data);`

    return pr;
  }

  login(username, password) {
    const pr = this.auth
      .post("/auth/login", { username, password })
      .then((response) => response.data);

    return pr;
  }

  logout() {
    const pr = this.auth.get("/auth/logout").then((response) => response.data);

    return pr;
  }

  me() {
    const pr = this.auth.get("/auth/me").then((response) => {
      return response.data;
    });

    return pr;
  }
}

const authService = new AuthService();

export default authService;
