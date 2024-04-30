import type { AxiosInstance } from "axios";

export const auth = (axios: AxiosInstance) => ({

  async login(params: any): Promise<any> {
    return axios.post("/login", params);
  },

  async register(params: any): Promise<any> {
    return axios.post("/register", params);
  },

  async logout(): Promise<any> {
    return axios.post(`/logout`);
  }
});