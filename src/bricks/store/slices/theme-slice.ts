import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IThemeSlice } from '../../models-ts/styles/theme-models'

const initialState: IThemeSlice = {
  selectedTheme: 'default',
  footerBackground: '#3A4B56',
  black: '#000000',
  white: '#FFFFFF',
  blue1: '#003B62',
  blue2: '#167CBF',
  blue3: '#D9E7F0',
  blue4: '#F2F4FC',
  bg: '#F7FAFC',
  grey: '#516674',
  grey2: '#8E9DA7',
  grey3: '#EBEBEC',
  green: '#00BFA8',
  yellow: '#FFBF1A',
  red: '#DB4848'
}

export const themeReducer = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setSelectedTheme: (state, action: PayloadAction<string>) => {
      state.selectedTheme = action.payload
    }
  }
})

export const { setSelectedTheme } = themeReducer.actions
export const baseTheme = (state: RootState) => state.theme.selectedTheme
export default themeReducer.reducer