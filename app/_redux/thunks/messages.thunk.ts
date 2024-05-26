import STORAGE_KEYS from "@/app/STORAGE_KEYS"
import axiosFetcher from "@/app/_utils/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import localforage from "localforage"

export const fetchUserMessages = createAsyncThunk(
  "messages/fetchUserMessages",
  async () => {
    const response = await axiosFetcher({
      url: "/messages/me",
      method: "get",
    })
    const storedListings = await localforage.getItem(
      STORAGE_KEYS.RF_USER_LISTINGS
    )
    return {
      messages:
        response.statusCode === 200
          ? response.messages
          : storedListings || [],
      statusCode: response.statusCode,
    }
  }
)
