import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ITaskContent } from '../../models-ts/reducers/task-content-reducer-models'

const initialState: ITaskContent = {
  TASKS_DATA: {
    actualOne: '',
    /* ---------------------------------------- */
    /* отображение выбранной задачи в списке "мои заказы" в роли заказчика */
    /* ---------------------------------------- */
    showOne: '0001',
    /* ---------------------------------------- */
    /* предварительно!! общий список всех задач на платформе */
    /* ---------------------------------------- */
    list: [
      { 
        id: '0001', 
        name: 'Конструктивные решения', 
        date: '20.01.2023',
        deadline: '22.01.2023-15.02.2023',
        exper: 'государственная',
        customer: 'ООО "Технические Системы"',
        executor: 'undefined',
        region: 'Екатеринбург',
        tags: [ 'Сигнализация', 'Вентиляция', 'Пожарная безопасность' ],
        description: 'lorem ipsum dolor sit amet, consectetur adipiscing',
        status: 'searching',
        viewtype: 'default',
        coast: {
          value: 100000,
          issafe: true,
          prepay: 20000,
          exper: 55000,
        },
        responds: [
          { user: 'e-0005' },
          { user: 'e-0002' },
          { user: 'e-0003' },
        ]  
      },
      { 
        id: '0002', 
        name: 'Пожарная безопасность', 
        date: '24.01.2023',
        deadline: '25.01.2023-20.03.2023',
        exper: 'государственная',
        customer: 'ООО "Технические Системы"',
        executor: 'undefined',
        region: 'Екатеринбург',
        tags: [ 'Сигнализация', 'Датчики', 'Пожарная безопасность', 'Теплосети' ],
        description: 'lorem ipsum dolor sit amet, consectetur adipiscing',
        status: 'searching',
        viewtype: 'default',
        coast: {
          value: 60000,
          issafe: true,
          prepay: 10000,
          exper: 34000,
        },
        responds: [
          { user: 'e-0001' },
          { user: 'e-0004' },
          { user: 'e-0006' },
        ]  
      },
      { 
        id: '0003', 
        name: 'Вентиляция', 
        date: '25.01.2023',
        deadline: '25.01.2023-20.03.2023',
        exper: 'частная',
        customer: 'ООО "Технические Системы"',
        executor: 'undefined',
        region: 'Екатеринбург',
        tags: [ 'Сигнализация', 'Вентиляция', 'Пожарная безопасность', 'Проводка' ],
        description: 'lorem ipsum dolor sit amet, consectetur adipiscing',
        status: 'searching',
        viewtype: 'default',
        coast: {
          value: 120000,
          issafe: true,
          prepay: 40000,
          exper: 45000,
        },
        responds: [
          { user: 'e-0001' },
          { user: 'e-0005' },
          { user: 'e-0003' },
        ]  
      },
      { 
        id: '0004', 
        name: 'Пожарная сигнализация', 
        date: '26.01.2023',
        deadline: '28.01.2023-28.02.2023',
        exper: 'государственная',
        customer: 'ООО "Технические Системы"',
        executor: 'undefined',
        region: 'Екатеринбург',
        tags: [ 'Пожарная безопасность', 'Теплосети', 'Проводка', 'Датчики' ],
        description: 'lorem ipsum dolor sit amet, consectetur adipiscing',
        status: 'searching',
        viewtype: 'default',
        coast: {
          value: 115000,
          issafe: true,
          prepay: 28000,
          exper: 50000,
        },
        responds: [
          { user: 'e-0002' },
          { user: 'e-0003' },
          { user: 'e-0006' },
        ]  
      },
      { 
        id: '0005', 
        name: 'Прокладка проводки', 
        date: '26.01.2023',
        deadline: '26.01.2023-13.02.2023',
        exper: 'государственная',
        customer: 'ООО "Технические Системы"',
        executor: 'undefined',
        region: 'Екатеринбург',
        tags: [ 'Пожарная безопасность', 'Проводка', 'Датчики' ],
        description: 'lorem ipsum dolor sit amet, consectetur adipiscing',
        status: 'searching',
        viewtype: 'default',
        coast: {
          value: 50000,
          issafe: false,
          prepay: undefined,
          exper: undefined,
        },
        responds: [
          { user: 'e-0001' },
          { user: 'e-0002' },
          { user: 'e-0004' },
        ]  
      },
      { 
        id: '0006', 
        name: 'Прокладка проводки', 
        date: '26.01.2023',
        deadline: '26.01.2023-13.02.2023',
        exper: 'государственная',
        customer: 'ООО "Технические Системы"',
        executor: 'e-0005',
        region: 'Екатеринбург',
        tags: [ 'Пожарная безопасность', 'Проводка', 'Датчики' ],
        description: 'lorem ipsum dolor sit amet, consectetur adipiscing',
        status: 'work',
        viewtype: 'default',
        coast: {
          value: 50000,
          issafe: false,
          prepay: undefined,
          exper: undefined,
        },
        responds: [
          { user: 'e-0002' },
          { user: 'e-0003' },
          { user: 'e-0004' },
        ]  
      },
      { 
        id: '0007', 
        name: 'Пожарная сигнализация', 
        date: '26.01.2023',
        deadline: '28.01.2023-28.02.2023',
        exper: 'государственная',
        customer: 'ООО "Технические Системы"',
        executor: 'e-0003',
        region: 'Екатеринбург',
        tags: [ 'Пожарная безопасность', 'Теплосети', 'Проводка', 'Датчики' ],
        description: 'lorem ipsum dolor sit amet, consectetur adipiscing',
        status: 'work',
        viewtype: 'default',
        coast: {
          value: 135000,
          issafe: true,
          prepay: 32000,
          exper: 65000,
        },
        responds: [
          { user: 'e-0005' },
          { user: 'e-0006' },
          { user: 'e-0002' },
        ]  
      },
      { 
        id: '0008', 
        name: 'Пожарная сигнализация', 
        date: '26.01.2023',
        deadline: '28.01.2023-28.02.2023',
        exper: 'государственная',
        customer: 'ООО "Технические Системы"',
        executor: 'e-0002',
        region: 'Екатеринбург',
        tags: [ 'Пожарная безопасность', 'Теплосети', 'Проводка', 'Датчики' ],
        description: 'lorem ipsum dolor sit amet, consectetur adipiscing',
        status: 'work',
        viewtype: 'default',
        coast: {
          value: 85000,
          issafe: true,
          prepay: 28000,
          exper: 40000,
        },
        responds: [
          { user: 'e-0006' },
          { user: 'e-0004' },
          { user: 'e-0003' },
        ]  
      },
    ]
  }
}

export const taskContentReducer = createSlice({
  name: 'taskContentReducer',
  initialState,
  reducers: {
    selectShowTask: (state, action: PayloadAction<string>): void => {
      state.TASKS_DATA.showOne = action.payload
    },
    selectActualTask: (state, action: PayloadAction<string>): void => {
      state.TASKS_DATA.actualOne = action.payload
    }
  }
})

export const { selectShowTask, selectActualTask } = taskContentReducer.actions
export default taskContentReducer.reducer
