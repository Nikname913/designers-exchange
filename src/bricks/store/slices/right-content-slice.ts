import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IRightContentReducer } from "../../models-ts/reducers/right-content-reducer-models"

const initialState: IRightContentReducer = {
  isShow: false,
  scrollTop: 0
}

const rightContentReducer = createSlice({
  name: 'rightContentReducer',
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<boolean>) => {
      state.isShow = action.payload
    },
    setScrollTop: (state, action: PayloadAction<number>) => {
      state.scrollTop = action.payload
    }
  }
})

export const { setShow, setScrollTop } = rightContentReducer.actions
export default rightContentReducer.reducer