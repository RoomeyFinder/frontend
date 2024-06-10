import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IUIState {
  showPreferencesReminder: boolean
  hasClosedPreferenceReminder: boolean
}

const initialState: IUIState = {
  showPreferencesReminder: false,
  hasClosedPreferenceReminder: false,
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showPreferencesReminder: (state) => {
      state.showPreferencesReminder = true
    },
    hidePreferencesReminder: (state, action: PayloadAction<boolean>) => {
      state.showPreferencesReminder = false
      state.hasClosedPreferenceReminder = action.payload
    },
  },
  extraReducers: (builder) => {},
})

export const { showPreferencesReminder, hidePreferencesReminder } =
  uiSlice.actions
export default uiSlice.reducer
