import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_TOKEN_COOKIE, getClientCookie } from "@/lib/auth/session";

// Define your base API URL
// const baseUrl = "http://localhost:5000/api";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = getClientCookie(AUTH_TOKEN_COOKIE);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["Users"],
});
