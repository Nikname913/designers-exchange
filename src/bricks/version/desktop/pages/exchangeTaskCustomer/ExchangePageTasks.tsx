// ----------------------------------------------------------------
/* eslint-disable array-callback-return */
// ----------------------------------------------------------------
import React, { ReactElement, useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { selectShowTask, selectActualTask } from '../../../../store/slices/task-content-slice'
import { setShow, setType, setMessage } from '../../../../store/slices/alert-content-slice'
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

  const [ contentPlug, setContentPlug ] = useState(true)
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
    TASKS_LIST.list.filter(item => item.status === 'work').length > 0 && navigate('/active-orders-cust')
    TASKS_LIST.list.filter(item => item.status === 'work').length === 0 && navigate('/active-orders-cust')
    false && dispatch(setShow(true))
    false && dispatch(setType("info"))
    false && dispatch(setMessage("В настоящий момент заданий в работе нет"))
  }
  const arkhiv = (): void => {
    TASKS_LIST.list.filter(item => item.status === 'backside').length > 0 && navigate('/tasks-archive-cust')
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

  useEffect(() => {

    console.log(TASKS_LIST.list)

    TASKS_LIST.list.filter(task => task.status === 'searching').map((item, index: number) => {

      if ( item.customer === ROLE_USER_ID ) setContentPlug(false)

    })

  }, [ ROLE_USER_ID, TASKS_LIST.list ])

  return (
    <ContentArea
      flexDirection={null}
      alignItems={null}
      justify={null}
    > 

      { ROLE_TYPE === 'EXECUTOR' && <Navigate to={"/task-list-exec"} replace={true}/> }

      <div style={headBlockCSS}>
        <PageTitle>{ pageTitle }</PageTitle>
        <div style={divCSS}>
          <span style={{ ...spanActiveCSS }}>
            Задания ({
              TASKS_LIST.list.filter(item => item.status === 'searching').filter(item => item.customer === ROLE_USER_ID).length
            })
          </span>
          <span style={{ ...spanActiveCSS, opacity: 0.6 }} onClick={orders}>
            В работе ({
              TASKS_LIST.listOrders.filter(item => item.status === 'work').filter(item => item.customer === ROLE_USER_ID).length
            })
          </span>
          <span style={spanNoActiveCSS} onClick={arkhiv}>Архивные ( Null {/*TASKS_LIST.list.filter(item => item.status === 'backside').length*/} )</span>
        </div>
      </div>
      <MenuContainer style={{ marginBottom: '8px' }}>
        <ButtonComponent
          inner={"Создать новое задание"} 
          type="CONTAINED_DEFAULT" 
          action={() => navigate('/create-new-task')}
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

          { TASKS_LIST.list.filter(task => task.status === 'searching').map((item, index: number) => {

            if ( item.customer === ROLE_USER_ID ) {

              return <ExchangePageTaskCSS.TaskSpan 
                style={ TASKS_LIST.showOne === item.id ? { fontWeight: 'bold' } : {}}
                color={greyColor2} 
                key={index}
                onClick={() => {

                  !false && dispatch(selectShowTask(item.id))
                  !false && setTypeShowTasks('active')
                  !false && setPageTitle('Мои задания')

                }}
              >{ item.name }</ExchangePageTaskCSS.TaskSpan>

            }

          })}
        </React.Fragment>
        <ExchangePageTaskCSS.MenuDelimeter style={{ marginTop: '24px' }} backgroundColor={delimiterColor}/>
        <TextFieldTitle 
          onClick={() => {
            setTypeShowTasks('noactive')
            setPageTitle('Отмененные задания')
          }}
          style={{ 
            marginTop: '0px', 
            marginBottom: '29px', 
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
        { contentPlug && <span style={{ margin: '66px auto 0px' }}>{"В настоящий момент у вас нет активных заданий"}</span> }
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
        { !contentPlug && <React.Fragment>
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

            { TASKS_LIST.list
              .map((item: { 
                id: string, 
                name: string, 
                responds: Array<{ 
                  executorID: string,
                  deadline: string,
                  coast: string,
                  preSolution: string,
                  prePay: string,
                  expert: any,
                  expertCoast: string,
                  comment: string,
                }> }, index: number): ReactElement => {

              return (
                <React.Fragment>
                  { TASKS_LIST.showOne === item.id && item.responds.map((itemm: any, indexx: number): ReactElement => {

                    false && console.log(itemm)

                    return (<RespondTable 
                      containerCSS={{
                        w: '100%',
                        h: 'auto',
                        mb: '20px',
                        bg: 'white'
                      }}
                      userName={itemm.executorID}
                      userJob={"[ options download ]"}
                      userRate={returnUserRate(itemm.executorID) !== 0 ? itemm.executorID : 4.88}
                      userStat={{
                        completed: false ? returnUserStat(itemm.executorID)[0] : 0, 
                        failed: false ? returnUserStat(itemm.executorID)[2] : 0, 
                        worked: false ? returnUserStat(itemm.executorID)[1] : 0
                      }}
                      userPrice={itemm.coast}
                      userDeadline={itemm.deadline.slice(0, 10)}
                      userLocation={"Екатеринбург"}
                      userTags={returnUserTags(itemm.executorID)}
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
            <Pagintation count={
              ( TASKS_LIST.list.filter(item => item.status === 'searching').length / 10 ) < 1 ? 1 :
              ( TASKS_LIST.list.filter(item => item.status === 'searching').length / 10 ) + ( TASKS_LIST.list.filter(item => item.status === 'searching').length % 10 ) 
            }></Pagintation>
          </PagintationContainer>
        </React.Fragment> }

      </CustExecContentInnerArea>
    </ContentArea>
  )

}

export default ExchangePage