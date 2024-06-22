import STORAGE_KEYS from "@/app/STORAGE_KEYS"
import axiosFetcher from "@/app/_utils/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import localforage from "localforage"

export const fetchUserConversations = createAsyncThunk(
  "conversations/fetchUserConversations",
  async () => {
    const response = await axiosFetcher({
      url: "/conversations/me",
      method: "get",
    })
    const storedConversations = await localforage.getItem(
      STORAGE_KEYS.RF_USER_CONVERSATIONS
    )
    return {
      conversations:
        response.statusCode === 200
          ? response.conversations
          : storedConversations || [],
      statusCode: response.statusCode,
    }
  }
)
