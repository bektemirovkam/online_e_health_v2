import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3032/",
  timeout: 10000,
  headers: {
    Authorization: "Basic YWRtaW46cGNaNzY5WD0tLUxTSlgmK1c3",
  },
});
