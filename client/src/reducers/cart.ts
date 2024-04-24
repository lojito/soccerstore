import {
  ADD_TO_CART,
  REMOVE_ALL_FROM_CART,
  REMOVE_FROM_CART,
} from "../actions/types";

import {
  AddToCartAction,
  RemoveAllFromCartAction,
  RemoveFromCartAction,
} from "../actions/cart";

const initState: number[] = [];

export default function (
  state: number[] = initState,
  action: AddToCartAction | RemoveFromCartAction | RemoveAllFromCartAction
) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];
    case REMOVE_FROM_CART:
      return [...state.filter((productId) => productId !== action.payload)];
    case REMOVE_ALL_FROM_CART:
      return [...initState];
    default:
      return state;
  }
}
