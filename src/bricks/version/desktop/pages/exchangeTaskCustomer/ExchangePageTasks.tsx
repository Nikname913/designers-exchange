/* eslint-disable array-callback-return */
import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const greyColor = useAppSelector(state => state.theme.grey)
  const buttonColor = useAppSelector(state => state.theme.blue2)
  const delimiterColor = useAppSelector(state => state.theme.blue3)
  const greyColor2 = useAppSelector(state => state.theme.grey2)

  const TASKS_LIST = useAppSelector(state => state.taskContentReducer.TASKS_DATA)
  const USERS_LIST = useAppSelector(state => state.userContentReducer.USERS_DATA)

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
    false && navigate('/aktivnye-zakazy')
    dispatch(setShow(true))
    dispatch(setType("info"))
    dispatch(setMessage("В настоящий момент заданий в работе нет"))
  }
  const arkhiv = (): void => {
    false && navigate('/zadaniya-arkhiv')
    dispatch(setShow(true))
    dispatch(setType("info"))
    dispatch(setMessage("В настоящий момент задания в архиве отсутствуют"))
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
      }
    })

    return userTags

  }

  const returnUserStat = (param: string) => {

    let userStat: Array<number> = []

    USERS_LIST.listExecutors.forEach(user => {
      if ( user.id === param ) {
        userStat = user.stat
      }
    })

    return userStat

  }

  return (
    <ContentArea
      flexDirection={null}
      alignItems={null}
      justify={null}
    > 
      <div style={headBlockCSS}>
        <PageTitle>Мои задания</PageTitle>
        <div style={divCSS}>
          <span style={{ ...spanActiveCSS }}>Задания ({ TASKS_LIST.list.length })</span>
          <span style={{ ...spanActiveCSS, opacity: 0.6 }} onClick={orders}>В работе (0)</span>
          <span style={spanNoActiveCSS} onClick={arkhiv}>Архивные (0)</span>
        </div>
      </div>
      <MenuContainer>
        { ROLE_TYPE === "CUSTOMER" || ROLE_TYPE === "EXECUTOR" ? <React.Fragment>
          <ButtonComponent
            inner={"Создать новое задание"} 
            type="CONTAINED_DEFAULT" 
            action={() => navigate('/novoe-zadanie')}
            actionData={null}
            widthType={"%"}
            widthValue={100}
            children={""}
            childrenCss={{}}
            iconSrc={null}
            iconCss={undefined}
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
          <TextFieldTitle style={{ marginTop: '0px', marginBottom: '20px' }}>Сортировать по</TextFieldTitle>
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
          <TextFieldTitle style={{ marginTop: '0px', marginBottom: '20px', fontWeight: 'bold' }}>Открытые задания ({ TASKS_LIST.list.length })</TextFieldTitle>
          <ExchangePageTaskCSS.MenuDelimeter backgroundColor={delimiterColor}/>
          <React.Fragment>
            { TASKS_LIST.list.map((item: { id: string, name: string, responds: Array<{ user: string }> }, index: number): ReactElement => {

                return <ExchangePageTaskCSS.TaskSpan 
                  style={ TASKS_LIST.showOne === item.id ? { fontWeight: 'bold' } : {}}
                  color={greyColor2} 
                  key={index}
                  onClick={() => dispatch(selectShowTask(item.id))}>
                    { item.name }
                  </ExchangePageTaskCSS.TaskSpan>

               })}
          </React.Fragment>
          <ExchangePageTaskCSS.MenuDelimeter backgroundColor={delimiterColor}/>
          <TextFieldTitle 
            style={{ 
              marginTop: '0px', 
              marginBottom: '35px', 
              fontWeight: 'bold',
              color: greyColor2 
            }}
          >Неактивные задания (0)</TextFieldTitle>
        </React.Fragment> : <React.Fragment></React.Fragment> }
      </MenuContainer>
      <CustExecContentInnerArea>
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
                viewType={"myTask"}
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
        <div style={divRowCSS}>
          <TextFieldTitle style={{ fontWeight: 'bold', margin: '0' }}>Отклики <i style={{ fontStyle: 'normal', color: '#8E9DA7' }}>(3)</i></TextFieldTitle>
          <SelectField 
            placeholder={"Новизне"}
            params={{ width: 300, height: 50 }}
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
        </div>

        { TASKS_LIST.list.map((item: { id: string, name: string, responds: Array<{ user: string }> }, index: number): ReactElement => {

          return (
            <React.Fragment>
              { TASKS_LIST.showOne === item.id && item.responds.map((itemm: { user: string }, indexx: number): ReactElement => {

                return (<RespondTable 
                  containerCSS={{
                    w: '100%',
                    h: 'auto',
                    mb: '20px',
                    bg: 'white'
                  }}
                  userName={returnName(itemm.user)}
                  userJob={"Самозанятый"}
                  userRate={returnUserRate(itemm.user)}
                  userStat={{
                    completed: returnUserStat(itemm.user)[0], 
                    failed: returnUserStat(itemm.user)[2], 
                    worked: returnUserStat(itemm.user)[1]
                  }}
                  userPrice={120000}
                  userDeadline={"22.02.2023"}
                  userLocation={"Екатеринбург"}
                  userTags={returnUserTags(itemm.user)}
                  userMorePrice={["20000", "25", "50000", "10.02.2023"]}
                  respondDate={"22.12.22&&16:30"}
                  discription={"lorem ipsum dolor sit amet, consectetur adipiscing"}
                ></RespondTable>)

              })}
            </React.Fragment>
          )

        })}

        <PagintationContainer>
          <span style={showMoreButtonCSS}>Загрузить еще</span>
          <Pagintation></Pagintation>
        </PagintationContainer>

      </CustExecContentInnerArea>
    </ContentArea>
  )

}

export default ExchangePage