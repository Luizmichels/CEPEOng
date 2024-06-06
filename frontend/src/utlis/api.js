import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export default api;

export const get = (url, data = {}) => api.get(url, data);
export const post = (url, data = {}) => api.post(url, data);
export const put = (url, data = {}) => api.put(url, data);
