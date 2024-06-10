import { createSlice } from "@reduxjs/toolkit"
import {
  fetchRoomRecommendations,
  fetchRoomiesRecommendations,
} from "../thunks/recommendations.thunk"
import localforage from "localforage"
import STORAGE_KEYS from "@/app/STORAGE_KEYS"
import Favorite from "@/app/_types/Favorites"
import User from "@/app/_types/User"
import { Listing } from "@/app/_types/Listings"

interface IRecommendationsState {
  rooms: Listing[]
  roomies: User[]
  loadingRooms: boolean
  loadingRoomies: boolean
  errorMessage: string
  isUsingFallbackForRooms: boolean
  isUsingFallbackForRoomies: boolean
  hasError: boolean
  hasFetchedRooms: boolean
  hasFetchedRoomies: boolean
}

const initialState: IRecommendationsState = {
  rooms: [],
  roomies: [],
  loadingRooms: true,
  loadingRoomies: true,
  errorMessage: "",
  isUsingFallbackForRooms: false,
  isUsingFallbackForRoomies: false,
  hasError: false,
  hasFetchedRooms: false,
  hasFetchedRoomies: false,
}

export const recommendationsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    resetError: (state) => {
      state.errorMessage = ""
      state.hasError = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomRecommendations.pending, (store) => {
        store.loadingRooms = true
      })
      .addCase(fetchRoomRecommendations.fulfilled, (store, action) => {
        store.rooms = action.payload.recommendations
        store.hasFetchedRooms = true
        localforage.setItem(
          STORAGE_KEYS.RF_USER_ROOM_RECOMMENDATIONS,
          action.payload.recommendations
        )
        store.loadingRooms = false
        store.errorMessage = ""
        store.isUsingFallbackForRooms = action.payload.statusCode !== 200
      })
      .addCase(fetchRoomRecommendations.rejected, (store) => {
        store.errorMessage =
          "Oops, Something went wrong while getting your ads!"
        store.loadingRooms = false
        store.hasError = true
      })
      .addCase(fetchRoomiesRecommendations.pending, (store) => {
        store.loadingRoomies = true
      })
      .addCase(fetchRoomiesRecommendations.fulfilled, (store, action) => {
        store.roomies = action.payload.recommendations
        localforage.setItem(
          STORAGE_KEYS.RF_USER_ROOMIES_RECOMMENDATIONS,
          action.payload.recommendations
        )
        store.loadingRoomies = false
        store.isUsingFallbackForRoomies = action.payload.statusCode !== 200
      })
      .addCase(fetchRoomiesRecommendations.rejected, (store) => {
        store.errorMessage =
          "Oops, We were unable to complete that request! Please try again."
        store.loadingRoomies = false
        store.hasError = true
      })
  },
})

export const { resetError } = recommendationsSlice.actions
export default recommendationsSlice.reducer
