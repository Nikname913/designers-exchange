import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IEnterReducer } from "../../models-ts/reducers/enter-reducer-models"  

const initialState: IEnterReducer = {
  email: '',
  password: '',
}

const enterReducer = createSlice({
  name: 'enterReducer',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload
    },
  }
})

export const { setEmail, setPassword } = enterReducer.actions
export default enterReducer.reducer