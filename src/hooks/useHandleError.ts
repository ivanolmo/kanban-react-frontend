import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";

import { resetModals, setError } from "~/store/uiSlice";
import type { ApiErrorResponse } from "~/types";

export const useHandleError = () => {
  const dispatch = useDispatch();

  const handleError = (error: FetchBaseQueryError | SerializedError) => {
    if ("status" in error) {
      const apiError = error.data as ApiErrorResponse;

      if (apiError && apiError.message) {
        dispatch(resetModals());
        dispatch(setError(apiError.message));
      } else {
        dispatch(setError("An unexpected server error occurred"));
      }
    } else {
      dispatch(setError(error.message ?? "An unexpected error occurred"));
    }
  };

  return handleError;
};
