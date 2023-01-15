import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slices/theme-slice'
import headerReducer from './slices/header-slice'
import paginationReducer from './slices/pagination-slice'
import rightContentReducer from './slices/right-content-slice'
import roleTypeReducer from './slices/role-type-slice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    headerReducer: headerReducer,
    paginationReducer: paginationReducer,
    rightContentReducer: rightContentReducer,
    roleTypeReducer: roleTypeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch