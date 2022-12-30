import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IHeaderReducer } from '../../models-ts/reducers/header-reducer-models'

const initialState: IHeaderReducer = {
  walletCount: 20000
}

export const headerReducer = createSlice({
  name: 'headerReducer',
  initialState,
  reducers: {
    setWalletCount: (state, action: PayloadAction<number>) => {
      state.walletCount = action.payload
    }
  }
})

export const { setWalletCount } = headerReducer.actions
export default headerReducer.reducer