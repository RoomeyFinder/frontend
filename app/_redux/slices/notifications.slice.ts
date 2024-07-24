import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  fetchUserNotifications,
  markAllNotificationsAsSeen,
} from "../thunks/notifications.thunk"
import Notification from "@/app/_types/Notification"
import { mergeArrays } from "@/app/_utils"

interface INotificationsState {
  notifications: Notification[]
  loading: boolean
  errorMessage: string
  isUsingFallback: boolean
  hasError: boolean
  hasFetchedNotifications: boolean
}

const initialState: INotificationsState = {
  notifications: [],
  loading: false,
  errorMessage: "",
  isUsingFallback: false,
  hasError: false,
  hasFetchedNotifications: false,
}

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNewNotification: (
      state,
      action: PayloadAction<{ notification: Notification; statusCode: number }>
    ) => {
      if (action.payload?.statusCode === 201)
        state.notifications = mergeArrays(
          [action.payload.notification],
          state.notifications,
          "_id"
        )
    },
  },
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
      .addCase(markAllNotificationsAsSeen.fulfilled, (store) => {
        store.notifications = store.notifications.map((it) => ({
          ...it,
          seen: true,
        }))
      })
  },
})

export const { addNewNotification } = notificationsSlice.actions
export default notificationsSlice.reducer
