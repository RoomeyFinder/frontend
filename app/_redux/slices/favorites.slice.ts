import { createSlice } from "@reduxjs/toolkit"
import {
  addFavorite,
  deleteFavorite,
  fetchUserFavorites,
} from "../thunks/favorites.thunk"
import localforage from "localforage"
import STORAGE_KEYS from "@/app/STORAGE_KEYS"
import Favorite from "@/app/_types/Favorites"

interface IAuthState {
  favorites: Favorite[]
  loading: boolean
  errorMessage: string
  isUsingFallback: boolean
  hasError: boolean
  hasFetchedUserFavorites: boolean
}

const initialState: IAuthState = {
  favorites: [],
  loading: false,
  errorMessage: "",
  isUsingFallback: false,
  hasError: false,
  hasFetchedUserFavorites: false,
}

export const favoritesSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserFavorites.pending, (store) => {
        store.loading = true
      })
      .addCase(fetchUserFavorites.fulfilled, (store, action) => {
        store.favorites = action.payload.favorites
        store.hasFetchedUserFavorites = true
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
      .addCase(addFavorite.pending, (store) => {
        store.loading = true
      })
      .addCase(addFavorite.fulfilled, (store, action) => {
        if (
          action.payload.statusCode === 200 ||
          action.payload.statusCode === 201
        ) {
          store.favorites = store.favorites.filter(
            (it) => it._id !== action.payload.favorite._id
          )
          store.favorites = [action.payload.favorite, ...store.favorites]
          localforage.setItem(
            STORAGE_KEYS.RF_USER_FAVORITES,
            action.payload.favorites
          )
          store.loading = false
          store.errorMessage = ""
        } else {
          store.errorMessage =
            "Oops, We were unable to complete that request! Please try again."
          store.loading = false
          store.hasError = true
        }
      })
      .addCase(addFavorite.rejected, (store) => {
        store.errorMessage =
          "Oops, We were unable to complete that request! Please try again."
        store.loading = false
        store.hasError = true
      })
      .addCase(deleteFavorite.pending, (store) => {
        store.loading = true
      })
      .addCase(deleteFavorite.fulfilled, (store, action) => {
        if (
          action.payload.statusCode === 200 ||
          action.payload.statusCode === 201
        ) {
          store.favorites = store.favorites.filter(
            (it) => it._id !== action.payload.favorite._id
          )
          localforage.setItem(
            STORAGE_KEYS.RF_USER_FAVORITES,
            action.payload.favorites
          )
          store.loading = false
          store.errorMessage = ""
        } else {
          store.errorMessage =
            "Oops, We were unable to complete that request! Please try again."
          store.loading = false
          store.hasError = true
        }
      })
      .addCase(deleteFavorite.rejected, (store) => {
        store.errorMessage =
          "Oops, Something went wrong while getting your ads!"
        store.loading = false
        store.hasError = true
      })
  },
})

export const {} = favoritesSlice.actions
export default favoritesSlice.reducer
