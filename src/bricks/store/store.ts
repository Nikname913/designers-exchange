import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slices/theme-slice'
import headerReducer from './slices/header-slice'
import paginationReducer from './slices/pagination-slice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    headerReducer: headerReducer,
    paginationReducer: paginationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch