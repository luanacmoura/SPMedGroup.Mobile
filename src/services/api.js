import axios from "axios";

const api = axios.create({
  baseURL: "https://spmedgroupwebapi.azurewebsites.net/api"
});

export default api;