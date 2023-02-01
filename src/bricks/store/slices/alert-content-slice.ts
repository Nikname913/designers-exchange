import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IAlertContentReducer } from "../../models-ts/reducers/alert-content-reducer-models"
import { CSSProperties } from "styled-components"

const initialState: IAlertContentReducer = {
  isShow: true,
  type: 'success',
  message: 'lorem ipsum dolor sit amet, consectetur adipiscing',
  styles: {
    paddingBottom: '12px', 
    paddingTop: '10px'
  }
}

const alertContentReducer = createSlice({
  name: 'alertContentReducer',
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<boolean>) => {
      state.isShow = action.payload
    },
    setType: (state, action: PayloadAction<"success" | "warning" | "info" | "error">) => {
      state.type = action.payload
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload
    },
    setCSS: (state, action: PayloadAction<CSSProperties>) => {
      state.styles = action.payload
    },
  }
})

export const { setShow, setType, setMessage, setCSS } = alertContentReducer.actions
export default alertContentReducer.reducer