import { render, screen } from "@testing-library/react";
import Search from "./Search";
import userEvent from "@testing-library/user-event";

describe("Search", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Search onSearch={vi.fn} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should allow to enter the search term and hit the enter key", async () => {
    const user = userEvent.setup();
    const searchTerm = "rojo";
    const onSearch = vi.fn();
    render(<Search onSearch={onSearch} />);

    const search = screen.getByRole("textbox");
    await user.type(search, searchTerm);
    await user.keyboard("[Enter]");

    expect(search).toHaveValue(searchTerm);
    expect(onSearch).toHaveBeenCalled();
  });
});
