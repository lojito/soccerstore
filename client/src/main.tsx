import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import App from "./App.tsx";
import Root from "./Root";

// eslint-disable-next-line react-refresh/only-export-components
const GlobalStyle = createGlobalStyle`
  body {
    background-color: whitesmoke;
  }
  
  .wrapper {
    min-width: 280px;
    max-width: 1200px;
    margin: 0 auto;
  }  
`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyle />
    <Root>
      <App />
    </Root>
  </React.StrictMode>
);
