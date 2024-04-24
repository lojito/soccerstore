import { render } from "@testing-library/react";
import Root from "../../../Root";
import Product from "../Product";
import { Props as ProductContentProps } from "../ProductContent";
import { Props as ProductMediaProps } from "../ProductMedia";

vi.mock("../ProductContent", () => ({
  default: (props: ProductContentProps) => {
    return <div>{props.children}</div>;
  },
}));

vi.mock("../ProductMedia", () => ({
  default: (props: ProductMediaProps) => {
    return <div>{props.image}</div>;
  },
}));

describe("ProductContent", () => {
  it("should render correctly", () => {
    const product = {
      id: 1,
      category: "balones",
      name: "Balon Blanco y Negro",
      price: "29.99",
      image: "1",
    };

    const { asFragment } = render(
      <Root>
        <Product isLoggedIn={false} token="" product={product} />
      </Root>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
