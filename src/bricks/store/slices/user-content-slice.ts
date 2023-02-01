import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUserContent } from '../../models-ts/reducers/user-content-reducer-models'

const initialState: IUserContent = {
  USERS_DATA: {
    showOne: 'e-0001',
    listExecutors: [
      { 
        id: 'e-0001', 
        name: 'Иванов Петр Сергеевич',
        rate: 4.88,
        stat: [ 38, 22, 15 ],
        tags: [ 'Сигнализация', 'Вентиляция', 'Пожарная безопасность' ],
        jobType: 'Самозанятый',
        role: 'EXECUTOR'
      },
      { 
        id: 'e-0002', 
        name: 'Крапивин Сергей Иванович',
        rate: 4.60,
        stat: [ 44, 13, 13 ],
        tags: [ 'Сигнализация', 'Вентиляция', 'Проводка', 'Датчики', 'Пожарная безопасность', 'Теплосети' ],
        jobType: 'Самозанятый',
        role: 'EXECUTOR'
      },
      { 
        id: 'e-0003', 
        name: 'Захарова Виолетта Владимировна',
        rate: 4.98,
        stat: [ 35, 18, 10 ],
        tags: [ 'Сигнализация', 'Вентиляция', 'Пожарная безопасность', 'Теплосети' ],
        jobType: 'ИП',
        role: 'EXECUTOR'
      },
      { 
        id: 'e-0004', 
        name: 'Сидоров Аркадий Сергеевич',
        rate: 4.55,
        stat: [ 15, 10, 12 ],
        tags: [ 'Пожарная безопасность', 'Теплосети', 'Вентиляция' ],
        jobType: 'ИП',
        role: 'EXECUTOR'
      },
      { 
        id: 'e-0005', 
        name: 'Марков Илья Дмитриевич',
        rate: 4.83,
        stat: [ 26, 24, 12 ],
        tags: [ 'Пожарная безопасность', 'Теплосети', 'Датчики' ],
        jobType: 'ИП',
        role: 'EXECUTOR'
      },
      { 
        id: 'e-0006', 
        name: 'Кротов Герман Эдуардович',
        rate: 4.90,
        stat: [ 43, 28, 10 ],
        tags: [ 'Пожарная безопасность', 'Теплосети', 'Датчики', 'Проводка', 'Сигнализация' ],
        jobType: 'ИП',
        role: 'EXECUTOR'
      },
    ],
    listCustomers: [
      { 
        id: 'cu-0001', 
        name: 'ООО Техсистемы',
        rate: 4.99,
        stat: [ 0, 0, 0 ],
        tags: [ 'Пожарная безопасность', 'Теплосети', 'Сигнализация', 'Вентиляция', 'Проводка', 'Датчики' ],
        jobType: 'ООО',
        role: 'CUSTOMER_ROOT'
      },
    ]
  }
}

export const userContentReducer = createSlice({
  name: 'userContentReducer',
  initialState,
  reducers: {
    selectShowUser: (state, action: PayloadAction<string>): void => {}
  }
})

export const { selectShowUser } = userContentReducer.actions
export default userContentReducer.reducer