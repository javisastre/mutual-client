import axios from "axios";

class NetService {
  constructor() {
    this.net = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/nets`,
      withCredentials: true,
    });
  }

  create(netname, netcode) {
    const pr = this.net
      .post("/create", { netname, netcode })
      .then(({ data }) => data);
    return pr;
  }

  join(netname, netcode) {
    const pr = this.net
      .put("/join", { netname, netcode })
      .then(({ data }) => data);
    return pr;
  }

  leave(netId) {
    const pr = this.net
      .post("/leave", { value: netId })
      .then(({ data }) => data);
    return pr;
  }
}

const netService = new NetService();
export default netService;
