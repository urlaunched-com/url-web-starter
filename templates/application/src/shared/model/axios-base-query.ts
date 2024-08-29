import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { getCookie } from "../lib";

import { IAxiosBaseQueryArgs } from "./axios-base-query.types";

export const axiosBaseQuery =
  (
    { baseUrl, version }: IAxiosBaseQueryArgs = {
      baseUrl: `https://${process.env.NEXT_PUBLIC_API_URL}/`,
      version: "v1",
    }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      isDirectUrl?: boolean;
    },
    unknown,
    unknown
  > =>
    async ({ url, method, data, params, headers, isDirectUrl }) => {
      const token = getCookie("Authorization");

      try {
        const result = await axios({
          url: isDirectUrl ? url : baseUrl + version + url,
          method,
          data,
          params,
          headers: {
            ...(token && !isDirectUrl && { Authorization: token }),
            ...headers,
          },
        });

        return {
          data: result.data,
          meta: {
            headers: result.headers,
          },
        };
      } catch (axiosError) {
        const err = axiosError as AxiosError;
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        };
      }
    };
