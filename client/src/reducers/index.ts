import { combineReducers } from "redux";
import cartReducer from "./cart";
import favoritesReducer from "./favorites";

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  cart: cartReducer,
});

export type RootReducerType = ReturnType<typeof rootReducer>;

export default rootReducer;
