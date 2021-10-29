import { ActionsLoading as Actions } from "./Actions";
import { ActionTypeLoading as ActionType } from "./ActionType";

const initialState = {
  loading: false,
};

export const ReducerLoading = (state = initialState, actions: Actions) => {
  switch (actions.type) {
    case ActionType.ON_LOADING:
      return { ...state, loading: true };
    case ActionType.END_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};
