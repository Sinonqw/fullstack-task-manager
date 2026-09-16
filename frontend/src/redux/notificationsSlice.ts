import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  message: string;
  type: "success" | "error";
}

export interface NotificationsState {
  notification: Notification | null;
}
const initialState: NotificationsState = {
  notification: null,
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    showNotification: (state, action:PayloadAction<Notification>) => {
      state.notification = action.payload
    },
    hideNotification: (state) => {
      state.notification = null
    }
  },
});

// Action creators are generated for each case reducer function
export const {showNotification, hideNotification} = notificationsSlice.actions;

export default notificationsSlice.reducer;
