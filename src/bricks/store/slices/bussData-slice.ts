import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IBussDataReducer } from "../../models-ts/reducers/bussData-reducer-models"

const initialState: IBussDataReducer = {
  shortName: '',
  fullName: '',
  inn: '',
  kpp: '',
  ogrn: '',
  yurAddress: '',
  postAddress: '',
  boss: {
    name: '',
    type: 0
  },
  focused: ''
}

const bussDataReducer = createSlice({
  name: 'bussDataReducer',
  initialState,
  reducers: {
    setShortName: (state, action: PayloadAction<string>) => {
      state.shortName = action.payload
    },
    setFullName: (state, action: PayloadAction<string>) => {
      state.fullName = action.payload
    },
    setInn: (state, action: PayloadAction<string>) => {
      state.inn = action.payload
    },
    setKpp: (state, action: PayloadAction<any>) => {
      state.kpp = action.payload
    },
    setOgrn: (state, action: PayloadAction<string>) => {
      state.ogrn = action.payload
    },
    setYurAddress: (state, action: PayloadAction<string>) => {
      state.yurAddress = action.payload
    },
    setPostAddress: (state, action: PayloadAction<string>) => {
      state.postAddress = action.payload
    },
    setBossName: (state, action: PayloadAction<string>) => {
      state.boss.name = action.payload
    },
    setBossType: (state, action: PayloadAction<number>) => {
      state.boss.type = action.payload
    },
    setFocused: (state, action: PayloadAction<string>) => {
      state.focused = action.payload
    },
  }
})

export const { setShortName, 
  setFullName,
  setInn,
  setKpp,
  setOgrn,
  setYurAddress,
  setPostAddress,
  setBossName,
  setBossType,
  setFocused } = bussDataReducer.actions
export default bussDataReducer.reducer