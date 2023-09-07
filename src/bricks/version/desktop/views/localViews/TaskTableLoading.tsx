import React, { useState, useEffect } from 'react'
import { useAppSelector } from '../../../../store/hooks'
import EmailIcon from '@mui/icons-material/Email'
import ButtonComponent from '../../comps/button/Button'
import RequestActionsComponent from '../../services/request.service'
import { ITaskTableProps } from '../../../../models-ts/views/task-table-models'
import css from '../../styles/views/taskTable.css'

const { TaskContainer, 
  TaskContainerContent, 
  TaskContainerActions,
  TaskContainerVerticalDelimiter,
  TACA, TACC,
  TaskContainerShadow,
  TaskContainerInner } = css

const TaskTableLoading: React.FC<ITaskTableProps> = (props: ITaskTableProps) => {

  const { 
    viewType = 'default',
    deal,
    taskTitle,
    taskSpecializationTags,
    cardWidth,
    marbo,
    actionsParams,
    taskId } = props

  const [ containerHeight, ] = useState<string>('short')
  const [ showTaskDescriptionText, ] = useState<string>('Показать больше')
  const [ tagsSpredLine, setTextSpredLine ] = useState<string>('')

  const [ CHANGE_TASK_STATUS_REQUEST_DEACTIVE, ] = useState<boolean>(false)
  const [ CHANGE_TASK_STATUS_REQUEST_ACTIVE, ] = useState<boolean>(false)

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
  const grey = useAppSelector(state => state.theme.grey)
  const grey2 = useAppSelector(state => state.theme.grey2)
  const grey3 = useAppSelector(state => state.theme.grey3)
  const black = useAppSelector(state => state.theme.black)
  const green = useAppSelector(state => state.theme.green)
  const yellow = useAppSelector(state => state.theme.yellow)

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

        callbackAction={() => {}}
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
            <TACC.TaskInitDate color={grey2}>{ "Загрузка данных - пожалуйста, подождите" }</TACC.TaskInitDate>
            <TACC.TaskTitle
              style={{
                height: '40px',
                backgroundColor: 'gray',
                borderRadius: '4px',
              }} 
              color={'transparent'}
            >
              { taskTitle }
              <span style={{ ...titleSpanCSS, opacity: 0 }}>BIM</span>
            </TACC.TaskTitle>
            <TACC.TextContentLine>
              <span style={spanCSS1}>Сроки: </span>
              <span
                style={{
                  display: 'block',
                  position: 'relative',
                  height: '40px',
                  width: '200px',
                  backgroundColor: 'gray',
                  borderRadius: '4px',
                  opacity: 0.45
                }}
              />
            </TACC.TextContentLine>
            <TACC.TextContentLine>
              <span style={spanCSS1}>Заказчик: </span>
              <span
                style={{
                  display: 'block',
                  position: 'relative',
                  height: '40px',
                  width: '200px',
                  backgroundColor: 'gray',
                  borderRadius: '4px',
                  opacity: 0.45
                }}
              />
            </TACC.TextContentLine>
            <TACC.TextContentLine>
              <span style={spanCSS1}>Исполнитель: </span>
              <span
                style={{
                  display: 'block',
                  position: 'relative',
                  height: '40px',
                  width: '200px',
                  backgroundColor: 'gray',
                  borderRadius: '4px',
                  opacity: 0.45
                }}
              />
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

                { taskSpecializationTags.length === 0 && <TACC.SpecializationTag 
                  style={{ marginTop: '8px', marginBottom: '14px', color: 'transparent', width: '160px' }} 
                  backgroundColor={specializationTagBackground}>
                    { "Все специализации" }
                  </TACC.SpecializationTag> 
                }
                { taskSpecializationTags.length === 0 && <TACC.SpecializationTag 
                  style={{ marginTop: '8px', marginBottom: '14px', color: 'transparent', width: '160px' }} 
                  backgroundColor={specializationTagBackground}>
                    { "Все специализации" }
                  </TACC.SpecializationTag> 
                }

              </div>
            </TACC.TextContentLine>
            <TACC.TextContentLine>
              <span
                style={{
                  display: 'block',
                  position: 'relative',
                  height: '40px',
                  width: '100%',
                  backgroundColor: 'gray',
                  borderRadius: '4px',
                  opacity: 0.45
                }}
              />
            </TACC.TextContentLine>
            <TACC.TextContentLine>
              <div>
                <span 
                  onClick={() => {}}
                  style={{ 
                    ...spanCSS2, 
                    textDecoration: 'underline',
                    opacity: 0.6,
                    cursor: 'pointer',
                    marginTop: '14px'
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

              <TACA.TaskCoast color={taskStatusColor}>{ "1 000 000" }₽</TACA.TaskCoast>

              { deal.type === 'safe' ? <React.Fragment>
                { viewType !== 'complete' ? <React.Fragment>
                  <TACA.TaskSafeDeal color={indicatorLabelColor}>Безопасная сделка</TACA.TaskSafeDeal>
                  <TACA.SafeDealParameters backgroundColor={grey3}>
                    
                    <TACA.SafeDealParametersPrepaid backgroundColor={green}/>
                    <TACA.SafeDealParametersExpert backgroundColor={yellow}/>

                  </TACA.SafeDealParameters>
                  <TACA.TaskCoastString color={black} marginBottom={"4.4px"}>Аванс сумма</TACA.TaskCoastString>
                  <TACA.TaskCoastString color={black} marginBottom={"28px"}>Экспертиза сумма</TACA.TaskCoastString>
                </React.Fragment> : <React.Fragment>
                  <TACA.TaskSafeDeal color={indicatorLabelColor}>Безопасная сделка</TACA.TaskSafeDeal>
                  <TACA.SafeDealParameters backgroundColor={grey3}>
                  
                    <TACA.SafeDealParametersComplete backgroundColor={blue2}/>

                  </TACA.SafeDealParameters>
                  {  deal.prepaid && deal.prepaid.toString() !== 'Договорной' && 
                  
                    <TACA.TaskCoastString color={black} marginBottom={"4.4px"}>Аванс: { "100000" }₽</TACA.TaskCoastString>
                    
                  }
                  {  deal.prepaid && deal.prepaid.toString() === 'Договорной' && 
                  
                    <TACA.TaskCoastString color={black} marginBottom={"4.4px"}>Аванс: { deal.prepaid }</TACA.TaskCoastString>
                    
                  }
                  {  deal.expert && deal.expert.toString() !== 'Договорная' && 
                  
                    <TACA.TaskCoastString color={black} marginBottom={"28px"}>Экспертиза: { "100000" }₽</TACA.TaskCoastString>
                    
                  }
                  {  deal.expert && deal.expert.toString() === 'Договорная' && 
                  
                    <TACA.TaskCoastString color={black} marginBottom={"28px"}>Экспертиза: { deal.expert }</TACA.TaskCoastString>
                    
                  }
                  { !deal.expert && <span style={{ display: 'block', height: '22px', width: '100px' }}/> }
                </React.Fragment> }
              </React.Fragment> : <React.Fragment>
                <TACA.TaskSafeDeal color={indicatorLabelColor}>Простая сделка</TACA.TaskSafeDeal>
              </React.Fragment> }
            </div>
            
            <div style={actionsDivContainerCSS}>

              <ButtonComponent
                inner={"Открыть задание"} 
                type="CONTAINED_DISABLED" 
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
                  backgroundColor: blue2,
                  fontSize: '12px',
                  height: '40px',
                  borderRadius: '6px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '12px',
                  color: 'transparent',
                }}
              />

            </div>

          </TaskContainerActions>
        </TaskContainerInner>
      </TaskContainer>
    </React.Fragment>
  )

}

export default TaskTableLoading