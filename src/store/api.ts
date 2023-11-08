import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

import type { CreateBoardInput } from "~/components/modal/AddBoard";
import type { EditBoardInput } from "~/components/modal/EditBoard";
import type { ApiBoardResponse, Board } from "~/types";
import { transformApiResponse } from "~/utils/transformers";

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
  tagTypes: ["Boards"],
  endpoints: (builder) => ({
    getBoards: builder.query<Board[], void>({
      query: () => "boards",
      transformResponse: (response: ApiBoardResponse) =>
        transformApiResponse(response),
      providesTags: ["Boards"],
    }),
    createBoard: builder.mutation<Board, CreateBoardInput>({
      query: (body) => ({
        url: "boards",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiBoardResponse) => response.data as Board,
      invalidatesTags: ["Boards"],
    }),
    editBoard: builder.mutation<Board, EditBoardInput>({
      query: ({ id, ...body }) => ({
        url: `boards/${id}`,
        method: "PUT",
        body,
      }),
      transformResponse: (response: ApiBoardResponse) => response.data as Board,
      invalidatesTags: ["Boards"],
    }),
    deleteBoard: builder.mutation<void, string>({
      query: (id) => ({
        url: `boards/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Boards"],
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Boards"],
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useCreateBoardMutation,
  useEditBoardMutation,
  useDeleteBoardMutation,
  useDeleteTaskMutation,
} = api;
