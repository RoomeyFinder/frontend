import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { fetchUserConversations } from "../thunks/conversations.thunk"
import localforage from "localforage"
import STORAGE_KEYS from "@/app/STORAGE_KEYS"
import Conversation from "@/app/_types/Conversation"

interface IAuthState {
  conversations: Conversation[]
  activeConversation: Conversation | null
  loading: boolean
  errorMessage: string
  isUsingFallback: boolean
  hasError: boolean
  hasFetchedUserConversations: boolean
}

const initialState: IAuthState = {
  conversations: [],
  loading: false,
  errorMessage: "",
  isUsingFallback: false,
  hasError: false,
  hasFetchedUserConversations: false,
  activeConversation: null,
}

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setActiveConversation: (state, action: PayloadAction<Conversation>) => {
      state.activeConversation = action.payload
    },
    removeActiveConversation: (state) => {
      state.activeConversation = null
    },
    updateConversation: (
      state,
      action: PayloadAction<{ id: string; update: Partial<Conversation> }>
    ) => {
      state.conversations = state.conversations.map((convo) =>
        convo._id === action.payload.id
          ? { ...convo, ...action.payload.update }
          : convo
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserConversations.pending, (store) => {
        store.loading = true
      })
      .addCase(fetchUserConversations.fulfilled, (store, action) => {
        store.conversations = action.payload.conversations
        localforage.setItem(
          STORAGE_KEYS.RF_USER_CONVERSATIONS,
          action.payload.conversations
        )
        store.loading = false
        store.errorMessage = ""
        store.isUsingFallback = action.payload.statusCode !== 200
        store.hasFetchedUserConversations = true
      })
      .addCase(fetchUserConversations.rejected, (store) => {
        store.errorMessage =
          "Oops, Something went wrong while getting your conversations!"
        store.loading = false
        store.hasError = true
      })
  },
})

export const {
  setActiveConversation,
  removeActiveConversation,
  updateConversation,
} = conversationsSlice.actions
export default conversationsSlice.reducer
