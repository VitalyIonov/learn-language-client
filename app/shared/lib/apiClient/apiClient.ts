import axios, { type AxiosInstance } from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

import { getHeaders } from "~/shared/lib/apiClient/helpers/getHeaders";
import { logout } from "~/shared/lib/auth";

const API_ROOT = import.meta.env.VITE_API_URL as string;

function createAxios(baseURL: string): AxiosInstance {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    headers: getHeaders(),
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    },
  );

  return instance;
}

const clientAxios = createAxios(`${API_ROOT}/client`);
const authAxios = createAxios(`${API_ROOT}/auth`);

export async function clientRequest<ResponseData, RequestData = never>(
  axiosConfig: AxiosRequestConfig<RequestData>,
) {
  const preparedAxiosConfig = { ...axiosConfig };

  const response = await clientAxios.request<
    ResponseData,
    AxiosResponse<ResponseData>
  >(preparedAxiosConfig);

  return response.data;
}

export async function authRequest<ResponseData, RequestData = never>(
  axiosConfig: AxiosRequestConfig<RequestData>,
) {
  const preparedAxiosConfig = { ...axiosConfig };

  const response = await authAxios.request<
    ResponseData,
    AxiosResponse<ResponseData>
  >(preparedAxiosConfig);

  return response.data;
}
//
// const axiosClient = axios.create({
//   baseURL: process.env.VITE_API_URL,
//   withCredentials: true,
//   headers: getHeaders(),
// });
//
// axiosClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       logout();
//     }
//     return Promise.reject(error);
//   },
// );
//
// export async function request<ResponseData, RequestData = never>(
//   axiosConfig: AxiosRequestConfig<RequestData>,
// ) {
//   const preparedAxiosConfig = { ...axiosConfig };
//
//   const response = await axiosClient.request<
//     ResponseData,
//     AxiosResponse<ResponseData>
//   >(preparedAxiosConfig);
//
//   return response.data;
// }
