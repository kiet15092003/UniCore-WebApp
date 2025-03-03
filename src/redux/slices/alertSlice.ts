import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
  message: string;
  type: "success" | "error" | "info" | "warning";
  show: boolean;
}

const initialState: AlertState = {
  message: "",
  type: "info",
  show: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<{ message: string; type: AlertState["type"] }>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.show = true;
    },
    hideAlert: (state) => {
      state.show = false;
      state.message = "";
      state.type = "info";
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
