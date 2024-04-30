import type { AxiosInstance } from "axios";
import { defineStore } from "pinia";
import { auth } from "~/utils/repository/auth";

export const useAuthStore = defineStore("authStore", () => {
    const { $axios, $auth } = useNuxtApp();
    const regularRepo = auth($axios as AxiosInstance);
    const authRepo = auth($auth as AxiosInstance);

    /*** STATE */
    const user = useCookie("user");
    const token = useCookie("token");
    const authenticated = useCookie("authenticated");

    /*** COMPUTED */
    const isAuthenticated = computed(() => {
      return authenticated.value ?? false;
    });
    
    const getUser = computed(() => {
      return user.value ?? {};
    });

    /*** FUNC */
    const login = ($params: any) => {
        regularRepo
          .login($params)
          .then((res: any) => {
            console.log(res)
            const data = res.data;
            user.value = data.user;
            authenticated.value = "true";
            token.value = data.access_token;
            window.location.href = "/";
          })
          .catch((err: any) => {
           console.log(err.response.data.message);
          })
      };
    
      const register = ($params: any) => {
        regularRepo
          .register($params)
          .then((res: any) => {
            window.location.href = "/login";
          })
          .catch((err: any) => {
            console.log(err.response.data.message);
          })
      };

      const logout = async () => {
        return await authRepo.logout()
      }


      return {
        register,
        login,
        logout,
        isAuthenticated,
        getUser,
      }
});