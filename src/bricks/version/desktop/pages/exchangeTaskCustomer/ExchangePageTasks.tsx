// ----------------------------------------------------------------
/* eslint-disable array-callback-return */
// ----------------------------------------------------------------
import React, { ReactElement, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { selectShowTask, selectActualTask } from '../../../../store/slices/task-content-slice'
import { setShow, setType, setMessage } from '../../../../store/slices/alert-content-slice'
import { setList } from '../../../../store/slices/task-content-slice' 
import RequestActionsComponent from '../../services/request.service'
import ButtonComponent from '../../comps/button/Button'
import SelectField from '../../comps/select/SelectField'
import TaskTable from '../../views/localViews/TaskTable'
import RespondTable from '../../views/localViews/RespondTable'
import Pagintation from '../../services/pagination.service'
import cssContentArea from '../../styles/views/contentArea.css'
import cssAsideMenu from '../../styles/pages/exchangePageAside.css'
import cssAsideMenuCust from '../../styles/pages/customersPageAside.css'
import EmailIcon from '@mui/icons-material/Email'

import arraySortIcon from '../../../../img/icons/sortArray.svg'
import arraySortFilter from '../../../../img/icons/sortFilter.svg'
import plusIcon from '../../../../img/icons/plusWhite.svg'

const { ContentArea, CustExecContentInnerArea, PageTitle } = cssContentArea
const { MenuContainer, 
  TextFieldTitle, 
  PagintationContainer,
} = cssAsideMenu
const { ExchangePageTaskCSS } = cssAsideMenuCust

const ExchangePage: React.FC = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const ROLE_TYPE = useAppSelector(state => state.roleTypeReducer.activeRole)
  const ROLE_USER_ID = useAppSelector(state => state.roleTypeReducer.roleData.userID) 

  const greyColor = useAppSelector(state => state.theme.grey)
  const buttonColor = useAppSelector(state => state.theme.blue2)
  const delimiterColor = useAppSelector(state => state.theme.blue3)
  const greyColor2 = useAppSelector(state => state.theme.grey2)

  const TASKS_LIST = useAppSelector(state => state.taskContentReducer.TASKS_DATA)
  const USERS_LIST = useAppSelector(state => state.userContentReducer.USERS_DATA)
  const [ AUTH_REQUEST, ] = useState(true)

  const [ typeShowTasks, setTypeShowTasks ] = useState<'active' | 'noactive'>('active') 
  const [ pageTitle, setPageTitle ] = useState<'Мои задания' | 'Отмененные задания'>('Мои задания')

  const divCSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: '-22px'
  }
  const spanNoActiveCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative', 
    opacity: 0.6, 
    cursor: 'pointer',
  }
  const spanActiveCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative', 
    cursor: 'pointer',
    marginRight: '30px'  
  }
  const headBlockCSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
    paddingRight: '120px'
  }
  const showMoreButtonCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    color: greyColor,
    textDecoration: 'underline',
    marginBottom: '18px',
    cursor: 'pointer',
  }
  const divRowCSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%',
    marginTop: '22px',
    marginBottom: '22px'
  }

  const orders = (): void => {
    TASKS_LIST.list.filter(item => item.status === 'work').length > 0 && navigate('/zakazchik-aktivnye-zadaniya')
    false && dispatch(setShow(true))
    false && dispatch(setType("info"))
    false && dispatch(setMessage("В настоящий момент заданий в работе нет"))
  }
  const arkhiv = (): void => {
    TASKS_LIST.list.filter(item => item.status === 'backside').length > 0 && navigate('/zakazchik-arkhiv')
    false && dispatch(setShow(true))
    false && dispatch(setType("info"))
    false && dispatch(setMessage("В настоящий момент заданий в работе нет"))
  }

  const actualTask = (param: string) => {
    dispatch(selectActualTask(param))
  } 

  const returnName = (param: string) => {

    let userName = ''

    USERS_LIST.listExecutors.forEach(user => {
      if ( user.id === param ) {
        userName = user.name
      }
    })

    return userName

  }

  false && returnName('')

  const returnUserRate = (param: string) => {

    let userRate = 0

    USERS_LIST.listExecutors.forEach(user => {
      if ( user.id === param ) {
        userRate = user.rate
      }
    })

    return userRate

  }

  const returnUserTags = (param: string) => {

    let userTags: Array<string> = []

    USERS_LIST.listExecutors.forEach(user => {
      if ( user.id === param ) {
        userTags = user.tags
      } else userTags = [ 'download', 'download', 'download' ]
    })

    return userTags

  }

  const returnUserStat = (param: string) => {

    let userStat: Array<number> = []

    USERS_LIST.listExecutors.forEach(user => {
      if ( user.id === param ) {
        userStat = user.stat
      } else userStat = [ 0, 0, 0 ]
    })

    return userStat

  }

  const returnRespondCount = () => {

    let count: number = 0

    TASKS_LIST.list.forEach(task => {
      if ( task.id === TASKS_LIST.showOne ) {
        count = task.responds.length
      }
    })

    return count

  }

  const callbackSetTasksList = (param: any) => {

    const data = param.filter((item: any) => item.status === 'TASK-ACTIVE').map((item: any, index: number) => {

      return { 
        id: item.taskID, 
        name: item.title, 
        date: item.date,
        deadline: `${item.dates.start !== '' ? item.dates.start : '01.01.2023' } - ${item.dates.finish !== '' ? item.dates.finish : '01.01.2023' }`,
        exper: item.expertise,
        experDate: item.expertiseDays,
        customer: item.customer.slice(0, 30) + '...',
        executor: item.executor !== '' ? item.executor : 'Исполнитель не выбран',
        region: item.region ? item.region : 'Екатеринбург',
        tags: item.tags,
        description: item.description,
        status: 'searching',
        viewtype: 'default',
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
      }

    })

    dispatch(setList(data))
    console.log(data)

  }

  return (
    <ContentArea
      flexDirection={null}
      alignItems={null}
      justify={null}
    > 

      { AUTH_REQUEST && <RequestActionsComponent

        callbackAction={callbackSetTasksList}
        requestData={{
          type: 'POST',
          urlstring: '/get-task',
          body: {
            customer: ROLE_USER_ID
          }
        }}
      
      /> }

      { ROLE_TYPE === 'EXECUTOR' && <Navigate to={"/spisok-zadaniy-ispolnitel"} replace={true}/> }

      <div style={headBlockCSS}>
        <PageTitle>{ pageTitle }</PageTitle>
        <div style={divCSS}>
          <span style={{ ...spanActiveCSS }}>Задания ({TASKS_LIST.list.filter(item => item.status === 'searching').length})</span>
          <span style={{ ...spanActiveCSS, opacity: 0.6 }} onClick={orders}>В работе ({TASKS_LIST.list.filter(item => item.status === 'work').length})</span>
          <span style={spanNoActiveCSS} onClick={arkhiv}>Архивные ({TASKS_LIST.list.filter(item => item.status === 'backside').length})</span>
        </div>
      </div>
      <MenuContainer>
        <ButtonComponent
          inner={"Создать новое задание"} 
          type="CONTAINED_DEFAULT" 
          action={() => navigate('/novoe-zadanie')}
          actionData={null}
          widthType={"%"}
          widthValue={100}
          children={""}
          childrenCss={{}}
          iconSrc={plusIcon}
          iconCss={{
            display: 'block',
            position: 'absolute',
            zIndex: 2,
            top: '0px',
            left: '0px',
            marginTop: '12px',
            marginLeft: '34px'
          }}
          muiIconSize={null}
          MuiIconChildren={EmailIcon}
          css={{
            backgroundColor: buttonColor,
            fontSize: '12px',
            height: '44px',
            borderRadius: '6px',
            position: 'relative',
            boxSizing: 'border-box',
            marginBottom: '30px'
          }}
        /> 
        { typeShowTasks === 'active' && <React.Fragment>
          <div style={{ ...divRowCSS, marginTop: '0px', marginBottom: '20px' }}>
            <TextFieldTitle style={{ marginTop: '0px', marginBottom: '0px' }}>Сортировать по</TextFieldTitle>
            <img
              alt={""}
              src={arraySortIcon}
              style={{
                display: 'block',
                position: 'relative',
                cursor: 'pointer'
              }}
            />
          </div>
          <SelectField 
            placeholder={"Новизне"}
            params={{ width: 300, mb: '30px', height: 50 }}
            data={[
              { value: '1', label: 'Сначала новые' },
              { value: '2', label: 'Сначала старые' },
              { value: '3', label: 'Высокий рейтинг' },
              { value: '4', label: 'Сначала дешевые' },
              { value: '5', label: 'Сначала дорогие' },
              { value: '6', label: 'Короткий срок' },
            ]}
            multy={false}
            action={() => {}}
            actionType={""}
            actionParams={[]}
            showIcon={true}
            icon={null}
            iconStyles={{
              marginTop: '-12px',
              marginLeft: '6px',
              width: '34px',
            }}
          />
        </React.Fragment> }
        <div style={{ ...divRowCSS, marginTop: '0px', marginBottom: '20px' }}>
          <TextFieldTitle 
            onClick={() => {
              setTypeShowTasks('active')
              setPageTitle('Мои задания')
            }}
            style={{ 
              marginTop: '0px', 
              marginBottom: '10px', 
              fontWeight: 'bold', 
              color: typeShowTasks === 'noactive' ? greyColor2 : 'inherit',
              cursor: 'pointer' 
            }}
          >Открытые задания ({ TASKS_LIST.list.filter(task => task.status === 'searching').length })</TextFieldTitle>
          { typeShowTasks === 'active' && <img
            alt={""}
            src={arraySortFilter}
            style={{
              display: 'block',
              position: 'relative',
              cursor: 'pointer',
              marginTop: '-10px'
            }}
          /> }
        </div>

        { typeShowTasks === 'active' && <ExchangePageTaskCSS.MenuDelimeter style={{ marginTop: '23px' }} backgroundColor={delimiterColor}/> }
        
        <React.Fragment>

          { TASKS_LIST.list.filter(task => task.status === 'searching').map((item: { id: string, name: string, responds: Array<{ user: string }> }, index: number): ReactElement => {

            return <ExchangePageTaskCSS.TaskSpan 
              style={ TASKS_LIST.showOne === item.id ? { fontWeight: 'bold' } : {}}
              color={greyColor2} 
              key={index}
              onClick={() => {

                console.log(item.id)

                !false && dispatch(selectShowTask(item.id))
                !false && setTypeShowTasks('active')
                !false && setPageTitle('Мои задания')

              }}
            >{ item.name }</ExchangePageTaskCSS.TaskSpan>

          })}
        </React.Fragment>
        <ExchangePageTaskCSS.MenuDelimeter style={{ marginTop: '33px' }} backgroundColor={delimiterColor}/>
        <TextFieldTitle 
          onClick={() => {
            setTypeShowTasks('noactive')
            setPageTitle('Отмененные задания')
          }}
          style={{ 
            marginTop: '0px', 
            marginBottom: '26px', 
            fontWeight: 'bold',
            color: typeShowTasks === 'active' ? greyColor2 : 'inherit',
            cursor: 'pointer'
          }}
        >Неактивные задания ({ TASKS_LIST.list.filter(task => task.status === 'backside').length })</TextFieldTitle>
        <React.Fragment>
          { typeShowTasks === 'noactive' && <React.Fragment>
            <ExchangePageTaskCSS.TaskSpan color={greyColor2} style={{ fontWeight: 'bold' }}>Отмененные</ExchangePageTaskCSS.TaskSpan>
            <ExchangePageTaskCSS.TaskSpan color={greyColor2}>Черновики</ExchangePageTaskCSS.TaskSpan>
          </React.Fragment> }
        </React.Fragment>
      </MenuContainer>
      <CustExecContentInnerArea>
        { typeShowTasks === 'active' ? <React.Fragment>
          { TASKS_LIST.list.map((item, index) => {

            if ( TASKS_LIST.showOne === item.id ) {

              return (
                <TaskTable key={index}
                  taskInitDate={item.date}
                  taskTitle={item.name}
                  taskDeadline={item.deadline}
                  taskExpertType={item.exper}
                  taskCustomer={item.customer}
                  taskExecutor={item.executor}
                  taskLocation={item.region}
                  taskSpecializationTags={item.tags}
                  taskDescription={item.description}
                  dealStatus={item.status}
                  cardWidth={'100%'}
                  viewType={"custSelfView"}
                  marbo={"0px"}
                  actions={[actualTask]}
                  actionsParams={[item.id]}
                  deal={{
                    type: item.coast.issafe === true ? 'safe' : 'simple',
                    coast: item.coast.value,
                    prepaid: item.coast.issafe === true ? item.coast.prepay : 0,
                    expert: item.coast.issafe === true ? item.coast.exper : 0,
                  }}
                />
              )

            }

          })}
        </React.Fragment> : <React.Fragment>
          { TASKS_LIST.list.filter(task => task.status === 'backside').map((item, index) => {

            return (
              <TaskTable key={index}
                taskInitDate={item.date}
                taskTitle={item.name}
                taskDeadline={item.deadline}
                taskExpertType={item.exper}
                taskCustomer={item.customer}
                taskExecutor={item.executor}
                taskLocation={item.region}
                taskSpecializationTags={item.tags}
                taskDescription={item.description}
                dealStatus={item.status}
                cardWidth={'100%'}
                viewType={item.status}
                marbo={"20px"}
                actions={[actualTask]}
                actionsParams={[item.id]}
                deal={{
                  type: item.coast.issafe === true ? 'safe' : 'simple',
                  coast: item.coast.value,
                  prepaid: item.coast.issafe === true ? item.coast.prepay : 0,
                  expert: item.coast.issafe === true ? item.coast.exper : 0,
                }}
              />
            )

          })}
        </React.Fragment> }
        { typeShowTasks === 'active' && <div style={divRowCSS}>
          <TextFieldTitle style={{ fontWeight: 'bold', margin: '0', marginTop: '-2px' }}>
            Отклики на задание <i style={{ fontStyle: 'normal', color: '#8E9DA7' }}>({ returnRespondCount() })</i>
          </TextFieldTitle>
          <SelectField 
            placeholder={"Сортировать"}
            params={{ width: 300, height: 50 }}
            data={[
              { value: '1', label: '[ options download ]' },
            ]}
            multy={false}
            action={() => {}}
            actionType={""}
            actionParams={[]}
            showIcon={true}
            icon={null}
            iconStyles={{
              marginTop: '-12px',
              marginLeft: '6px',
              width: '34px',
            }}
          />
        </div> }

        { typeShowTasks === 'active' && <React.Fragment>

          { TASKS_LIST.list.map((item: { id: string, name: string, responds: Array<{ user: string }> }, index: number): ReactElement => {

            return (
              <React.Fragment>
                { TASKS_LIST.showOne === item.id && item.responds.map((itemm: any, indexx: number): ReactElement => {

                  console.log(itemm)

                  return (<RespondTable 
                    containerCSS={{
                      w: '100%',
                      h: 'auto',
                      mb: '20px',
                      bg: 'white'
                    }}
                    userName={itemm.executorID.slice(0, 20) + '...'}
                    userJob={"[ options download ]"}
                    userRate={returnUserRate(itemm.user)}
                    userStat={{
                      completed: itemm && returnUserStat(itemm.user)[0], 
                      failed: itemm && returnUserStat(itemm.user)[2], 
                      worked: itemm && returnUserStat(itemm.user)[1]
                    }}
                    userPrice={itemm.coast}
                    userDeadline={itemm.deadline.slice(0, 10)}
                    userLocation={"Екатеринбург"}
                    userTags={returnUserTags(itemm.user)}
                    userMorePrice={[": " + itemm.prePay, itemm.preSolution, ": " + itemm.expertCoast, itemm.expert]}
                    respondDate={"[ options download ]&&[ options download ]"}
                    discription={itemm.comment}
                  ></RespondTable>)

                })}
              </React.Fragment>
            )

          })}
        </React.Fragment> }

        <PagintationContainer>
          <span style={showMoreButtonCSS}>Загрузить еще</span>
          <Pagintation></Pagintation>
        </PagintationContainer>

      </CustExecContentInnerArea>
    </ContentArea>
  )

}

export default ExchangePage