import {
  ADD_TO_FAVORITE,
  FETCH_FAVORITES,
  REMOVE_FROM_FAVORITE,
  REMOVE_ALL_FROM_FAVORITE,
} from "./types";

export type AddToFavoriteAction = {
  type: "add_to_favorite";
  payload: number;
};

export type RemoveFromFavoriteAction = {
  type: "remove_from_favorite";
  payload: number;
};

export type RemoveAllFromFavoriteAction = {
  type: "remove_all_from_favorite";
};

export type FetchFavoritesAction = {
  type: "fetch_favorites";
  payload: number[];
};

export function addFavorite(productId: number): AddToFavoriteAction {
  return {
    type: ADD_TO_FAVORITE,
    payload: productId,
  };
}

export function removeFavorite(productId: number): RemoveFromFavoriteAction {
  return {
    type: REMOVE_FROM_FAVORITE,
    payload: productId,
  };
}

export function removeFavorites(): RemoveAllFromFavoriteAction {
  return {
    type: REMOVE_ALL_FROM_FAVORITE,
  };
}

export function fetchFavorites(productIdList: number[]): FetchFavoritesAction {
  return {
    type: FETCH_FAVORITES,
    payload: productIdList,
  };
}
