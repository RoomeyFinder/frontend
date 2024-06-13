import { createSlice } from "@reduxjs/toolkit"
import { fetchUserMessages } from "../thunks/messages.thunk"
import localforage from "localforage"
import STORAGE_KEYS from "@/app/STORAGE_KEYS"
import { Message } from "@/app/_types/Conversation"

interface IAuthState {
  messages: Message[]
  loading: boolean
  errorMessage: string
  isUsingFallback: boolean
  hasError: boolean
}

const initialState: IAuthState = {
  messages: [],
  loading: false,
  errorMessage: "",
  isUsingFallback: false,
  hasError: false
}

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserMessages.pending, (store) => {
        store.loading = true
      })
      .addCase(fetchUserMessages.fulfilled, (store, action) => {
        store.messages = action.payload.messages
        localforage.setItem(
          STORAGE_KEYS.RF_USER_FAVORITES,
          action.payload.messages
        )
        store.loading = false
        store.errorMessage = ""
        store.isUsingFallback = action.payload.statusCode !== 200
      })
      .addCase(fetchUserMessages.rejected, (store) => {
        store.errorMessage =
          "Oops, Something went wrong while getting your ads!"
        store.loading = false
        store.hasError = true
      })
  },
})

// export const {} = messagesSlice.actions
export default messagesSlice.reducer
