import { createSlice } from "@reduxjs/toolkit"

interface IUIState {
  showPreferencesReminder: boolean
}

const initialState: IUIState = {
  showPreferencesReminder: false,
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showPreferencesReminder: (state) => {
      state.showPreferencesReminder = true
    },
    hidePreferencesReminder: (state) => {
      state.showPreferencesReminder = false
    },
  },
  extraReducers: (builder) => {},
})

export const { showPreferencesReminder, hidePreferencesReminder } =
  uiSlice.actions
export default uiSlice.reducer
