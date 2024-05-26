import STORAGE_KEYS from "@/app/STORAGE_KEYS"
import axiosFetcher from "@/app/_utils/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import localforage from "localforage"

export const fetchUsersInterests = createAsyncThunk(
  "interests/fetchUsersInterests",
  async () => {
    const response = await axiosFetcher({
      url: "/interestss/me",
      method: "get",
    })
    const storedListings = await localforage.getItem(
      STORAGE_KEYS.RF_USER_LISTINGS
    )
    return {
      interests:
        response.statusCode === 200
          ? response.interests
          : storedListings || [],
      statusCode: response.statusCode,
    }
  }
)
