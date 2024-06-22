import User from "@/app/_types/User"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  changePassword,
  checkAuthStatus,
  updatePreferences,
  updateSettings,
} from "../thunks/auth.thunk"
import localforage from "localforage"
import STORAGE_KEYS from "@/app/STORAGE_KEYS"
import toast from "react-hot-toast"

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
      Object.values(STORAGE_KEYS).forEach((val) => localforage.removeItem(val))
    },
    authenticate: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user
      state.token = action.payload.token
      localStorage.setItem(STORAGE_KEYS.RF_TOKEN, action.payload.token)
      localforage.setItem(STORAGE_KEYS.RF_TOKEN, action.payload.token)
      localforage.setItem(STORAGE_KEYS.RF_USER, action.payload.user)
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
      .addCase(
        updatePreferences.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: User | null
            statusCode: number
            message: string
          }>
        ) => {
          const payload = action.payload
          state.user = payload.user as User
          localforage.setItem(STORAGE_KEYS.RF_USER, payload.user)
          state.loading = false
          if (payload.statusCode !== 200) {
            state.errorMessage =
              action.payload.message ||
              "Oops, something went wrong! we were unable to update your preferences"
          } else
            toast.success("Your preferences have been successfully updated!", {
              duration: 5000,
            })
        }
      )
      .addCase(updatePreferences.rejected, (state) => {
        state.user = null
        state.token = null
        state.loading = false
        state.errorMessage = "Please signin to continue"
      })
      .addCase(
        updateSettings.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: User | null
            statusCode: number
            message: string
          }>
        ) => {
          const payload = action.payload
          state.user = payload.user as User
          localforage.setItem(STORAGE_KEYS.RF_USER, payload.user)
          state.loading = false
          console.log(action.payload)
          if (payload.statusCode !== 200) {
            state.errorMessage =
              action.payload.message ||
              "Oops, something went wrong! we were unable to update your settings"
          } else
            toast.success("Your settings have been successfully updated!", {
              duration: 5000,
            })
        }
      )
      .addCase(updateSettings.rejected, (state) => {
        state.user = null
        state.token = null
        state.loading = false
        state.errorMessage = "Please signin to continue"
      })
      .addCase(
        changePassword.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: User | null
            statusCode: number
            message: string
          }>
        ) => {
          const payload = action.payload
          state.user = payload.user as User
          localforage.setItem(STORAGE_KEYS.RF_USER, payload.user)
          state.loading = false
          console.log(action.payload)
          if (payload.statusCode !== 200) {
            state.errorMessage =
              action.payload.message ||
              "Oops, something went wrong! we were unable to update your password"
          } else
            toast.success("Your password has been successfully updated!", {
              duration: 5000,
            })
        }
      )
      .addCase(changePassword.rejected, (state) => {
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
