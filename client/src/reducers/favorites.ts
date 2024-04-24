import {
  ADD_TO_FAVORITE,
  FETCH_FAVORITES,
  REMOVE_FROM_FAVORITE,
  REMOVE_ALL_FROM_FAVORITE,
} from "../actions/types";

import {
  AddToFavoriteAction,
  FetchFavoritesAction,
  RemoveFromFavoriteAction,
  RemoveAllFromFavoriteAction,
} from "../actions/favorite";

const initState: number[] = [];

export default function (
  state: number[] = initState,
  action:
    | AddToFavoriteAction
    | RemoveFromFavoriteAction
    | FetchFavoritesAction
    | RemoveAllFromFavoriteAction
) {
  switch (action.type) {
    case ADD_TO_FAVORITE:
      return [...state, action.payload];
    case REMOVE_FROM_FAVORITE:
      return [...state.filter((productId) => productId !== action.payload)];
    case REMOVE_ALL_FROM_FAVORITE:
      return [...initState];
    case FETCH_FAVORITES:
      return [...action.payload];
    default:
      return state;
  }
}
