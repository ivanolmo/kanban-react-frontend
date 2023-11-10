import type { ApiBoardResponse, Board } from "~/types";

// Utility function to transform ApiBoardResponse to a consistent frontend type
export const transformApiResponse = (response: ApiBoardResponse): Board[] => {
  // Ensure that the data is always returned as an array
  return Array.isArray(response.data) ? response.data : [response.data];
};
