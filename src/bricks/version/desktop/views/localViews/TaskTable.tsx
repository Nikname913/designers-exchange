import React, { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { useNavigate } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email'
import ButtonComponent from '../../comps/button/Button'
import RequestActionsComponent from '../../services/request.service'
import { ITaskTableProps } from '../../../../models-ts/views/task-table-models'
import { setShow, setShowType } from '../../../../store/slices/fos-slice'
import { setShow as setShowRCC } from '../../../../store/slices/right-content-slice'
import { setTask, setExecutor } from '../../../../store/slices/respond-slice'
import { selectShowTask } from '../../../../store/slices/task-content-slice'
import { setUpdating } from '../../../../store/slices/data-update-slice'
import css from '../../styles/views/taskTable.css'
import location from '../../../../img/icons/location.svg'

const { TaskContainer, 
  TaskContainerContent, 
  TaskContainerActions,
  TaskContainerVerticalDelimiter,
  TACA, TACC,
  TaskContainerShadow,
  TaskContainerInner } = css

const TaskTable: React.FC<ITaskTableProps> = (props: ITaskTableProps) => {

  const { 
    viewType = 'default',
    deal,
    taskInitDate,
    taskTitle,
    taskDeadline,
    taskExpertType,
    taskCustomer,
    taskExecutor,
    taskLocation,
    taskSpecializationTags,
    taskDescription,
    cardWidth,
    marbo,
    actions,
    actionsParams,
    taskId } = props

  const [ containerHeight, setContainerHeight ] = useState<string>('short')
  const [ showTaskDescriptionText, setShowTaskDescriptionText ] = useState<string>('Показать больше')
  const [ respondButtonText, setRespondButtonText ] = useState<string>('Откликнуться')
  const [ activatePreloader, setActivatePreloader ] = useState<boolean>(false)
  const [ tagsSpredLine, setTextSpredLine ] = useState<string>('')

  const [ CHANGE_TASK_STATUS_REQUEST_DEACTIVE, SET_CHANGE_TASK_STATUS_REQUEST_DEACTIVE ] = useState<boolean>(false)
  const [ CHANGE_TASK_STATUS_REQUEST_ACTIVE, SET_CHANGE_TASK_STATUS_REQUEST_ACTIVE ] = useState<boolean>(false)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const USERS_LIST = useAppSelector(state => state.userContentReducer.USERS_DATA)
  const ROLE_TYPE = useAppSelector(state => state.roleTypeReducer.activeRole)
  const USER_ID = useAppSelector(state => state.roleTypeReducer.roleData.userID)

  const delimiterColor = useAppSelector(state => state.theme.blue3)
  const taskStatusColor = useAppSelector(state => state.theme.blue1)
  const containerBackground = useAppSelector(state => state.theme.white)
  const indicatorColorOrange = useAppSelector(state => state.theme.yellow)
  const indicatorColorGreen = useAppSelector(state => state.theme.green)
  const indicatorColorBlue = useAppSelector(state => state.theme.blue2)
  const indicatorLabelColor = useAppSelector(state => state.theme.grey2)
  const specializationTagBackground = useAppSelector(state => state.theme.blue4)
  
  const blue1 = useAppSelector(state => state.theme.blue1)
  const blue2 = useAppSelector(state => state.theme.blue2)
  const blue4 = useAppSelector(state => state.theme.blue4)
  const grey = useAppSelector(state => state.theme.grey)
  const grey2 = useAppSelector(state => state.theme.grey2)
  const grey3 = useAppSelector(state => state.theme.grey3)
  const black = useAppSelector(state => state.theme.black)
  const green = useAppSelector(state => state.theme.green)
  const yellow = useAppSelector(state => state.theme.yellow)

  const parCSS: React.CSSProperties = { margin: '0px', lineHeight: '22px' }
  const spanCSS1: React.CSSProperties = { fontWeight: 'bold' }
  const spanCSS2: React.CSSProperties = {
    display: 'block',
    position: 'relative', 
    color: grey 
  }
  const iconLocationContainerCSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: '6px',
    marginBottom: '0px'
  }
  const iconLocationCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    height: '13.333px',
    marginRight: '8px'
  }
  const actionsDivContainerCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '100%',
  }
  const titleSpanCSS: React.CSSProperties = {
    color: blue1,
    fontSize: '40px',
    fontWeight: '200',
    display: 'block',
    position: 'absolute',
    left: '100%',
    top: '0%',
    marginTop: '-42px',
    marginLeft: '-68px'
  }

  const coastDelimeter = (param: string | undefined): string => {

    let enterString: string | undefined = param
    let enterStringLen: number = enterString ? enterString.length : 0
    let exitString: string = ''

    if ( enterString ) {
      switch(enterStringLen) {

        case 4:
          exitString = enterString[0] + ' ' + enterString.slice(1)
          break
        case 5:
          exitString = enterString.slice(0, 2) + ' ' + enterString.slice(2)
          break
        case 6:
          exitString = enterString.slice(0, 3) + ' ' + enterString.slice(3)
          break
        case 7:
          exitString = enterString[0] + ' ' + enterString.slice(1, 4) + ' ' + enterString.slice(4)
          break
        case 8:
          exitString = enterString.slice(0, 2) + ' ' + enterString.slice(2, 5) + ' ' + enterString.slice(5)
          break

      }
    }

    return exitString

  }

  function heightSelection() {
    setContainerHeight(prev => {
      if ( prev === 'short' ) {
        setShowTaskDescriptionText('Скрыть описание')
        return 'long'
      } else {
        setShowTaskDescriptionText('Показать больше')
        return 'short'
      } 
    })
  }

  function returnName() {

    let userName = 'undefined'

    USERS_LIST.listExecutors.forEach(item => {
      if ( item.clientId === taskExecutor ) {
        userName = item.name
      }
    })

    return userName

  }

  function changeStatusDeactive() {

    !false && dispatch(setUpdating(true)) 
    SET_CHANGE_TASK_STATUS_REQUEST_DEACTIVE(true)
    setTimeout(() => { 
      SET_CHANGE_TASK_STATUS_REQUEST_DEACTIVE(false)
    }, 1300)

  }
  function changeStatusActive() {

    false && setActivatePreloader(true)
    !false && dispatch(setUpdating(true))
    SET_CHANGE_TASK_STATUS_REQUEST_ACTIVE(true)
    setTimeout(() => { 
      SET_CHANGE_TASK_STATUS_REQUEST_ACTIVE(false)
      setActivatePreloader(false)
    }, 1300)

  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTextSpredLine((prev: string): any => {
        let value: string = ''

        // ------------------------------------------------------------------
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        prev === '' ? value = '.'
          : prev === '.' ? value = '..'
          : prev === '..' ? value = '...'
          // ----------------------------------------------------------------
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          : prev === '...' ? value = '' : null

        return value
      })
    }, 1300)
    return () => {
      clearInterval(timer)
    }
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { taskId && console.log(taskId) }, [])

  return (
    <React.Fragment>

      { CHANGE_TASK_STATUS_REQUEST_DEACTIVE && <RequestActionsComponent

        callbackAction={() => {
          // dispatch(selectShowTask(''))
          // dispatch(selectActualTask(''))
        }}
        requestData={{
          type: 'POST',
          urlstring: '/change-task-status',
          body: {
            taskId: actionsParams ? actionsParams[0] : '',
            status: 'TASK-DEACTIVE'
          }
        }}
      
      /> }

      { CHANGE_TASK_STATUS_REQUEST_ACTIVE && <RequestActionsComponent

        callbackAction={() => {
          // dispatch(selectShowTask(''))
          // dispatch(selectActualTask(''))
        }}
        requestData={{
          type: 'POST',
          urlstring: '/change-task-status',
          body: {
            taskId: actionsParams ? actionsParams[0] : '',
            status: 'TASK-ACTIVE'
          }
        }}
      
      /> }

      <TaskContainer 
        backgroundColor={containerBackground} 
        width={cardWidth}
        height={containerHeight}
        marginBottom={marbo}
      >
        <TaskContainerShadow/>
        <TaskContainerInner 
          backgroundColor={containerBackground} 
          width={"100%"}
          height={containerHeight}
        >
          <TaskContainerContent>
            <TACC.TaskInitDate color={grey2}>{ taskInitDate }</TACC.TaskInitDate>
            <TACC.TaskTitle color={black}>
              { taskTitle }
              <span style={titleSpanCSS}>BIM</span>
            </TACC.TaskTitle>
            <TACC.TextContentLine>

              <div>
                <span style={spanCSS1}>Сроки: </span>
                <span>{ taskDeadline }</span>
              </div>
              <div>
                <span style={spanCSS1}>Экспертиза: </span>
                <span>{ taskExpertType }</span>
              </div>

            </TACC.TextContentLine>
            <TACC.TextContentLine>
              <div>
                <span style={spanCSS1}>Заказчик: </span>
                <span>{ taskCustomer.slice(0, 30) + '...' }</span>
              </div>
            </TACC.TextContentLine>
            <TACC.TextContentLine>
              <div>
                <span style={spanCSS1}>Исполнитель: </span>
                <span>{ false ? returnName() : taskExecutor.slice(0, 30) + '...' }</span>
              </div>
            </TACC.TextContentLine>
            <TACC.TextContentLine>
              <div style={iconLocationContainerCSS}>
                <img
                  alt={""}
                  src={location}
                  style={iconLocationCSS}
                />
                <span style={spanCSS2}>{ taskLocation }</span>
              </div>
            </TACC.TextContentLine>
            <TACC.TextContentLine>
              <div style={iconLocationContainerCSS}>

                { taskSpecializationTags.map((item, index) => {

                  return <TACC.SpecializationTag 
                    style={{ marginTop: '0px', marginBottom: '10px' }} 
                    key={index} 
                    backgroundColor={specializationTagBackground}>
                      { item !== 'undefined' ? item : 'Загрузка специализации' + tagsSpredLine }
                    </TACC.SpecializationTag>

                })}

              </div>
            </TACC.TextContentLine>
            <TACC.TextContentLine>
              <div>
                <p style={parCSS}>
                  <i style={{ fontStyle: 'normal', fontWeight: 'bold' }}>Описание: </i>
                  {  containerHeight === 'short' ? taskDescription.slice(0, 180) + '...' : taskDescription }
                </p>
              </div>
            </TACC.TextContentLine>
            <TACC.TextContentLine>
              <div>
                <span 
                  onClick={heightSelection}
                  style={{ 
                    ...spanCSS2, 
                    textDecoration: 'underline',
                    cursor: 'pointer' 
                  }}
                >{ showTaskDescriptionText }</span>
              </div>
            </TACC.TextContentLine>
          </TaskContainerContent>
          <TaskContainerVerticalDelimiter backgroundColor={delimiterColor}/>
          <TaskContainerActions>
            <div style={actionsDivContainerCSS}>
              <TACA.TaskStatus>
                {(viewType === 'searching' || viewType === 'custSelfView' || viewType === 'execSelfView') && <TACA.TaskStatusLabel color={indicatorLabelColor}>
                  <TACA.TaskStatusIndicator background={indicatorColorOrange}/> 
                    Поиск исполнителей
                </TACA.TaskStatusLabel> }
                { viewType === 'work' && <TACA.TaskStatusLabel color={indicatorLabelColor}>
                  <TACA.TaskStatusIndicator background={indicatorColorGreen}/> 
                    В работе
                </TACA.TaskStatusLabel> }
                { viewType === 'complete' && <TACA.TaskStatusLabel color={indicatorLabelColor}>
                  <TACA.TaskStatusIndicator background={indicatorColorBlue}/> 
                    Выполнен
                </TACA.TaskStatusLabel> }
                { viewType === 'backside' && <TACA.TaskStatusLabel color={indicatorLabelColor}>
                  <TACA.TaskStatusIndicator background={indicatorLabelColor}/> 
                    Отменен
                </TACA.TaskStatusLabel> }
              </TACA.TaskStatus>
              { deal.coast && deal.coast.toString() !== 'Договорная' && 
              
                <TACA.TaskCoast color={taskStatusColor}>{ coastDelimeter(deal.coast.toString()) }₽</TACA.TaskCoast> 
                
              }
              { deal.coast && deal.coast.toString() === 'Договорная' && 
              
                <TACA.TaskCoast style={{ fontSize: '24px' }} color={taskStatusColor}>{ deal.coast } стоимость</TACA.TaskCoast> 
                
              }

              { deal.type === 'safe' ? <React.Fragment>
                { viewType !== 'complete' ? <React.Fragment>
                  <TACA.TaskSafeDeal color={indicatorLabelColor}>Безопасная сделка</TACA.TaskSafeDeal>
                  <TACA.SafeDealParameters backgroundColor={grey3}>
                    
                    <TACA.SafeDealParametersPrepaid backgroundColor={green}/>
                    <TACA.SafeDealParametersExpert backgroundColor={yellow}/>

                  </TACA.SafeDealParameters>
                  {  deal.prepaid && deal.prepaid.toString() !== 'Договорной' && 
                  
                    <TACA.TaskCoastString color={black} marginBottom={"4.4px"}>Аванс: { coastDelimeter(deal.prepaid.toString()) }₽</TACA.TaskCoastString>
                    
                  }
                  {  deal.prepaid && deal.prepaid.toString() === 'Договорной' && 
                  
                    <TACA.TaskCoastString color={black} marginBottom={"4.4px"}>Аванс: { deal.prepaid }</TACA.TaskCoastString>
                    
                  }
                  {  deal.expert && deal.expert.toString() !== 'Договорная' && 
                  
                    <TACA.TaskCoastString color={black} marginBottom={"28px"}>Экспертиза: { coastDelimeter(deal.expert.toString()) }₽</TACA.TaskCoastString>
                    
                  }
                  {  deal.expert && deal.expert.toString() === 'Договорная' && 
                  
                    <TACA.TaskCoastString color={black} marginBottom={"28px"}>Экспертиза: { deal.expert }</TACA.TaskCoastString>
                    
                  }
                </React.Fragment> : <React.Fragment>
                  <TACA.TaskSafeDeal color={indicatorLabelColor}>Безопасная сделка</TACA.TaskSafeDeal>
                  <TACA.SafeDealParameters backgroundColor={grey3}>
                  
                    <TACA.SafeDealParametersComplete backgroundColor={blue2}/>

                  </TACA.SafeDealParameters>
                  <TACA.TaskCoastString color={black} marginBottom={"4.4px"}>Аванс: { deal.prepaid }₽</TACA.TaskCoastString>
                  <TACA.TaskCoastString color={black} marginBottom={"28px"}>Экспертиза: { deal.expert }₽</TACA.TaskCoastString>
                </React.Fragment> }
              </React.Fragment> : <React.Fragment>
                <TACA.TaskSafeDeal color={indicatorLabelColor}>Простая сделка</TACA.TaskSafeDeal>
              </React.Fragment> }
            </div>
            
            <div style={actionsDivContainerCSS}>

              {(viewType === 'searching' || viewType === 'custSelfView' || viewType === 'execSelfView') && <ButtonComponent
                inner={"Открыть задание"} 
                type="CONTAINED_DEFAULT" 
                action={() => {
                  viewType === 'custSelfView' && navigate('/task-view/cu')
                  viewType === 'execSelfView' && navigate('/task-view/ex')
                  actions && actions[0] && actions[0](actionsParams && actionsParams[0])
                }}
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
                  backgroundColor: blue2,
                  fontSize: '12px',
                  height: '40px',
                  borderRadius: '6px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '12px'
                }}
              /> }

              { viewType === 'mainView' && <ButtonComponent
                inner={"Открыть задание"} 
                type="CONTAINED_DEFAULT" 
                action={() => {
                  viewType === 'mainView' && navigate('/task-review')
                  actions && actions[0](actionsParams && actionsParams[0])
                }}
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
                  backgroundColor: blue2,
                  fontSize: '12px',
                  height: '40px',
                  borderRadius: '6px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '12px'
                }}
              /> }

              {(viewType === 'work' || viewType === 'complete') && <ButtonComponent
                inner={"Открыть заказ"} 
                type="CONTAINED_DEFAULT" 
                action={() => {
                  ROLE_TYPE === 'CUSTOMER' && navigate('/order-view/cu')
                  ROLE_TYPE === 'EXECUTOR' && navigate('/order-view/ex')
                  actions && actions[0](actionsParams && actionsParams[0])
                }}
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
                  backgroundColor: blue2,
                  fontSize: '12px',
                  height: '40px',
                  borderRadius: '6px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '12px'
                }}
              /> }

              { viewType === 'backside' && <ButtonComponent
                inner={"Редактировать"} 
                type="CONTAINED_DEFAULT" 
                action={() => {
                  navigate(`/edit-task/${taskId}`)
                  taskId && dispatch(selectShowTask(taskId))
                  actions && actions[0] && actions[0](actionsParams && actionsParams[0])
                }}
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
                  backgroundColor: blue2,
                  fontSize: '12px',
                  height: '40px',
                  borderRadius: '6px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '12px'
                }}
              /> }

              {/* -------------------------------------- */}
              {/* правила отображения второй кнопки */}
              {/* -------------------------------------- */}

              {(viewType === 'mainView' || viewType === 'execSelfView') && <ButtonComponent
                inner={respondButtonText} 
                type={
                  (actionsParams && actionsParams[2] && actionsParams[2] === 'responded') 
                    ? "CONTAINED_DISABLED" : "CONTAINED_DEFAULT"}
                action={() => {

                  if ( ROLE_TYPE === 'EXECUTOR' ) {

                    let checkCount = 0

                    if ( actionsParams && actionsParams[1] ) {

                      if ( actionsParams[1].length > 0 ) {

                        actionsParams[1].forEach((item: any) => {

                          if ( item.executorID === USER_ID ) checkCount++

                        })

                      }

                    }

                    if ( checkCount === 0 ) {

                      dispatch(setTask(actionsParams && actionsParams[0]))
                      dispatch(setExecutor(USER_ID))
                      dispatch(setShowRCC('undefined'))
                      dispatch(setShow(true))
                      dispatch(setShowType("respondFromList"))

                      actions && actions[1](actionsParams && actionsParams[1])
                      console.log(actionsParams && actionsParams[0])

                    } else {

                      setRespondButtonText('Вы уже откликнулись')

                    }

                  } else if ( ROLE_TYPE === 'UNDEFINED' ) {

                    dispatch(setShow(true))
                    dispatch(setShowType('authLogin'))

                  }

                }}
                actionData={null}
                widthType={"%"}
                widthValue={100}
                children={""}
                childrenCss={{}}
                iconSrc={null}
                iconCss={undefined}
                muiIconSize={null}
                MuiIconChildren={EmailIcon}
                css={ ROLE_TYPE === 'EXECUTOR' ? {
                  backgroundColor: blue4,
                  color: grey,
                  fontSize: '12px',
                  height: '40px',
                  borderRadius: '6px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '16px'
                } : { display: 'none' }}
              /> }
              
              { viewType === 'custSelfView' && 

                <React.Fragment>
                  <ButtonComponent
                    inner={"Снять задание"} 
                    type="CONTAINED_DEFAULT"
                    action={() => {
                      changeStatusDeactive()
                    }}
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
                      backgroundColor: blue4,
                      color: grey,
                      fontSize: '12px',
                      height: '40px',
                      borderRadius: '6px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginBottom: '16px'
                    }}
                  /> 
                </React.Fragment> }

              { viewType === 'backside' && 

              <React.Fragment>
                { activatePreloader === false ? <ButtonComponent
                  inner={"Разместить"} 
                  type="CONTAINED_DEFAULT"
                  action={() => {
                    changeStatusActive()
                  }}
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
                    backgroundColor: blue4,
                    color: grey,
                    fontSize: '12px',
                    height: '40px',
                    borderRadius: '6px',
                    position: 'relative',
                    boxSizing: 'border-box',
                    marginBottom: '16px'
                  }}
                /> : <ButtonComponent
                  inner={""} 
                  type="LOADING_BUTTON"
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
                    backgroundColor: blue4,
                    color: grey,
                    fontSize: '12px',
                    height: '40px',
                    borderRadius: '6px',
                    position: 'relative',
                    boxSizing: 'border-box',
                    marginBottom: '16px'
                  }}
                /> }
              </React.Fragment> }
            </div>

          </TaskContainerActions>
        </TaskContainerInner>
      </TaskContainer>
    </React.Fragment>
  )

}

export default TaskTable