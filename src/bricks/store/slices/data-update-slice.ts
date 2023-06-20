import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IDataUpdateReducer } from "../../models-ts/reducers/data-update-reducer-models"

const initialState: IDataUpdateReducer = {
  updating: true,
  customerFilterName: '',
  executorFilterName: ''
}

const dataUpdateReducer = createSlice({
  name: 'dataUpdateReducer',
  initialState,
  reducers: {
    setUpdating(state, action: PayloadAction<boolean>) {
      state.updating = action.payload
    },
    setCFN(state, action: PayloadAction<string>) {
      state.customerFilterName = action.payload
    },
    setEFN(state, action: PayloadAction<string>) {
      state.executorFilterName = action.payload
    }
  }
})

export const { setUpdating, setCFN, setEFN } = dataUpdateReducer.actions
export default dataUpdateReducer.reducer