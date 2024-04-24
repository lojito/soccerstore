import { act, renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import useFetchFavorites from "../useFetchFavorites";

vi.mock("axios");

vi.mock("react-redux", () => ({
  ...vi.importActual("react-redux"),
  useDispatch: vi.fn().mockImplementation(() => ({
    dispatch: () => vi.fn(),
  })),
}));

describe("useFetchFavorites", () => {
  const token = "token";

  const mockAjaxResponse = [1, 2, 3];

  it("should not update the state if the component unmounts", async () => {
    vi.mocked(axios, true).get.mockImplementationOnce(() =>
      Promise.resolve({ data: mockAjaxResponse })
    );
    const dispatch = vi.fn();
    const { result, unmount } = renderHook(() =>
      useFetchFavorites(token, dispatch)
    );

    act(() => {
      result.current.handleFetchFavorites();
      unmount();
    });

    await waitFor(() => {
      expect(result.current.isFetching).toBe(false);
    });
  });

  it("should fetch the favorite products list", async () => {
    vi.mocked(axios, true).get.mockImplementationOnce(() =>
      Promise.resolve({ data: mockAjaxResponse })
    );
    const dispatch = vi.fn();
    const { result } = renderHook(() => useFetchFavorites(token, dispatch));

    act(() => {
      result.current.handleFetchFavorites();
    });

    await waitFor(() => {
      expect(result.current.error).toBe(false);
      expect(result.current.isFetching).toBe(false);
    });
  });

  it("should fetch an empty favorite products list", async () => {
    vi.mocked(axios, true).get.mockImplementationOnce(() =>
      Promise.resolve([])
    );
    const dispatch = vi.fn();
    const { result } = renderHook(() => useFetchFavorites(token, dispatch));

    act(() => {
      result.current.handleFetchFavorites();
    });

    await waitFor(() => {
      expect(result.current.error).toBe(false);
      expect(result.current.isFetching).toBe(false);
    });
  });

  it("should not fetch the favorite products list if the server returns with an error", async () => {
    vi.mocked(axios, true).get.mockImplementationOnce(() =>
      Promise.reject("error")
    );
    const dispatch = vi.fn();
    const { result } = renderHook(() => useFetchFavorites(token, dispatch));

    act(() => {
      result.current.handleFetchFavorites();
    });

    await waitFor(() => {
      expect(result.current.error).toBe(true);
      expect(result.current.isFetching).toBe(false);
    });
  });
});
