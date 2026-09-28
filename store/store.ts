import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  totalItems: number;
}

const initialState: CartState = {
  totalItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementCart: (state) => {
      state.totalItems += 1;
    },
    addMultipleItems: (state, action: PayloadAction<number>) => {
      state.totalItems += action.payload;
    },
    resetCart: (state) => {
      state.totalItems = 0;
    },
  },
});

export const { incrementCart, addMultipleItems, resetCart } = cartSlice.actions;

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
