import { ActionTypeCoinsData as ActionType } from "./ActionType";

interface storeData {
  type: ActionType.STORE_COINS_DATA;
  payload: any;
}

export type ActionsCoinsData = storeData;
