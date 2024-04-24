import {
  ADD_TO_CART,
  REMOVE_ALL_FROM_CART,
  REMOVE_FROM_CART,
} from "../../actions/types";
import cart from "../cart";

import {
  AddToCartAction,
  RemoveAllFromCartAction,
  RemoveFromCartAction,
} from "../../actions/cart";

describe("cartReducer", () => {
  it("should have an initial state", () => {
    const newState = cart(undefined, {} as AddToCartAction);

    expect(newState).toEqual([]);
  });

  it("handles unknown action", () => {
    const state = [1, 2, 3];
    const newState = cart(state, {} as AddToCartAction);

    expect(newState).toBe(state);
  });

  it("handles actions of type ADD_TO_CART", () => {
    const productId = 4;
    const action: AddToCartAction = {
      type: ADD_TO_CART,
      payload: productId,
    };

    const newState = cart([], action);

    expect(newState).toEqual([productId]);
  });

  it("handles actions of type REMOVE_FROM_CART", () => {
    const productId = 1;
    const action: RemoveFromCartAction = {
      type: REMOVE_FROM_CART,
      payload: productId,
    };

    const newState = cart([productId], action);

    expect(newState).toEqual([]);
  });

  it("handles actions of type REMOVE_ALL_FROM_CART", () => {
    const productIdList = [1, 2, 3];
    const action: RemoveAllFromCartAction = {
      type: REMOVE_ALL_FROM_CART,
    };

    const newState = cart(productIdList, action);

    expect(newState).toEqual([]);
  });
});
