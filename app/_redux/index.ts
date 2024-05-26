"use client"
import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import authReducer from "./slices/auth.slice"
import listingsReducer from "./slices/listings.slice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    listings: listingsReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
