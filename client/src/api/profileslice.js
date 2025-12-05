import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta?.env?.VITE_API_URL || "http://localhost:4000" }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (id) => `profile/det/${id}`,
    }),
    saveProfile: builder.mutation({
      query: (body) => ({
        url: `profile/det/${body.id}`,
        method: "POST",
        body,
      }),
    }),
  }),
})

export const { useGetProfileQuery, useSaveProfileMutation } = profileApi
