import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { useNavigate } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email'
import ButtonComponent from '../../comps/button/Button'
import { ITaskTableProps } from '../../../../models-ts/views/task-table-models'
import { setShow, setShowType } from '../../../../store/slices/fos-slice'
import { setShow as setShowRCC } from '../../../../store/slices/right-content-slice'
import { setTask, setExecutor } from '../../../../store/slices/respond-slice'
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
    actionsParams } = props

  const [ containerHeight, setContainerHeight ] = useState('short')
  const [ showTaskDescriptionText, setShowTaskDescriptionText ] = useState('Показать больше')
  const [ taskDescriptionLong, ] = useState(taskDescription)
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
    marginTop: '-12px',
    marginLeft: '-68px'
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
      if ( item.id === taskExecutor ) {
        userName = item.name
      }
    })

    return userName

  }

  return (
    <React.Fragment>
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
                <span>{ taskCustomer }</span>
              </div>
            </TACC.TextContentLine>
            <TACC.TextContentLine>
              <div>
                <span style={spanCSS1}>Исполнитель: </span>
                <span>{ false ? returnName() : taskExecutor }</span>
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
                      { item }
                    </TACC.SpecializationTag>

                })}

              </div>
            </TACC.TextContentLine>
            <TACC.TextContentLine>
              <div>
                <p style={parCSS}>
                  <i style={{ fontStyle: 'normal', fontWeight: 'bold' }}>Описание: </i>
                  {  containerHeight === 'short' ? taskDescription : taskDescriptionLong }
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
              <TACA.TaskCoast color={taskStatusColor}>{ deal.coast ? deal.coast : '60000' }₽</TACA.TaskCoast>

              { deal.type === 'safe' ? <React.Fragment>
                { viewType !== 'complete' ? <React.Fragment>
                  <TACA.TaskSafeDeal color={indicatorLabelColor}>Безопасная сделка</TACA.TaskSafeDeal>
                  <TACA.SafeDealParameters backgroundColor={grey3}>
                    
                    <TACA.SafeDealParametersPrepaid backgroundColor={green}/>
                    <TACA.SafeDealParametersExpert backgroundColor={yellow}/>

                  </TACA.SafeDealParameters>
                  <TACA.TaskCoastString color={black} marginBottom={"4.4px"}>Аванс: { deal.prepaid }₽</TACA.TaskCoastString>
                  <TACA.TaskCoastString color={black} marginBottom={"28px"}>Экспертиза: { deal.expert }₽</TACA.TaskCoastString>
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
                  viewType === 'custSelfView' && navigate('/zadanie/cu')
                  viewType === 'execSelfView' && navigate('/zadanie/ex')
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
                  false && navigate('/zadanie')
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
                  false && navigate('/zadanie')
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

              {/* -------------------------------------- */}
              {/* правила отображения второй кнопки */}
              {/* -------------------------------------- */}

              { viewType === 'searching' && <ButtonComponent
                inner={"Откликнуться"} 
                type="CONTAINED_DEFAULT"
                action={() => {

                  if ( ROLE_TYPE === 'EXECUTOR' ) {

                    dispatch(setTask(actionsParams && actionsParams[0]))
                    dispatch(setExecutor(USER_ID))
                    dispatch(setShowRCC('undefined'))
                    dispatch(setShow(true))
                    dispatch(setShowType("respondFromList"))

                    actions && actions[1](actionsParams && actionsParams[1])
                    console.log(actionsParams && actionsParams[0])

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

              { viewType === 'custSelfView' && <ButtonComponent
                inner={"Снять задание"} 
                type="CONTAINED_DEFAULT"
                action={() => {
                  false && navigate('/zadanie')
                  actions && actions[1](actionsParams && actionsParams[1])
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
              /> }

              { viewType === 'backside' && <ButtonComponent
                inner={"Разместить"} 
                type="CONTAINED_DEFAULT"
                action={() => {
                  false && navigate('/zadanie')
                  actions && actions[1](actionsParams && actionsParams[1])
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
              /> }
            </div>

          </TaskContainerActions>
        </TaskContainerInner>
      </TaskContainer>
    </React.Fragment>
  )

}

export default TaskTable