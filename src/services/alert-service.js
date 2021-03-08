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

  active(alertId) {
    const pr = this.alert.get(`/active/${alertId}`).then(({ data }) => data);
    return pr;
  }

  delete(alertId) {
    const pr = this.alert
      .post("/delete", { value: alertId })
      .then(({ data }) => data);
    return pr;
  }

  iamfine(alertId) {
    const pr = this.alert
      .post("/iamfine", { value: alertId })
      .then(({ data }) => data);
    return pr;
  }

  archive(alertId) {
    const pr = this.alert
      .post("/archive", { alertId, category, story, public })
      .then(({ data }) => data);
    return pr;
  }
}

const alertService = new AlertService();
export default alertService;
