import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

const initialState: { 
  newCoast: string, 
  newPrepay: string,
  newExpert: string, 
  newText: string,
  focused: string } = { 
    newCoast: '',
    newPrepay: '',
    newExpert: '', 
    newText: '',
    focused: '' 
  }

const changeAgreeReducer = createSlice({
  name: 'changeAgreeReducer',
  initialState,
  reducers: {
    setNewCoast(state, action: PayloadAction<string>) {
      state.newCoast = action.payload
    },
    setNewPrepay(state, action: PayloadAction<string>) {
      state.newPrepay = action.payload
    },
    setNewExpert(state, action: PayloadAction<string>) {
      state.newExpert = action.payload
    },
    setNewText(state, action: PayloadAction<string>) {
      state.newText = action.payload
    },
    setFocused(state, action: PayloadAction<string>) {
      state.focused = action.payload
    }
  }
})

export const { setNewCoast, setNewPrepay, setNewExpert, setNewText, setFocused } = changeAgreeReducer.actions
export default changeAgreeReducer.reducer