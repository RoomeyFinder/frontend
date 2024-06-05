"use client"
import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import authReducer from "./slices/auth.slice"
import uiReducer from "./slices/ui.slice"
import favoritesReducer from "./slices/favorites.slice"
import listingsReducer from "./slices/listings.slice"
import interestsReducer from "./slices/interests.slice"
import notificationsReducer from "./slices/notifications.slice"
import messagesReducer from "./slices/messages.slice"
import searchReducer from "./slices/search.slice"
import conversationsReducer from "./slices/conversations.slice"
import recommendationsReducer from "./slices/recommendations.slice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    listings: listingsReducer,
    favorites: favoritesReducer,
    interests: interestsReducer,
    notifications: notificationsReducer,
    messages: messagesReducer,
    conversations: conversationsReducer,
    search: searchReducer,
    ui: uiReducer,
    recommendations: recommendationsReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
