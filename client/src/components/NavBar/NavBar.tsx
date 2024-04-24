import { type FC } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { NavLink as BaseNavLink } from "react-router-dom";
import { styled } from "styled-components";
import Filter, { Category } from "../Filter/Filter";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";

const Nav = styled.header`
  height: 140px;
  background-color: black;
  position: fixed;
  top: 0px;
  max-width: 1200px;
  width: 100%;
  padding-top: 10px;
  z-index: 100;

  @media screen and (max-width: 720px) {
    height: 180px;
  }

  @media screen and (max-width: 410px) {
    height: 210px;
  }

  @media screen and (max-width: 310px) {
    height: 280px;
  }

  @media screen and (max-width: 280px) {
    height: 280px;
  }
`;

const Ul = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
  display: inline-block;
  text-align: right;
  width: 30%;
  vertical-align: top;
  padding-top: 12px;

  @media screen and (max-width: 950px) {
    width: 40%;
  }

  @media screen and (max-width: 720px) {
    width: 100%;
    text-align: center;
  }
`;

const Li = styled.li`
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;

  & svg {
    color: #fff;
    width: 27px;
    height: 27px;
    vertical-align: middle;
  }
`;

const Button = styled.button`
  cursor: pointer;
  border: 1px solid black;
  border-radius: 6px;
  padding: 5px;
`;

const NavLink = styled(BaseNavLink)`
  color: #fff;
  text-decoration: none;
  &.active {
    font-weight: 1000;
  }
`;

const Welcome = styled.span`
  color: #fff;
  cursor: auto;
`;

type Props = {
  name: string;
  isLoggedIn: boolean;
  onLogout: () => void;
  onSearch: (searchTerm: string) => void;
  onFilterCategory: (filterCategory: Category) => void;
};

const NavBar: FC<Props> = ({
  name,
  isLoggedIn,
  onLogout,
  onSearch,
  onFilterCategory,
}) => {
  return (
    <Nav>
      <Logo />
      <Search onSearch={(searchTerm: string) => onSearch(searchTerm)} />
      <Ul>
        {isLoggedIn ? (
          <>
            <Li key="name">
              <Welcome>Bienvenido, {name.substring(0, 5) + "..."}</Welcome>
            </Li>
            <Li key="logout">
              <Button onClick={onLogout}>Cerrar sesión</Button>
            </Li>
            <Li key="cart">
              <NavLink to="/cart">
                <MdOutlineShoppingCart title="Lista de productos a comprar." />
              </NavLink>
            </Li>
          </>
        ) : (
          <>
            <Li key="login">
              <NavLink to="/login">Iniciar sesión</NavLink>
            </Li>
            <Li key="signup">
              <NavLink to="/signup">Regístrate</NavLink>
            </Li>
          </>
        )}
      </Ul>
      <Filter
        isLoggedIn={isLoggedIn}
        onFilterCategory={(filterCategory: Category) =>
          onFilterCategory(filterCategory)
        }
      />
    </Nav>
  );
};

export default NavBar;
