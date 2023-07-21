import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

const initialState: { avatarFile: number } = { avatarFile: 404 }

const avatarReducer = createSlice({
  name: 'avatarReducer',
  initialState,
  reducers: {
    setAvatarFile(state, action: PayloadAction<number>) {
      state.avatarFile= action.payload
    },
  }
})

export const { setAvatarFile } = avatarReducer.actions
export default avatarReducer.reducer