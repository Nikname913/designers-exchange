import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IPaginationReducer } from '../../models-ts/reducers/pagination-reducer-models'

const initialState: IPaginationReducer = {
  page: 1
}

export const paginationReducer = createSlice({
  name: 'paginationReducer',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    }
  }
})

export const { setPage } = paginationReducer.actions
export default paginationReducer.reducer