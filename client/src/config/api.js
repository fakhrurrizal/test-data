import axios from "axios";

export const API = axios.create({
  baseURL: "https://test-data-production.up.railway.app/api/v1",
});
