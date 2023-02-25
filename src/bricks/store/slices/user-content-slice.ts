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
        rate: 4.8,
        stat: [ 38, 22, 15 ],
        tags: [ 'Сигнализация', 'Вентиляция', 'Пожарная безопасность' ],
        jobType: 'Самозанятый',
        role: 'EXECUTOR'
      },
      { 
        id: 'e-0002', 
        name: 'Крапивин Сергей Иванович',
        rate: 4.6,
        stat: [ 44, 13, 13 ],
        tags: [ 'Сигнализация', 'Вентиляция', 'Проводка', 'Датчики', 'Пожарная безопасность', 'Теплосети' ],
        jobType: 'Самозанятый',
        role: 'EXECUTOR'
      },
      { 
        id: 'e-0003', 
        name: 'Захарова Виолетта Владимировна',
        rate: 4.9,
        stat: [ 35, 18, 10 ],
        tags: [ 'Сигнализация', 'Вентиляция', 'Пожарная безопасность', 'Теплосети' ],
        jobType: 'ИП',
        role: 'EXECUTOR'
      },
      { 
        id: 'e-0004', 
        name: 'Сидоров Аркадий Сергеевич',
        rate: 4.6,
        stat: [ 15, 10, 12 ],
        tags: [ 'Пожарная безопасность', 'Теплосети', 'Вентиляция' ],
        jobType: 'ИП',
        role: 'EXECUTOR'
      },
      { 
        id: 'e-0005', 
        name: 'Марков Илья Дмитриевич',
        rate: 4.8,
        stat: [ 26, 24, 12 ],
        tags: [ 'Пожарная безопасность', 'Теплосети', 'Датчики' ],
        jobType: 'ИП',
        role: 'EXECUTOR'
      },
      { 
        id: 'e-0006', 
        name: 'Кротов Герман Эдуардович',
        rate: 4.9,
        stat: [ 43, 28, 10 ],
        tags: [ 'Пожарная безопасность', 'Теплосети', 'Датчики', 'Проводка', 'Сигнализация' ],
        jobType: 'ИП',
        role: 'EXECUTOR'
      },
      { 
        id: 'e-0007', 
        name: 'Колпаков Владимир Анатольевич',
        rate: 4.8,
        stat: [ 90, 14, 8 ],
        tags: [ 'Пожарная безопасность', 'Теплосети', 'Датчики', 'Проводка', 'Сигнализация', 'Магистрали', 'Электросети' ],
        jobType: 'Самозанятый',
        role: 'EXECUTOR'
      },
      { 
        id: 'e-0008', 
        name: 'Омаров Эльдар Михайлович',
        rate: 4.5,
        stat: [ 65, 18, 13 ],
        tags: [ 'Вентиляция', 'Датчики', 'Проводка', 'Сигнализация', 'Магистрали', 'Электросети', 'Теплосети' ],
        jobType: 'Самозанятый',
        role: 'EXECUTOR'
      },
      { 
        id: 'e-0009', 
        name: 'Горенберг Эдвард Германович',
        rate: 4.6,
        stat: [ 40, 14, 8 ],
        tags: [ 'Вентиляция', 'Датчики', 'Проводка', 'Сигнализация' ],
        jobType: 'ИП',
        role: 'EXECUTOR'
      },
      { 
        id: 'e-0010', 
        name: 'Нурова Анастасия Константиновна',
        rate: 4.9,
        stat: [ 56, 22, 15 ],
        tags: [ 'Вентиляция', 'Датчики', 'Проводка', 'Сигнализация', 'Магистрали', 'Электросети' ],
        jobType: 'Самозанятый',
        role: 'EXECUTOR'
      },
      { 
        id: 'e-0011', 
        name: 'Кокшаров Павел Семенович',
        rate: 4.9,
        stat: [ 63, 16, 8 ],
        tags: [ 'Пожарная безопасность', 'Теплосети', 'Датчики', 'Проводка', 'Сигнализация', 'Магистрали', 'Электросети' ],
        jobType: 'Самозанятый',
        role: 'EXECUTOR'
      },
      { 
        id: 'e-0012', 
        name: 'Стужина Полина Александровна',
        rate: 4.8,
        stat: [ 38, 5, 5 ],
        tags: [ 'Датчики', 'Проводка', 'Сигнализация', 'Теплосети', 'Магистрали', 'Электросети', 'Пожарная безопасность' ],
        jobType: 'ИП',
        role: 'EXECUTOR'
      },
    ],
    listCustomers: [
      { 
        id: 'cu-0001', 
        name: 'ООО Техсистемы',
        rate: 4.9,
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