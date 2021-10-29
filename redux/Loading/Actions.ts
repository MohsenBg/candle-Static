import { ActionTypeLoading as ActionType } from "./ActionType";

interface onLoading {
  type: ActionType.ON_LOADING;
}
interface endLoading {
  type: ActionType.END_LOADING;
}

export type ActionsLoading = onLoading | endLoading;
