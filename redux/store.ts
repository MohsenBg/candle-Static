import { createStore, applyMiddleware, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { RootReducer } from "./combineReducer";

export const store: Store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const initialState = store.getState();
