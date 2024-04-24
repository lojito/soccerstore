import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import useCreateFavorite from "../useCreateFavorite";

vi.mock("axios");

describe("useCreateFavorite", () => {
  const url = `http://localhost:4000/api/favorites/`;
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI";
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  const productId = 1;
  const payload = {
    productId,
  };
  const mockAjaxResponse = {
    message: "Favorite created",
    favorite: {
      productId: productId + "",
      _id: "661377d984ce20b8a4c5d0ff",
    },
  };

  it("should not update the state if the component unmounts", async () => {
    const error = "Un error se produjo al crear un nuevo producto favorito.";
    vi.mocked(axios, true).post.mockImplementationOnce(() =>
      Promise.reject(new Error(error))
    );
    const { result, unmount } = renderHook(() => useCreateFavorite(token));
    result.current.handleCreateFavorite(productId);

    unmount();

    expect(result.current.error).toBe("");
  });

  it("should create the favorite product", async () => {
    vi.mocked(axios, true).post.mockImplementationOnce(() =>
      Promise.resolve(mockAjaxResponse)
    );
    const { result } = renderHook(() => useCreateFavorite(token));

    result.current.handleCreateFavorite(payload.productId);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(url, payload, headers);
      expect(result.current.error).toBe("");
    });
  });

  it("should not create the favorite product if the server returns with an error", async () => {
    const error = "Un error se produjo al crear un nuevo producto favorito.";
    vi.mocked(axios, true).post.mockImplementationOnce(() =>
      Promise.reject(new Error(error))
    );
    const { result } = renderHook(() => useCreateFavorite(token));

    result.current.handleCreateFavorite(payload.productId);

    await waitFor(() => {
      expect(result.current.error).toBe(error);
    });
  });
});
