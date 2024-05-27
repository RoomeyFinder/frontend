import STORAGE_KEYS from "@/app/STORAGE_KEYS"
import axiosFetcher from "@/app/_utils/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import localforage from "localforage"
import toast from "react-hot-toast"

export const fetchUserListings = createAsyncThunk(
  "listings/fetchUserListings",
  async () => {
    const response = await axiosFetcher({
      url: "/listings/me",
      method: "get",
    })
    const storedListings = await localforage.getItem(
      STORAGE_KEYS.RF_USER_LISTINGS
    )
    console.log("done")
    return {
      listings:
        response.statusCode === 200 ? response.listings : storedListings || [],
      statusCode: response.statusCode,
    }
  }
)

export const deleteListing = createAsyncThunk(
  "listings/deleteListing",
  async (listingId: string) => {
    const response = await axiosFetcher({
      url: `/listings/${listingId}`,
      method: "delete",
    })

    return {
      isDeleted: response.statusCode === 204,
      listingId,
    }
  }
)

export const activateListing = createAsyncThunk(
  "listings/activateListing",
  async (listingId: string) => {
    const response = await axiosFetcher({
      url: `/listings/${listingId}/activate`,
      method: "put",
    })
    toast[response.statusCode >= 400 ? "error" : "success"](response.message)
    return {
      isDeleted: response.statusCode === 204,
    }
  }
)

export const deactivateListing = createAsyncThunk(
  "listings/deactivateListing",
  async (listingId: string) => {
    const response = await axiosFetcher({
      url: `/listings/${listingId}/deactivate`,
      method: "put",
    })
    toast[response.statusCode >= 400 ? "error" : "success"](response.message)
    return {
      isDeleted: response.statusCode === 204,
    }
  }
)
