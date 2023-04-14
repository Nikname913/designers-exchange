import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { ICreateTaskReducer } from "../../models-ts/reducers/create-task-reducer-models"

const initialState: ICreateTaskReducer = {
  title: '',
  dates: {
    start: '',
    finish: ''
  },
  tags: [],
  coast: '',
  prepay: '',
  prepayDays: '',
  expertise: '',
  expertiseDays: '',
  expertiseCoast: '',
  objectData: {
    constructionType: '',
    region: '',
    type: '',
    spec: ''
  },
  objectParams: {
    square: '',
    storeys: '',
    height: '',
  },
  objectParamsSquare: '',
  objectParamsStoreys: '',
  objectParamsHeight: '',
  description: '',
  chapters: [],
  focused: ''
}

const createTaskReducer = createSlice({
  name: 'createTaskReducer',
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload
    },
    setDates(state, action: PayloadAction<{ start: string, finish: string }>) {
      state.dates = action.payload
    },
    setTags(state, action: PayloadAction<Array<string>>) {
      state.tags = action.payload
    },
    setCoast(state, action: PayloadAction<string>) {
      state.coast = action.payload
    },
    setPrepay(state, action: PayloadAction<string>) {
      state.prepay = action.payload
    },
    setPrepayDays(state, action: PayloadAction<string>) {
      state.prepayDays = action.payload
    },
    setExpertise(state, action: PayloadAction<string>) {
      state.expertise = action.payload
    },
    setExpertiseDays(state, action: PayloadAction<string>) {
      state.expertiseDays = action.payload
    },
    setExpertiseCoast(state, action: PayloadAction<string>) {
      state.expertiseCoast = action.payload
    },
    setObjectData(state, action: PayloadAction<{ 
      constructionType: string,
      region: string,
      type: string,
      spec: string 
    }>) {
      state.objectData = action.payload
    },
    setObjectParams(state, action: PayloadAction<{ 
      square: string,
      storeys: string,
      height: string,
     }>) {
      state.objectParams = action.payload
    },
    setObjectParamsSquare(state, action: PayloadAction<string>) {
      state.objectParamsSquare = action.payload
    },
    setObjectParamsStoreys(state, action: PayloadAction<string>) {
      state.objectParamsStoreys = action.payload
    },
    setObjectParamsHeight(state, action: PayloadAction<string>) {
      state.objectParamsHeight = action.payload
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload
    },
    setChapters(state, action: PayloadAction<Array<any>>) {
      state.chapters = action.payload
    },
    setFocused(state, action: PayloadAction<string>) {
      state.focused = action.payload
    },
  }
})

export const { 
  setTitle,
  setDates,
  setTags,
  setCoast,
  setPrepay,
  setPrepayDays,
  setExpertise,
  setExpertiseDays,
  setExpertiseCoast,
  setObjectData,
  setObjectParams,
  setObjectParamsSquare,
  setObjectParamsStoreys,
  setObjectParamsHeight,
  setDescription,
  setChapters,
  setFocused } = createTaskReducer.actions
export default createTaskReducer.reducer