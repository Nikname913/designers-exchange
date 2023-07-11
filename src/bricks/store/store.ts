import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slices/theme-slice'
import headerReducer from './slices/header-slice'
import paginationReducer from './slices/pagination-slice'
import rightContentReducer from './slices/right-content-slice'
import FOSReducer from './slices/fos-slice'
import alertContentReducer from './slices/alert-content-slice'
import roleTypeReducer from './slices/role-type-slice'
import taskContentReducer from './slices/task-content-slice'
import userContentReducer from './slices/user-content-slice'
import regReducer from './slices/reg-slice'
import enterReducer from './slices/enter-slice'
import createTaskReducer from './slices/create-task-slice'
import respondReducer from './slices/respond-slice'
import requestReducer from './slices/request-reduce-slice'
import passportReducer from './slices/passport-slice'
import dataUpdateReducer from './slices/data-update-slice'
import filterReducer from './slices/filter-slice'
import bussDataReducer from './slices/bussData-slice'
import aboutTextReducer from './slices/about-text-slice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    headerReducer: headerReducer,
    paginationReducer: paginationReducer,
    rightContentReducer: rightContentReducer,
    roleTypeReducer: roleTypeReducer,
    taskContentReducer: taskContentReducer,
    userContentReducer: userContentReducer,
    alertContentReducer: alertContentReducer,
    FOSReducer: FOSReducer,
    regReducer: regReducer,
    enterReducer: enterReducer,
    createTaskReducer: createTaskReducer,
    respondReducer: respondReducer,
    requestReducer: requestReducer,
    passportReducer: passportReducer,
    dataUpdateReducer: dataUpdateReducer,
    filterReducer: filterReducer,
    bussDataReducer: bussDataReducer,
    aboutTextReducer: aboutTextReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch