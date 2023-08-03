import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

const initialState: { 
  
  name: string,
  email: string,
  category: string,
  message: string,
  focused: string
  
} = { 

  name: '',
  email: '',
  category: '',
  message: '',
  focused: '',

}

const supportFormReducer = createSlice({
  name: 'avatarReducer',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name= action.payload
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email= action.payload
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category= action.payload
    },
    setMessage(state, action: PayloadAction<string>) {
      state.message= action.payload
    },
    setFocused(state, action: PayloadAction<string>) {
      state.focused= action.payload
    },
  }
})

export const { setName, setEmail, setCategory, setMessage, setFocused } = supportFormReducer.actions
export default supportFormReducer.reducer