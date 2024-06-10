import { createSlice } from "@reduxjs/toolkit"
import { fetchUserFavorites } from "../thunks/favorites.thunk"
import localforage from "localforage"
import STORAGE_KEYS from "@/app/STORAGE_KEYS"
import Notification from "@/app/_types/Notification"

interface IAuthState {
  favorites: Notification[]
  loading: boolean
  errorMessage: string
  isUsingFallback: boolean
  hasError: boolean
}

const initialState: IAuthState = {
  favorites: [],
  loading: false,
  errorMessage: "",
  isUsingFallback: false,
  hasError: false
}

export const favoritesSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserFavorites.pending, (store) => {
        store.loading = true
      })
      .addCase(fetchUserFavorites.fulfilled, (store, action) => {
        store.favorites = action.payload.favorites
        localforage.setItem(
          STORAGE_KEYS.RF_USER_FAVORITES,
          action.payload.favorites
        )
        store.loading = false
        store.errorMessage = ""
        store.isUsingFallback = action.payload.statusCode !== 200
      })
      .addCase(fetchUserFavorites.rejected, (store) => {
        store.errorMessage =
          "Oops, Something went wrong while getting your ads!"
        store.loading = false
        store.hasError = true
      })
  },
})

export const {} = favoritesSlice.actions
export default favoritesSlice.reducer
