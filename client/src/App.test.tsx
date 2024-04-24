import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";
import * as useAuth from "./hooks/auth/useAuth";
import userEvent from "@testing-library/user-event";

vi.mock("./pages/Auth/Auth", () => ({
  default: () => <div>Auth form component</div>,
}));

vi.mock("./pages/Cart/Cart", () => ({
  default: () => <>Cart component</>,
}));

vi.mock("./pages/ProductList/ProductList", () => ({
  default: ({
    searchTerm,
    filterCategory,
  }: {
    searchTerm: string;
    filterCategory: string;
  }) => (
    <>
      ProductList component
      <div>Search term: {searchTerm}</div>
      <div>filterCategory: {filterCategory}</div>
    </>
  ),
}));

vi.mock("./components/NavBar/NavBar", () => ({
  default: ({
    onLogout,
    onSearch,
    onFilterCategory,
  }: {
    onLogout: () => void;
    onSearch: (searchTerm: string) => void;
    onFilterCategory: (filterCategory: string) => void;
  }) => (
    <>
      <div>NavBar component</div> <a href="/cart">Cart</a>
      <input
        type="text"
        id="text"
        name="search"
        placeholder="Buscar productos"
        onChange={(e) => onSearch(e.target.value)}
      />
      <button type="button" onClick={() => onFilterCategory("Balones")}>
        Balones
      </button>
      <button type="button" onClick={onLogout}>
        Cerrar sesión
      </button>
    </>
  ),
}));

const handleLogoutMock = vi.fn();
vi.mock("./hooks/auth/useAuth", () => ({
  default: () => ({
    isLoggedIn: false,
    isSignedUp: false,
    token: "",
    userId: "",
    name: "",
    logInError: "",
    signUpError: "",
    handleLogin: vi.fn,
    handleSignup: vi.fn,
    handleLogout: handleLogoutMock,
  }),
}));

vi.mock("./hooks/favorite/useFetchFavorites", () => ({
  default: () => ({
    error: false,
    handleFetchFavorites: vi.fn,
  }),
}));

interface Props {
  isLoggedIn?: boolean;
  isSignedUp?: boolean;
  token?: string;
  name?: string;
  pathname?: string;
}

const history = createMemoryHistory();
history.push = vi.fn();
const store = createStore(reducers);

const ComponentWithProvider = ({ pathname }: { pathname: string }) => {
  history.location.pathname = pathname;

  return (
    <Router history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  );
};

const renderApp = ({
  isLoggedIn = false,
  isSignedUp = false,
  token = "",
  name = "",
  pathname = "/",
}: Props = {}) => {
  vi.spyOn(useAuth, "default").mockImplementation(() => ({
    isLoggedIn,
    isSignedUp,
    token,
    userId: "",
    name,
    logInError: "",
    signUpError: "",
    handleLogin: vi.fn as unknown as () => Promise<void>,
    handleSignup: vi.fn as unknown as () => Promise<void>,
    handleLogout: handleLogoutMock,
  }));

  const utils = render(<ComponentWithProvider pathname={pathname} />);

  return {
    ...utils,
  };
};

describe("App", () => {
  it("should display the NavBar component", async () => {
    renderApp();

    expect(screen.getByText("NavBar component")).toBeInTheDocument();
  });

  it("should display the ProductList component onload", () => {
    renderApp();

    expect(screen.getByText("ProductList component")).toBeInTheDocument();
  });

  it("should display the Auth login component after signing up", () => {
    renderApp({ isSignedUp: true, pathname: "/signup" });

    expect(screen.getByText("Auth form component")).toBeInTheDocument();
  });

  it("should display the ProductList component after loggin in", () => {
    renderApp({ isLoggedIn: true, pathname: "/login" });

    expect(screen.getByText("ProductList component")).toBeInTheDocument();
  });

  it("should display the Cart component", async () => {
    const { rerender } = renderApp({
      isLoggedIn: true,
      pathname: "/products",
    });

    rerender(<ComponentWithProvider pathname="/cart" />);

    expect(await screen.findByText("Cart component")).toBeInTheDocument();
  });

  it("should called the logout handler when clicking on the 'Cerrar sesión' button", async () => {
    const user = userEvent.setup();
    renderApp({ isLoggedIn: true, pathname: "/products" });

    const logOutButton = screen.getByRole("button", { name: "Cerrar sesión" });
    await user.click(logOutButton);

    expect(handleLogoutMock).toBeCalled();
  });

  it("should let the user do a search the products by a term", async () => {
    const user = userEvent.setup();
    renderApp({ isLoggedIn: true, pathname: "/products" });

    const search = screen.getByRole("textbox");
    await user.type(search, "Rojo");

    expect(screen.getByText("Search term: Rojo")).toBeInTheDocument();
  });

  it("should let the user filter the products from the products page", async () => {
    const user = userEvent.setup();
    renderApp({ isLoggedIn: true, pathname: "/products" });

    const balonesButton = screen.getByRole("button", { name: "Balones" });
    await user.click(balonesButton);

    expect(screen.getByText("Balones")).toBeInTheDocument();
  });

  it("should let the user filter the products from the cart page", async () => {
    const user = userEvent.setup();
    const { rerender } = renderApp({
      isLoggedIn: true,
      pathname: "/products",
    });
    rerender(<ComponentWithProvider pathname="/cart" />);

    const balonesButton = screen.getByRole("button", { name: "Balones" });
    await user.click(balonesButton);

    expect(screen.getByText("Balones")).toBeInTheDocument();
  });
});
