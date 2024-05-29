import STORAGE_KEYS from "@/app/STORAGE_KEYS"
import axiosFetcher from "@/app/_utils/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import localforage from "localforage"
import toast from "react-hot-toast"

export const fetchListings = createAsyncThunk(
  "listings/fetchListings",
  async () => {
    const response = await axiosFetcher({
      url: "/listings",
      method: "get",
    })
    const storedListings = await localforage.getItem(
      STORAGE_KEYS.RF_LISTINGS
    )
    return {
      listings:
        response.statusCode === 200 ? response.listings : storedListings || [],
      statusCode: response.statusCode,
    }
  }
)
