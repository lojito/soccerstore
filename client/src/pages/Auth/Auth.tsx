import React, { useEffect, useRef, useState, type FC } from "react";
import { styled } from "styled-components";

const Section = styled.section`
  margin: 200px auto 0;
  padding: 0 16px 16px;
  border: 1px solid #3b0062;
  border-radius: 10px;
  width: 40%;
  box-sizing: border-box;
  background-color: black;

  & .error {
    color: #fff;
    margin-top: 16px;
  }
`;

const InputWrapper = styled.div`
  margin: 20px 0;
  width: 100%;
`;

const Input = styled.input`
  display: block;
  padding: 2px 5px;
  width: 97%;
  border-radius: 3px;
  border: 1px solid #ccc;
  height: 20px;
`;

const Label = styled.label`
  display: block;
  color: #fff;
  margin-bottom: 5px;
`;

const ButtonWrapper = styled.div`
  text-align: right;
  margin-bottom: 5px;
`;

export type Account = {
  email: string;
  name?: string;
  password: string;
};

interface Props {
  onSignup?: (account: Account) => void;
  onLogin?: (account: Account) => void;
  authType: string;
  logInError?: string;
  signUpError?: string;
  isLoggedIn: boolean;
}

const Auth: FC<Props> = ({
  onSignup,
  onLogin,
  authType,
  logInError,
  signUpError,
  isLoggedIn,
}) => {
  const [account, setAccount] = useState<Account>({
    email: "",
    name: "",
    password: "",
  });

  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    !isLoggedIn && emailRef!.current!.focus();
  }, [isLoggedIn]);

  const handleSubmit = () => {
    if (authType === "signup") {
      onSignup!(account);
    } else {
      onLogin!(account);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount({
      ...account,
      [e.target.id]: e.target.value,
    });
  };

  const btnName = authType === "signup" ? "Inscribirse" : "Iniciar sesión";

  if (!isLoggedIn) {
    return (
      <Section>
        <InputWrapper>
          <Label htmlFor="email">Correo electrónico *</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={account.email}
            placeholder="Correo electrónico"
            onChange={handleChange}
            ref={emailRef}
          />
        </InputWrapper>

        {authType === "signup" && (
          <InputWrapper>
            <Label htmlFor="name">Nombre *</Label>
            <Input
              id="name"
              type="text"
              required
              value={account.name}
              placeholder="Nombre"
              onChange={handleChange}
            />
          </InputWrapper>
        )}

        <InputWrapper>
          <Label htmlFor="password">Contraseña *</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={account.password}
            placeholder="Contraseña"
            onChange={handleChange}
          />
        </InputWrapper>

        <ButtonWrapper>
          <button type="button" name={btnName} onClick={handleSubmit}>
            {btnName}
          </button>
        </ButtonWrapper>

        {signUpError && (
          <div className="error" data-testid="signUpError">
            {signUpError}
          </div>
        )}
        {logInError && (
          <div className="error" data-testid="logInError">
            {logInError}
          </div>
        )}
      </Section>
    );
  }

  return "";
};

export default Auth;
