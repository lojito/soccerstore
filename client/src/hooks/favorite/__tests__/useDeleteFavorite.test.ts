import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import useDeleteFavorite from "../useDeleteFavorite";

vi.mock("axios");

describe("useDeleteFavorite", () => {
  const productId = 1;
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI";

  const mockAjaxResponse = {
    _id: "661377d984ce20b8a4c5d0ff",
    user: "661094e93a8c227c8b3bb59c",
  };

  it("should not update the state if the component unmounts", async () => {
    vi.mocked(axios, true).delete.mockImplementationOnce(() =>
      Promise.resolve(mockAjaxResponse)
    );

    const { result, unmount } = renderHook(() => useDeleteFavorite(token));

    result.current.handleDeleteFavorite(productId);
    unmount();

    expect(result.current.error).toBe(false);
    expect(result.current.productId).not.toBe(productId);
  });

  it("should delete the game", async () => {
    vi.mocked(axios, true).delete.mockImplementationOnce(() =>
      Promise.resolve(mockAjaxResponse)
    );
    const { result } = renderHook(() => useDeleteFavorite(token));

    result.current.handleDeleteFavorite(productId);

    await waitFor(() => {
      expect(result.current.error).toBe(false);
      expect(result.current.productId).toBe(productId);
    });
  });

  it("should not delete the favorite product if the server returns with an error", async () => {
    const error = true;
    vi.mocked(axios, true).delete.mockImplementationOnce(() =>
      Promise.reject(true)
    );
    const { result } = renderHook(() => useDeleteFavorite(token));

    result.current.handleDeleteFavorite(productId);

    await waitFor(() => {
      expect(result.current.error).toBe(error);
      expect(result.current.productId).toBe(productId);
    });
  });
});
