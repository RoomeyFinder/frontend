import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Listing } from "@/app/_types/Listings"
import {
  deleteListing,
  fetchUserListings,
  deactivateListing,
  activateListing,
} from "../thunks/listings.thunk"
import localforage from "localforage"
import STORAGE_KEYS from "@/app/STORAGE_KEYS"

interface IAuthState {
  listings: Listing[]
  loading: boolean
  errorMessage: string
  isUsingFallback: boolean
  hasError: boolean
  hasFetchedUserListings: boolean
}

const initialState: IAuthState = {
  listings: [],
  loading: false,
  errorMessage: "",
  isUsingFallback: false,
  hasError: false,
  hasFetchedUserListings: false,
}

export const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    resetError: (store) => {
      store.hasError = false
      store.errorMessage = ""
    },
    addOneListing: (
      store,
      action: PayloadAction<{ listing: Listing; isNew: boolean }>
    ) => {
      if (action.payload.isNew)
        store.listings = [...store.listings, action.payload.listing]
      else
        store.listings = store.listings.map((it) =>
          action.payload.listing._id === it._id ? action.payload.listing : it
        )
    },
  },
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
        store.hasFetchedUserListings = action.payload.statusCode === 200
      })
      .addCase(fetchUserListings.rejected, (store) => {
        store.errorMessage =
          "Oops, Something went wrong while getting your ads!"
        store.loading = false
        store.hasError = true
      })
      .addCase(deactivateListing.pending, (store) => {
        store.loading = true
      })
      .addCase(deactivateListing.fulfilled, (store, action) => {
        if (action.payload.isDeleted) {
          store.listings = store.listings.map((it) =>
            it._id === action.payload.listingId
              ? { ...it, isActivated: false }
              : it
          )
        }
        store.loading = false
        store.errorMessage = ""
      })
      .addCase(deactivateListing.rejected, (store) => {
        store.errorMessage =
          "Oops, Something went wrong while getting your ads!"
        store.loading = false
        store.hasError = true
      })
      .addCase(activateListing.pending, (store) => {
        store.loading = true
      })
      .addCase(activateListing.fulfilled, (store, action) => {
        if (action.payload.isDeleted) {
          store.listings = store.listings.map((it) =>
            it._id === action.payload.listingId
              ? { ...it, isActivated: true }
              : it
          )
        }
        store.loading = false
        store.errorMessage = ""
      })
      .addCase(activateListing.rejected, (store) => {
        store.errorMessage =
          "Oops, Something went wrong while getting your ads!"
        store.loading = false
        store.hasError = true
      })
      .addCase(deleteListing.pending, (store) => {
        store.loading = true
      })
      .addCase(deleteListing.fulfilled, (store, action) => {
        if (action.payload.isDeleted) {
          store.listings = store.listings.filter(
            (listing) => listing._id !== action.payload.listingId
          )
          localforage.setItem(STORAGE_KEYS.RF_USER_LISTINGS, store.listings)
          store.errorMessage = ""
          store.hasError = false
        } else {
          store.errorMessage =
            "We were unable to delete that ad. Please try again."
          console.log("We were unable to delete that ad. Please try again.")
          store.hasError = true
        }
        store.loading = false
      })
      .addCase(deleteListing.rejected, (store) => {
        store.errorMessage =
          "We were unable to delete that ad. Please try again."
        console.log("We were unable to delete that ad. Please try again.")
        store.loading = false
        store.hasError = true
      })
  },
})

export const { resetError, addOneListing } = listingsSlice.actions
export default listingsSlice.reducer
