import axios from "axios";

const instance = axios.create({
  baseURL: "https://ecommerce-l3s0.onrender.com/api",
});

export default instance;
