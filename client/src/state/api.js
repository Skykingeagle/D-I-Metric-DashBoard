import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "Dept",
    "Employees",
    "Region",
    "Position",
    "Performance",
    "Sources",
    "Satisfaction",
    "SatisfactionSource",
    "PayRate",
    "RatePrediction",
    "MalePrediction",
    "FemalePrediction",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getDept: build.query({
      query: () => "client/overview",
      providesTags: ["Dept"],
    }),
    getEmp: build.query({
      query: () => "client/employees",
      providesTags: ["Employees"],
    }),
    getRegion: build.query({
      query: () => "client/region",
      providesTags: ["Region"],
    }),
    getPos: build.query({
      query: () => "client/position",
      providesTags: ["Position"],
    }),
    getPerformance: build.query({
      query: () => "client/performance",
      providesTags: ["Performance"],
    }),
    getSources: build.query({
      query: () => "client/sources",
      providesTags: ["Sources"],
    }),
    getSat: build.query({
      query: () => "client/satisfaction",
      providesTags: ["Satisfaction"],
    }),
    getPayRate: build.query({
      query: () => "management/payrate",
      providesTags: ["PayRate"],
    }),
    getPredPay: build.query({
      query: () => "management/rate",
      providesTags: ["RatePrediction"],
    }),
    getPredMale: build.query({
      query: () => "management/male",
      providesTags: ["MalePrediction"],
    }),
    getPredFemale: build.query({
      query: () => "management/female",
      providesTags: ["FemalePrediction"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
    register: build.mutation({
      query: (user) => ({
        url: "auth/register",
        method: "POST",
        body: user,
      }),
    }),
    login: build.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    pushForm: build.mutation({
      query: (formData) => ({
        url: "general/form",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetDeptQuery,
  useGetEmpQuery,
  useGetRegionQuery,
  useGetPosQuery,
  useGetPerformanceQuery,
  useGetSourcesQuery,
  useGetSatQuery,
  useGetPayRateQuery,
  useGetPredPayQuery,
  useGetPredMaleQuery,
  useGetPredFemaleQuery,
  useGetDashboardQuery,
  useRegisterMutation,
  useLoginMutation,
  usePushFormMutation,
} = api;
