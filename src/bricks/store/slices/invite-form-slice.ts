import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

const initialState: { fee: string, comment?: string, focused: string } = { fee: '', comment: '',  focused: '' }

const inviteFormReducer = createSlice({
  name: 'inviteFormReducer',
  initialState,
  reducers: {
    setFee(state, action: PayloadAction<string>) {
      state.fee= action.payload
    },
    setComment(state, action: PayloadAction<string>) {
      state.comment= action.payload
    },
    setFocused(state, action: PayloadAction<string>) {
      state.focused = action.payload
    }
  }
})

export const { setFee, setComment, setFocused } = inviteFormReducer.actions
export default inviteFormReducer.reducer