import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { resetModals, setError } from "~/store/uiSlice";
import { act, renderHook, renderHookWithMockDispatch } from "~/utils/testUtils";
import { useHandleError } from "~/hooks/useHandleError";

describe("useHandleError", () => {
  test("should handle FetchBaseQueryError with message", () => {
    const { Wrapper, mockDispatch } = renderHookWithMockDispatch();

    const { result } = renderHook(() => useHandleError(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current({
        status: 500,
        data: { message: "Server error" },
      } as FetchBaseQueryError);
    });

    expect(mockDispatch).toHaveBeenCalledWith(setError("Server error"));
  });

  test("should handle FetchBaseQueryError without message", () => {
    const { Wrapper, mockDispatch } = renderHookWithMockDispatch();

    const { result } = renderHook(() => useHandleError(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current({
        status: 500,
      } as FetchBaseQueryError);
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setError("An unexpected server error occurred"),
    );
  });

  test("should handle SerializedError with message", () => {
    const { Wrapper, mockDispatch } = renderHookWithMockDispatch();

    const { result } = renderHook(() => useHandleError(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current({
        message: "Error",
      });
    });

    expect(mockDispatch).toHaveBeenCalledWith(setError("Error"));
  });

  test("should handle SerializedError without message", () => {
    const { Wrapper, mockDispatch } = renderHookWithMockDispatch();

    const { result } = renderHook(() => useHandleError(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current({});
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setError("An unexpected error occurred"),
    );
  });

  test("should handle other errors", () => {
    const { Wrapper, mockDispatch } = renderHookWithMockDispatch();

    const { result } = renderHook(() => useHandleError(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current({
        message: "An unexpected error occurred",
      } as SerializedError);
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setError("An unexpected error occurred"),
    );
  });

  test("should reset modals", () => {
    const { Wrapper, mockDispatch } = renderHookWithMockDispatch();

    const { result } = renderHook(() => useHandleError(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current({
        status: 500,
        data: { message: "Server error" },
      } as FetchBaseQueryError);
    });

    expect(mockDispatch).toHaveBeenCalledWith(resetModals());
  });
});
