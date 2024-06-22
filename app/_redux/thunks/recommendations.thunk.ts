import STORAGE_KEYS from "@/app/STORAGE_KEYS"
import axiosFetcher from "@/app/_utils/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import localforage from "localforage"

export const fetchRoomiesRecommendations = createAsyncThunk(
  "recommendations/fetchRoomiesRecommendations",
  async () => {
    const response = await axiosFetcher({
      url: "/recommendations/roomies",
      method: "get",
    })
    const storedRoomiesRecommendations = await localforage.getItem(
      STORAGE_KEYS.RF_USER_ROOMIES_RECOMMENDATIONS
    )
    return {
      recommendations:
        response.statusCode === 200
          ? response.recommendations
          : storedRoomiesRecommendations || [],
      statusCode: response.statusCode,
    }
  }
)

export const fetchRoomRecommendations = createAsyncThunk(
  "recommendations/fetchRoomRecommendations",
  async () => {
    const response = await axiosFetcher({
      url: "/recommendations/rooms",
      method: "get",
    })
    const storedRoomsRecommendations = await localforage.getItem(
      STORAGE_KEYS.RF_USER_ROOM_RECOMMENDATIONS
    )
    return {
      recommendations:
        response.statusCode === 200
          ? response.recommendations
          : storedRoomsRecommendations || [],
      statusCode: response.statusCode,
    }
  }
)
