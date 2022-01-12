import axios, { AxiosRequestConfig } from "axios";
import { Dialog, Toast } from "vant";
import router from "./router";

const API_BASE = "/api";

const getToken = () => localStorage.getItem("token") || "";

export const setToken = (val: string) => localStorage.setItem("token", val);

const globalErrorHandler = (e: any) => {
  console.error(e);
  Toast.clear();
  Dialog.alert(e.message || e);
};

export const defaultErrorHandler = (e: any) => {
  console.error(e);
  if (e._handle) return;
  setTimeout(() => {
    Toast({
      message: e.message,
      duration: 3000,
    });
  });
};

const request = axios.create({
  baseURL: API_BASE,
  timeout: 10_000,
  headers: {
    "content-type": "application/x-www-form-urlencoded",
  },
});

request.interceptors.request.use((config) => {
  config.headers ??= {};
  config.headers["Token"] = getToken();
  return config;
});

request.interceptors.response.use(
  (res) => {
    if (res.data?.code) {
      // 401
      if (~res.data?.msg.indexOf("token")) {
        router.replace({ name: "Login" });
      }

      const error = new Error(res.data?.msg || "server error");
      // @ts-ignore
      error._handle = true;
      return Promise.reject(error);
    }
    return res;
  },
  (error) => {
    globalErrorHandler(error);
    return Promise.reject({ ...error, _handle: true });
  }
);

export const POST = async (options: AxiosRequestConfig) => {
  const res = await request({ method: "post", ...options });
  return res?.data?.data;
};