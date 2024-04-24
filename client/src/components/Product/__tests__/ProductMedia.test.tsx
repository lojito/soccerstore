import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Root from "../../../Root";
import * as useCreateFavorite from "../../../hooks/favorite/useCreateFavorite";
import * as useDeleteFavorite from "../../../hooks/favorite/useDeleteFavorite";
import ProductMedia from "../ProductMedia";

vi.mock("../../../hooks/favorite/useCreateFavorite", () => ({
  default: () => ({
    error: "",
    handleCreateFavorite: vi.fn(),
  }),
}));

vi.mock("../../../hooks/favorite/useDeleteFavorite", () => ({
  default: () => ({
    error: false,
    productId: 0,
    handleDeleteFavorite: vi.fn(),
  }),
}));

describe("ProductMedia", () => {
  it("should render correctly", () => {
    const { asFragment } = render(
      <Root>
        <ProductMedia
          id={1}
          image="images/balones/1.jpg"
          isLoggedIn={false}
          token=""
        />
      </Root>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should create a new favorite product", async () => {
    const mockHandleCreateFavorite = vi.fn();
    vi.spyOn(useCreateFavorite, "default").mockImplementationOnce(() => ({
      error: "",
      handleCreateFavorite: mockHandleCreateFavorite,
    }));
    const user = userEvent.setup();
    render(
      <Root>
        <ProductMedia id={1} image="images/balones/1.jpg" isLoggedIn token="" />
      </Root>
    );

    await user.click(screen.getByRole("img", { name: "favorite-icon" }));

    expect(mockHandleCreateFavorite).toHaveBeenCalled();
  });

  it("should remove a favorite product", async () => {
    const mockHandleDeleteFavorite = vi.fn();
    vi.spyOn(useDeleteFavorite, "default").mockImplementationOnce(() => ({
      error: false,
      productId: 0,
      handleDeleteFavorite: mockHandleDeleteFavorite,
    }));
    const user = userEvent.setup();
    render(
      <Root initialStoreValue={{ favorites: [1], cart: [] }}>
        <ProductMedia id={1} image="images/balones/1.jpg" isLoggedIn token="" />
      </Root>
    );

    await user.click(screen.getByRole("img", { name: "favorite-icon" }));

    expect(mockHandleDeleteFavorite).toHaveBeenCalled();
  });

  it("should add a new product to the cart", async () => {
    const user = userEvent.setup();
    render(
      <Root>
        <ProductMedia id={1} image="images/balones/1.jpg" isLoggedIn token="" />
      </Root>
    );

    await user.click(screen.getByRole("img", { name: "cart-icon" }));
  });

  it("should remove a product from the cart", async () => {
    const user = userEvent.setup();
    render(
      <Root initialStoreValue={{ favorites: [], cart: [1] }}>
        <ProductMedia id={1} image="images/balones/1.jpg" isLoggedIn token="" />
      </Root>
    );

    await user.click(screen.getByRole("img", { name: "cart-icon" }));
  });
});
