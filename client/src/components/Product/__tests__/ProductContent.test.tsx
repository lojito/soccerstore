import { render } from "@testing-library/react";
import ProductContent from "../ProductContent";

describe("ProductContent", () => {
  it("should render correctly", () => {
    const { asFragment } = render(
      <ProductContent children="Balon Blanco y Negro" />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
