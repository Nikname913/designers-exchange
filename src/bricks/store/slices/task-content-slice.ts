import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ITaskContent } from '../../models-ts/reducers/task-content-reducer-models'

const initialState: ITaskContent = {
  TASKS_DATA: {
    actualOne: '',
    showOne: '',
    list: [],
    listDraft: [],
    listOrders: [],
    listOrdersComplete: [],
    listDeactive: [],
  }
}

export const taskContentReducer = createSlice({
  name: 'taskContentReducer',
  initialState,
  reducers: {
    selectShowTask: (state, action: PayloadAction<string>): void => {
      state.TASKS_DATA.showOne = action.payload
    },
    selectActualTask: (state, action: PayloadAction<string>): void => {
      state.TASKS_DATA.actualOne = action.payload
    },
    setList: (state, action: PayloadAction<Array<any>>): void => {
      state.TASKS_DATA.list = action.payload
    },
    setListDraft: (state, action: PayloadAction<Array<any>>): void => {
      state.TASKS_DATA.listDraft = action.payload
    },
    setListOrders: (state, action: PayloadAction<Array<any>>): void => {
      state.TASKS_DATA.listOrders = action.payload
    },
    setListOrdersComplete: (state, action: PayloadAction<Array<any>>): void => {
      state.TASKS_DATA.listOrdersComplete = action.payload
    },
    setListDeactive: (state, action: PayloadAction<Array<any>>): void => {
      state.TASKS_DATA.listDeactive = action.payload
    }
  }
})

export const { selectShowTask, 
  selectActualTask, 
  setList, 
  setListDraft,
  setListOrders,
  setListOrdersComplete, 
  setListDeactive } = taskContentReducer.actions
export default taskContentReducer.reducer
