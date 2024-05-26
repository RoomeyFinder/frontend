import STORAGE_KEYS from "@/app/STORAGE_KEYS"
import axiosFetcher from "@/app/_utils/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import localforage from "localforage"

export const fetchUserListings = createAsyncThunk(
  "auth/fetchUserListings",
  async () => {
    const response = await axiosFetcher({
      url: "/listings/me",
      method: "get",
    })
    const storedListings = await localforage.getItem(
      STORAGE_KEYS.RF_USER_LISTINGS
    )
    return {
      listings:
        response.statusCode === 200
          ? response.listings
          : storedListings || [],
      statusCode: response.statusCode,
    }
  }
)
