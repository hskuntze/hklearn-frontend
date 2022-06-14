import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import history from "./navigate";
import { getAuthData } from "./storage";

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ?? "http://localhost:8080";
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? "hklearn";
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? "hklearn123";

type LoginData = {
  username: string;
  password: string;
};


export const requestBackendLogin = (loginData: LoginData) => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET),
  };

  const data = qs.stringify({
    ...loginData,
    grant_type: "password",
  });

  return axios({
    method: "POST",
    baseURL: BASE_URL,
    url: "/oauth/token",
    data,
    headers,
  });
};

export const requestBackend = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: "Bearer " + getAuthData().access_token,
      }
    : config.headers;

  return axios({ ...config, baseURL: BASE_URL, headers });
};


axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    //Qualquer status code entre os 2xx vai dar trigger nessa função
    return response;
  },
  function (error) {
    //Qualquer status code fora dos 2xx vai dar trigger nessa função
    if (error.response.status === 401 || error.response.status === 403) {
      history.push("/");
    }
    return Promise.reject(error);
  }
);

