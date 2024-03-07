import axios, { AxiosError, AxiosResponse } from "axios";

let refresh = false;

axios.interceptors.response.use(
  (resp: AxiosResponse) => resp,
  async (error: AxiosError) => {
    if (error.response?.status === 401 && !refresh) {
      refresh = true;

      try {
        const response = await axios.post(
          "http://3.254.68.200:8000/token/refresh/",
          {
            refresh: localStorage.getItem("refresh_token"),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data["access"]}`;
          localStorage.setItem("access_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);
          if (error.config) {
            return axios(error.config);
          } else {
            return Promise.reject(error);
          }
        }
      } catch (refreshError) {}
    }

    refresh = false;
    return Promise.reject(error);
  }
);
