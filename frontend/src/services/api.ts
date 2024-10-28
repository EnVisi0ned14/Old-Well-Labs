import { AxiosRequestConfig } from "axios";
import customAxios from "./axios-config";

const BASE_API_URL = "api/v1/";

const api = {
  get(url: string, config?: AxiosRequestConfig<any>) {
    return customAxios.get(`${BASE_API_URL}${url}`, config);
  },
  post(url: string, data: object) {
    return customAxios.post(`${BASE_API_URL}${url}`, data);
  },
  put(url: string, data: object) {
    customAxios.put(`${BASE_API_URL}${url}`, data);
  },
  delete(url: string) {
    return customAxios.delete(`${BASE_API_URL}${url}`);
  },
};

export default api;
