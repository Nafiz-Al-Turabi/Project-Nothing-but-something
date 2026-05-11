import { baseApi } from "../baseApi";

export const authApis = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    login: build.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    me: build.query({
      query: (data) => ({
        url: "/auth/me",
        method: "GET",
        body: data,
      }),
    }),
  }),
  
});

export const { useRegisterMutation, useLoginMutation, useMeQuery } = authApis;
