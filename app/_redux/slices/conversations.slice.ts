
import { createSlice } from "@reduxjs/toolkit"
import { fetchUserConversations } from "../thunks/conversations.thunk"
import localforage from "localforage"
import STORAGE_KEYS from "@/app/STORAGE_KEYS"
import Conversation from "@/app/_types/Conversation"

interface IAuthState {
  conversations: Conversation[]
  loading: boolean
  errorMessage: string
  isUsingFallback: boolean
  hasError: boolean
}

const initialState: IAuthState = {
  conversations: [],
  loading: false,
  errorMessage: "",
  isUsingFallback: false,
  hasError: false
}

export const conversationsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserConversations.pending, (store) => {
        store.loading = true
      })
      .addCase(fetchUserConversations.fulfilled, (store, action) => {
        store.conversations = action.payload.conversations
        localforage.setItem(
          STORAGE_KEYS.RF_USER_FAVORITES,
          action.payload.conversations
        )
        store.loading = false
        store.errorMessage = ""
        store.isUsingFallback = action.payload.statusCode !== 200
      })
      .addCase(fetchUserConversations.rejected, (store) => {
        store.errorMessage =
          "Oops, Something went wrong while getting your ads!"
        store.loading = false
        store.hasError = true
      })
  },
})

// export const {} = conversationsSlice.actions
export default conversationsSlice.reducer
