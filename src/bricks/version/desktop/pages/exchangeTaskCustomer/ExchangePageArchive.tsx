import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { setShow, setType, setMessage } from '../../../../store/slices/alert-content-slice' 
import SelectField from '../../comps/select/SelectField'
import TaskTable from '../../views/localViews/TaskTable'
import Pagintation from '../../services/pagination.service'
import cssContentArea from '../../styles/views/contentArea.css'
import cssAsideMenu from '../../styles/pages/exchangePageAside.css'

const { ContentArea, CustExecContentInnerArea, PageTitle } = cssContentArea
const { MenuContainer, PagintationContainer } = cssAsideMenu

const ExchangePage: React.FC = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const TASKS_LIST = useAppSelector(state => state.taskContentReducer.TASKS_DATA)
  const greyColor = useAppSelector(state => state.theme.grey)

  const divCSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: '-22px'
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

  const orders = (): void => {
    TASKS_LIST.list.filter(item => item.status === 'work').length > 0 && navigate('/active-orders-cust')
    false && dispatch(setShow(true))
    false && dispatch(setType("info"))
    false && dispatch(setMessage("В настоящий момент заданий в работе нет"))
  }
  const tasks = (): void => {
    TASKS_LIST.list.filter(item => item.status === 'searching').length > 0 && navigate('/task-list-cust')
    false && dispatch(setShow(true))
    false && dispatch(setType("info"))
    false && dispatch(setMessage("В настоящий момент заданий в работе нет"))
  }

  return (
    <ContentArea
      flexDirection={null}
      alignItems={null}
      justify={null}
    > 
      <div style={headBlockCSS}>
        <PageTitle>Архивные заказы</PageTitle>
        <div style={divCSS}>
          <span style={{ ...spanActiveCSS, opacity: 0.6 }} onClick={tasks}>Задания ( Null {/*TASKS_LIST.list.filter(item => item.status === 'searching').length*/} )</span>
          <span style={{ ...spanActiveCSS, opacity: 0.6 }} onClick={orders}>В работе ( Null {/*TASKS_LIST.list.filter(item => item.status === 'work').length*/} )</span>
          <span style={{ ...spanActiveCSS, marginRight: '0px' }}>Архивные ( Null {/*TASKS_LIST.list.filter(item => item.status === 'backside').length*/} )</span>
        </div>
      </div>
      <MenuContainer>
        <SelectField 
          placeholder={"Сортировать по новизне"}
          params={{ width: 300, mb: '35px', height: 50 }}
          data={[
            { value: '1', label: 'За последние три дня' },
            { value: '2', label: 'За последнюю неделю' },
            { value: '3', label: 'За месяц' },
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
      </MenuContainer>
      <CustExecContentInnerArea>
        { TASKS_LIST.list.filter(item => item.status === 'backside').map((item, index) => {
          return (
            <TaskTable key={index}
              viewType={"complete"}
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
              marbo={"16px"}
              deal={{
                type: item.coast.issafe === true ? 'safe' : 'simple',
                coast: item.coast.value,
                prepaid: item.coast.issafe === true ? item.coast.prepay : 0,
                expert: item.coast.issafe === true ? item.coast.exper : 0,
              }}
            />
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