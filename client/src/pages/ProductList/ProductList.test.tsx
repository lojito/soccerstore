import { render, screen } from "@testing-library/react";
import Root from "../../Root";
import { Props } from "../../components/Product/Product";
import ProductList from "./ProductList";

vi.mock("../../components/Product/Product", () => ({
  default: (props: Props) => {
    return <div>{props.product.name}</div>;
  },
}));

describe("ProductList", () => {
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

  it("should render correctly", () => {
    const { asFragment } = render(
      <Root>
        <ProductList
          searchTerm=""
          filterCategory="todos"
          isLoggedIn={false}
          token=""
          products={products}
          errorFetchingFavorites={false}
        />
      </Root>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should display the products that match the searchTerm", () => {
    render(
      <Root>
        <ProductList
          searchTerm="blanco"
          filterCategory="todos"
          isLoggedIn={false}
          token=""
          products={products}
          errorFetchingFavorites={false}
        />
      </Root>
    );

    expect(screen.getByText(products[0].name)).toBeInTheDocument();
    expect(screen.queryByText(products[1].name)).not.toBeInTheDocument();
  });

  it("should display the favorite product list", () => {
    render(
      <Root initialStoreValue={{ favorites: [1], cart: [] }}>
        <ProductList
          searchTerm=""
          filterCategory="favorites"
          isLoggedIn={false}
          token=""
          products={products}
          errorFetchingFavorites={false}
        />
      </Root>
    );

    expect(screen.getByText(products[0].name)).toBeInTheDocument();
    expect(screen.queryByText(products[1].name)).not.toBeInTheDocument();
  });

  it("should display no products if there is no match with the searchTerm", () => {
    render(
      <Root>
        <ProductList
          searchTerm="adidas"
          filterCategory="todos"
          isLoggedIn={false}
          token=""
          products={products}
          errorFetchingFavorites={false}
        />
      </Root>
    );

    expect(screen.queryByText(products[0].name)).not.toBeInTheDocument();
    expect(screen.queryByText(products[1].name)).not.toBeInTheDocument();
  });

  it("should display an error message if the fetching of the favorite list failed.", () => {
    render(
      <Root>
        <ProductList
          searchTerm=""
          filterCategory="todos"
          isLoggedIn={false}
          token=""
          products={products}
          errorFetchingFavorites
        />
      </Root>
    );

    expect(
      screen.getByText(
        "Un error se produjo al recuperar la lista de favoritos."
      )
    ).toBeInTheDocument();
  });
});
