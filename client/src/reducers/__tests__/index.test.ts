import { createStore } from "redux";
import rootReducer from "..";

describe("Root Reducer Suite", () => {
  const store = createStore(rootReducer);

  test("loaded correctly", () => {
    expect(store.getState().cart).toEqual([]);
    expect(store.getState().favorites).toEqual([]);
  });
});
