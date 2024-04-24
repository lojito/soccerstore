import { act, renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import { Account } from "../../../pages/Auth/Auth";
import useAuth from "../useAuth";
import * as useAuthLocalStorage from "../useAuthLocalStorage";

vi.mock("axios");

vi.mock("../useAuthLocalStorage", () => ({
  default: () => ({
    setAuthItems: vi.fn(),
    getAuthItems: () => ({
      token: "",
      expirationDate: "",
      userId: "",
      name: "",
    }),
    removeAuthItems: vi.fn(),
  }),
}));

describe("useAuth", () => {
  const mockAccount: Account = {
    email: "user@gmail.com",
    password: "password",
    name: "User",
  };

  const mockAjaxLogInResponse = {
    data: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxpdmFub2ppd",
      name: "User",
      userId: "636048af80d558d24d56265e",
    },
  };

  const mockAjaxSignUpResponse = {
    data: {
      token: "",
      name: "User",
      userId: "636048af80d558d24d56265e",
    },
  };

  interface AxiosError extends Error {
    response: { status: number };
    isAxiosError?: boolean;
  }

  it("should not update the state if the component unmounts", async () => {
    vi.mocked(axios, true).post.mockImplementationOnce(() => {
      return Promise.resolve(mockAjaxLogInResponse);
    });
    const { result, unmount } = renderHook(() => useAuth(vi.fn()));
    result.current.handleLogin(mockAccount);

    unmount();

    expect(result.current.isLoggedIn).toBe(false);
  });

  it("should log in the user", async () => {
    vi.mocked(axios, true).post.mockImplementationOnce(() =>
      Promise.resolve(mockAjaxLogInResponse)
    );
    const { result } = renderHook(() => useAuth(vi.fn()));

    result.current.handleLogin(mockAccount);

    await waitFor(() => {
      expect(result.current.isLoggedIn).toBe(true);
    });
  });

  it("should sign up the user", async () => {
    vi.mocked(axios, true).put.mockImplementationOnce(() =>
      Promise.resolve(mockAjaxSignUpResponse)
    );
    const { result } = renderHook(() => useAuth(vi.fn()));

    result.current.handleSignup(mockAccount);

    await waitFor(() => {
      expect(result.current.isSignedUp).toBe(true);
    });
  });

  it("should log out the user", async () => {
    const mockGetAuthItems = () => ({
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxpdmFub2ppd",
      userId: "636048af80d558d24d56265e",
      name: "User",
      expirationDate: new Date(
        new Date().getTime() + 60 * 60 * 1000
      ).toISOString(),
    });
    vi.spyOn(useAuthLocalStorage, "default").mockImplementationOnce(() => ({
      setAuthItems: vi.fn(),
      getAuthItems: mockGetAuthItems,
      removeAuthItems: vi.fn(),
    }));
    const { result } = renderHook(() => useAuth(vi.fn()));
    expect(result.current.isLoggedIn).toBe(true);

    act(() => {
      result.current.handleLogout();
    });

    expect(result.current.isLoggedIn).toBe(false);
  });

  it("should log out the user if the token in the local storage has expired", async () => {
    const mockGetAuthItems = () => ({
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxpdmFub2ppd",
      userId: "636048af80d558d24d56265e",
      name: "User",
      expirationDate: new Date(
        new Date().getTime() - 60 * 60 * 1000
      ).toISOString(),
    });
    vi.spyOn(useAuthLocalStorage, "default").mockImplementationOnce(() => ({
      setAuthItems: vi.fn(),
      getAuthItems: mockGetAuthItems,
      removeAuthItems: vi.fn(),
    }));

    const { result } = renderHook(() => useAuth(vi.fn()));

    await waitFor(() => expect(result.current.isLoggedIn).toBe(false));
  });

  it("should not log out the user if the token in the local storage hasn't expired", async () => {
    const mockGetAuthItems = () => ({
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxpdmFub2ppd",
      userId: "636048af80d558d24d56265e",
      name: "User",
      expirationDate: new Date(
        new Date().getTime() + 60 * 60 * 1000
      ).toISOString(),
    });
    vi.spyOn(useAuthLocalStorage, "default").mockImplementationOnce(() => ({
      setAuthItems: vi.fn(),
      getAuthItems: mockGetAuthItems,
      removeAuthItems: vi.fn(),
    }));

    const { result } = renderHook(() => useAuth(vi.fn()));

    expect(result.current.isLoggedIn).toBe(true);
  });

  it("should log out the user afer a certain number of milliseconds", async () => {
    const data = {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxpdmFub2ppd",
      userId: "636048af80d558d24d56265e",
      name: "User",
    };

    vi.spyOn(useAuthLocalStorage, "default").mockImplementationOnce(() => ({
      setAuthItems: vi.fn(),
      getAuthItems: vi
        .fn()
        .mockReturnValueOnce({
          ...data,
          expirationDate: new Date().getTime() + 1 * 24 * 60 * 60 * 1000,
        })
        .mockReturnValueOnce({
          ...data,
          expirationDate: new Date(new Date().getTime() + 500).toISOString(),
        }),
      removeAuthItems: vi.fn(),
    }));

    const { result } = renderHook(() => useAuth(vi.fn()));

    await waitFor(() => {
      expect(result.current.isLoggedIn).toBe(false);
    });
  });

  it("should not log in the user if server is not responding", async () => {
    const errorMsg = "El servidor no está respondiendo.";
    const error = new Error(errorMsg) as AxiosError;
    error.isAxiosError = true;
    vi.mocked(axios, true).post.mockImplementationOnce(() =>
      Promise.reject(error)
    );
    const { result } = renderHook(() => useAuth(vi.fn()));

    result.current.handleLogin(mockAccount);

    await waitFor(() => {
      expect(result.current.isLoggedIn).toBe(false);
      expect(result.current.logInError).toBe(errorMsg);
    });
  });

  it("should not log in the user if the server returns an unauthorized error", async () => {
    const errorMsg =
      "Validación fallida. Correo electrónico o contraseña no válida.";
    const error = new Error(errorMsg) as AxiosError;
    error.response = { status: 401 };
    error.isAxiosError = true;
    vi.mocked(axios, true).post.mockImplementationOnce(() =>
      Promise.reject(error)
    );
    const { result } = renderHook(() => useAuth(vi.fn()));

    result.current.handleLogin(mockAccount);

    await waitFor(() => {
      expect(result.current.isLoggedIn).toBe(false);
      expect(result.current.logInError).toBe(errorMsg);
    });
  });

  it("should not log in the user if the server returns an internal error", async () => {
    const errorMsg =
      "Un error se produjo al intentar iniciar la sesión o registrar al usuario.";
    const error = new Error(errorMsg) as AxiosError;
    error.response = { status: 500 };
    error.isAxiosError = true;
    vi.mocked(axios, true).post.mockImplementationOnce(() =>
      Promise.reject(error)
    );
    const { result } = renderHook(() => useAuth(vi.fn()));

    result.current.handleLogin(mockAccount);

    await waitFor(() => {
      expect(result.current.isLoggedIn).toBe(false);
      expect(result.current.logInError).toBe(errorMsg);
    });
  });

  it("should not sign up the user if the server returns an unknow error", async () => {
    const errorMsg =
      "Un error se produjo al intentar iniciar la sesión o registrar al usuario.";
    const error = new Error(errorMsg) as AxiosError;
    vi.mocked(axios, true).put.mockImplementationOnce(() =>
      Promise.reject(error)
    );
    const { result } = renderHook(() => useAuth(vi.fn()));

    result.current.handleSignup(mockAccount);

    await waitFor(() => {
      expect(result.current.isSignedUp).toBe(false);
      expect(result.current.signUpError).toBe(errorMsg);
    });
  });
});
