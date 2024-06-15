import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { fetchUserMessages, markMessagesAsRead } from "../thunks/messages.thunk"
import { Message } from "@/app/_types/Conversation"
import socketIO from "socket.io-client"
import localforage from "localforage"
import STORAGE_KEYS from "@/app/STORAGE_KEYS"

export const socket = (async () =>
  socketIO(`${process.env.NEXT_PUBLIC_SOCKET_URL}/conversations` as string, {
    auth: {
      token: await localforage.getItem(STORAGE_KEYS.RF_TOKEN),
    },
  }))()

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
  reducers: {
    addNewMessage: (
      state,
      action: PayloadAction<{ statusCode: number; message: Message }>
    ) => {
      if (action.payload.statusCode === 201)
        state.messages = {
          ...state.messages,
          [action.payload.message.conversationId]: [
            ...(state.messages[action.payload.message.conversationId] || []),
            action.payload.message,
          ],
        }
    },
  },
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
      .addCase(markMessagesAsRead.pending, (store) => {
        store.loading = true
      })
      .addCase(markMessagesAsRead.fulfilled, (store, action) => {
        if (action.payload.isDone)
          store.messages = {
            ...store.messages,
            [action.payload.conversationId]: store.messages[
              action.payload.conversationId
            ]?.map((msg) => ({ ...msg, seen: true })),
          }
        else store.errorMessage = "Unable to get your messages"
        store.loading = false
      })
      .addCase(markMessagesAsRead.rejected, (store) => {
        store.errorMessage =
          "Oops, Something went wrong while getting your messages!"
        store.loading = false
        store.hasError = true
      })
  },
})

export const { addNewMessage } = messagesSlice.actions
export default messagesSlice.reducer
