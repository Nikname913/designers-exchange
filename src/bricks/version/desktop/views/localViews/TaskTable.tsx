import React, { useState } from 'react'
import { useAppSelector } from '../../../../store/hooks'
import { useNavigate } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email'
import ButtonComponent from '../../comps/button/Button'
import { ITaskTableProps } from '../../../../models-ts/views/task-table-models'
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
    dealStatus = 'searching', 
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
    marbo } = props

  const [ containerHeight, setContainerHeight ] = useState('400px')
  const [ showTaskDescriptionText, setShowTaskDescriptionText ] = useState('Показать больше')
  const navigate = useNavigate()

  const delimiterColor = useAppSelector(state => state.theme.blue3)
  const taskStatusColor = useAppSelector(state => state.theme.blue1)
  const containerBackground = useAppSelector(state => state.theme.white)
  const indicatorColorOrange = useAppSelector(state => state.theme.yellow)
  const indicatorColorGreen = useAppSelector(state => state.theme.green)
  const indicatorColorBlue = useAppSelector(state => state.theme.blue2)
  const indicatorLabelColor = useAppSelector(state => state.theme.grey2)
  const specializationTagBackground = useAppSelector(state => state.theme.blue4)
  
  const blue2 = useAppSelector(state => state.theme.blue2)
  const blue4 = useAppSelector(state => state.theme.blue4)
  const grey = useAppSelector(state => state.theme.grey)
  const grey2 = useAppSelector(state => state.theme.grey2)
  const grey3 = useAppSelector(state => state.theme.grey3)
  const black = useAppSelector(state => state.theme.black)
  const green = useAppSelector(state => state.theme.green)
  const yellow = useAppSelector(state => state.theme.yellow)

  const parCSS: React.CSSProperties = { margin: '0px' }
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

  function heightSelection() {
    setContainerHeight(prev => {
      if ( prev === '400px' ) {
        setShowTaskDescriptionText('Скрыть описание')
        return '500px'
      } else {
        setShowTaskDescriptionText('Показать больше')
        return '400px'
      } 
    })
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
            <TACC.TaskTitle color={black}>{ taskTitle }</TACC.TaskTitle>
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
                <span>{ taskExecutor }</span>
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

                  return <TACC.SpecializationTag key={index} backgroundColor={specializationTagBackground}>
                          { item }
                        </TACC.SpecializationTag>

                })}

              </div>
            </TACC.TextContentLine>
            <TACC.TextContentLine>
              <div>
                <p style={parCSS}>
                  <i style={{ fontStyle: 'normal', fontWeight: 'bold' }}>Описание: </i>
                  { taskDescription }
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
                { dealStatus === 'searching' && <TACA.TaskStatusLabel color={indicatorLabelColor}>
                  <TACA.TaskStatusIndicator background={indicatorColorOrange}/> 
                    Поиск исполнителей
                </TACA.TaskStatusLabel> }
                { dealStatus === 'work' && <TACA.TaskStatusLabel color={indicatorLabelColor}>
                  <TACA.TaskStatusIndicator background={indicatorColorGreen}/> 
                    В работе
                </TACA.TaskStatusLabel> }
                { dealStatus === 'complete' && <TACA.TaskStatusLabel color={indicatorLabelColor}>
                  <TACA.TaskStatusIndicator background={indicatorColorBlue}/> 
                    Выполнен
                </TACA.TaskStatusLabel> }
              </TACA.TaskStatus>
              <TACA.TaskCoast color={taskStatusColor}>60 000₽</TACA.TaskCoast>

              { deal.type === 'safe' ? <React.Fragment>
                { dealStatus !== 'complete' ? <React.Fragment>
                  <TACA.TaskSafeDeal color={indicatorLabelColor}>Безопасная сделка</TACA.TaskSafeDeal>
                  <TACA.SafeDealParameters backgroundColor={grey3}>
                    
                    <TACA.SafeDealParametersPrepaid backgroundColor={green}/>
                    <TACA.SafeDealParametersExpert backgroundColor={yellow}/>

                  </TACA.SafeDealParameters>
                  <TACA.TaskCoastString color={black} marginBottom={"4.4px"}>Аванс: 30 000₽</TACA.TaskCoastString>
                  <TACA.TaskCoastString color={black} marginBottom={"28px"}>Экспертиза: 74 000₽</TACA.TaskCoastString>
                </React.Fragment> : <React.Fragment>
                  <TACA.TaskSafeDeal color={indicatorLabelColor}>Безопасная сделка</TACA.TaskSafeDeal>
                  <TACA.SafeDealParameters backgroundColor={grey3}>
                  
                    <TACA.SafeDealParametersComplete backgroundColor={blue2}/>

                  </TACA.SafeDealParameters>
                  <TACA.TaskCoastString color={black} marginBottom={"4.4px"}>Аванс: 30 000₽</TACA.TaskCoastString>
                  <TACA.TaskCoastString color={black} marginBottom={"28px"}>Экспертиза: 74 000₽</TACA.TaskCoastString>
                </React.Fragment> }
              </React.Fragment> : <React.Fragment>
                <TACA.TaskSafeDeal color={indicatorLabelColor}>Простая сделка</TACA.TaskSafeDeal>
              </React.Fragment> }
            </div>
            
            <div style={actionsDivContainerCSS}>
              { true && <ButtonComponent
                inner={"Открыть задание"} 
                type="CONTAINED_DEFAULT" 
                action={() => navigate('/zadanie')}
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
              { false && <ButtonComponent
                inner={"Открыть заказ"} 
                type="CONTAINED_DEFAULT" 
                action={() => navigate('/zadanie')}
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
              { dealStatus !== 'complete' && <ButtonComponent
                inner={"Откликнуться"} 
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