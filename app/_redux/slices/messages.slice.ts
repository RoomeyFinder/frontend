import { createSlice } from "@reduxjs/toolkit"
import { fetchUserMessages } from "../thunks/messages.thunk"
import localforage from "localforage"
import STORAGE_KEYS from "@/app/STORAGE_KEYS"
import { Message } from "@/app/_types/Conversation"

interface IAuthState {
  messages: { [x: string]: Message[] }
  loading: boolean
  errorMessage: string
  isUsingFallback: boolean
  hasError: boolean
}

const initialState: IAuthState = {
  messages: {},
  loading: false,
  errorMessage: "",
  isUsingFallback: false,
  hasError: false,
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
        if (action.payload.statusCode === 200)
          store.messages = {
            ...store.messages,
            [action.payload.conversationId]: action.payload.messages,
          }
        else store.errorMessage = "Unable to get your messages"
        store.loading = false
      })
      .addCase(fetchUserMessages.rejected, (store) => {
        store.errorMessage =
          "Oops, Something went wrong while getting your messages!"
        store.loading = false
        store.hasError = true
      })
  },
})

// export const {} = messagesSlice.actions
export default messagesSlice.reducer
