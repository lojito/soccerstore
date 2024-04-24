import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filter from "./Filter";

describe("Logo", () => {
  it("should render correctly", () => {
    const { asFragment } = render(
      <Filter isLoggedIn onFilterCategory={vi.fn} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should not render the Favorite button", () => {
    render(<Filter isLoggedIn={false} onFilterCategory={vi.fn} />);

    const button = screen.queryByRole("button", { name: "Favorites" });

    expect(button).not.toBeInTheDocument();
  });

  it("should call the onFilterCategory prop", async () => {
    const user = userEvent.setup();
    const onFilterCategory = vi.fn();
    render(<Filter isLoggedIn onFilterCategory={onFilterCategory} />);

    await user.click(screen.getByRole("button", { name: "Favorites" }));

    expect(onFilterCategory).toHaveBeenCalledTimes(1);
  });
});
