import React, { ReactElement } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { setShow, setType, setMessage } from '../../../../store/slices/alert-content-slice' 
import { selectActualTask } from '../../../../store/slices/task-content-slice'
import SelectField from '../../comps/select/SelectField'
import TaskTable from '../../views/localViews/TaskTable'
import ButtonComponent from '../../comps/button/Button'
import Pagintation from '../../services/pagination.service'
import cssContentArea from '../../styles/views/contentArea.css'
import cssAsideMenu from '../../styles/pages/exchangePageAside.css'
import cssRespondTable from '../../styles/views/respondTable.css'
import EmailIcon from '@mui/icons-material/Email'

const { ContentArea, CustExecContentInnerArea, PageTitle } = cssContentArea
const { MenuContainer, PagintationContainer } = cssAsideMenu
const { MyRespond } = cssRespondTable

const ExchangePage: React.FC = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const TASKS_LIST = useAppSelector(state => state.taskContentReducer.TASKS_DATA)
  const ROLE_TYPE = useAppSelector(state => state.roleTypeReducer.activeRole)

  const greyColor = useAppSelector(state => state.theme.grey)
  const buttonColor = useAppSelector(state => state.theme.blue3)

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
  const subContentLine: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  }

  const orders = (): void => {
    !false && TASKS_LIST.list.filter(item => item.status === 'work').length > 0 && navigate('/aktivnye-zakazy-ispolnitel')
    !false && dispatch(setShow(true))
    !false && dispatch(setType("info"))
    !false && dispatch(setMessage("В настоящий момент заданий в работе нет"))
  }
  const archive = (): void => {
    false && TASKS_LIST.list.filter(item => item.status === 'backside').length > 0 && navigate('/aktivnye-zakazy-ispolnitel')
    !false && dispatch(setShow(true))
    !false && dispatch(setType("info"))
    !false && dispatch(setMessage("В настоящий момент заданий в архиве нет"))
  }

  const actualTask = (param: string) => {
    dispatch(selectActualTask(param))
  } 

  return (
    <ContentArea
      flexDirection={null}
      alignItems={null}
      justify={null}
    > 

      { ROLE_TYPE === 'CUSTOMER' && <Navigate to={"/zakazchik-moi-zadaniya"} replace={true}/> }

      <div style={headBlockCSS}>
        <PageTitle>Мои задания</PageTitle>
        <div style={divCSS}>
          <span style={{ ...spanActiveCSS }}>Задания ({TASKS_LIST.list.filter(item => item.status === 'work').length})</span>
          <span style={{ ...spanActiveCSS, opacity: 0.6 }} onClick={orders}>В работе ({TASKS_LIST.list.filter(item => item.status === 'work').length})</span>
          <span style={{ ...spanActiveCSS, opacity: 0.6, marginRight: '0px' }} onClick={archive}>Архивные ({TASKS_LIST.list.filter(item => item.status === 'backside').length * 0})</span>
        </div>
      </div>
      <MenuContainer>
        <SelectField 
          placeholder={"Сортировать по новизне"}
          params={{ width: 300, mb: '35px', height: 50 }}
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
      </MenuContainer>
      <CustExecContentInnerArea>
        { TASKS_LIST.list.filter(item => item.status === 'backside').map((item, index: number): ReactElement => {
          return (
            <React.Fragment>
              <TaskTable key={index}
                viewType={"execSelfView"}
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
              <MyRespond.RespondContainer>
                <MyRespond.Title>Ваш отклик</MyRespond.Title>
                <MyRespond.ContentLine style={{ marginBottom: '15px' }}>
                  <div style={subContentLine}>
                    <div style={{ marginRight: '80px' }}>
                      <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Сроки:</span>
                      <span>{"180 дней"}</span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Стоимость:</span>
                      <span>{"120 000₽"}</span>
                    </div>
                  </div>
                </MyRespond.ContentLine>
                <MyRespond.ContentLine style={{ marginBottom: '5px' }}>
                  <div style={subContentLine}>
                    <div>
                      <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Комментарий:</span>
                    </div>
                  </div>
                </MyRespond.ContentLine>
                <MyRespond.ContentLine>
                  <div style={subContentLine}>
                    <div style={{ width: '530px', lineHeight: '20px' }}>
                      <span>Nibh duis amet mattis elementum et. Nunc quis nullam sit risus sollicitudin habitant eget urna. Sed justo eget porttitor ut odio.Nibh duis amet mattis elementum et. Nunc quis nullam sit risus sollicitudin habitant eget urna. Sed justo eget porttitor ut odio</span>
                    </div>
                  </div>
                </MyRespond.ContentLine>
                <MyRespond.ButtonContainer>
                  <ButtonComponent
                    inner={"Отменить отклик"} 
                    type="CONTAINED_DEFAULT"
                    action={() => {}}
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
                      color: 'inherit',
                      fontSize: '12px',
                      height: '40px',
                      borderRadius: '6px',
                      position: 'relative',
                      boxSizing: 'border-box',
                    }}
                  />
                </MyRespond.ButtonContainer>
              </MyRespond.RespondContainer>
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