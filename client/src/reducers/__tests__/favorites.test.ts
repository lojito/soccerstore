import {
  ADD_TO_FAVORITE,
  FETCH_FAVORITES,
  REMOVE_ALL_FROM_FAVORITE,
  REMOVE_FROM_FAVORITE,
} from "../../actions/types";
import favorites from "../favorites";

import {
  AddToFavoriteAction,
  FetchFavoritesAction,
  RemoveAllFromFavoriteAction,
  RemoveFromFavoriteAction,
} from "../../actions/favorite";

describe("gameReducer", () => {
  it("should have an initial state", () => {
    const newState = favorites(undefined, {} as AddToFavoriteAction);

    expect(newState).toEqual([]);
  });

  it("handles unknown action", () => {
    const state = [1, 2, 3];
    const newState = favorites(state, {} as AddToFavoriteAction);

    expect(newState).toBe(state);
  });

  it("handles actions of type ADD_TO_FAVORITE", () => {
    const productId = 4;
    const action: AddToFavoriteAction = {
      type: ADD_TO_FAVORITE,
      payload: productId,
    };

    const newState = favorites([], action);

    expect(newState).toEqual([productId]);
  });

  it("handles actions of type FETCH_FAVORITES", () => {
    const productIdList = [4];
    const action: FetchFavoritesAction = {
      type: FETCH_FAVORITES,
      payload: productIdList,
    };

    const newState = favorites([], action);

    expect(newState).toEqual(productIdList);
  });

  it("handles actions of type REMOVE_FROM_FAVORITE", () => {
    const productId = 4;
    const action: RemoveFromFavoriteAction = {
      type: REMOVE_FROM_FAVORITE,
      payload: productId,
    };

    const newState = favorites([productId], action);

    expect(newState).toEqual([]);
  });

  it("handles actions of type REMOVE_ALL_FROM_FAVORITE", () => {
    const productIdList = [1, 2, 3];
    const action: RemoveAllFromFavoriteAction = {
      type: REMOVE_ALL_FROM_FAVORITE,
    };

    const newState = favorites(productIdList, action);

    expect(newState).toEqual([]);
  });
});
