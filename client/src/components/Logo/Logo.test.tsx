import { render, screen } from "@testing-library/react";
import Logo from "./Logo";

describe("Logo", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Logo />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should have the correct prop", () => {
    render(<Logo />);

    const image = screen.getByRole("img", { name: "logo" });

    expect(image).toHaveAttribute("src", "images/logo.jpg");
  });
});
