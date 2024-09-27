import { createSlice } from "@reduxjs/toolkit"
import { Listing } from "@/app/_types/Listings"
import localforage from "localforage"
import STORAGE_KEYS from "@/app/STORAGE_KEYS"
import { fetchListings, fetchUsers } from "../thunks/search.thunk"
import User from "@/app/_types/User"

interface ISearchState {
  listings: Listing[]
  users: User[]
  loading: boolean
  errorMessage: string
  isUsingFallback: boolean
  hasError: boolean
  hasFetchedInitialListings: boolean
  hasFetchedInitialUsers: boolean
}

const initialState: ISearchState = {
  listings: [],
  users: [],
  loading: false,
  errorMessage: "",
  isUsingFallback: false,
  hasError: false,
  hasFetchedInitialListings: false,
  hasFetchedInitialUsers: false,
}

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    resetError: (store) => {
      store.hasError = false
      store.errorMessage = ""
    },
    startLoading: (store) => {
      store.loading = true
    },
    stopLoading: (store) => {
      store.loading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, () => {
        // store.loading = true
      })
      .addCase(fetchListings.fulfilled, (store, action) => {
        store.listings = action.payload.listings
        localforage.setItem(STORAGE_KEYS.RF_LISTINGS, action.payload.listings)
        // store.loading = false
        store.errorMessage = ""
        store.isUsingFallback = action.payload.statusCode !== 200
        store.hasFetchedInitialListings = true
        // action.payload.statusCode === 200
      })
      .addCase(fetchListings.rejected, (store) => {
        store.errorMessage = "Oops, Something went wrong!"
        // store.loading = false
        store.hasError = true
      })
      .addCase(fetchUsers.pending, (store) => {
        store.loading = true
      })
      .addCase(fetchUsers.fulfilled, (store, action) => {
        store.users = action.payload.users
        localforage.setItem(STORAGE_KEYS.RF_USERS, action.payload.users)
        store.loading = false
        store.errorMessage = ""
        store.isUsingFallback = action.payload.statusCode !== 200
        store.hasFetchedInitialUsers = true
        // action.payload.statusCode === 200
      })
      .addCase(fetchUsers.rejected, (store) => {
        store.errorMessage = "Oops, Something went wrong!"
        store.loading = false
        store.hasError = true
      })
  },
})

export const { resetError, startLoading, stopLoading } = searchSlice.actions
export default searchSlice.reducer
