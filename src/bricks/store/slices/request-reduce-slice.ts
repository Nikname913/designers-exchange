import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IRequestReducer } from '../../models-ts/reducers/request-reducer-models'

const initialState: IRequestReducer = {
  reduceValue: 'deactive'
}

export const requestReducer = createSlice({
  name: 'requestReducer',
  initialState,
  reducers: {
    setReduceValue: (state, action: PayloadAction<string>) => {
      state.reduceValue = action.payload
    }
  }
})

export const { setReduceValue } = requestReducer.actions
export default requestReducer.reducer