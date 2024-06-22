import STORAGE_KEYS from "@/app/STORAGE_KEYS"
import { FavoriteType } from "@/app/_types/Favorites"
import axiosFetcher from "@/app/_utils/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import localforage from "localforage"

export const fetchUserFavorites = createAsyncThunk(
  "favorites/fetchUserFavorites",
  async () => {
    const response = await axiosFetcher({
      url: "/favorites/me",
      method: "get",
    })
    const storedListings = await localforage.getItem(
      STORAGE_KEYS.RF_USER_LISTINGS
    )
    return {
      favorites:
        response.statusCode === 200 ? response.favorites : storedListings || [],
      statusCode: response.statusCode,
    }
  }
)

export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async (body: { doc: string; type: FavoriteType }) => {
    const response = await axiosFetcher({
      url: "/favorites/me",
      method: "post",
      body,
    })
    return response
  }
)

export const deleteFavorite = createAsyncThunk(
  "favorites/deleteFavorite",
  async (favoriteId?: string) => {
    const response = await axiosFetcher({
      url: `/favorites/${favoriteId}`,
      method: "delete",
    })
    return response
  }
)
