import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

import { type ApiBoardResponse } from "~/types";

// base query function
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// custom base query function that includes the auth token
// uses getSession rather than useSession because it's not in a react component
const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const session = await getSession();
  const token = session?.user.access_token;

  // check if args is of type FetchArgs, otherwise handle it as a string
  const fetchArgs: FetchArgs = typeof args === "string" ? { url: args } : args;

  return baseQuery(
    {
      ...fetchArgs,
      headers: {
        ...(fetchArgs.headers as Record<string, string>),
        Authorization: `Bearer ${token}`,
      },
    },
    api,
    extraOptions,
  );
};

// create the API slice
export const api = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Board"],
  endpoints: (builder) => ({
    getBoards: builder.query<ApiBoardResponse, void>({
      query: () => "boards",
    }),
  }),
});

export const { useGetBoardsQuery } = api;
