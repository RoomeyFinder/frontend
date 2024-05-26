import { createSlice } from "@reduxjs/toolkit"
import { Listing } from "@/app/_types/Listings"
import { fetchUserListings } from "../thunks/listings.thunk"
import localforage from "localforage"
import STORAGE_KEYS from "@/app/STORAGE_KEYS"

interface IAuthState {
  listings: Listing[]
  loading: boolean
  errorMessage: string
  isUsingFallback: boolean
  hasError: boolean
}

const initialState: IAuthState = {
  listings: [],
  loading: false,
  errorMessage: "",
  isUsingFallback: false,
  hasError: false
}

export const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserListings.pending, (store) => {
        store.loading = true
      })
      .addCase(fetchUserListings.fulfilled, (store, action) => {
        store.listings = action.payload.listings
        localforage.setItem(
          STORAGE_KEYS.RF_USER_LISTINGS,
          action.payload.listings
        )
        store.loading = false
        store.errorMessage = ""
        store.isUsingFallback = action.payload.statusCode !== 200
      })
      .addCase(fetchUserListings.rejected, (store) => {
        store.errorMessage =
          "Oops, Something went wrong while getting your ads!"
        store.loading = false
        store.hasError = true
      })
  },
})

export const {} = listingsSlice.actions
export default listingsSlice.reducer
