import axios from "axios";
import { Dispatch, useCallback, useEffect, useRef, useState } from "react";
import { UnknownAction } from "redux";
import { removeAllFromCart } from "../../actions/cart";
import { removeFavorites } from "../../actions/favorite";
import { Account } from "../../pages/Auth/Auth";
import useMounted from "../useMounted";
import useAuthLocalStorage from "./useAuthLocalStorage";

interface AuthState {
  isLoggedIn: boolean;
  isSignedUp: boolean;
  token: string;
  userId: string | null;
  name: string;
  logInError: string;
  signUpError: string;
}

const initialAuthState: AuthState = {
  isLoggedIn: false,
  isSignedUp: false,
  token: "",
  userId: "",
  name: "",
  logInError: "",
  signUpError: "",
};

function useAuth(dispatch: Dispatch<UnknownAction>) {
  const isMounted = useMounted();
  const interval = useRef<number | null>(null);
  const { setAuthItems, getAuthItems, removeAuthItems } = useAuthLocalStorage();

  const [auth, setAuth] = useState<AuthState>(() => {
    return getInitialState();
  });

  function getInitialState() {
    const { token, expirationDate, userId, name } = getAuthItems();
    if (!token || !expirationDate || !userId || !name) {
      return initialAuthState;
    }

    if (new Date(expirationDate) <= new Date()) {
      removeAuthItems();
      return {
        ...initialAuthState,
      };
    }

    return {
      isLoggedIn: true,
      isSignedUp: false,
      token,
      userId,
      name,
      logInError: "",
      signUpError: "",
    };
  }

  const updateState = useCallback(
    (newState: AuthState) => {
      if (isMounted()) {
        setAuth({ ...newState });
      }
    },
    [isMounted]
  );

  const handleLogout = useCallback(() => {
    clearTimeout(interval.current!);

    removeAuthItems();
    updateState({
      ...initialAuthState,
    });
  }, [removeAuthItems, updateState]);

  const logoutAfter = useCallback(
    (milliseconds: number) => {
      interval.current = setTimeout(() => {
        handleLogout();
        dispatch(removeFavorites());
        dispatch(removeAllFromCart());
      }, milliseconds);
    },
    [handleLogout, dispatch]
  );

  useEffect(() => {
    const { expirationDate } = getAuthItems();
    if (!expirationDate) {
      return;
    }

    const remainingMilliseconds =
      new Date(expirationDate).getTime() - new Date().getTime();

    if (remainingMilliseconds > 0) {
      logoutAfter(remainingMilliseconds);
    }

    return () => {
      if (interval.current) {
        clearTimeout(interval.current);
      }
    };
  }, [logoutAfter, getAuthItems]);

  const AUTH_ERROR_SERVER_NOT_RESPONDING = "El servidor no está respondiendo.";
  const AUTH_ERROR_VALIDATION_FAILED =
    "Validación fallida. Correo electrónico o contraseña no válida.";
  const AUTH_ERROR_UNKNOWN =
    "Un error se produjo al intentar iniciar la sesión o registrar al usuario.";

  const handleAuth = useCallback(
    async (account: Account, authType: "login" | "signup") => {
      try {
        const res = await axios[authType === "login" ? "post" : "put"](
          `http://localhost:4000/api/auth/${authType}`,
          {
            ...account,
          }
        );

        updateState({
          isLoggedIn: authType === "login",
          isSignedUp: authType === "signup",
          token: "",
          ...res.data,
          logInError: "",
          signUpError: "",
        });

        if (authType === "login") {
          const remainingMilliseconds = 60 * 60 * 1000;
          logoutAfter(remainingMilliseconds);

          const expirationDate = new Date(
            new Date().getTime() + remainingMilliseconds
          );
          setAuthItems({
            ...res.data,
            expirationDate: expirationDate.toISOString(),
          });
        }
      } catch (err) {
        const error = authType === "login" ? "logInError" : "signUpError";
        if (axios.isAxiosError(err)) {
          if (!err?.response) {
            updateState({
              ...initialAuthState,
              [error]: AUTH_ERROR_SERVER_NOT_RESPONDING!,
            });
          } else if (
            err.response?.status === 401 ||
            err.response?.status === 422
          ) {
            updateState({
              ...initialAuthState,
              [error]: AUTH_ERROR_VALIDATION_FAILED!,
            });
          } else {
            updateState({
              ...initialAuthState,
              [error]: AUTH_ERROR_UNKNOWN!,
            });
          }
        } else {
          updateState({
            ...initialAuthState,
            [error]: AUTH_ERROR_UNKNOWN!,
          });
        }
      }
    },
    [
      logoutAfter,
      setAuthItems,
      updateState,
      AUTH_ERROR_SERVER_NOT_RESPONDING,
      AUTH_ERROR_VALIDATION_FAILED,
      AUTH_ERROR_UNKNOWN,
    ]
  );

  const handleLogin = useCallback(
    async (account: Account) => {
      await handleAuth(account, "login");
    },
    [handleAuth]
  );

  const handleSignup = useCallback(
    async (account: Account) => {
      await handleAuth(account, "signup");
    },
    [handleAuth]
  );

  return { ...auth, handleLogin, handleSignup, handleLogout };
}

export default useAuth;
