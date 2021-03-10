import axios from "axios";

class AlertService {
  constructor() {
    this.alert = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/alerts`,
      withCredentials: true,
    });
  }

  create(locationArray) {
    const pr = this.alert
    .post("/create", { locationArray })
    .then(({ data }) => data);
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

  archive(alertObj) {
    const pr = this.alert.post("/archive", alertObj).then(({ data }) => data);
    return pr;
  }

  heatmap() {
    const pr = this.alert.get("/heatmap").then(({ data }) => data);
    return pr;
  }
}

const alertService = new AlertService();
export default alertService;
