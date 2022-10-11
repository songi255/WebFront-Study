const axios = require("axios");

const api = axios.create({
  baseURL: "http://localhost:8090"
});

export const dataLap = {
  get: () => {
    return api.get("/data");
  },
  post: (data) => {
    console.log(data);
    return api.post("/data", data);
  },
  delete: () => {
    return api.delete("/data");
  }
}