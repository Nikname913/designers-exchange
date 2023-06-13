import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IHeaderReducer } from '../../models-ts/reducers/header-reducer-models'

const initialState: IHeaderReducer = {
  walletCount: 20000,
  alertData: [],
  selectedUsersType: 'CUST'
}

export const headerReducer = createSlice({
  name: 'headerReducer',
  initialState,
  reducers: {
    setWalletCount: (state, action: PayloadAction<number>) => {
      state.walletCount = action.payload
    },
    setAlertData: (state, action: PayloadAction<any>) => {
      state.alertData = action.payload
    },
    setSelectedUsersType: (state, action: PayloadAction<any>) => {
      state.selectedUsersType = action.payload
    }
  }
})

export const { setWalletCount, setAlertData, setSelectedUsersType } = headerReducer.actions
export default headerReducer.reducer