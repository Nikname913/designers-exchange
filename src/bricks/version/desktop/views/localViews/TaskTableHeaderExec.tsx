import React, { useState } from 'react'
import { useAppSelector } from '../../../../store/hooks'
import ButtonComponent from '../../comps/button/Button'
import SelectField from '../../comps/select/SelectFieldPercentWidth'
import css from '../../styles/views/showTaskTable.css'
import { ITaskTableProps } from '../../../../models-ts/views/task-table-models'
import { CSSProperties } from 'styled-components'
import EmailIcon from '@mui/icons-material/Email'

const { TaskContainer, 
  TaskContainerShadow, 
  TaskContainerInner, 
  TaskContainerActions,
  TaskContainerContent,
  TACC, TACA } = css

const TaskTableHeader: React.FC<ITaskTableProps> = (props: ITaskTableProps) => {

  const { 
    dealStatus = 'searching', 
    deal,
    taskTitle,
    taskDeadline,
    taskExpertType,
    taskSpecializationTags,
    cardWidth,
    marbo,
    actions,
    actionsParams } = props

  const [ containerHeight, ] = useState('auto')
  const containerBackground = useAppSelector(state => state.theme.white)
  const tagColor = useAppSelector(state => state.theme.blue4)
  const greyColor = useAppSelector(state => state.theme.grey)
  const taskStatusColor = useAppSelector(state => state.theme.blue1)
  const indicatorColorOrange = useAppSelector(state => state.theme.yellow)
  const indicatorLabelColor = useAppSelector(state => state.theme.grey2)
  const ROLE = useAppSelector(state => state.roleTypeReducer.activeRole)

  const blue1 = useAppSelector(state => state.theme.blue1)
  const blue2 = useAppSelector(state => state.theme.blue2)
  const whiteColor = useAppSelector(state => state.theme.white)

  const divCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent:'flex-start',
    position: 'relative'
  }
  const divRowCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    position: 'relative',
  }
  const titleSpanCSS: CSSProperties = { fontWeight: 'bold', marginBottom: '15px' }
  const titleSpan2CSS: CSSProperties = { color: greyColor, marginRight: '20px' }
  const actionsDivContainerCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '100%',
  }
  const bimTagCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    fontSize: '40px',
    color: blue1,
    margin: 0,
    marginBottom: '12px',
    marginLeft: '20px'
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
            <TACC.TaskContainerTitle>{ taskTitle }</TACC.TaskContainerTitle>
            <TACC.TextContentLine style={{ justifyContent: 'flex-start' }}>
              { taskSpecializationTags.map((item: string, index: number): React.ReactElement => {

                return <TACC.SpecializationTag backgroundColor={tagColor}>{ item }</TACC.SpecializationTag>

              })}
              
              <span style={bimTagCSS}>BIM</span>

            </TACC.TextContentLine>
            <TACC.TextContentLine style={{ marginBottom: '0px' }}>
              <div style={divCSS}>
                <span style={titleSpanCSS}>Сроки:</span>
                <span>{ taskDeadline }</span>
              </div>
              <div style={divCSS}>
                <span style={titleSpanCSS}>Аванс:</span>
                <span>через 10 дней</span>
              </div>
              <div style={divCSS}>
                <span style={titleSpanCSS}>Экспертиза: <i style={{ fontStyle: 'normal', fontWeight: 'normal' }}>{ taskExpertType }</i></span>
                <span>до 20.02.2023</span>
              </div>
              <div>
                <div style={{ ...divRowCSS, marginBottom: '9px' }}>
                  <span style={titleSpan2CSS}>Аванс</span>
                  <TACC.CoastSpan>{ deal.prepaid }₽</TACC.CoastSpan>
                </div>
                <div style={divRowCSS}>
                  <span style={titleSpan2CSS}>Экспертиза</span>
                  <TACC.CoastSpan>{ deal.expert }₽</TACC.CoastSpan>
                </div>
              </div>
            </TACC.TextContentLine>
          </TaskContainerContent>
          <TaskContainerActions>
            <div style={actionsDivContainerCSS}>
              <TACA.TaskStatus>
                { dealStatus === 'searching' && <TACA.TaskStatusLabel color={indicatorLabelColor}>
                  <TACA.TaskStatusIndicator background={indicatorColorOrange}/> 
                    Поиск исполнителей
                </TACA.TaskStatusLabel> }
              </TACA.TaskStatus>
              <TACA.TaskCoast color={taskStatusColor}>{ deal.coast }₽</TACA.TaskCoast>

              { deal.type === 'safe' ? <React.Fragment>
                { dealStatus !== 'complete' ? <React.Fragment>
                  <TACA.TaskSafeDeal color={indicatorLabelColor}>Безопасная сделка</TACA.TaskSafeDeal>
                </React.Fragment> : <React.Fragment>
                  <TACA.TaskSafeDeal color={indicatorLabelColor}>Безопасная сделка</TACA.TaskSafeDeal>
                </React.Fragment> }
              </React.Fragment> : <React.Fragment>
                <TACA.TaskSafeDeal color={indicatorLabelColor}>Простая сделка</TACA.TaskSafeDeal>
              </React.Fragment> }
            </div>
            
            <div style={actionsDivContainerCSS}>
              { ROLE === 'EXECUTOR' ? <ButtonComponent
                inner={"Пригласить"} 
                type="CONTAINED_DEFAULT"
                action={() => {
                  actions && actions[0](
                    actionsParams && actionsParams[0]
                  )
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
                  color: whiteColor,
                  fontSize: '12px',
                  height: '40px',
                  borderRadius: '6px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '16px'
                }}
              /> : <SelectField 
                placeholder={"Действие"}
                params={{ width: 100, height: 50 }}
                data={[
                  { value: '1', label: 'Снять задание' },
                  { value: '2', label: 'Редактировать' },
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
              /> }
            </div>
          </TaskContainerActions>
        </TaskContainerInner>
      </TaskContainer>
    </React.Fragment>
  )

}

export default TaskTableHeader