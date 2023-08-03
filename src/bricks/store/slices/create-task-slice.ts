import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { ICreateTaskReducer } from "../../models-ts/reducers/create-task-reducer-models"

const initialState: ICreateTaskReducer = {
  title: '',
  dateStart: '',
  dateFinish: '',
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
  chapterLocalName: '',
  chapterLocalDescription: '',
  focused: '',
  techTaskFile: [],
  contractFile: [],
  showChaptersEditForms: {
    show: false,
    num: 0
  },
}

const createTaskReducer = createSlice({
  name: 'createTaskReducer',
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload
    },
    setDateStart(state, action: PayloadAction<any>) {
      state.dateStart = action.payload
    },
    setDateFinish(state, action: PayloadAction<any>) {
      state.dateFinish = action.payload
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
    setExpertiseDays(state, action: PayloadAction<any>) {
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
    setChapterLN(state, action: PayloadAction<string>) {
      state.chapterLocalName = action.payload
    },
    setChapterLD(state, action: PayloadAction<string>) {
      state.chapterLocalDescription = action.payload
    },
    setFocused(state, action: PayloadAction<string>) {
      state.focused = action.payload
    },
    setTechTaskFile(state, action: PayloadAction<File>) {
      state.techTaskFile.push(action.payload)
    },
    removeTechTaskFile(state, action: PayloadAction<string>) {
      let filesData = state.techTaskFile
      let filterFilesData = filesData.filter(file => file.name !== action.payload)
      state.techTaskFile = filterFilesData
    },
    resetTechTaskFile(state, action: PayloadAction<string>) {
      state.techTaskFile = []
    },
    setContractFile(state, action: PayloadAction<File>) {
      state.contractFile && state.contractFile.push(action.payload)
    },
    removeContractFile(state, action: PayloadAction<string>) {
      let filesData = state.contractFile ? state.contractFile : [] 
      let filterFilesData = filesData.filter(file => file.name !== action.payload)
      state.contractFile = filterFilesData
    },
    resetContractFile(state, action: PayloadAction<string>) {
      state.contractFile = []
    },
    setShowChaptersEditForms(state, action: PayloadAction<{ show: boolean, num: number }>) {
      state.showChaptersEditForms = action.payload
    }
  }
})

export const { 
  setTitle,
  setDateStart,
  setDateFinish,
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
  setChapterLN,
  setChapterLD,
  setFocused,
  setTechTaskFile,
  removeTechTaskFile,
  resetTechTaskFile,
  setContractFile,
  removeContractFile,
  resetContractFile,
  setShowChaptersEditForms } = createTaskReducer.actions
export default createTaskReducer.reducer