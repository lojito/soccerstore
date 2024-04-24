import { type ReactNode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import reducers from "./reducers";

type Props = {
  children: ReactNode;
  initialStoreValue?: {
    favorites: number[];
    cart: number[];
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export default ({ children, initialStoreValue }: Props) => {
  const store = createStore(
    reducers,
    initialStoreValue as unknown as Partial<{ favorites: never; cart: never }>
  );

  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};
