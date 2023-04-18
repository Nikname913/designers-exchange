import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IRespondReducer } from "../../models-ts/reducers/respond-reducer-models"  

const initialState: IRespondReducer = {
  deadline: '2023-4-30',
  coast: '',
  solution: '',
  prepay: '',
  expert: '2023-4-30',
  expertCost: '',
  comment: '',
  focused: '',
  task: '',
  executor: '',
  dateFinish: '',
  dateExpert: '',
}

const respondReducer = createSlice({
  name: 'enterReducer',
  initialState,
  reducers: {
    setDeadline(state, action: PayloadAction<string>) {
      state.deadline = action.payload
    },
    setCoast(state, action: PayloadAction<string>) {
      state.coast = action.payload
    },
    setSolution(state, action: PayloadAction<string>) {
      state.solution = action.payload
    },
    setPrepay(state, action: PayloadAction<string>) {
      state.prepay = action.payload
    },
    setExpert(state, action: PayloadAction<string>) {
      state.expert = action.payload
    },
    setExpertCoast(state, action: PayloadAction<string>) {
      state.expertCost = action.payload
    },
    setComment(state, action: PayloadAction<string>) {
      state.comment = action.payload
    },
    setFocused(state, action: PayloadAction<string>) {
      state.focused = action.payload
    },
    setTask(state, action: PayloadAction<string>) {
      state.task = action.payload
    },
    setExecutor(state, action: PayloadAction<string>) {
      state.executor = action.payload
    },
    setDateFinish(state, action: PayloadAction<any>) {
      state.dateFinish = action.payload
    },
    setDateExpert(state, action: PayloadAction<any>) {
      state.dateExpert = action.payload
    },
  }
})

export const { setDeadline, 
  setCoast, 
  setSolution, 
  setPrepay, 
  setExpert, 
  setExpertCoast, 
  setComment, 
  setFocused,
  setTask,
  setExecutor,
  setDateFinish,
  setDateExpert} = respondReducer.actions
export default respondReducer.reducer