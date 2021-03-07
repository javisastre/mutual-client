import axios from "axios";

class NetService {
  constructor() {
    this.net = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true,
    });
  }

  create(netname, netcode) {
    const pr = this.net
      .post("/api/nets/create", { netname, netcode })
      .then(({ data }) => data);
    return pr;
  }

  join(netname, netcode) {
    const pr = this.net
      .put("/api/nets/join", { netname, netcode })
      .then(({ data }) => data);
    return pr;
  }

  leave(netId) {
    const pr = this.net
      .post("/api/nets/leave", { netId })
      .then(({ data }) => data);
    return pr;
  }
}

const newService = new NetService();
export default netService;
