import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  let instance = axios.create({
    baseURL: config.public.middlewareURL ?? import.meta.env.VITE_BE_URL,
  });

  instance.interceptors.request.use(
    (request) => {
      request.headers["Accept"] = "application/json";
      request.headers["Content-Type"] = "application/json";
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // You can set the instance on the Nuxt app so it can be accessed globally via useNuxtApp
  nuxtApp.provide("regular", instance);
});