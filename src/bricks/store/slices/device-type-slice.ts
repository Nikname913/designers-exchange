import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

const initialState: { device: 'PC' | 'MOBILE' } = { device: 'PC' }

const deviceTypeReducer = createSlice({
  name: 'deviceTypeReducer',
  initialState,
  reducers: {
    setDevice(state, action: PayloadAction<'PC' | 'MOBILE'>) {
      state.device= action.payload
    },
  }
})

export const { setDevice } = deviceTypeReducer.actions
export default deviceTypeReducer.reducer