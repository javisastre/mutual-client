import axios from "axios";

class UserService {
  constructor() {
    this.user = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/users`,
      withCredentials: true,
    });
  }

  alertSender(senderId) {
    const pr = this.user
      .get("/alert-sender", { senderId })
      .then(({ data }) => data);
    return pr;
  }
}

const userService = new UserService();
export default userService;
