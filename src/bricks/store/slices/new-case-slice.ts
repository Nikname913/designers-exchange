import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { INewCaseReducer } from "../../models-ts/reducers/new-case-reducer-models"

const initialState: INewCaseReducer = { 
    caseName: '',
    caseStartYear: '',
    caseStartMonth: '',
    caseFinishYear: '',
    caseFinishMonth: '',
    casePay: '',
    caseFiles: [],
    caseParams: {
      one: '',
      two: '',
      three: '',
      four: '',
    },
    caseText: '',
    caseTags: [],
    focused: '',
  }

const newCaseReducer = createSlice({
  name: 'newCaseReducer',
  initialState,
  reducers: {
    setCaseName(state, action: PayloadAction<string>) {
      state.caseName = action.payload
    },
    setCaseSY(state, action: PayloadAction<string>) {
      state.caseStartYear = action.payload
    },
    setCaseSM(state, action: PayloadAction<string>) {
      state.caseStartMonth = action.payload
    },
    setCaseFY(state, action: PayloadAction<string>) {
      state.caseFinishYear = action.payload
    },
    setCaseFM(state, action: PayloadAction<string>) {
      state.caseFinishMonth = action.payload
    },
    setCasePay(state, action: PayloadAction<string>) {
      state.casePay = action.payload
    },
    setCaseFiles(state, action: PayloadAction<File>) {
      state.caseFiles = [ action.payload ]
    },
    setCaseParams1(state, action: PayloadAction<string>) {
      state.caseParams.one = action.payload
    },
    setCaseParams2(state, action: PayloadAction<string>) {
      state.caseParams.two = action.payload
    },
    setCaseParams3(state, action: PayloadAction<string>) {
      state.caseParams.three = action.payload
    },
    setCaseParams4(state, action: PayloadAction<string>) {
      state.caseParams.four = action.payload
    },
    setCaseText(state, action: PayloadAction<string>) {
      state.caseText = action.payload
    },
    setCaseTags(state, action: PayloadAction<string>) {
      state.caseTags = [ action.payload ]
    },
    setFocused(state, action: PayloadAction<string>) {
      state.focused = action.payload
    }
  }
})

export const { setCaseName,
  setCaseSY,
  setCaseSM,
  setCaseFY,
  setCaseFM,
  setCasePay,
  setCaseFiles,
  setCaseParams1,
  setCaseParams2,
  setCaseParams3,
  setCaseParams4,
  setCaseText,
  setCaseTags,
  setFocused } = newCaseReducer.actions
export default newCaseReducer.reducer