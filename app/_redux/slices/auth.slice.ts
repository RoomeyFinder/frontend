import User from "@/app/_types/User"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { checkAuthStatus } from "../thunks/auth.thunk"
import localforage from "localforage"
import STORAGE_KEYS from "@/app/STORAGE_KEYS"

interface IAuthState {
  token: string | null
  user: User | null
  loading: boolean
  errorMessage: string
  isUsingFallback: boolean
}

const initialState: IAuthState = {
  token: null,
  user: null,
  loading: true,
  errorMessage: "",
  isUsingFallback: false,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null
      state.user = null
      localforage.removeItem(STORAGE_KEYS.RF_USER)
      localforage.removeItem(STORAGE_KEYS.RF_TOKEN)
    },
    authenticate: (
      state,
      action: PayloadAction<{ user: Partial<User>; token: string }>
    ) => {
      state.user = state.user
        ? { ...state.user, ...action.payload }
        : state.user
      state.token = action.payload.token
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = state.user
        ? { ...state.user, ...action.payload }
        : state.user
    },
    updateErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload
    },
    resetErrorMessage: (state) => {
      state.errorMessage = ""
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkAuthStatus.pending, (state) => {
      state.loading = true
    })
    builder
      .addCase(
        checkAuthStatus.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: User | null
            statusCode: number
          }>
        ) => {
          const payload = action.payload
          state.user = payload.user as User
          localforage.setItem(STORAGE_KEYS.RF_USER, payload.user)
          state.loading = false
          state.isUsingFallback = payload.statusCode !== 200
        }
      )
      .addCase(checkAuthStatus.rejected, (state) => {
        state.user = null
        state.token = null
        state.loading = false
        state.errorMessage = "Please signin to continue"
      })
  },
})

export const {
  authenticate,
  logout,
  updateUser,
  updateErrorMessage,
  resetErrorMessage,
} = authSlice.actions
export default authSlice.reducer
