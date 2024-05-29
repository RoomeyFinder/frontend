import { createSlice } from "@reduxjs/toolkit"
import { Listing } from "@/app/_types/Listings"
import localforage from "localforage"
import STORAGE_KEYS from "@/app/STORAGE_KEYS"
import { fetchListings } from "../thunks/search.thunk"

interface ISearchState {
  listings: Listing[]
  loading: boolean
  errorMessage: string
  isUsingFallback: boolean
  hasError: boolean
  hasFetchedInitialListings: boolean
}

const initialState: ISearchState = {
  listings: [],
  loading: false,
  errorMessage: "",
  isUsingFallback: false,
  hasError: false,
  hasFetchedInitialListings: false,
}

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    resetError: (store) => {
      store.hasError = false
      store.errorMessage = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (store) => {
        store.loading = true
      })
      .addCase(fetchListings.fulfilled, (store, action) => {
        store.listings = action.payload.listings
        localforage.setItem(
          STORAGE_KEYS.RF_LISTINGS,
          action.payload.listings
        )
        store.loading = false
        store.errorMessage = ""
        store.isUsingFallback = action.payload.statusCode !== 200
        store.hasFetchedInitialListings = action.payload.statusCode === 200
      })
      .addCase(fetchListings.rejected, (store) => {
        store.errorMessage =
          "Oops, Something went wrong while getting your ads!"
        store.loading = false
        store.hasError = true
      })
  },
})

export const { resetError } = searchSlice.actions
export default searchSlice.reducer
