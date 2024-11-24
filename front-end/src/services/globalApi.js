import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const API_BASE_URL = import.meta.env.VITE_STRAPI_BASE_URL;

axios.defaults.headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

axios.defaults.baseURL = API_BASE_URL;
