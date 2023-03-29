import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IFOSReducer } from "../../models-ts/reducers/fos-reducer-models"

const initialState: IFOSReducer = {
  isShow: false,
  scrollTop: 0,
  showType: 'respondFromList'
}

const FOSReducer = createSlice({
  name: 'FOSReducer',
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<boolean>) => {
      state.isShow = action.payload
    },
    setShowType: (state, action: PayloadAction<'respondFromList' |
     'respondFromTask' | 
     'inviteOnTeam'    | 
     'commandRoot'     | 
     'command'         | 
     'commandShort'    |
     'authLogin'       |
     'authRestore'     |
     'authSupport'     |
     'changeAvatar'>) => {
      state.showType = action.payload
    },
    setScrollTop: (state, action: PayloadAction<number>) => {
      state.scrollTop = action.payload
    }
  }
})

export const { setShow, setScrollTop, setShowType } = FOSReducer.actions
export default FOSReducer.reducer