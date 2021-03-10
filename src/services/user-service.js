import axios from "axios";

class UserService {
  constructor() {
    this.user = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/users`,
      withCredentials: true,
    });
  }

  findUser(userId) {
    const pr = this.user
      .get(`/user/${userId}`)
      .then((response) => response.data);
    return pr;
  }

  findAllUsers() {
    const pr = this.user.get("/all").then((response) => response.data);
    return pr;
  }
}

const userService = new UserService();
export default userService;
