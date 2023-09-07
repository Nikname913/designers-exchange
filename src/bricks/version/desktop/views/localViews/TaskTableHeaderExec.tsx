import React, { useState, useEffect } from 'react'
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
    taskExpertDate,
    taskSpecializationTags,
    cardWidth,
    marbo,
    actions,
    actionsParams } = props

  const [ containerHeight, ] = useState('auto')
  const [ tagsSpredLine, setTextSpredLine ] = useState<string>('')

  const containerBackground = useAppSelector(state => state.theme.white)
  const tagColor = useAppSelector(state => state.theme.blue4)
  const greyColor = useAppSelector(state => state.theme.grey)
  const taskStatusColor = useAppSelector(state => state.theme.blue1)
  const indicatorColorGreen = useAppSelector(state => state.theme.green)
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
    fontSize: '30px',
    color: blue1,
    margin: 0,
    marginBottom: '10px',
    marginLeft: '20px'
  }

  const coastDelimeter = (param: string | undefined): string => {

    let enterString: string | undefined
    let exitString: string = ''

    if ( param && param?.indexOf('*') < 0 ) {

      enterString = param
      let enterStringLen: number = enterString ? enterString.length : 0

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

    } else if ( param && param?.indexOf('*') >= 0 ) {

      enterString = param.split('*')[0]
      let enterStringLen: number = enterString ? enterString.length : 0

      if ( enterString ) {
        switch(enterStringLen) {

          case 4:
            exitString = enterString[0] + ' ' + enterString.slice(1) + '*'
            break
          case 5:
            exitString = enterString.slice(0, 2) + ' ' + enterString.slice(2) + '*'
            break
          case 6:
            exitString = enterString.slice(0, 3) + ' ' + enterString.slice(3) + '*'
            break
          case 7:
            exitString = enterString[0] + ' ' + enterString.slice(1, 4) + ' ' + enterString.slice(4) + '*'
            break
          case 8:
            exitString = enterString.slice(0, 2) + ' ' + enterString.slice(2, 5) + ' ' + enterString.slice(5) + '*'
            break

        }
      }

    }

    return exitString

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
            <TACC.TaskContainerTitle style={{ fontSize: '30px', lineHeight: '42px', marginBottom: '32px' }}>{ taskTitle }</TACC.TaskContainerTitle>
            <TACC.TextContentLine style={{ justifyContent: 'flex-start', flexWrap: 'wrap' }}>
              { taskSpecializationTags.map((item: string, index: number): React.ReactElement => {

                return (
                  <TACC.SpecializationTag 
                    backgroundColor={tagColor}
                    style={{ width: '', fontSize: '13px', marginBottom: '10px', marginTop: '0px' }}
                  >
                    { item !== 'undefined' ? item : 'Специализация' + tagsSpredLine }
                  </TACC.SpecializationTag>
                )

              })}
              { taskSpecializationTags.length === 0 && <TACC.SpecializationTag 
                    backgroundColor={tagColor}
                    style={{ width: '', fontSize: '13px', marginBottom: '10px', marginTop: '0px' }}
                  >
                    {"Конкретные специализации не указаны"}
                  </TACC.SpecializationTag> }

              <span style={bimTagCSS}>BIM</span>

            </TACC.TextContentLine>
            <TACC.TextContentLine style={{ marginBottom: '0px', marginTop: '13px' }}>
              <div style={divCSS}>
                <span style={titleSpanCSS}>Сроки:</span>
                <span>{ 
                  'С ' + taskDeadline.split('-')[0] + '-' +
                  taskDeadline.split('-')[1] + '-' +
                  taskDeadline.split('-')[2] + ' По ' +
                  taskDeadline.split('-')[3] + '-' +
                  taskDeadline.split('-')[4] + '-' + 
                  taskDeadline.split('-')[5] 
                }</span>
              </div>
              <div style={divCSS}>
                <span style={titleSpanCSS}>Дата аванса:</span>
                <span>{"Временно скрыто"}</span>
              </div>
              <div style={divCSS}>
                { deal.expert &&<React.Fragment>
                  <span style={titleSpanCSS}>Экспертиза: <i style={{ fontStyle: 'normal', fontWeight: 'normal' }}>{ taskExpertType }</i></span>
                  <span>{ taskExpertDate ? 'Дата экспертизы: ' + taskExpertDate : 'Дата экспертизы' + tagsSpredLine }</span>
                </React.Fragment> }
                { !deal.expert &&<React.Fragment>
                  <span style={titleSpanCSS}>Сдача проекта</span>
                  <span>{"без экспертизы"}</span>
                </React.Fragment> }
              </div>
              <div>
                <div style={{ ...divRowCSS, marginBottom: '9px' }}>
                  <span style={titleSpan2CSS}>Аванс</span>
                  { ( deal.prepaid && deal.prepaid?.toString() !== 'Договорной' && coastDelimeter(deal.prepaid?.toString()) !== '' ) && <TACC.CoastSpan>{ coastDelimeter(deal.prepaid?.toString()) }₽</TACC.CoastSpan> }
                  { deal.prepaid && deal.prepaid?.toString() === 'Договорной' && <TACC.CoastSpan style={{ fontSize: '20px' }}>{ deal.prepaid }</TACC.CoastSpan> }
                  { coastDelimeter(deal.prepaid?.toString()) === '' && <TACC.CoastSpan style={{ fontSize: '18px' }}>{"Отсутствует"}</TACC.CoastSpan> }
                </div>
                <div style={divRowCSS}>
                  { deal.expert && <span style={titleSpan2CSS}>Экспертиза</span> } 
                  { !deal.expert && <span style={titleSpan2CSS}>Расчет</span> }
                  { deal.expert && deal.expert?.toString() !== 'Договорная' && <TACC.CoastSpan>{ coastDelimeter(deal.expert?.toString()) }₽</TACC.CoastSpan> }
                  { deal.expert && deal.expert?.toString() === 'Договорная' && <TACC.CoastSpan style={{ fontSize: '20px' }}>{ deal.expert }</TACC.CoastSpan> }
                  { ( !deal.expert && deal.coast && deal.prepaid ) && <TACC.CoastSpan style={{ fontSize: '20px' }}>
                    
                    { coastDelimeter(( deal.coast - deal.prepaid ).toString()) }₽
                    
                  </TACC.CoastSpan> }
                </div>
              </div>
            </TACC.TextContentLine>
          </TaskContainerContent>
          <TaskContainerActions>
            <div style={actionsDivContainerCSS}>
              <TACA.TaskStatus>
                { dealStatus === 'work' && <TACA.TaskStatusLabel color={indicatorLabelColor}>
                  <TACA.TaskStatusIndicator background={indicatorColorGreen}/> 
                    В работе
                </TACA.TaskStatusLabel> }
              </TACA.TaskStatus>
              { deal.coast?.toString() !== 'Договорная' && <TACA.TaskCoast color={taskStatusColor}>{ coastDelimeter(deal.coast?.toString()) }₽</TACA.TaskCoast> }
              { deal.coast?.toString() === 'Договорная' && <TACA.TaskCoast color={taskStatusColor}>{ deal.coast }</TACA.TaskCoast> }

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