import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"
import { IChatReducer } from "../../models-ts/reducers/chat-reducer-models"

const initialState: IChatReducer = {
  chatID: '0000'
}

const chatReducer = createSlice({
  name: 'chatReducer',
  initialState,
  reducers: {
    changeChat: (state, action: PayloadAction<string>) => {
      state.chatID = action.payload
    }
  }
})

export const { changeChat } = chatReducer.actions
export default chatReducer.reducer