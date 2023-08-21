import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { useNavigate } from 'react-router-dom'
import ButtonComponent from '../../comps/button/Button'
import RequestActionsComponent from '../../services/request.service'
import SelectField from '../../comps/select/SelectFieldPercentWidth'
import css from '../../styles/views/showTaskTable.css'
import { ITaskTableProps } from '../../../../models-ts/views/task-table-models'
import { setShow, setShowType } from '../../../../store/slices/fos-slice'
import { setShow as setShowRCC } from '../../../../store/slices/right-content-slice'
import { setTask, setExecutor } from '../../../../store/slices/respond-slice'
import { setUpdating } from '../../../../store/slices/data-update-slice'
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
  const [ respondButtonText, setRespondButtonText ] = useState('Откликнуться')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [ CHANGE_TASK_STATUS_REQUEST_DEACTIVE, SET_CHANGE_TASK_STATUS_REQUEST_DEACTIVE ] = useState<boolean>(false)
  const [ tagsSpredLine, setTextSpredLine ] = useState<string>('')

  const containerBackground = useAppSelector(state => state.theme.white)
  const tagColor = useAppSelector(state => state.theme.blue4)
  const greyColor = useAppSelector(state => state.theme.grey)
  const taskStatusColor = useAppSelector(state => state.theme.blue1)
  const indicatorColorOrange = useAppSelector(state => state.theme.yellow)
  const indicatorLabelColor = useAppSelector(state => state.theme.grey2)

  const ROLE_TYPE = useAppSelector(state => state.roleTypeReducer.activeRole)
  const USER_ID = useAppSelector(state => state.roleTypeReducer.roleData.userID)
  const TASK_ACTUAL_ONE = useAppSelector(state => state.taskContentReducer.TASKS_DATA.actualOne)
  const TASK_SHOW_ONE = useAppSelector(state => state.taskContentReducer.TASKS_DATA.showOne)

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

  const taskActions = (param: any) => {
    
    param === 'Редактировать' && navigate('/create-new-task')
    
    if ( param === 'Снять задание' ) {
 
      SET_CHANGE_TASK_STATUS_REQUEST_DEACTIVE(true)
      setTimeout(() => { 
        SET_CHANGE_TASK_STATUS_REQUEST_DEACTIVE(false)
      }, 1300)

    }

  }

  useEffect(() => {

    !false && console.log(TASK_ACTUAL_ONE)
    !false && console.log(TASK_SHOW_ONE) 

  }, [ TASK_ACTUAL_ONE, TASK_SHOW_ONE ])
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

      { CHANGE_TASK_STATUS_REQUEST_DEACTIVE && <RequestActionsComponent

        callbackAction={() => {
          dispatch(setUpdating(true))
        }}
        requestData={{
          type: 'POST',
          urlstring: '/change-task-status',
          body: {
            taskId: TASK_ACTUAL_ONE ? TASK_SHOW_ONE : TASK_SHOW_ONE,
            status: 'TASK-DEACTIVE'
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
            <TACC.TaskContainerTitle style={{ fontSize: '30px', lineHeight: '42px' }}>{ taskTitle }</TACC.TaskContainerTitle>
            <TACC.TextContentLine style={{ justifyContent: 'flex-start' }}>
              { taskSpecializationTags.map((item: string, index: number): React.ReactElement => {

                return (
                  <TACC.SpecializationTag 
                    backgroundColor={tagColor}
                    style={{ width: '', fontSize: '13px' }}
                  >
                    { item !== 'undefined' ? item : 'Специализация' + tagsSpredLine }
                  </TACC.SpecializationTag>
                )

              })}
              { taskSpecializationTags.length === 0 && <TACC.SpecializationTag 
                    backgroundColor={tagColor}
                    style={{ width: '', fontSize: '13px' }}
                  >
                    {"Конкретные специализации не указаны"}
                  </TACC.SpecializationTag> }

              <span style={bimTagCSS}>BIM</span>

            </TACC.TextContentLine>
            <TACC.TextContentLine style={{ marginBottom: '0px' }}>
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
                { dealStatus === 'searching' && <TACA.TaskStatusLabel color={indicatorLabelColor}>
                  <TACA.TaskStatusIndicator background={indicatorColorOrange}/> 
                    Поиск исполнителей
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
              { ROLE_TYPE === 'EXECUTOR' && <ButtonComponent
                inner={respondButtonText} 
                type="CONTAINED_DEFAULT"
                action={() => {

                  actionsParams && console.log(actionsParams[1])
                  
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
              /> }
              { ROLE_TYPE === 'CUSTOMER' && <SelectField 
                placeholder={"Действие"}
                params={{ width: 100, height: 50 }}
                data={[
                  { value: '1', label: 'Снять задание' },
                ]}
                multy={false}
                action={taskActions}
                actionType={"TASK_ACTIONS"}
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