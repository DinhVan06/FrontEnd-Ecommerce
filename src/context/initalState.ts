import { fetchCart } from "../utils/fetchLocalStorageData";

const cartInfo = fetchCart();

export interface InitialState {
  user: null | any;
  cartShow: boolean;
  cartItems: Array<object>;
}

export const initialState: InitialState = {
  user: null,
  cartShow: false,
  cartItems: cartInfo,
};
