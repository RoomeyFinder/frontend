import { createSlice } from "@reduxjs/toolkit"
import { fetchUserNotifications } from "../thunks/notifications.thunk"
import Notification from "@/app/_types/Notification"

interface IAuthState {
  notifications: Notification[]
  loading: boolean
  errorMessage: string
  isUsingFallback: boolean
  hasError: boolean
  hasFetchedNotifications: boolean
}

const initialState: IAuthState = {
  notifications: [],
  loading: false,
  errorMessage: "",
  isUsingFallback: false,
  hasError: false,
  hasFetchedNotifications: false
}

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserNotifications.pending, (store) => {
        store.loading = true
      })
      .addCase(fetchUserNotifications.fulfilled, (store, action) => {
        store.notifications = action.payload.notifications
        store.loading = false
        store.errorMessage = ""
        store.hasFetchedNotifications = true
        store.isUsingFallback = action.payload.statusCode !== 200
      })
      .addCase(fetchUserNotifications.rejected, (store) => {
        store.errorMessage =
          "Oops, Something went wrong while getting your notifications"
        store.loading = false
        store.hasError = true
      })
  },
})

// export const {} = notificationsSlice.actions
export default notificationsSlice.reducer
