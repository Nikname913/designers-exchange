import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

const initialState: { aboutText: string, focused: string } = { aboutText: '', focused: '' }

const aboutTextReducer = createSlice({
  name: 'aboutTextReducer',
  initialState,
  reducers: {
    setAboutText(state, action: PayloadAction<string>) {
      state.aboutText = action.payload
    },
    setFocused(state, action: PayloadAction<string>) {
      state.focused = action.payload
    }
  }
})

export const { setAboutText, setFocused } = aboutTextReducer.actions
export default aboutTextReducer.reducer