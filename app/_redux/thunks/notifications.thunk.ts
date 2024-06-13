import axiosFetcher from "@/app/_utils/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchUserNotifications = createAsyncThunk(
  "notifications/fetchUserNotifications",
  async () => {
    const response = await axiosFetcher({
      url: "/notifications/me",
      method: "get",
    })
    return {
      notifications: response.statusCode === 200 ? response.notifications : [],
      statusCode: response.statusCode,
    }
  }
)
export const markAllNotificationsAsSeen = createAsyncThunk(
  "notifications/markAllNotificationsAsSeen",
  async () => {
    const response = await axiosFetcher({
      url: "/notifications/seen",
      method: "get",
    })
    return {
      notifications: response.statusCode === 200 ? response.notifications : [],
      statusCode: response.statusCode,
    }
  }
)
