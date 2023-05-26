/* eslint-disable array-callback-return */
/* eslint-disable array-callback-return */
import React, { ReactElement, useEffect, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { setShow, setType, setMessage } from '../../../../store/slices/alert-content-slice' 
import { selectActualTask } from '../../../../store/slices/task-content-slice'
import RequestActionsComponent from '../../services/request.service'
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
  const USER_ID = useAppSelector(state => state.roleTypeReducer.roleData.userID)

  const [ REMOVE_RESPOND_REQUEST, SET_REMOVE_RESPOND_REQUEST ] = useState(false)

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
    !false && TASKS_LIST.listOrders
      .filter(item => item.status === 'work')
      .filter(item => item.executor === USER_ID).length > 0 && navigate('/active-orders-exec')
    !false && dispatch(setShow(true))
    !false && dispatch(setType("info"))
    !false && dispatch(setMessage("В настоящий момент заданий в работе нет"))
  }
  const archive = (): void => {
    false && TASKS_LIST.list.filter(item => item.status === 'backside').length > 0 && navigate('/active-orders-exec')
    !false && dispatch(setShow(true))
    !false && dispatch(setType("info"))
    !false && dispatch(setMessage("В настоящий момент заданий в архиве нет"))
  }

  const actualTask = (param: string) => {
    dispatch(selectActualTask(param))
  } 

  useEffect(() => {
    
    !false && console.log(TASKS_LIST.list)
  
  }, [ TASKS_LIST ])

  const removeRespond = () => {
    console.log(JSON.stringify({
      taskID: TASKS_LIST.showOne,
      executorID: USER_ID
    }))
    SET_REMOVE_RESPOND_REQUEST(true)
    setTimeout(() => {
      SET_REMOVE_RESPOND_REQUEST(false)
    }, 1000)
  }

  return (
    <ContentArea
      flexDirection={null}
      alignItems={null}
      justify={null}
    > 

      { REMOVE_RESPOND_REQUEST && <RequestActionsComponent

        callbackAction={() => {}}
        requestData={{
          type: 'POST',
          urlstring: '/remove-respond-one',
          body: {
            taskID: TASKS_LIST.showOne,
            executorID: USER_ID
          }
        }}
      
      /> }

      { ROLE_TYPE === 'CUSTOMER' && <Navigate to={"/task-list-cust"} replace={true}/> }

      <div style={headBlockCSS}>
        <PageTitle>Мои задания</PageTitle>
        <div style={divCSS}>
          <span style={{ ...spanActiveCSS }}>
            Задания ({
              TASKS_LIST.list.filter(item => item.status === 'searching').filter(item => {

                let check = 0
                item.responds.forEach(respond => {
                  if ( respond.executorID === USER_ID ) check = 1
                })

                if ( check === 1 ) return item

              }).length
            })
          </span>
          <span style={{ ...spanActiveCSS, opacity: 0.6 }} onClick={orders}>
            В работе ({
              TASKS_LIST.listOrders.filter(item => item.status === 'work').filter(item => item.executor === USER_ID).length
            })
          </span>
          <span style={{ ...spanActiveCSS, opacity: 0.6, marginRight: '0px' }} onClick={archive}>
            Архивные ( Null {/*TASKS_LIST.list.filter(item => item.status === 'backside').length*/} )
          </span>
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
        { TASKS_LIST.list
          .filter(item => {  

            let respondCount = 0
            
            if ( item.responds.length > 0 ) {
              for ( let i = 0; i < item.responds.length; i++ ) {
                false && console.log(item.responds[i])
                if ( item.responds[i].executorID === USER_ID ) {
                  respondCount = 1000
                }
              }
            }

            if ( respondCount === 1000 ) return item

          })
          .map((item, index: number): ReactElement => {
          return (
            <React.Fragment key={index}>
              <TaskTable
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
              <React.Fragment>
                { item.responds
                  .filter((item: any) => item.executorID === USER_ID)
                  .map((item: any, index: number): ReactElement => {

                    return (
                      <MyRespond.RespondContainer>
                        <MyRespond.Title style={{ marginTop: '2px', marginBottom: '14px' }}>Ваш отклик на задание</MyRespond.Title>
                        <MyRespond.ContentLine style={{ marginBottom: '15px' }}>
                          <div style={subContentLine}>
                            <div style={{ marginRight: '80px' }}>
                              <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Сроки:</span>
                              <span>{item.deadline.slice(0, 10)}</span>
                            </div>
                            <div>
                              <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Стоимость:</span>
                              <span>{`${item.coast}₽`}</span>
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
                              <span>{item.comment}</span>
                            </div>
                          </div>
                        </MyRespond.ContentLine>
                        <MyRespond.ButtonContainer>
                          <ButtonComponent
                            inner={"Отменить отклик"} 
                            type="CONTAINED_DEFAULT"
                            action={removeRespond}
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
                    )
                  
                })}
              </React.Fragment>
            </React.Fragment>
          )
        })}

        <PagintationContainer>
          <span style={showMoreButtonCSS}>Загрузить еще</span>
          <Pagintation count={
            ( TASKS_LIST.list.filter(item => item.status === 'searching').length / 10 ) < 1 ? 1 :
            ( TASKS_LIST.list.filter(item => item.status === 'searching').length / 10 ) + ( TASKS_LIST.list.filter(item => item.status === 'searching').length % 10 ) 
          }></Pagintation>
        </PagintationContainer>

      </CustExecContentInnerArea>
    </ContentArea>
  )

}

export default ExchangePage