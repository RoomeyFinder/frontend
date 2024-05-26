import { createSlice } from "@reduxjs/toolkit"
import { fetchUsersInterests } from "../thunks/interests.thunk"
import localforage from "localforage"
import STORAGE_KEYS from "@/app/STORAGE_KEYS"
import Interest from "@/app/_types/Interest"

interface IAuthState {
  interests: Interest[]
  loading: boolean
  errorMessage: string
  isUsingFallback: boolean
  hasError: boolean
}

const initialState: IAuthState = {
  interests: [],
  loading: false,
  errorMessage: "",
  isUsingFallback: false,
  hasError: false
}

export const interestsSlice = createSlice({
  name: "interests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersInterests.pending, (store) => {
        store.loading = true
      })
      .addCase(fetchUsersInterests.fulfilled, (store, action) => {
        store.interests = action.payload.interests
        localforage.setItem(
          STORAGE_KEYS.RF_USER_FAVORITES,
          action.payload.interests
        )
        store.loading = false
        store.errorMessage = ""
        store.isUsingFallback = action.payload.statusCode !== 200
      })
      .addCase(fetchUsersInterests.rejected, (store) => {
        store.errorMessage =
          "Oops, Something went wrong while getting your ads!"
        store.loading = false
        store.hasError = true
      })
  },
})

export const {} = interestsSlice.actions
export default interestsSlice.reducer
