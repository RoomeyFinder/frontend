import STORAGE_KEYS from "@/app/STORAGE_KEYS"
import axiosFetcher from "@/app/_utils/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import localforage from "localforage"

export const fetchUserFavorites = createAsyncThunk(
  "favorites/fetchUserFavorites",
  async () => {
    const response = await axiosFetcher({
      url: "/favorites/me",
      method: "get",
    })
    const storedListings = await localforage.getItem(
      STORAGE_KEYS.RF_USER_LISTINGS
    )
    return {
      favorites:
        response.statusCode === 200
          ? response.favorites
          : storedListings || [],
      statusCode: response.statusCode,
    }
  }
)
