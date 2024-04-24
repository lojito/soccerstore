import { render } from "@testing-library/react";
import Root from "../../Root";
import Cart from "./Cart";

vi.mock("../../components/Product/Product");

describe("Cart", () => {
  it("should render correctly", () => {
    const products = [
      {
        id: 1,
        category: "balones",
        name: "Balon Blanco y Negro",
        price: "29.99",
        image: "1",
      },
      {
        id: 201,
        category: "espinilleras",
        name: "Espinilleras Negras",
        price: "12.17",
        image: "1",
      },
    ];
    const { asFragment } = render(
      <Root>
        <Cart products={products} token={"asfsdf"} />
      </Root>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should display products in the cart", () => {
    const products = [
      {
        id: 1,
        category: "balones",
        name: "Balon Blanco y Negro",
        price: "29.99",
        image: "1",
      },
      {
        id: 201,
        category: "espinilleras",
        name: "Espinilleras Negras",
        price: "12.17",
        image: "1",
      },
    ];
    const { asFragment } = render(
      <Root initialStoreValue={{ favorites: [], cart: [1] }}>
        <Cart products={products} token={"asfsdf"} />
      </Root>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
