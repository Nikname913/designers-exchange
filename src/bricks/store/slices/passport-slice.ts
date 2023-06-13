import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IPassportReducer } from "../../models-ts/reducers/passport-reducer-models"

const initialState: IPassportReducer = {
  seri: '',
  number: '',
  who: '',
  date: '',
  adress: '',
  snils: '',
  inn: '',
  focused: ''
}

const passportReducer = createSlice({
  name: 'passportReducer',
  initialState,
  reducers: {
    setSeri: (state, action: PayloadAction<string>) => {
      state.seri = action.payload
    },
    setNumber: (state, action: PayloadAction<string>) => {
      state.number = action.payload
    },
    setWho: (state, action: PayloadAction<string>) => {
      state.who = action.payload
    },
    setDate: (state, action: PayloadAction<any>) => {
      state.date = action.payload
    },
    setAdress: (state, action: PayloadAction<string>) => {
      state.adress = action.payload
    },
    setSnils: (state, action: PayloadAction<string>) => {
      state.snils = action.payload
    },
    setInn: (state, action: PayloadAction<string>) => {
      state.inn = action.payload
    },
    setFocused: (state, action: PayloadAction<string>) => {
      state.focused = action.payload
    },
  }
})

export const { setSeri, setNumber, setWho, setDate, setAdress, setSnils, setInn, setFocused } = passportReducer.actions
export default passportReducer.reducer