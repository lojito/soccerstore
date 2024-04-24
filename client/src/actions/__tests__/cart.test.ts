import { addToCart, removeAllFromCart, removeFromCart } from "../cart";
import { ADD_TO_CART, REMOVE_ALL_FROM_CART, REMOVE_FROM_CART } from "../types";

describe("cart actions", () => {
  it("has the correct addToCart action type and payload", () => {
    const productId = 1;
    const action = addToCart(productId);

    expect(action.type).toBe(ADD_TO_CART);
    expect(action.payload).toBe(productId);
  });

  it("has the correct removeFromCart action type and payload", () => {
    const productId = 1;
    const action = removeFromCart(productId);

    expect(action.type).toBe(REMOVE_FROM_CART);
    expect(action.payload).toBe(productId);
  });

  it("has the correct removeAllFromCart action type and payload", () => {
    const action = removeAllFromCart();

    expect(action.type).toBe(REMOVE_ALL_FROM_CART);
  });
});
