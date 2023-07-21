import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IPortfolioNewReducer } from '../../models-ts/reducers/portfolio-new-reducer-models'

const initialState: IPortfolioNewReducer = {
  name: '',
  start: {
    month: '',
    year: '',
  },
  finish: {
    month: '',
    year: ''
  },
  actsPayData: [],
  files: null,
  params: [],
  description: '',
  spec: []
}

const portfolioNewReducer = createSlice({
  name: 'portfolioNewReducer',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    setStart(state, action: PayloadAction<{ month: string, year: string }>) {
      state.start = action.payload
    },
    setFinish(state, action: PayloadAction<{ month: string, year: string }>) {
      state.finish = action.payload
    },
    setActsPayData(state, action: PayloadAction<Array<string>>) {
      state.actsPayData = action.payload
    },
    setParams(state, action: PayloadAction<Array<string>>) {
      state.actsPayData = action.payload
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload
    },
    setSpec(state, action: PayloadAction<Array<string>>) {
      state.actsPayData = action.payload
    },
  }
})

export const { setName, setStart, setFinish, setActsPayData, setParams, setDescription, setSpec} = portfolioNewReducer.actions
export default portfolioNewReducer.reducer