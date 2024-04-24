import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Auth from "./Auth";

vi.mock("../../../hooks/auth/useAuth");

describe("Auth", () => {
  const handleSignup = vi.fn();
  const handleLogin = vi.fn();

  interface Props {
    authType?: string;
    logInError?: string;
    signUpError?: string;
    isLoggedIn?: boolean;
  }

  const TestComponent = ({
    authType = "signup",
    logInError = "",
    signUpError = "",
    isLoggedIn = false,
  }: Props) => {
    return (
      <Auth
        onSignup={handleSignup}
        onLogin={handleLogin}
        authType={authType}
        logInError={logInError}
        signUpError={signUpError}
        isLoggedIn={isLoggedIn}
      />
    );
  };

  const renderAuth = ({
    authType = "signup",
    logInError = "",
    signUpError = "",
    isLoggedIn = false,
  }: Props = {}) => {
    const utils = render(
      <TestComponent
        authType={authType}
        logInError={logInError}
        signUpError={signUpError}
        isLoggedIn={isLoggedIn}
      />
    );

    const emailLabel = screen.queryByLabelText("Correo electrónico *");
    const email = screen.queryByRole("textbox", {
      name: "Correo electrónico *",
    });

    const nameLabel = screen.queryByLabelText("Nombre *");
    const name = screen.queryByRole("textbox", {
      name: "Nombre *",
    });

    const passwordLabel = screen.queryByLabelText("Contraseña *");

    const signUpButton = screen.queryByRole("button", {
      name: "Inscribirse",
    });
    const loginButton = screen.queryByRole("button", {
      name: "Iniciar sesión",
    });

    return {
      ...utils,
      handleSignup,
      handleLogin,
      emailLabel,
      email,
      nameLabel,
      name,
      passwordLabel,
      signUpButton,
      loginButton,
    };
  };

  it("should render correctly", () => {
    const { asFragment } = renderAuth();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render the signup form", () => {
    const {
      emailLabel,
      email,
      nameLabel,
      name,
      passwordLabel,
      signUpButton,
      loginButton,
    } = renderAuth();

    expect(emailLabel).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(nameLabel).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
    expect(loginButton).not.toBeInTheDocument();
  });

  it("should render the login form", () => {
    const {
      emailLabel,
      email,
      nameLabel,
      name,
      passwordLabel,
      signUpButton,
      loginButton,
    } = renderAuth({ authType: "login" });

    expect(emailLabel).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(nameLabel).not.toBeInTheDocument();
    expect(name).not.toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(signUpButton).not.toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("should not render the login form is the user is already logged in", () => {
    const {
      emailLabel,
      email,
      nameLabel,
      name,
      passwordLabel,
      signUpButton,
      loginButton,
    } = renderAuth({ authType: "login", isLoggedIn: true });

    expect(emailLabel).not.toBeInTheDocument();
    expect(email).not.toBeInTheDocument();
    expect(nameLabel).not.toBeInTheDocument();
    expect(name).not.toBeInTheDocument();
    expect(passwordLabel).not.toBeInTheDocument();
    expect(signUpButton).not.toBeInTheDocument();
    expect(loginButton).not.toBeInTheDocument();
  });

  it("should call the auth handler when signing up the user", async () => {
    const user = userEvent.setup();
    const { signUpButton, handleSignup } = renderAuth();

    await user.click(signUpButton!);

    expect(handleSignup).toHaveBeenCalled();
  });

  it("should call the auth handler when logging in the user", async () => {
    const user = userEvent.setup();
    const { loginButton, handleLogin } = renderAuth({ authType: "login" });

    await user.click(loginButton!);

    expect(handleLogin).toHaveBeenCalled();
  });

  it("should return an error if the signing up process did fail", async () => {
    const user = userEvent.setup();
    const { signUpButton, rerender } = renderAuth();

    await user.click(signUpButton!);

    rerender(
      <TestComponent signUpError="Se produjo un error al intentar registrar al usuario." />
    );

    const errorDiv = screen.queryByTestId("signUpError");

    expect(errorDiv).toBeInTheDocument();
  });

  it("should return an error if the logging in process did fail", async () => {
    const user = userEvent.setup();
    const { loginButton, rerender } = renderAuth({ authType: "login" });

    await user.click(loginButton!);

    rerender(
      <TestComponent
        authType="login"
        logInError="Se produjo un error al intentar iniciar la sesión del usuario."
      />
    );

    const errorDiv = screen.queryByTestId("logInError");

    expect(errorDiv).toBeInTheDocument();
  });

  it("should not return an error if the logging in process did not fail", async () => {
    const user = userEvent.setup();
    const { loginButton, rerender } = renderAuth({ authType: "login" });

    await user.click(loginButton!);

    rerender(<TestComponent authType="login" />);
    const errorDiv = screen.queryByTestId("logInError");

    expect(errorDiv).not.toBeInTheDocument();
  });

  it("should allow the user to enter an email", async () => {
    const user = userEvent.setup();
    const userEmail = "user@gmail.com";
    const { email } = renderAuth({ authType: "login" });

    await user.type(email!, userEmail);

    expect(email).toHaveValue(userEmail);
  });

  it("should allow the user to enter a name", async () => {
    const user = userEvent.setup();
    const userName = "User";
    const { name } = renderAuth();

    await user.type(name!, userName);

    expect(name).toHaveValue(userName);
  });

  it("should allow the user to enter a password", async () => {
    const user = userEvent.setup();
    const userPassword = "password";
    const { passwordLabel } = renderAuth();

    await user.type(passwordLabel!, userPassword);

    expect(passwordLabel).toHaveValue(userPassword);
  });
});
