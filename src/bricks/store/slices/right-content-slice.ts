import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IRightContentReducer } from "../../models-ts/reducers/right-content-reducer-models"

const initialState: IRightContentReducer = {
  isShow: false,
  showType: 'ECC',
  scrollTop: 0
}

const rightContentReducer = createSlice({
  name: 'rightContentReducer',
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<true | false | 'undefined'>) => {
      state.isShow = action.payload
    },
    setShowType: (state, action: PayloadAction<'ECC' |
       'MDCC'           | 
       'ChapterCC'      | 
       'ExpertCC'       | 
       'AgreementCC'    | 
       'AgreementNewCC' | 
       'LawyerCC'       |
       'ArguementCC'    |
       'EditProfileCC'  |
       'EditProjectsCC' |
       'EditEducationCC'>) => {
      state.showType = action.payload
    },
    setScrollTop: (state, action: PayloadAction<number>) => {
      state.scrollTop = action.payload
    }
  }
})

export const { setShow, setShowType, setScrollTop } = rightContentReducer.actions
export default rightContentReducer.reducer