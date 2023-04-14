import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IRoleTypeReducer } from "../../models-ts/reducers/role-type-reducer-models"

const initialState: IRoleTypeReducer = {
  activeRole: 'UNDEFINED',
  roleData: {
    userID: '',
    userName: ''
  }
}

const roleTypeReducer = createSlice({
  name: "roleTypeReducer",
  initialState,
  reducers: {
    setActiveRole(state, action: PayloadAction<"UNDEFINED" | "CUSTOMER" | "EXECUTOR">) {
      state.activeRole = action.payload
    },
    setRoleData(state, action: PayloadAction<{ uid: string, una: string }>) {
      state.roleData.userID = action.payload.uid
      state.roleData.userName = action.payload.una
    }
  }
})

export const { setActiveRole, setRoleData } = roleTypeReducer.actions
export default roleTypeReducer.reducer