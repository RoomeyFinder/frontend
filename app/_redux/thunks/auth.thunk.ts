import STORAGE_KEYS from "@/app/STORAGE_KEYS"
import axiosFetcher from "@/app/_utils/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import localforage from "localforage"

export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async () => {
    const response = await axiosFetcher({
      url: "/users/me",
      method: "get",
    })
    const storedUser = await localforage.getItem(STORAGE_KEYS.RF_USER)
    return {
      user: response.statusCode === 200 ? response.user : storedUser || null,
      statusCode: response.statusCode,
    }
  }
)

export const updatePreferences = createAsyncThunk(
  "auth/updatePreferences",
  async (update: any) => {
    const response = await axiosFetcher({
      url: "/users/me/preferences",
      method: "put",
      body: update,
    })
    const storedUser = await localforage.getItem(STORAGE_KEYS.RF_USER)
    return {
      user: response.statusCode === 200 ? response.user : storedUser || null,
      statusCode: response.statusCode,
      message: response.message,
    }
  }
)
