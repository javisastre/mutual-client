import axios from "axios";

class AlertService {
  constructor() {
    this.alert = axios.create({
      baseURL: "http://localhost:5000/api/alerts",
      withCredentials: true,
    });
  }

  create() {
    const pr = this.alert.post("/create").then(({ data }) => data);
    return pr;
  }

  active() {
    const pr = this.alert.get("/active/:alertId").then(({ data }) => data);
    return pr;
  }
}

const alertService = new AlertService();
export default alertService;
