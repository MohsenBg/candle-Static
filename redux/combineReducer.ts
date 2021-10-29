import { ReducerLoading } from "./Loading/Reducer";
import { combineReducers } from "redux";
import { ReducerCoinsData } from "./coinsData/Reducer";

export const RootReducer = combineReducers({
  coinsData: ReducerCoinsData,
  loading: ReducerLoading,
});
