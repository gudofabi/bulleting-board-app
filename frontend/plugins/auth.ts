import axios from "axios";
import { useClientCookie, clearAllCookies } from "~/composables/useCookie";
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  let instance = axios.create({
    baseURL: config.public.middlewareURL ?? import.meta.env.VITE_BE_URL,
  });

  instance.interceptors.request.use(
    (request) => {
      const token = useClientCookie("token");
      if (token) {
        request.headers["Authorization"] = `Bearer ${token}`;
      }
      request.headers["Accept"] = "application/json";
      request.headers["Content-Type"] = "application/json";
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        clearAllCookies();
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  // You can set the instance on the Nuxt app so it can be accessed globally via useNuxtApp
  nuxtApp.provide("auth", instance);
});