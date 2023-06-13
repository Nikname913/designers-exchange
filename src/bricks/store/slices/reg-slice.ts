import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IRegReducer } from "../../models-ts/reducers/reg-reducer-models" 

const initialState: IRegReducer = {
  name: '',
  surname: '',
  secondName: '',
  email: '',
  number: '',
  spec: '',
  password: '',
  faceType: '',
  focused: '',
  code: ''
}

const regReducer = createSlice({
  name: 'regReducer',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    setSurname(state, action: PayloadAction<string>) {
      state.surname = action.payload
    },
    setSecondName(state, action: PayloadAction<string>) {
      state.secondName = action.payload
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    setNumber(state, action: PayloadAction<string>) {
      state.number = action.payload
    },
    setSpec(state, action: PayloadAction<string>) {
      state.spec = action.payload
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload
    },
    setFaceType(state, action: PayloadAction<string>) {
      state.faceType = action.payload
    },
    setFocused(state, action: PayloadAction<string>) {
      state.focused = action.payload
    },
    setCode(state, action: PayloadAction<string>) {
      state.code = action.payload
    },
  }
})

export const { setName, 
  setSurname, 
  setSecondName, 
  setEmail, 
  setNumber, 
  setSpec, 
  setPassword, 
  setFaceType,
  setFocused,
  setCode } = regReducer.actions
export default regReducer.reducer