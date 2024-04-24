import { useCallback } from "react";

interface AuthItems {
  token: string | null;
  expirationDate: string | null;
  userId: string | null;
  name: string | null;
}

function useAuthLocalStorage() {
  const setAuthItems = useCallback((items: AuthItems) => {
    localStorage.setItem("token", items.token!);
    localStorage.setItem("userId", items.userId!);
    localStorage.setItem("name", items.name!);
    localStorage.setItem("expirationDate", items.expirationDate!);
  }, []);

  const getAuthItems = useCallback((): AuthItems => {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expirationDate");
    const userId = localStorage.getItem("userId");
    const name = localStorage.getItem("name");

    return {
      token,
      expirationDate,
      userId,
      name,
    };
  }, []);

  const removeAuthItems = useCallback(() => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("expirationDate");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("name");
  }, []);

  return { setAuthItems, getAuthItems, removeAuthItems };
}

export default useAuthLocalStorage;
