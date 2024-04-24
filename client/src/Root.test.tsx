import { render } from "@testing-library/react";
import Root from "./Root";

describe("Root", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Root children="children" />);

    expect(asFragment()).toMatchSnapshot();
  });
});
