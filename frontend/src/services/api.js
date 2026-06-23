import axios from "axios";

const api = axios.create({
  baseURL:
    "https://codevector-product-browser-3pzy.onrender.com/api",
});

export default api;