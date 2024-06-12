import { PayloadAction, createSlice } from "@reduxjs/toolkit"
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
  hasFetchedUserInterests: boolean
}

const initialState: IAuthState = {
  interests: [],
  loading: false,
  errorMessage: "",
  isUsingFallback: false,
  hasError: false,
  hasFetchedUserInterests: false,
}

export const interestsSlice = createSlice({
  name: "interests",
  initialState,
  reducers: {
    resetError: (state) => {
      state.errorMessage = ""
      state.hasError = false
    },
    addNewInterest: (state, action: PayloadAction<Interest>) => {
      state.interests = [...state.interests, action.payload]
    },
  },
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
        store.hasFetchedUserInterests = true
      })
      .addCase(fetchUsersInterests.rejected, (store) => {
        store.errorMessage =
          "Oops, Something went wrong while getting your ads!"
        store.loading = false
        store.hasError = true
      })
  },
})

export const { resetError, addNewInterest } = interestsSlice.actions
export default interestsSlice.reducer
