import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUserContent } from '../../models-ts/reducers/user-content-reducer-models'

const initialState: IUserContent = {
  USERS_DATA: {
    showOne: 'e-0001',
    listExecutors: [],
    listCustomers: []
  }
}

export const userContentReducer = createSlice({
  name: 'userContentReducer',
  initialState,
  reducers: {
    selectShowUser: (state, action: PayloadAction<string>): void => {},
    setExecutors: (state, action: PayloadAction<any>): void => {
      state.USERS_DATA.listExecutors = action.payload
    },
    setCustomers: (state, action: PayloadAction<any>): void => {
      state.USERS_DATA.listCustomers = action.payload
    }
  }
})

export const { selectShowUser, setExecutors, setCustomers } = userContentReducer.actions
export default userContentReducer.reducer