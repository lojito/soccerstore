import { useEffect, useState, type FC } from "react";
import { useDispatch } from "react-redux";
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  useHistory,
} from "react-router-dom";
import { removeAllFromCart } from "./actions/cart";
import { removeFavorites } from "./actions/favorite";
import { Category } from "./components/Filter/Filter";
import NavBar from "./components/NavBar/NavBar";
import useAuth from "./hooks/auth/useAuth";
import useFetchFavorites from "./hooks/favorite/useFetchFavorites";
import Auth from "./pages/Auth/Auth";
import Cart from "./pages/Cart/Cart";
import ProductList from "./pages/ProductList/ProductList";
import products from "./products";

interface Props extends RouteComponentProps {}

// eslint-disable-next-line react-refresh/only-export-components
const App: FC<Props> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    token,
    name,
    logInError,
    signUpError,
    isLoggedIn,
    isSignedUp,
    handleLogin,
    handleSignup,
    handleLogout,
  } = useAuth(dispatch);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<Category>("todos");

  const { error: errorFetchingFavorites, handleFetchFavorites } =
    useFetchFavorites(token!, dispatch);

  useEffect(() => {
    if (isLoggedIn) {
      handleFetchFavorites();
    }
  }, [handleFetchFavorites, isLoggedIn]);

  useEffect(() => {
    if (isSignedUp) {
      history?.replace("/login");
    } else {
      history?.replace("/products");
    }
  }, [isSignedUp, isLoggedIn, history]);

  useEffect(() => {
    if (history.location.pathname === "/cart") {
      history?.replace("/products");
    }
  }, [filterCategory, history]);

  return (
    <>
      <NavBar
        name={name}
        isLoggedIn={isLoggedIn}
        onLogout={() => {
          handleLogout();
          dispatch(removeFavorites());
          dispatch(removeAllFromCart());
        }}
        onSearch={(searchTerm) => setSearchTerm(searchTerm)}
        onFilterCategory={(filterCategory: Category) =>
          setFilterCategory(filterCategory)
        }
      />

      <Switch>
        <Route
          path="/cart"
          render={(props) => (
            <Cart {...props} products={products} token={token} />
          )}
        />
        <Route
          path="/products"
          exact
          render={(props) => (
            <ProductList
              {...props}
              searchTerm={searchTerm}
              filterCategory={filterCategory}
              isLoggedIn={isLoggedIn}
              token={token}
              products={products}
              errorFetchingFavorites={errorFetchingFavorites}
            />
          )}
        />
        <Route
          path="/login"
          render={(props) => (
            <Auth
              {...props}
              onLogin={handleLogin}
              authType="login"
              logInError={logInError}
              isLoggedIn={isLoggedIn}
            />
          )}
        />
        <Route
          path="/signup"
          exact
          render={(props) => (
            <Auth
              {...props}
              onSignup={handleSignup}
              authType="signup"
              signUpError={signUpError}
              isLoggedIn={isLoggedIn}
            />
          )}
        />
        <Redirect to="/products" />
      </Switch>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default App;
