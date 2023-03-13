import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IRoleTypeReducer } from "../../models-ts/reducers/role-type-reducer-models"

const initialState: IRoleTypeReducer = {
  activeRole: 'UNDEFINED',
}

const roleTypeReducer = createSlice({
  name: "roleTypeReducer",
  initialState,
  reducers: {
    setActiveRole(state, action: PayloadAction<"UNDEFINED" | "CUSTOMER" | "EXECUTOR">) {
      state.activeRole = action.payload
    }
  }
})

export const { setActiveRole } = roleTypeReducer.actions
export default roleTypeReducer.reducer