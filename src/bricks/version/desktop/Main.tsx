// ----------------------------------------------------------------
/* eslint-disable no-lone-blocks */
// ----------------------------------------------------------------
/* eslint-disable react-hooks/exhaustive-deps */
// ----------------------------------------------------------------
import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { setScrollTop } from '../../store/slices/right-content-slice'
import { setScrollTop as setScrollFos } from '../../store/slices/fos-slice'
import { setList, setListOrders } from '../../store/slices/task-content-slice'
import { setCustomers, setExecutors } from '../../store/slices/user-content-slice'
import { CSSProperties } from 'styled-components'
import Header from './views/globalViews/Header'
import RequestActionsComponent from './services/request.service'
import DeskRoutes from './routes/DeskRoutes'
import Footer from './views/globalViews/Footer'
import Alert from './services/alert.service'
import FOS from './services/fos.service'
import RightContentContainer from './services/rightContentContainer.service'

const Main: React.FC = () => {

  {/* ---------------------------------------- */}
  {/* useState для переключения выполнения запросов */}
  {/* ---------------------------------------- */}

  const [ GET_TASKS_REQUEST, SET_TASKS_REQUEST ] = useState(false)
  const [ GET_ORDERS_REQUEST, SET_ORDERS_REQUEST ] = useState(false)
  const [ GET_CUSTOMERS_REQUEST, SET_CUSTOMERS_REQUEST ] = useState(false)
  const [ GET_EXECUTORS_REQUEST, SET_EXECUTORS_REQUEST ] = useState(false)

  const [ tasksUpdate, setTasksUpdate ] = useState(false)
  const [ ordersUpdate, setOrdersUpdate ] = useState(false)

  {/* ---------------------------------------- */}
  {/* useState для переключения выполнения запросов */}
  {/* ---------------------------------------- */}

  const showRightContent = useAppSelector(state => state.rightContentReducer.isShow)
  const typeRightContent = useAppSelector(state => state.rightContentReducer.showType)
  const scrollRightContent = useAppSelector(state => state.rightContentReducer.scrollTop)
  const scrollFosContent = useAppSelector(state => state.FOSReducer.scrollTop)
  const showAlertContent = useAppSelector(state => state.alertContentReducer.isShow)
  const alertType = useAppSelector(state => state.alertContentReducer.type)
  const alertMessage = useAppSelector(state => state.alertContentReducer.message)
  const alertCSS = useAppSelector(state => state.alertContentReducer.styles)
  const showFos = useAppSelector(state => state.FOSReducer.isShow)
  const fosType = useAppSelector(state => state.FOSReducer.showType)
  
  const mainContainer = useRef<HTMLElement | null>(null)
  const requestReduceValue = useAppSelector(state => state.requestReducer.reduceValue)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const USER_ROLE = useAppSelector(state => state.roleTypeReducer.activeRole)
  const MAIN_STYLES: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '110%',
    height: '100vh',
    overflowY: showRightContent ? 'hidden' : 'scroll',
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

  const callbackSetCustomersList = (param: any) => {

    const filterUsers = param.users.filter((user: any) => user.type === 'CUSTOMER')
    dispatch(setCustomers(filterUsers))

  }

  const callbackSetExecutorsList = (param: any) => {

    const filterUsers = param.users.filter((user: any) => user.type === 'EXECUTOR')
    dispatch(setExecutors(filterUsers))

  }

  useEffect(() => {

    false && console.log(mainContainer.current?.scrollTop)
    mainContainer.current !== null && dispatch(setScrollTop(mainContainer.current.scrollTop))
    mainContainer.current !== null && dispatch(setScrollFos(mainContainer.current.scrollTop))

    USER_ROLE === 'UNDEFINED' && console.log('нет авторизации')

  },[ dispatch, showRightContent, showFos, USER_ROLE ])
  useEffect(() => navigate('/customers'),[])
  useEffect(() => {}, [ requestReduceValue ])
  useEffect(() => {
    
    SET_TASKS_REQUEST(true)
    setTimeout(() => SET_TASKS_REQUEST(false), 1400)

  }, [ tasksUpdate ])
  useEffect(() => {
    
    SET_ORDERS_REQUEST(true)
    setTimeout(() => SET_ORDERS_REQUEST(false), 1400)

  }, [ ordersUpdate ])
  useEffect(() => {

    SET_CUSTOMERS_REQUEST(true)
    setTimeout(() => SET_CUSTOMERS_REQUEST(false), 1400)

    SET_EXECUTORS_REQUEST(true)
    setTimeout(() => SET_EXECUTORS_REQUEST(false), 1400)

  }, [])

  useEffect(() => {

    const taskUpdateRound = setInterval(() => setTasksUpdate(prev => !!!prev), 10400)
    false && clearInterval(taskUpdateRound)

  }, [])
  useEffect(() => {

    const ordersUpdateRound = setInterval(() => setOrdersUpdate(prev => !!!prev), 10400)
    false && clearInterval(ordersUpdateRound)

  }, [])

  return (
    <React.Fragment>

      {/* ---------------------------------------- */}
      {/* блок для SRC - в дальнейшем вынести отдельно */}
      {/* ---------------------------------------- */}

      <React.Fragment>

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

      {/* ---------------------------------------- */}
      {/* блок для SRC - в дальнейшем вынести отдельно */}
      {/* ---------------------------------------- */}

      <main ref={mainContainer} style={MAIN_STYLES}>
        { showAlertContent && <Alert
          messageType={alertType}
          message={alertMessage}
          styles={alertCSS}
        /> }
        { showRightContent === true && <RightContentContainer 
          contentType={typeRightContent}
          scroll={scrollRightContent}
          chatData={{
            userID: '0000008',
            userName: 'Иванов Петр Владимирович',
            userLastctive: 'вчера в 12:43'
          }}
        /> }
        { showFos && <FOS 
          showType={fosType} 
          showShadow={true} 
          scroll={scrollFosContent} 
        /> }
        <Header></Header>
        <DeskRoutes></DeskRoutes>
        <Footer></Footer>
      </main>
    </React.Fragment>
  )

}

export default Main