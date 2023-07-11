// ----------------------------------------------------------------
/* eslint-disable no-lone-blocks */
// ----------------------------------------------------------------
/* eslint-disable react-hooks/exhaustive-deps */
// ----------------------------------------------------------------
import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { setList, setListOrders, setListDeactive } from '../../../../store/slices/task-content-slice'
import { setCustomers, setExecutors } from '../../../../store/slices/user-content-slice'
import { setAlertData } from '../../../../store/slices/header-slice'
import RequestActionsComponent from '../../services/request.service'

const Updater: React.FC = () => {

  const dispatch = useAppDispatch()
  const USER_ID = useAppSelector(state => state.roleTypeReducer.roleData.userID)

  {/* ---------------------------------------- */}
  {/* useState для переключения выполнения запросов */}
  {/* ---------------------------------------- */}

  const [ GET_ALERTS_REQUEST, SET_ALERTS_REQUEST ] = useState(false)
  const [ GET_TASKS_REQUEST, SET_TASKS_REQUEST ] = useState(false)
  const [ GET_TASKS_DEACTIVE_REQUEST, SET_TASKS_DEACTIVE_REQUEST ] = useState(false)
  const [ GET_ORDERS_REQUEST, SET_ORDERS_REQUEST ] = useState(false)
  const [ GET_CUSTOMERS_REQUEST, SET_CUSTOMERS_REQUEST ] = useState(false)
  const [ GET_EXECUTORS_REQUEST, SET_EXECUTORS_REQUEST ] = useState(false)

  const [ alertsUpdate, setAlertsUpdate ] = useState(false)
  const [ tasksUpdate, setTasksUpdate ] = useState(false)
  const [ tasksDeactiveUpdate, setTasksDeactiveUpdate ] = useState(false)
  const [ ordersUpdate, setOrdersUpdate ] = useState(false)
  const [ executorsUpdate, setExecutorsUpdate ] = useState(false)
  const [ customersUpdate, setCustomersUpdate ] = useState(false)

  {/* ---------------------------------------- */}
  {/* useState для переключения выполнения запросов */}
  {/* ---------------------------------------- */}

  const callbackSetAlertsList = (param: any) => {
    
    const data = param.filter((item: any) => item.customer === USER_ID).map((item: any, index: number) => {

      return item.alertData

    })

    dispatch(setAlertData(data))

  }

  const callbackSetTasksList = (param: any) => {
    
    const data = param.filter((item: any) => item.status === 'TASK-ACTIVE').map((item: any, index: number) => {

      return { 
        id: item.taskID, 
        name: item.title, 
        date: item.date,
        deadline: `${item.dates.start !== '' ? item.dates.start : '01.01.2023' }-${item.dates.finish !== '' ? item.dates.finish : '01.01.2023' }`,
        exper: item.expertise,
        customer: item.customer,
        executor: item.executor !== '' ? item.executor : 'Исполнитель не выбран',
        region: item.region ? item.region : 'Екатеринбург',
        tags: item.tags,
        alertData: item.alertData,
        description: item.description,
        status: 'searching',
        viewtype: 'default',
        chapters: item.chapters,
        coast: {
          value: item.coast,
          issafe: true,
          prepay: item.prepay,
          exper: item.expertiseCoast,
        },
        responds: item.reviews,
        objectData: {
          constructionType: item.objectData.constructionType,
          region: item.objectData.region,
          type: item.objectData.type,
          spec: item.objectData.spec,
        },
        objectParams: {
          square: item.objectParams.square,
          storeys: item.objectParams.storeys,
          height: item.objectParams.height,
        },
        focused: item.focused && item.focused !== 'none' ? item.focused : 'none'
      }

    })

    dispatch(setList(data))

  }

  const callbackSetOrdersList = (param: any) => {
    
    const data = param.filter((item: any) => item.status === 'ORDER-ACTIVE').map((item: any, index: number) => {

      return { 
        id: item.taskID, 
        name: item.title, 
        date: item.date,
        deadline: `${item.dates.start !== '' ? item.dates.start : '01.01.2023' }-${item.dates.finish !== '' ? item.dates.finish : '01.01.2023' }`,
        exper: item.expertise,
        customer: item.customer,
        executor: item.executor !== '' ? item.executor : 'Исполнитель не выбран',
        region: item.region ? item.region : 'Екатеринбург',
        tags: item.tags,
        alertData: item.alertData,
        description: item.description,
        status: 'work',
        viewtype: 'default',
        chapters: item.chapters,
        coast: {
          value: item.coast,
          issafe: true,
          prepay: item.prepay,
          exper: item.expertiseCoast,
        },
        responds: item.reviews,
        objectData: {
          constructionType: item.objectData.constructionType,
          region: item.objectData.region,
          type: item.objectData.type,
          spec: item.objectData.spec,
        },
        objectParams: {
          square: item.objectParams.square,
          storeys: item.objectParams.storeys,
          height: item.objectParams.height,
        },
        focused: item.focused ? item.focused : 'none'
      }

    })

    dispatch(setListOrders(data))

  }

  const callbackSetDeactiveList = (param: any) => {
    
    const data = param.filter((item: any) => item.status === 'TASK-DEACTIVE').map((item: any, index: number) => {

      return { 
        id: item.taskID, 
        name: item.title, 
        date: item.date,
        deadline: `${item.dates.start !== '' ? item.dates.start : '01.01.2023' }-${item.dates.finish !== '' ? item.dates.finish : '01.01.2023' }`,
        exper: item.expertise,
        customer: item.customer,
        executor: item.executor !== '' ? item.executor : 'Исполнитель не выбран',
        region: item.region ? item.region : 'Екатеринбург',
        tags: item.tags,
        alertData: item.alertData,
        description: item.description,
        status: 'searching',
        viewtype: 'backside',
        chapters: item.chapters,
        coast: {
          value: item.coast,
          issafe: true,
          prepay: item.prepay,
          exper: item.expertiseCoast,
        },
        responds: item.reviews,
        objectData: {
          constructionType: item.objectData.constructionType,
          region: item.objectData.region,
          type: item.objectData.type,
          spec: item.objectData.spec,
        },
        objectParams: {
          square: item.objectParams.square,
          storeys: item.objectParams.storeys,
          height: item.objectParams.height,
        },
        focused: item.focused ? item.focused : 'none'
      }

    })

    dispatch(setListDeactive(data))

  }

  const callbackSetCustomersList = (param: any) => {

    const filterUsers = param.users.filter((user: any) => user.type === 'CUSTOMER')
    dispatch(setCustomers(filterUsers))

  }

  const callbackSetExecutorsList = (param: any) => {

    const filterUsers = param.users.filter((user: any) => user.type === 'EXECUTOR')
    dispatch(setExecutors(filterUsers))

  }

  useEffect(() => {
    
    SET_ALERTS_REQUEST(true)
    setTimeout(() => SET_ALERTS_REQUEST(false), 1400)

  }, [ alertsUpdate ])
  useEffect(() => {
    
    SET_TASKS_REQUEST(true)
    setTimeout(() => SET_TASKS_REQUEST(false), 1400)

  }, [ tasksUpdate ])
  useEffect(() => {
    
    SET_TASKS_DEACTIVE_REQUEST(true)
    setTimeout(() => SET_TASKS_DEACTIVE_REQUEST(false), 1400)

  }, [ tasksDeactiveUpdate ])
  useEffect(() => {
    
    SET_ORDERS_REQUEST(true)
    setTimeout(() => SET_ORDERS_REQUEST(false), 1400)

  }, [ ordersUpdate ])
  useEffect(() => {

    SET_CUSTOMERS_REQUEST(true)
    setTimeout(() => SET_CUSTOMERS_REQUEST(false), 1400)

  }, [ customersUpdate ])
  useEffect(() => {

    SET_EXECUTORS_REQUEST(true)
    setTimeout(() => SET_EXECUTORS_REQUEST(false), 1400)

  }, [ executorsUpdate ])

  useEffect(() => {

    const alertUpdateRound = setInterval(() => setAlertsUpdate(prev => !!!prev), 4400)
    false && clearInterval(alertUpdateRound)

  }, [])
  useEffect(() => {

    const taskUpdateRound = setInterval(() => setTasksUpdate(prev => !!!prev), 4400)
    false && clearInterval(taskUpdateRound)

  }, [])
  useEffect(() => {

    const taskDeactiveUpdateRound = setInterval(() => setTasksDeactiveUpdate(prev => !!!prev), 4400)
    false && clearInterval(taskDeactiveUpdateRound)

  }, [])
  useEffect(() => {

    const ordersUpdateRound = setInterval(() => setOrdersUpdate(prev => !!!prev), 4400)
    false && clearInterval(ordersUpdateRound)

  }, [])
  useEffect(() => {

    const customersUpdateRound = setInterval(() => setCustomersUpdate(prev => !!!prev), 4400)
    false && clearInterval(customersUpdateRound)

  }, [])
  useEffect(() => {

    const executorsUpdateRound = setInterval(() => setExecutorsUpdate(prev => !!!prev), 4400)
    false && clearInterval(executorsUpdateRound)

  }, [])

  return (
    <React.Fragment>

      { GET_ALERTS_REQUEST && <RequestActionsComponent

        callbackAction={callbackSetAlertsList}
        requestData={{
          type: 'POST',
          urlstring: '/get-task-list',
          body: {
            status: ''
          }
        }}
      
      /> }

      { GET_TASKS_REQUEST && <RequestActionsComponent

        callbackAction={callbackSetTasksList}
        requestData={{
          type: 'POST',
          urlstring: '/get-task-list',
          body: {
            status: ''
          }
        }}
      
      /> }

      { GET_ORDERS_REQUEST && <RequestActionsComponent

        callbackAction={callbackSetOrdersList}
        requestData={{
          type: 'POST',
          urlstring: '/get-task-list',
          body: {
            status: ''
          }
        }}
      
      /> }

      { GET_TASKS_DEACTIVE_REQUEST && <RequestActionsComponent

        callbackAction={callbackSetDeactiveList}
        requestData={{
          type: 'POST',
          urlstring: '/get-task-list',
          body: {
            status: ''
          }
        }}
      
      /> }

      { GET_CUSTOMERS_REQUEST && <RequestActionsComponent

        callbackAction={callbackSetCustomersList}
        requestData={{
          type: 'POST',
          urlstring: '/users',
          body: {
            status: ''
          }
        }}
      
      /> }

      { GET_EXECUTORS_REQUEST && <RequestActionsComponent

        callbackAction={callbackSetExecutorsList}
        requestData={{
          type: 'POST',
          urlstring: '/users',
          body: {
            status: ''
          }
        }}
      
      /> }
    </React.Fragment>
  )

}

export default Updater