import {
  addFavorite,
  fetchFavorites,
  removeFavorite,
  removeFavorites,
} from "../favorite";
import {
  ADD_TO_FAVORITE,
  FETCH_FAVORITES,
  REMOVE_ALL_FROM_FAVORITE,
  REMOVE_FROM_FAVORITE,
} from "../types";

describe("favorite actions", () => {
  it("has the correct addFavorite action type and payload", () => {
    const productId = 1;
    const action = addFavorite(productId);

    expect(action.type).toBe(ADD_TO_FAVORITE);
    expect(action.payload).toBe(productId);
  });

  it("has the correct removeFavorite action type and payload", () => {
    const productId = 1;
    const action = removeFavorite(productId);

    expect(action.type).toBe(REMOVE_FROM_FAVORITE);
    expect(action.payload).toBe(productId);
  });

  it("has the correct removeFavorites action type and payload", () => {
    const action = removeFavorites();

    expect(action.type).toBe(REMOVE_ALL_FROM_FAVORITE);
  });

  it("has the correct fetchFavorites action type and payload", () => {
    const productIdList = [1, 2, 3];
    const action = fetchFavorites(productIdList);

    expect(action.type).toBe(FETCH_FAVORITES);
    expect(action.payload).toEqual(productIdList);
  });
});
