import axios from "axios";

export const nodeAxios = axios.create({
  baseURL: "http://localhost:3032/",
  timeout: 10000,
});
