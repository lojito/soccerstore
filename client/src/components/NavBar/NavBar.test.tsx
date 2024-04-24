import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

vi.mock("../Logo/Logo");

vi.mock("../Search/Search", () => ({
  default: ({ onSearch }: { onSearch: (searchTerm: string) => void }) => {
    return (
      <input
        type="text"
        id="text"
        name="search"
        placeholder="Buscar productos"
        onChange={(e) => onSearch(e.target.value)}
      />
    );
  },
}));

vi.mock("../Filter/Filter", () => ({
  default: ({
    onFilterCategory,
  }: {
    onFilterCategory: (filterCategory: string) => void;
  }) => {
    return (
      <button aria-label="todos" onClick={() => onFilterCategory("todos")}>
        Todos
      </button>
    );
  },
}));

describe("NavBar", () => {
  interface Props {
    name?: string;
    isLoggedIn?: boolean;
  }

  const renderNavBar = ({ name = "", isLoggedIn = false }: Props = {}) => {
    const onSearch = vi.fn();
    const onLogout = vi.fn();
    const onFilterCategory = vi.fn();

    const utils = render(
      <MemoryRouter>
        <NavBar
          name={name}
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
          onSearch={onSearch}
          onFilterCategory={onFilterCategory}
        />
      </MemoryRouter>
    );

    const search = screen.getByRole("textbox");
    const filterButton = screen.getByRole("button", { name: "todos" });
    const loginLink = screen.queryByRole("link", { name: "Iniciar sesión" });
    const signUpLink = screen.queryByRole("link", { name: "Regístrate" });
    const logOutButton = screen.queryByRole("button", {
      name: "Cerrar sesión",
    });

    return {
      ...utils,
      search,
      filterButton,
      loginLink,
      signUpLink,
      logOutButton,
      onSearch,
      onLogout,
      onFilterCategory,
    };
  };

  it("should render correctly", () => {
    const { asFragment } = renderNavBar();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should call the onSearch prop when entering a search term", async () => {
    const user = userEvent.setup();
    const { onSearch } = renderNavBar();

    const search = screen.getByRole("textbox");
    await user.type(search, "Rojo");

    expect(onSearch).toHaveBeenCalled();
  });

  it("should call the onFilterCategory prop when clicing on a filter button", async () => {
    const user = userEvent.setup();
    const { onFilterCategory, filterButton } = renderNavBar();

    await user.click(filterButton);

    expect(onFilterCategory).toHaveBeenCalled();
  });

  it("should show the 'Iniciar sesión' and Regístrate links when the user is not logged in", async () => {
    const { loginLink, signUpLink } = renderNavBar();

    expect(loginLink).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
  });

  it("should not show the 'Cerrar sesión' button when the user is not logged in", async () => {
    const { logOutButton } = renderNavBar();

    expect(logOutButton).not.toBeInTheDocument();
  });

  it("should not show the 'Iniciar sesión' and Regístrate links when the user is logged in", async () => {
    const { loginLink, signUpLink } = renderNavBar({ isLoggedIn: true });

    expect(loginLink).not.toBeInTheDocument();
    expect(signUpLink).not.toBeInTheDocument();
  });

  it("should show the 'Cerrar sesión' button when the user is logged in", async () => {
    const { logOutButton } = renderNavBar({ isLoggedIn: true });

    expect(logOutButton).toBeInTheDocument();
  });
});
