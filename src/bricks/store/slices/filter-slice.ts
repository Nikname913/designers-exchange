import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

const initialState: { 
  fromCoast: string, 
  toCoast: string, 
  taskFilterName: string,
  focused: string 
} = {
  fromCoast: '',
  toCoast: '',
  taskFilterName: '',
  focused: ''
}

const filterReducer = createSlice({
  name: 'filterReducer',
  initialState,
  reducers: {
    setFromCoast(state, action: PayloadAction<string>) {
      state.fromCoast = action.payload
    },
    setToCoast(state, action: PayloadAction<string>) {
      state.toCoast = action.payload
    },
    setFocused(state, action: PayloadAction<string>) {
      state.focused = action.payload
    },
    setTFN(state, action: PayloadAction<string>) {
      state.taskFilterName = action.payload
    }
  }
})

export const { setFromCoast, setToCoast, setFocused, setTFN } = filterReducer.actions
export default filterReducer.reducer