import { ADD_TO_CART, REMOVE_ALL_FROM_CART, REMOVE_FROM_CART } from "./types";

export type AddToCartAction = {
  type: "add_to_cart";
  payload: number;
};

export type RemoveFromCartAction = {
  type: "remote_from_cart";
  payload: number;
};

export type RemoveAllFromCartAction = {
  type: "remove_all_from_cart";
};

export function addToCart(productId: number): AddToCartAction {
  return {
    type: ADD_TO_CART,
    payload: productId,
  };
}

export function removeFromCart(productId: number): RemoveFromCartAction {
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  };
}

export function removeAllFromCart(): RemoveAllFromCartAction {
  return {
    type: REMOVE_ALL_FROM_CART,
  };
}
