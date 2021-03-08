import axios from "axios";

class UserService {
  constructor() {
    this.user = axios.create({
      baseURL: "http://localhost:5000/api/nets",
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
