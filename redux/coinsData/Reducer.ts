import { ActionsCoinsData as Actions } from "./Actions";
import { ActionTypeCoinsData as ActionType } from "./ActionType";

const initialState = {
  coinsData: [],
};

export const ReducerCoinsData = (state = initialState, actions: Actions) => {
  switch (actions.type) {
    case ActionType.STORE_COINS_DATA:
      return { ...state, coinsData: actions.payload };
    default:
      return state;
  }
};
