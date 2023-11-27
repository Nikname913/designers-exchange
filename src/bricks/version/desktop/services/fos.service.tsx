// ----------------------------------------------------------------
/* eslint-disable @typescript-eslint/no-unused-vars */
// ----------------------------------------------------------------
/* eslint-disable jsx-a11y/anchor-has-content */
// ----------------------------------------------------------------
/* eslint-disable react-hooks/exhaustive-deps */
// ----------------------------------------------------------------
import React, { ReactElement, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CSSProperties } from 'styled-components'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { IFos } from '../../../models-ts/services/fos-models'
import { setShow, setShowType } from '../../../store/slices/fos-slice'
import { setShow as setShowRCC } from '../../../store/slices/right-content-slice'
import { setActiveRole, setRoleData } from '../../../store/slices/role-type-slice'
import { setShow as setShowAlert , setType, setMessage } from '../../../store/slices/alert-content-slice'
import { setFocused } from '../../../store/slices/reg-slice'
import { setFaceType } from '../../../store/slices/reg-slice'
import { setUpdating } from '../../../store/slices/data-update-slice'
import { setName as setNameSupport, 
  setEmail as setEmailSupport,
  setMessage as setMessageSupport } from '../../../store/slices/support-form-slice'
import RequestActionsComponent from './request.service'
import InputComponent from '../comps/input/Input'
import SelectField from '../comps/select/SelectField'
import ButtonComponent from '../comps/button/Button'
import css from '../styles/services/fosContainer.css'

import bearAvatar from '../../../img/avatars/bear.svg'
import enotAvatar from '../../../img/avatars/enot.svg'
import foxAvatar from '../../../img/avatars/fox.svg'
import groupAvatar from '../../../img/avatars/group.svg'
import manAvatar from '../../../img/avatars/man.svg'
import womanAvatar from '../../../img/avatars/woman.svg'

import EmailIcon from '@mui/icons-material/Email'
import closeIcon from '../../../img/icons/close.svg'
import avatar from '../../../img/stock/avatar.svg'
import cross from '../../../img/icons/greyCross.svg'
import addUser from '../../../img/icons/addUser.svg'
import download from '../../../img/icons/download.png'
import avatar1 from '../../../img/avatars/bear.svg'
import avatar2 from '../../../img/avatars/enot.svg'
import avatar3 from '../../../img/avatars/fox.svg'
import avatar4 from '../../../img/avatars/group.svg'
import avatar5 from '../../../img/avatars/man.svg'
import avatar6 from '../../../img/avatars/woman.svg'

const { ShadowContainer, RespondFromList, Command, AuthNHelp, ChangeAvatar, ShowFile } = css

const FOS: React.FC<IFos> = (props: IFos) => {

  const { showType, scroll, css = [] } = props

  const [ authDataLoginError, setAuthDataLoginError ] = useState<boolean>(false)
  const [ authDataPassError, setAuthDataPassError ] = useState<boolean>(false)
  const [ whoInvite, setWhoInvite ] = useState<string>('')
  const [ category, setCategory ] = useState<string>('')
  const [ supportInfoColor, setSupportInfoColor ] = useState<string>('rgb(253, 237, 237)')
  const [ supportInfoMessage, setSupportInfoMessage ] = useState<string>('Для отправки обращения, пожалуйста, заполните все поля на форме')

  const [ AUTH_REQUEST, SET_AUTH_REQUEST ] = useState(false)
  const [ AVATAR_REQUEST, SET_AVATAR_REQUEST ] = useState(false)
  const [ AVATAR_CUSTOM_REQUEST, SET_AVATAR_CUSTOM_REQUEST ] = useState(false)
  const [ RESPOND_REQUEST, SET_RESPOND_REQUEST ] = useState(false)
  const [ INVITE_REQUEST, SET_INVITE_REQUEST ] = useState(false)
  const [ SUPPORT_MESSAGE_REQUEST, SET_SUPPORT_MESSAGE_REQUEST ] = useState(false)
  const [ RESTORE_REQUEST, SET_RESTORE_REQUEST ] = useState(false)

  const USER_ID = useAppSelector(state => state.roleTypeReducer.roleData.userID)
  const USER_ROLE = useAppSelector(state => state.roleTypeReducer.activeRole)
  const ORDERS = useAppSelector(state => state.taskContentReducer.TASKS_DATA.listOrders)
  const TASKS = useAppSelector(state => state.taskContentReducer.TASKS_DATA.list)
  const SHOW_TASK: string = useAppSelector(
    state => state.taskContentReducer.TASKS_DATA.actualOne 
      ? state.taskContentReducer.TASKS_DATA.actualOne 
      : state.taskContentReducer.TASKS_DATA.showOne)
      
  const GONORAR_MAX: number = ORDERS.filter(order => order.id === SHOW_TASK)[0] 
    ? ORDERS.filter(order => order.id === SHOW_TASK)[0].coast.value : 20000

  const EXECUTORS = useAppSelector(state => state.userContentReducer.USERS_DATA.listExecutors)
  const EXECUTOR = useAppSelector(state => state.userContentReducer.USERS_DATA.listExecutors)
    .filter((executor: any) => executor.clientId === USER_ID)
  const CUSTOMER = useAppSelector(state => state.userContentReducer.USERS_DATA.listCustomers)
    .filter((customer: any) => customer.clientId === USER_ID)

  const [ respondButtonInnerOne, setRespondButtonInnerOne ] = useState("Откликнуться")
  const [ avatarNumber, setAvatarNumber ] = useState<string>('1')

  const AUTH_EMAIL = useAppSelector(state => state.enterReducer.email)
  const AUTH_PASSWORD = useAppSelector(state => state.enterReducer.password)

  const RESPOND_COAST = useAppSelector(state => state.respondReducer.coast)
  const RESPOND_SOLUTION = useAppSelector(state => state.respondReducer.solution)
  const RESPOND_PREPAY = useAppSelector(state => state.respondReducer.prepay)
  const RESPOND_EXPERT_COAST = useAppSelector(state => state.respondReducer.expertCost)
  const RESPOND_COMMENT = useAppSelector(state => state.respondReducer.comment)
  const RESPOND_TASK = useAppSelector(state => state.respondReducer.task)
  const RESPOND_EXECUTOR = useAppSelector(state => state.respondReducer.executor)
  const RESPOND_DATE_FINISH = useAppSelector(state => state.respondReducer.dateFinish)
  const RESPOND_DATE_EXPERT = useAppSelector(state => state.respondReducer.dateExpert)

  const INVITE_FEE = useAppSelector(state => state.inviteFromReducer.fee)
  const INVITE_COMMENT = useAppSelector(state => state.inviteFromReducer.comment)

  const SUPPORT_NAME = useAppSelector(state => state.supportFormReducer.name)
  const SUPPORT_MAIL = useAppSelector(state => state.supportFormReducer.email)
  const SUPPORT_MESSAGE = useAppSelector(state => state.supportFormReducer.message)

  const selectTaskActual = useAppSelector(state => state.taskContentReducer.TASKS_DATA.actualOne)
  const avatarFile = useAppSelector(state => state.avatarReducer.avatarFile)

  const buttonColor = useAppSelector(state => state.theme.blue2)
  const delimiterBackground = useAppSelector(state => state.theme.blue3)
  const greenColor = useAppSelector(state => state.theme.green)
  const yellowColor = useAppSelector(state => state.theme.yellow)
  const greyColor2 = useAppSelector(state => state.theme.grey2)
  const greyColor3 = useAppSelector(state => state.theme.grey3)
  const blueColor2 = useAppSelector(state => state.theme.blue2)
  const blueColor6 = '#E8F0F6'

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [ customAavatar, setCustomAavatar ] = useState<File>()
  const [ techTaskFile, setTechTaskFile ] = useState<{ name: string, size: number, text: string, type?: string  }>({

    name: '',
    size: 0,
    text: ''

  })
  const [ avatarBorders, setAvatarBorders ] = useState<Array<any>>([
    greyColor3, greyColor3, greyColor3, greyColor3, greyColor3, greyColor3
  ])

  const spanDelimiterCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '30px',
    boxSizing: 'border-box',
  }
  const spanTitleCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    fontWeight: 'bold',
    width: '50%',
    margin: '0'
  }
  const closeIconCSS: CSSProperties = {
    display: 'block',
    position: 'absolute',
    top: '0px',
    left: '100%',
    marginTop: '18px',
    marginLeft: '-42px',
    cursor: 'pointer'
  }
  const avatarImageCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '50px'
  }
  const nameTitlesCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    fontSize: '16px',
    lineHeight: '22px',
    marginBottom: '5px'
  }
  const nameSubtitleCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    fontSize: '12px',
    color: greyColor2
  }
  const resetDivCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    width: '300px'
  }
  const coastSpanCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    fontSize: '20px',
    fontWeight: 'bold',
  }
  const userContainerCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  }
  const avatarContainerCSS: CSSProperties = {
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-around',
    border: `3px solid ${greyColor3}`,
    borderRadius: '50%',
    position: 'relative',
    boxSizing: 'border-box',
    width: '60px',
    height: '60px',
    overflow: 'hidden',
    cursor: 'pointer',
    marginRight: '10px'
  }
  const miniAvatarCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '73%'
  }
  const downloadAreaCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    width: '600px',
    height: '200px',
    borderRadius: '8px',
    border: `2px dashed ${blueColor2}`,
    cursor: 'pointer',
    marginTop: '30px'
  }
  const userTypeCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: blueColor6,
    width: '200px',
    height: '160px',
    borderRadius: '4px',
    cursor: 'pointer',
    paddingTop: '30px'
  }

  const closeFos = (): void => {
    dispatch(setShowRCC(false))
    dispatch(setShow(false))
  }

  const restorePass = (): void => {
    dispatch(setShowType('authRestore'))
  }

  const support = (): void => {
    dispatch(setShowType('authSupport'))
  }

  const inviteAction = (): void => {
    dispatch(setShowRCC('undefined'))
    dispatch(setShow(true))
    dispatch(setShowType("inviteOnTeam"))
  }

  const commandAction = (): void => {
    dispatch(setShowRCC('undefined'))
    dispatch(setShow(true))
    dispatch(setShowType("commandRoot"))
  }

  const validate = (): void => {

    setAuthDataLoginError(false)
    setAuthDataPassError(false)
    dispatch(setFocused('NULL'))

    let valid = 0
    
    if ( AUTH_EMAIL.length !== 0 ) { valid++ }
    else { setAuthDataLoginError(true) }
    
    if ( AUTH_PASSWORD.length !== 0 ) { valid++ }
    else { setAuthDataPassError(true) }

    if ( valid === 2 ) { 

      console.log(AUTH_EMAIL)
      console.log(AUTH_PASSWORD)

      SET_AUTH_REQUEST(true)

      false && dispatch(setShow(false))
      false && dispatch(setActiveRole('EXECUTOR'))
      false && dispatch(setShowRCC(false))

      setTimeout(() => SET_AUTH_REQUEST(false), 1300)

    }
    
  }

  const supportValidate = () => {

    if ( SUPPORT_NAME && SUPPORT_MAIL && SUPPORT_MESSAGE ) {

      console.log({
        userId: USER_ID,
        userName: SUPPORT_NAME,
        userMail: SUPPORT_MAIL,
        message: SUPPORT_MESSAGE,
        category: category
      })

      SET_SUPPORT_MESSAGE_REQUEST(true)
      setSupportInfoColor('rgb(237, 247, 237)')
      setSupportInfoMessage('Ваше обращение было успешно отправлено в техподдержку')

      setTimeout(() => SET_SUPPORT_MESSAGE_REQUEST(false), 1300)

    } else {

      setSupportInfoColor('rgb(253, 237, 237)')
      setSupportInfoMessage('Для отправки обращения, пожалуйста, заполните все поля на форме')

    }

  }

  const restoreValidate = (param: any) => {

    if ( AUTH_EMAIL ) {

      SET_RESTORE_REQUEST(true)
      false && dispatch(setShow(false))
      false && dispatch(setShowRCC(false))

      setTimeout(() => SET_RESTORE_REQUEST(false), 1300)

    }

  }

  const success = (param: any): void => {

    console.log(param)

    if ( param.clientId !== undefined ) {

      dispatch(setActiveRole(param.type))
      dispatch(setRoleData({ uid: param.clientId, una: param.email }))
      dispatch(setShow(false))
      dispatch(setShowRCC(false))
      navigate('/task-list-all')
      
    } else {

      if ( param.email === 'incorrect' ) setAuthDataLoginError(true)
      if ( param.password === 'incorrect' ) setAuthDataPassError(true)

    }

  }

  const respondSuccess = (): void => {

    !false && console.log({
      taskID: RESPOND_TASK,
      executorID: RESPOND_EXECUTOR,
      executorName: RESPOND_EXECUTOR,
      deadline: RESPOND_DATE_FINISH,
      coast: RESPOND_COAST,
      preSolution: RESPOND_SOLUTION,
      prePay: RESPOND_PREPAY,
      expert: RESPOND_DATE_EXPERT,
      expertCoast: RESPOND_EXPERT_COAST,
      comment: RESPOND_COMMENT,
      execSpec: EXECUTOR[0].spec
    })

    // ----------------------------------------------------------------
    // if ( RESPOND_DATE_FINISH 
    //   && RESPOND_COAST !== ''
    //   && RESPOND_SOLUTION !== ''
    //   && RESPOND_PREPAY !== ''
    //   && RESPOND_DATE_EXPERT 
    //   && RESPOND_EXPERT_COAST !== '' ) {
    // ----------------------------------------------------------------

    if ( RESPOND_DATE_FINISH 
      && RESPOND_COAST !== '' ) {

        SET_RESPOND_REQUEST(true)

        dispatch(setShowAlert(true))
        dispatch(setType('success'))
        dispatch(setMessage('Ваш отклик на задание был успешно оставлен'))

        setTimeout(() => closeFos(), 1300)

      } else {

        setRespondButtonInnerOne("Заполните все поля")
        setTimeout(() => setRespondButtonInnerOne("Откликнуться"), 1300)

      }

  }

  const changeAvatar = () => {

    SET_AVATAR_REQUEST(true)
    dispatch(setUpdating(true))
    setTimeout(() => {

      SET_AVATAR_REQUEST(false)

    }, 1300)

  }

  const changeAvatarCustom = (param: File) => {

    setCustomAavatar(param)

  }

  const changeAvatarCustomSend = () => {

    SET_AVATAR_CUSTOM_REQUEST(true)
    dispatch(setUpdating(true))
    setTimeout(() => {

      SET_AVATAR_CUSTOM_REQUEST(false)

    }, 1300)

  }

  const inviteExecutor = () => {

    false && console.log((GONORAR_MAX * 0.48).toFixed(0))

    if ( whoInvite && INVITE_FEE ) {

      if ( Number(INVITE_FEE) <= ( GONORAR_MAX * 0.48 ) ) {

        SET_INVITE_REQUEST(true)
        dispatch(setUpdating(true))
        setTimeout(() => {

          SET_INVITE_REQUEST(false)

        }, 1300)

        dispatch(setShowAlert(true))
        dispatch(setType('success'))
        dispatch(setMessage('Приглашение отправлено новому исполнителю'))

      } else {

        console.log('helloo')

        dispatch(setShowAlert(true))
        dispatch(setType('error'))
        dispatch(setMessage('Вы ввели слишком большой гонорар. Уменьшите сумму и отправьте приглашение повторно'))

      }

    }

  }

  useEffect(() => {

    showType === 'showFile' && ( async () => {

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const fileName: string = selectTaskActual + '.techtask.txt'

      const raw = JSON.stringify({
        "fileName": fileName
      });

      var requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const downloadFile = await fetch("http://localhost:3000/send-file-techtask", requestOptions)
        .then(response => response.blob())

      const downloadFileText: string = await downloadFile.text()
      const downloadFileSize: number = await downloadFile.size

      console.log(selectTaskActual)
      console.log({
        name: fileName,
        size: downloadFileSize,
        text: downloadFileText,
        type: 'pdf'
      })

      downloadFileText.indexOf('no such file or directory') < 0 && setTechTaskFile({
        name: fileName,
        size: downloadFileSize,
        text: downloadFileText,
        type: 'txt'
      })

      // ----------------------------------------------------------------
      // ----------------------------------------------------------------

      const fileNamePDF: string = selectTaskActual + '.techtask.pdf'

      const rawPDF = JSON.stringify({
        "fileName": fileNamePDF
      });

      var requestOptionsPDF: any = {
        method: 'POST',
        headers: myHeaders,
        body: rawPDF,
        redirect: 'follow'
      };

      const downloadFilePDF = await fetch("http://localhost:3000/send-file-techtask", requestOptionsPDF)
        .then(response => response.blob())

      const downloadFileTextPDF: string = await downloadFilePDF.text()
      const downloadFileSizePDF: number = await downloadFilePDF.size

      console.log({
        name: fileNamePDF,
        size: downloadFileSizePDF,
        text: downloadFileTextPDF,
        type: 'pdf'
      })

      downloadFileTextPDF.indexOf('no such file or directory') < 0 && setTechTaskFile({
        name: fileNamePDF,
        size: downloadFileSizePDF,
        text: downloadFileTextPDF,
        type: 'pdf'
      })

    })()

    showType === 'showFileContract' && ( async () => {

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const fileName: string = selectTaskActual + '.contract.txt'

      const raw = JSON.stringify({
        "fileName": fileName
      });

      var requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const downloadFile = await fetch("http://localhost:3000/send-file-contract", requestOptions)
        .then(response => response.blob())

      const downloadFileText: string = await downloadFile.text()
      const downloadFileSize: number = await downloadFile.size

      setTechTaskFile({
        name: fileName,
        size: downloadFileSize,
        text: downloadFileText
      })

    })()

  }, [ selectTaskActual ])
  
  useEffect(() => { false && SET_AUTH_REQUEST(AUTH_REQUEST) }, [ AUTH_REQUEST ])
  useEffect(() => { 
    showType !== 'changeAvatar' && dispatch(setUpdating(false))
    return () => {
      dispatch(setUpdating(true)) 
    } 
  }, [ ])

  return (
    <React.Fragment>

      { AUTH_REQUEST && <RequestActionsComponent

        callbackAction={success}
        requestData={{
          type: 'POST',
          urlstring: '/auth',
          body: {
            email: AUTH_EMAIL,
            password: AUTH_PASSWORD
          }
        }}
      
      /> }

      { RESTORE_REQUEST && <RequestActionsComponent

        callbackAction={(param: any) => { 

          if ( param.respond === 'success' ) {

            dispatch(setShowAlert(true))
            dispatch(setType('success'))
            dispatch(setMessage('Пароль был успешно отправлен вам на почту'))

          } else {

            dispatch(setShowAlert(true))
            dispatch(setType('error'))
            dispatch(setMessage('Введенная электронная почта не найдена в базе'))

          }

        }}
        requestData={{
          type: 'POST',
          urlstring: '/restore-pass',
          body: {
            email: AUTH_EMAIL,
          }
        }}
      
      /> }

      { RESPOND_REQUEST && <RequestActionsComponent

        callbackAction={() => {}}
        requestData={{
          type: 'POST',
          urlstring: '/add-respond',
          body: {
            taskID: RESPOND_TASK,
            executorID: RESPOND_EXECUTOR,
            executorName: RESPOND_EXECUTOR,
            deadline: RESPOND_DATE_FINISH,
            coast: RESPOND_COAST,
            preSolution: RESPOND_SOLUTION,
            prePay: RESPOND_PREPAY,
            expert: RESPOND_DATE_EXPERT,
            expertCoast: RESPOND_EXPERT_COAST,
            comment: RESPOND_COMMENT,
            execSpec: EXECUTOR[0].spec
        }
        }}
      
      /> }

      { AVATAR_REQUEST && <RequestActionsComponent

        callbackAction={success}
        requestData={{
          type: 'POST',
          urlstring: '/change-user-avatar',
          body: {
            number: avatarNumber,
            clientId: USER_ID
          }
        }}
      
      /> }

      { AVATAR_CUSTOM_REQUEST && <RequestActionsComponent

        callbackAction={() => {}}
        requestData={{
          type: 'POSTFILE_TTDF',
          urlstring: '/add-file-techtask',
          body: [ USER_ID, customAavatar ]
        }}
      
      /> }

      { INVITE_REQUEST && <RequestActionsComponent

        callbackAction={success}
        requestData={{
          type: 'POST',
          urlstring: '/add-alarm-system',
          body: {
            userId: whoInvite, 
            message: 'Вас приглашают в совместную работу над проектом',
            fee: INVITE_FEE,
            comment: INVITE_COMMENT,
            order: SHOW_TASK,
            type: 'success', 
            actions: 'INVITE_ON_ORDER'
          }
        }}
      
      /> }

      { SUPPORT_MESSAGE_REQUEST && <RequestActionsComponent

        callbackAction={() => {
          dispatch(setNameSupport(''))
          dispatch(setEmailSupport(''))
          dispatch(setEmailSupport(''))
          dispatch(setMessageSupport(''))
        }}
        requestData={{
          type: 'POST',
          urlstring: '/8000/sendSupportMessage',
          body: {
            userId: USER_ID, 
            userName: SUPPORT_NAME, 
            userMail: SUPPORT_MAIL, 
            message: SUPPORT_MESSAGE, 
            category: 'Общая категория вопросов'
          }
        }}
      
      /> }

      <ShadowContainer 
        marginTop={scroll} 
        background={"rgba(0, 0, 0, 0.4)"}
        style={ css[0] ? css[0] : { zIndex: 105 }}
      >
        { showType === 'respondFromList' 
          ? <React.Fragment>
              <RespondFromList.FOS style={{ zIndex: 40 }}>
                <img
                  alt={""}
                  src={closeIcon}
                  style={closeIconCSS}
                  onClick={closeFos}
                />
                <RespondFromList.ContentLine>
                  <RespondFromList.Title>Откликнуться на задание</RespondFromList.Title>
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine>
                  <RespondFromList.SubTitle style={{ marginBottom: '26px' }}>{RESPOND_TASK}</RespondFromList.SubTitle>
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine style={{ marginBottom: '8px' }}>
                  <span style={spanTitleCSS}>Срок выполнения</span>
                  <span style={spanDelimiterCSS} />
                  <span style={spanTitleCSS}>Стоимость выполнения</span>
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine style={{ alignItems: 'flex-start' }}>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE_DATEPICK_RESPOND_DATE_FINISH'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={50}
                    heightValue={'50px'}
                    label={"10 / 08 / 2023"}
                    isError={false}
                    isDisabled={false}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    store={[ "Сидоров", () => null ]}
                    css={{
                      fontSize: '12px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginBottom: '0px',
                      marginTop: '0px',
                      backgroundColor: 'white'
                    }}
                  />
                  <span style={spanDelimiterCSS}/>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE_RESPOND'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={50}
                    heightValue={'50px'}
                    label={"Введите вашу стоимость"}
                    isError={false}
                    isDisabled={false}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    store={[ 'RESPOND_COAST', () => {} ]}
                    css={{
                      fontSize: '12px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginTop: '8px',
                    }}
                  />
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine style={{ marginBottom: '16px', marginTop: '23px' }}>
                  <span style={spanTitleCSS}>Предварительное решение</span>
                  <span style={spanDelimiterCSS} />
                  <span style={spanTitleCSS}>Сумма вашего аванса</span>
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE_RESPOND'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={50}
                    heightValue={'50px'}
                    label={"Количество дней до решения"}
                    isError={false}
                    isDisabled={false}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    store={[ 'RESPOND_SOLUTION', () => {} ]}
                    css={{
                      fontSize: '12px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginBottom: '0px',
                    }}
                  />
                  <span style={spanDelimiterCSS}/>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE_RESPOND'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={50}
                    heightValue={'50px'}
                    label={"Введите сумму аванса"}
                    isError={false}
                    isDisabled={false}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    store={[ 'RESPOND_PREPAY', () => {} ]}
                    css={{
                      fontSize: '12px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginBottom: '0px',
                    }}
                  />
                </RespondFromList.ContentLine>
                { TASKS.filter(item => item.id === RESPOND_TASK)[0].coast.exper && <RespondFromList.ContentLine style={{ marginBottom: '9px', marginTop: '23px' }}>
                  <span style={spanTitleCSS}>Дата экспертизы</span>
                  <span style={spanDelimiterCSS} />
                  <span style={spanTitleCSS}>Стоимость экспертизы</span>
                </RespondFromList.ContentLine> }
                { TASKS.filter(item => item.id === RESPOND_TASK)[0].coast.exper && <RespondFromList.ContentLine style={{ alignItems: 'flex-start' }}>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE_DATEPICK_RESPOND_DATE_EXPERT'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={50}
                    heightValue={'50px'}
                    label={"10 / 08 / 2023"}
                    isError={false}
                    isDisabled={false}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    store={[ "Сидоров", () => null ]}
                    css={{
                      fontSize: '12px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginBottom: '0px',
                      marginTop: '0px',
                      backgroundColor: 'white'
                    }}
                  />
                  <span style={spanDelimiterCSS}/>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE_RESPOND'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={50}
                    heightValue={'50px'}
                    label={"Введите вашу стоимость"}
                    isError={false}
                    isDisabled={false}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    store={[ 'RESPOND_EXPERT_COAST', () => {} ]}
                    css={{
                      fontSize: '12px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginTop: '8px',
                    }}
                  />
                </RespondFromList.ContentLine> }
                <RespondFromList.ContentLine style={{ marginBottom: '18px', marginTop: '23px' }}>
                  <span style={spanTitleCSS}>Комментарий к отклику</span>
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE_RESPOND'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={100}
                    heightValue={'50px'}
                    label={"Дополнительный комментарий"}
                    isError={false}
                    isDisabled={false}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    store={[ 'RESPOND_COMMENT', () => {} ]}
                    css={{
                      fontSize: '12px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginBottom: '0px',
                      marginTop: '0px',
                    }}
                  />
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine>
                  <span style={{ ...spanDelimiterCSS, width: '50%' }} />
                  <span style={spanDelimiterCSS} />
                  <ButtonComponent
                    inner={respondButtonInnerOne} 
                    type={"CONTAINED_DEFAULT"} 
                    action={respondSuccess}
                    actionData={null}
                    widthType={"%"}
                    widthValue={50}
                    children={""}
                    childrenCss={{}}
                    iconSrc={null}
                    iconCss={undefined}
                    muiIconSize={null}
                    MuiIconChildren={EmailIcon}
                    css={{
                      backgroundColor: buttonColor,
                      fontSize: '12px',
                      height: '46px',
                      borderRadius: '6px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginTop: '33px'
                    }}
                  />
                </RespondFromList.ContentLine>    
              </RespondFromList.FOS>  
            </React.Fragment> 
          : showType === 'respondFromTask' 
          ? <React.Fragment>
              <RespondFromList.FOS style={{ zIndex: 40 }}>
                <img
                  alt={""}
                  src={closeIcon}
                  style={closeIconCSS}
                  onClick={closeFos}
                />
                <RespondFromList.ContentLine>
                  <RespondFromList.Title>Откликнуться на задание</RespondFromList.Title>
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine>
                  <RespondFromList.SubTitle style={{ marginBottom: '34px' }}>{RESPOND_TASK}</RespondFromList.SubTitle>
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine style={{ marginBottom: '15px' }}>
                  <span style={spanTitleCSS}>Срок выполнения</span>
                  <span style={spanDelimiterCSS} />
                  <span style={spanTitleCSS}>Стоимость выполнения</span>
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE_DATEPICK_RESPOND_DATE_FINISH'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={50}
                    heightValue={'50px'}
                    label={"Дата окончания"}
                    isError={false}
                    isDisabled={false}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    store={[ "Сидоров", () => null ]}
                    css={{
                      fontSize: '12px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginBottom: '0px',
                      marginTop: '0px',
                      backgroundColor: 'white'
                    }}
                  />
                  <span style={spanDelimiterCSS}/>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE_RESPOND'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={50}
                    heightValue={'50px'}
                    label={"Введите вашу цену"}
                    isError={false}
                    isDisabled={false}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    store={[ 'RESPOND_COAST', () => {} ]}
                    css={{
                      fontSize: '12px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginBottom: '-4px',
                    }}
                  />
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine style={{ marginBottom: '15px', marginTop: '34px' }}>
                  <span style={spanTitleCSS}>Комментарий к отклику</span>
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE_RESPOND'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={100}
                    heightValue={'50px'}
                    label={"Дополнительный комментарий к отклику"}
                    isError={false}
                    isDisabled={false}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    store={[ 'RESPOND_COMMENT', () => {} ]}
                    css={{
                      fontSize: '12px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginBottom: '0px',
                      marginTop: '0px',
                    }}
                  />
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine>
                  <span style={{ ...spanDelimiterCSS, width: '50%' }} />
                  <span style={spanDelimiterCSS} />
                  <ButtonComponent
                    inner={"Откликнуться"} 
                    type="CONTAINED_DEFAULT" 
                    action={respondSuccess}
                    actionData={null}
                    widthType={"px"}
                    widthValue={172}
                    children={""}
                    childrenCss={{}}
                    iconSrc={null}
                    iconCss={undefined}
                    muiIconSize={null}
                    MuiIconChildren={EmailIcon}
                    css={{
                      backgroundColor: buttonColor,
                      fontSize: '12px',
                      height: '46px',
                      borderRadius: '6px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginTop: '33px'
                    }}
                  />
                </RespondFromList.ContentLine>   
              </RespondFromList.FOS>  
          </React.Fragment>
          : showType === 'inviteOnTeam' 
          ? <React.Fragment>
            <RespondFromList.FOS style={{ zIndex: 40 }}>
              <img
                alt={""}
                src={closeIcon}
                style={closeIconCSS}
                onClick={closeFos}
              />
              <RespondFromList.ContentLine>
                <RespondFromList.Title style={{ marginBottom: '28px' }}>Пригласить в команду</RespondFromList.Title>
              </RespondFromList.ContentLine>
              <RespondFromList.ContentLine style={{ marginBottom: '17px', marginTop: '0px' }}>
                <span style={spanTitleCSS}>Выбрать соисполнителя в проект</span>
              </RespondFromList.ContentLine> 
              <RespondFromList.ContentLine>
                <SelectField 
                  placeholder={"Выбрать исполнителя"}
                  params={{ width: 400, height: 50 }}
                  data={EXECUTORS.filter(user => user.clientId !== USER_ID).map(item => {

                    return {
                      value: item.clientId,
                      label: item.bio.name,
                    }

                  })}
                  multy={false}
                  action={setWhoInvite}
                  actionType={"INVITE_USER"}
                  actionParams={[]}
                  showIcon={true}
                  icon={null}
                  iconStyles={{
                    marginTop: '-12px',
                    marginLeft: '6px',
                    width: '34px',
                  }}
                />
              </RespondFromList.ContentLine>
              <RespondFromList.ContentLine style={{ marginBottom: '17px', marginTop: '24px' }}>
                <span style={spanTitleCSS}>Предлагаемый гонорар</span>
              </RespondFromList.ContentLine> 
              <RespondFromList.ContentLine>
                <InputComponent
                  type={'TEXT_INPUT_OUTLINE_INVITE'}
                  valueType='text'
                  required={false}
                  widthType={'px'}
                  widthValue={400}
                  heightValue={'50px'}
                  label={"Максимальный гонорар - " + (GONORAR_MAX * 0.48).toFixed(0)}
                  isError={false}
                  isDisabled={false}
                  labelShrinkLeft={"0px"}
                  innerLabel={null}
                  store={[ "INVITE_FEE", () => null ]}
                  css={{
                    fontSize: '12px',
                    position: 'relative',
                    boxSizing: 'border-box',
                    marginBottom: '0px',
                  }}
                />
              </RespondFromList.ContentLine>
              <span
                style={{
                  display: 'block',
                  position: 'relative',
                  boxSizing: 'border-box',
                  width: '100%',
                  lineHeight: '22px',
                  backgroundColor: '#D9E7F0',
                  padding: '14px',
                  paddingLeft: '20px',
                  borderRadius: '4px',
                  marginTop: '14px',
                }}
              >{"Вы сами устанавливаете гонорар членам вашей команды, однако помните что сумма всех гонораров не может быть больше, чем 50% от стоимости заказа"}</span>
              <RespondFromList.ContentLine style={{ marginBottom: '17px', marginTop: '24px' }}>
                <span style={spanTitleCSS}>Комментарий к приглашению</span>
              </RespondFromList.ContentLine> 
              <RespondFromList.ContentLine>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE_INVITE'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={100}
                    heightValue={'50px'}
                    label={"Ваш комментарий"}
                    isError={false}
                    isDisabled={false}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    store={[ "INVITE_COMMENT", () => null ]}
                    css={{
                      fontSize: '12px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginBottom: '0px',
                    }}
                  />
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine style={{ justifyContent: 'space-around' }}>
                  <ButtonComponent
                    inner={"Отправить приглашение"} 
                    type="CONTAINED_DEFAULT" 
                    action={inviteExecutor}
                    actionData={null}
                    widthType={"px"}
                    widthValue={265}
                    children={""}
                    childrenCss={{}}
                    iconSrc={null}
                    iconCss={undefined}
                    muiIconSize={null}
                    MuiIconChildren={EmailIcon}
                    css={{
                      backgroundColor: buttonColor,
                      fontSize: '12px',
                      height: '46px',
                      borderRadius: '6px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginTop: '24px',
                      marginBottom: '14px',
                    }}
                  />
                </RespondFromList.ContentLine> 
                <RespondFromList.ContentLine style={{ justifyContent: 'space-around' }}>
                  <ButtonComponent
                    inner={"Посмотреть команду"} 
                    type="CONTAINED_DEFAULT" 
                    action={commandAction}
                    actionData={null}
                    widthType={"px"}
                    widthValue={265}
                    children={""}
                    childrenCss={{}}
                    iconSrc={null}
                    iconCss={undefined}
                    muiIconSize={null}
                    MuiIconChildren={EmailIcon}
                    css={{
                      backgroundColor: blueColor6,
                      color: 'rgb(81, 102, 116)',
                      fontSize: '12px',
                      height: '46px',
                      borderRadius: '6px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginTop: '0px',
                      marginBottom: '24px',
                    }}
                  />
                </RespondFromList.ContentLine> 
            </RespondFromList.FOS>
          </React.Fragment> 
          : showType === 'commandRoot' 
          ? <React.Fragment>
            <Command.FOS style={{ zIndex: 40 }}>
              <img
                alt={""}
                src={closeIcon}
                style={{ ...closeIconCSS, zIndex: 3 }}
                onClick={closeFos}
              />
              <Command.FOSInner>
                <Command.ContentLine>
                  <Command.Title style={{ marginBottom: '28px' }}>Команда проекта</Command.Title>
                </Command.ContentLine>
                <Command.ContentLine>
                  <Command.SubTitle>Отправлено приглашение</Command.SubTitle>
                  <Command.SubTitle style={{ textAlign: 'right' }}>Гонорар</Command.SubTitle>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between', opacity: 0.6 }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={greenColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
                      <span style={nameSubtitleCSS}>Самозанятый</span>
                    </Command.NameContainer>
                  </div>
                  <div style={resetDivCSS}>
                    <img
                      alt={""}
                      src={cross}
                      style={{
                        display: 'block',
                        position: 'relative',
                        marginRight: '10px',
                        cursor: 'pointer'
                      }}
                    />
                    <span style={{ display: 'block', position: 'relative', cursor: 'pointer' }}>Отменить приглашение</span>
                  </div>
                  <span style={coastSpanCSS}>{"20 000₽"}</span>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'flex-start', marginTop: '30px', marginBottom: '34px' }}>
                  <span 
                    onClick={inviteAction}
                    style={{ 
                      display: 'flex', 
                      flexDirection: 'row', 
                      alignItems: 'center', 
                      marginRight: '10px', 
                      cursor: 'pointer' 
                    }}
                  >
                    <img
                      alt={""}
                      src={addUser}
                    />
                  </span>
                  <span 
                    onClick={inviteAction}
                    style={{ cursor: 'pointer' }}
                  >
                    Пригласить в заказ
                  </span>
                </Command.ContentLine>
                <Command.ContentLine style={{ marginBottom: '32px' }}>
                  <Command.HorizontalDelimiter background={delimiterBackground} />
                </Command.ContentLine>
                <Command.ContentLine>
                  <Command.SubTitle>Главный исполнитель</Command.SubTitle>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between' }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={yellowColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>{ USER_ID.slice(0, 40) + '...' }</span>
                      <span style={nameSubtitleCSS}>Самозанятый</span>
                    </Command.NameContainer>
                  </div>
                </Command.ContentLine>
                <Command.ContentLine style={{ marginBottom: '20px', marginTop: '40px' }}>
                  <Command.SubTitle style={{ color: blueColor2, marginBottom: '0px' }}>Все участники ({"4"})</Command.SubTitle>
                </Command.ContentLine>
                { Array(4).fill(0).map((item: number, index: number): ReactElement => {

                  return (
                    <React.Fragment>
                      <Command.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                        <div style={userContainerCSS}>
                          <Command.AvatarContainer>
                            <img
                              alt={""}
                              src={avatar}
                              style={avatarImageCSS}
                            />
                            <Command.AvatarContainerIndicator background={greenColor} />
                          </Command.AvatarContainer>
                          <Command.NameContainer>
                            <span style={nameTitlesCSS}>[ username download ]</span>
                            <span style={nameSubtitleCSS}>Самозанятый</span>
                          </Command.NameContainer>
                        </div>
                        <div style={resetDivCSS}>
                          <SelectField 
                            placeholder={"Выберите действие"}
                            params={{ width: 300, height: 50 }}
                            data={[
                              { value: '1', label: 'Загрузка действия' }
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
                        </div>
                        <span style={coastSpanCSS}>{"20 000₽"}</span>
                      </Command.ContentLine>
                    </React.Fragment>
                  )

                })}
                <Command.ContentLine style={{ marginBottom: '32px', marginTop: '18px' }}>
                  <Command.HorizontalDelimiter background={delimiterBackground} />
                </Command.ContentLine>  
                <Command.ContentLine>
                  <Command.SubTitle style={{ marginBottom: '30px' }}>Пожарная безопасность</Command.SubTitle>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={greenColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>[ username download ]</span>
                      <span style={nameSubtitleCSS}>Самозанятый</span>
                    </Command.NameContainer>
                  </div>
                  <div style={{ ...resetDivCSS, opacity: '0.6' }}>
                    <img
                      alt={""}
                      src={cross}
                      style={{
                        display: 'block',
                        position: 'relative',
                        marginRight: '10px',
                        cursor: 'pointer'
                      }}
                    />
                    <span style={{ display: 'block', position: 'relative', cursor: 'pointer' }}>Отменить приглашение</span>
                  </div>
                  <span style={coastSpanCSS}>{"20 000₽"}</span>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={greenColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>[ username download ]</span>
                      <span style={nameSubtitleCSS}>Самозанятый</span>
                    </Command.NameContainer>
                  </div>
                  <div style={{ ...resetDivCSS, opacity: '0.6' }}>
                    <img
                      alt={""}
                      src={cross}
                      style={{
                        display: 'block',
                        position: 'relative',
                        marginRight: '10px',
                        cursor: 'pointer'
                      }}
                    />
                    <span style={{ display: 'block', position: 'relative', cursor: 'pointer' }}>Отменить приглашение</span>
                  </div>
                  <span style={coastSpanCSS}>{"20 000₽"}</span>
                </Command.ContentLine>
                <Command.ContentLine style={{ marginTop: '8px' }}>
                  <Command.SubTitle style={{ marginBottom: '30px' }}>Сигнализация</Command.SubTitle>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={greenColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>[ username download ]</span>
                      <span style={nameSubtitleCSS}>Самозанятый</span>
                    </Command.NameContainer>
                  </div>
                  <div style={{ ...resetDivCSS, opacity: '0.6' }}>
                    <img
                      alt={""}
                      src={cross}
                      style={{
                        display: 'block',
                        position: 'relative',
                        marginRight: '10px',
                        cursor: 'pointer'
                      }}
                    />
                    <span style={{ display: 'block', position: 'relative', cursor: 'pointer' }}>Снять ответственного</span>
                  </div>
                  <span style={coastSpanCSS}>{"20 000₽"}</span>
                </Command.ContentLine>
              </Command.FOSInner>
            </Command.FOS>
          </React.Fragment>
          : showType === 'command' 
          ? <React.Fragment>
            <Command.FOS style={{ width: '666px', zIndex: 40 }}>
              <img
                alt={""}
                src={closeIcon}
                style={{ ...closeIconCSS, zIndex: 3 }}
                onClick={closeFos}
              />
              <Command.FOSInner style={{ width: '686px' }}>
                <Command.ContentLine>
                  <Command.Title style={{ marginBottom: '28px', textAlign: 'center' }}>Команда проекта</Command.Title>
                </Command.ContentLine>
                <Command.ContentLine>
                  <Command.SubTitle>Главный исполнитель</Command.SubTitle>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between' }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={yellowColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>{ USER_ID.slice(0, 40) + '...' }</span>
                      <span style={nameSubtitleCSS}>Самозанятый</span>
                    </Command.NameContainer>
                  </div>
                </Command.ContentLine>
                <Command.ContentLine style={{ marginBottom: '20px', marginTop: '40px' }}>
                  <Command.SubTitle style={{ color: blueColor2, marginBottom: '0px' }}>Все участники ({"4"})</Command.SubTitle>
                </Command.ContentLine>
                { Array(4).fill(0).map((item: number, index: number): ReactElement => {

                  return (
                    <React.Fragment>
                      <Command.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                        <div style={userContainerCSS}>
                          <Command.AvatarContainer>
                            <img
                              alt={""}
                              src={avatar}
                              style={avatarImageCSS}
                            />
                            <Command.AvatarContainerIndicator background={greenColor} />
                          </Command.AvatarContainer>
                          <Command.NameContainer>
                            <span style={nameTitlesCSS}>[ username download ]</span>
                            <span style={nameSubtitleCSS}>Самозанятый</span>
                          </Command.NameContainer>
                        </div>
                        <span style={coastSpanCSS}>{"20 000₽"}</span>
                      </Command.ContentLine>
                    </React.Fragment>
                  )

                })}
                <Command.ContentLine style={{ marginBottom: '32px', marginTop: '18px' }}>
                  <Command.HorizontalDelimiter background={delimiterBackground} />
                </Command.ContentLine>  
                <Command.ContentLine>
                  <Command.SubTitle style={{ marginBottom: '30px' }}>Пожарная безопасность</Command.SubTitle>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={greenColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>[ username download ]</span>
                      <span style={nameSubtitleCSS}>Самозанятый</span>
                    </Command.NameContainer>
                  </div>
                  <span style={coastSpanCSS}>{"20 000₽"}</span>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={greenColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>[ username download ]</span>
                      <span style={nameSubtitleCSS}>Самозанятый</span>
                    </Command.NameContainer>
                  </div>
                  <span style={coastSpanCSS}>{"20 000₽"}</span>
                </Command.ContentLine>
                <Command.ContentLine style={{ marginTop: '8px' }}>
                  <Command.SubTitle style={{ marginBottom: '30px' }}>Сигнализация</Command.SubTitle>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={greenColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>[ username download ]</span>
                      <span style={nameSubtitleCSS}>Самозанятый</span>
                    </Command.NameContainer>
                  </div>
                  <span style={coastSpanCSS}>{"20 000₽"}</span>
                </Command.ContentLine>
              </Command.FOSInner>
            </Command.FOS>
          </React.Fragment>
          : showType === 'commandShort' 
          ? <React.Fragment>
            <Command.FOS style={{ width: '666px', zIndex: 40 }}>
              <img
                alt={""}
                src={closeIcon}
                style={{ ...closeIconCSS, zIndex: 3 }}
                onClick={closeFos}
              />
              <Command.FOSInner style={{ width: '686px' }}>
                <Command.ContentLine>
                  <Command.Title style={{ marginBottom: '28px', textAlign: 'center' }}>Команда проекта</Command.Title>
                </Command.ContentLine>
                <Command.ContentLine>
                  <Command.SubTitle>Главный исполнитель</Command.SubTitle>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between' }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={yellowColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>{ USER_ID.slice(0, 40) + '...' }</span>
                      <span style={nameSubtitleCSS}>Самозанятый</span>
                    </Command.NameContainer>
                  </div>
                </Command.ContentLine>
                <Command.ContentLine style={{ marginBottom: '20px', marginTop: '40px' }}>
                  <Command.SubTitle style={{ color: blueColor2, marginBottom: '0px' }}>Все участники ({"4"})</Command.SubTitle>
                </Command.ContentLine>
                { Array(4).fill(0).map((item: number, index: number): ReactElement => {

                  return (
                    <React.Fragment>
                      <Command.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                        <div style={userContainerCSS}>
                          <Command.AvatarContainer>
                            <img
                              alt={""}
                              src={avatar}
                              style={avatarImageCSS}
                            />
                            <Command.AvatarContainerIndicator background={greenColor} />
                          </Command.AvatarContainer>
                          <Command.NameContainer>
                            <span style={nameTitlesCSS}>[ username download ]</span>
                            <span style={nameSubtitleCSS}>Самозанятый</span>
                          </Command.NameContainer>
                        </div>
                        <span style={coastSpanCSS}>{"20 000₽"}</span>
                      </Command.ContentLine>
                    </React.Fragment>
                  )

                })}
                <Command.ContentLine style={{ marginBottom: '32px', marginTop: '18px' }}>
                  <Command.HorizontalDelimiter background={delimiterBackground} />
                </Command.ContentLine>  
                <Command.ContentLine>
                  <Command.SubTitle style={{ marginBottom: '30px' }}>Пожарная безопасность</Command.SubTitle>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={greenColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>[ username download ]</span>
                      <span style={nameSubtitleCSS}>Самозанятый</span>
                    </Command.NameContainer>
                  </div>
                  <span style={coastSpanCSS}>{"20 000₽"}</span>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={greenColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>[ username download ]</span>
                      <span style={nameSubtitleCSS}>Самозанятый</span>
                    </Command.NameContainer>
                  </div>
                  <span style={coastSpanCSS}>{"20 000₽"}</span>
                </Command.ContentLine>
                <Command.ContentLine style={{ marginTop: '8px' }}>
                  <Command.SubTitle style={{ marginBottom: '30px' }}>Сигнализация</Command.SubTitle>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={greenColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>[ username download ]</span>
                      <span style={nameSubtitleCSS}>Самозанятый</span>
                    </Command.NameContainer>
                  </div>
                  <span style={coastSpanCSS}>{"20 000₽"}</span>
                </Command.ContentLine>
              </Command.FOSInner>
            </Command.FOS>
          </React.Fragment> 
          : showType === 'authLogin' 
          ? <React.Fragment>
            <AuthNHelp.FOS width={"600px"}>
              <AuthNHelp.CloseContainer onClick={closeFos}>
                <img
                  alt={""}
                  src={closeIcon}
                />
              </AuthNHelp.CloseContainer>
              <AuthNHelp.Title style={{ fontSize: '22px' }}>Войти в систему</AuthNHelp.Title>
              <AuthNHelp.ContentLine>
                <InputComponent
                  type={'TEXT_INPUT_OUTLINE_AUTH'}
                  valueType='text'
                  defaultValue='nik.shipov@gmail.com'
                  required={false}
                  widthType={'%'}
                  widthValue={100}
                  heightValue={'50px'}
                  label={"Введите ваш email"}
                  isError={authDataLoginError}
                  isDisabled={false}
                  labelShrinkLeft={"0px"}
                  innerLabel={null}
                  store={[ 'EMAIL_ENTER', () => {} ]}
                  css={{
                    fontSize: '12px',
                    position: 'relative',
                    boxSizing: 'border-box',
                    marginBottom: '0px',
                    marginTop: '10px',
                  }}
                />
              </AuthNHelp.ContentLine>
              <AuthNHelp.ContentLine style={{ marginTop: '24px' }}>
                <InputComponent
                  type={'TEXT_INPUT_OUTLINE_PASSWORD_VISIBILITY'}
                  valueType='text'
                  defaultValue='Qwerty12345!!'
                  required={false}
                  widthType={'%'}
                  widthValue={100}
                  heightValue={'50px'}
                  label={"Введите ваш пароль"}
                  isError={authDataPassError}
                  isDisabled={false}
                  labelShrinkLeft={"0px"}
                  innerLabel={null}
                  store={[ 'PASSWORD_ENTER', () => {} ]}
                  css={{
                    fontSize: '12px',
                    position: 'relative',
                    boxSizing: 'border-box',
                  }}
                />
              </AuthNHelp.ContentLine>
              <AuthNHelp.ContentLine style={{ marginTop: '30px' }}>
                <ButtonComponent
                  inner={"Войти в систему"} 
                  type='CONTAINED_DEFAULT' 
                  action={validate}
                  actionData={null}
                  widthType={'%'}
                  widthValue={100}
                  children={""}
                  childrenCss={undefined}
                  iconSrc={null}
                  iconCss={undefined}
                  muiIconSize={30}
                  MuiIconChildren={EmailIcon}
                  css={{
                    position: 'relative',
                    boxSizing: 'border-box',
                    padding: '4px',
                    backgroundColor: blueColor2,
                    color: 'white',
                    width: '56px',
                    height: '43px',
                  }}
                />
              </AuthNHelp.ContentLine>
              <AuthNHelp.ContentLine style={{ marginTop: '10px' }}>
                <ButtonComponent
                  inner={"Забыли пароль?"} 
                  type='CONTAINED_DEFAULT' 
                  action={restorePass}
                  actionData={null}
                  widthType={'%'}
                  widthValue={100}
                  children={""}
                  childrenCss={undefined}
                  iconSrc={null}
                  iconCss={undefined}
                  muiIconSize={30}
                  MuiIconChildren={EmailIcon}
                  css={{
                    position: 'relative',
                    boxSizing: 'border-box',
                    padding: '4px',
                    backgroundColor: "transparent",
                    boxShadow: 'none',
                    color: blueColor2,
                    width: '56px',
                    height: '43px',
                  }}
                />
              </AuthNHelp.ContentLine>
            </AuthNHelp.FOS>
          </React.Fragment> 
          : showType === 'authCreate' 
          ? <React.Fragment>
            <AuthNHelp.FOS 
              width={"600px"} 
              style={ !css[0] ? { padding: '44px 64px' } : { padding: '34px 34px' }}
            >
            <AuthNHelp.CloseContainer onClick={closeFos}>
                <img
                  alt={""}
                  src={closeIcon}
                />
              </AuthNHelp.CloseContainer>
              { !css[0] && <AuthNHelp.Title style={{ fontSize: '22px' }}>Регистрация аккаунта</AuthNHelp.Title> }
              { css[0] && <AuthNHelp.Title style={{ fontSize: '22px' }}>Новый аккаунт</AuthNHelp.Title> }
              <AuthNHelp.ContentLine style={{ justifyContent: 'space-around' }}>
                { !css[0] && <span>Выберите подходящий тип аккаунта</span> }
                { css[0] && <span style={{ textAlign: 'center', lineHeight: '22px' }}>Выберите подходящий тип для вашего аккаунта</span> }
              </AuthNHelp.ContentLine>
              { !css[0] && <AuthNHelp.ContentLine style={{ marginTop: '40px' }}>
                <div 
                  style={userTypeCSS}
                  onClick={() => {
                    closeFos()
                    false && dispatch(setFaceType('PHIS_FACE'))
                    navigate('/cust-registration')
                  }}
                >
                  <span 
                    style={{ 
                      display: 'block', 
                      position: 'relative', 
                      backgroundColor: 'white', 
                      borderRadius: '50%',
                      width: '64px',
                      height: '64px',
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      alt={""}
                      src={avatar4}
                      style={{ width: '64px', marginTop: '15px' }}
                    />
                  </span>
                  <span style={{ fontWeight: 'bold', marginTop: '10px' }}>Заказчик</span>
                </div>
                <div 
                  style={userTypeCSS} 
                  onClick={() => {
                    closeFos()
                    false && dispatch(setFaceType('PHIS_FACE'))
                    navigate('/exec-registration')
                  }}
                >
                  <span 
                    style={{ 
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-around', 
                      position: 'relative', 
                      backgroundColor: 'white', 
                      borderRadius: '50%',
                      width: '64px',
                      height: '64px',
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      alt={""}
                      src={avatar5}
                      style={{ width: '44px', marginTop: '15px' }}
                    />
                  </span>
                  <span style={{ fontWeight: 'bold', marginTop: '10px' }}>Исполнитель</span>
                </div>
              </AuthNHelp.ContentLine> }
              { css[0] && <AuthNHelp.ContentLine style={{ marginTop: '40px' }}>
                <div 
                  style={{
                    ...userTypeCSS,
                    width: '50%',
                    height: '140px',
                    marginRight: '8px',
                    filter: 'grayscale(1)',
                  }}
                  onClick={() => {
                    closeFos()
                    false && dispatch(setFaceType('PHIS_FACE'))
                    false && navigate('/cust-registration')
                  }}
                >
                  <span 
                    style={{ 
                      display: 'block', 
                      position: 'relative', 
                      backgroundColor: 'white', 
                      borderRadius: '50%',
                      width: '54px',
                      height: '54px',
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      alt={""}
                      src={avatar4}
                      style={{ width: '54px', marginTop: '15px' }}
                    />
                  </span>
                  <span style={{ fontWeight: 'bold', marginTop: '10px' }}>Заказчик</span>
                </div>
                <div 
                  style={{
                    ...userTypeCSS,
                    width: '50%',
                    height: '140px',
                    marginLeft: '8px'
                  }}
                  onClick={() => {
                    closeFos()
                    false && dispatch(setFaceType('PHIS_FACE'))
                    navigate('/exec-registration')
                  }}
                >
                  <span 
                    style={{ 
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-around', 
                      position: 'relative', 
                      backgroundColor: 'white', 
                      borderRadius: '50%',
                      width: '54px',
                      height: '54px',
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      alt={""}
                      src={avatar5}
                      style={{ width: '44px', marginTop: '15px' }}
                    />
                  </span>
                  <span style={{ fontWeight: 'bold', marginTop: '10px' }}>Исполнитель</span>
                </div>
              </AuthNHelp.ContentLine> }
            </AuthNHelp.FOS>
          </React.Fragment>
          : showType === 'authRestore' 
          ? <React.Fragment>
            <AuthNHelp.FOS width={"600px"}>
              <AuthNHelp.CloseContainer onClick={closeFos}>
                <img
                  alt={""}
                  src={closeIcon}
                />
              </AuthNHelp.CloseContainer>
              <AuthNHelp.Title style={{ fontSize: '20px' }}>Восстановить пароль</AuthNHelp.Title>
              <AuthNHelp.ContentLine>
                <span style={{ textAlign: 'center', lineHeight: '22px', display: 'block', width: '100%' }}>Введите email адрес, указанный вами при регистрации<br/>Мы вышлем на него новый пароль</span>
              </AuthNHelp.ContentLine>
              <AuthNHelp.ContentLine style={{ marginTop: '26px' }}>
                <InputComponent
                  type={'TEXT_INPUT_OUTLINE_AUTH'}
                  valueType='text'
                  defaultValue='nik.shipov@gmail.com'
                  required={false}
                  widthType={'%'}
                  widthValue={100}
                  heightValue={'50px'}
                  label={"Введите ваш email"}
                  isError={authDataLoginError}
                  isDisabled={false}
                  labelShrinkLeft={"0px"}
                  innerLabel={null}
                  store={[ 'EMAIL_ENTER', () => {} ]}
                  css={{
                    fontSize: '12px',
                    position: 'relative',
                    boxSizing: 'border-box',
                    marginBottom: '0px',
                    marginTop: '10px',
                  }}
                />
              </AuthNHelp.ContentLine>
              <AuthNHelp.ContentLine style={{ marginTop: '30px' }}>
                <ButtonComponent
                  inner={"Отправить пароль на почту"} 
                  type='CONTAINED_DEFAULT' 
                  action={restoreValidate}
                  actionData={null}
                  widthType={'%'}
                  widthValue={100}
                  children={""}
                  childrenCss={undefined}
                  iconSrc={null}
                  iconCss={undefined}
                  muiIconSize={30}
                  MuiIconChildren={EmailIcon}
                  css={{
                    position: 'relative',
                    boxSizing: 'border-box',
                    padding: '4px',
                    backgroundColor: blueColor2,
                    color: 'white',
                    width: '56px',
                    height: '43px',
                  }}
                />
              </AuthNHelp.ContentLine>
              <AuthNHelp.ContentLine style={{ marginTop: '10px' }}>
                <ButtonComponent
                  inner={"Написать в поддержку"} 
                  type='CONTAINED_DEFAULT' 
                  action={support}
                  actionData={null}
                  widthType={'%'}
                  widthValue={100}
                  children={""}
                  childrenCss={undefined}
                  iconSrc={null}
                  iconCss={undefined}
                  muiIconSize={30}
                  MuiIconChildren={EmailIcon}
                  css={{
                    position: 'relative',
                    boxSizing: 'border-box',
                    padding: '4px',
                    backgroundColor: "transparent",
                    boxShadow: 'none',
                    color: blueColor2,
                    width: '56px',
                    height: '43px',
                  }}
                />
              </AuthNHelp.ContentLine>
              <AuthNHelp.ContentLine style={{ marginTop: '0px' }}>
                <ButtonComponent
                  inner={"Вернуться назад"} 
                  type='CONTAINED_DEFAULT' 
                  action={() => dispatch(setShowType('authLogin'))}
                  actionData={null}
                  widthType={'%'}
                  widthValue={100}
                  children={""}
                  childrenCss={undefined}
                  iconSrc={null}
                  iconCss={undefined}
                  muiIconSize={30}
                  MuiIconChildren={EmailIcon}
                  css={{
                    position: 'relative',
                    boxSizing: 'border-box',
                    padding: '4px',
                    backgroundColor: "transparent",
                    boxShadow: 'none',
                    color: greyColor2,
                    width: '56px',
                    height: '43px',
                  }}
                />
              </AuthNHelp.ContentLine>
            </AuthNHelp.FOS>
          </React.Fragment> 
          : showType === 'authSupport'
          ? <React.Fragment>
            <AuthNHelp.FOS width={"600px"}>
              <AuthNHelp.CloseContainer onClick={closeFos}>
                <img
                  alt={""}
                  src={closeIcon}
                />
              </AuthNHelp.CloseContainer>
              <AuthNHelp.Title style={{ fontSize: '20px' }}>Написать вопрос</AuthNHelp.Title>
              <AuthNHelp.ContentLine>
                <span style={{ lineHeight: '22px', display: 'block', width: '100%' }}>Заполните поля формы ниже<br/>Ответ на ваш вопрос вы получите на указанную почту</span>
              </AuthNHelp.ContentLine>
              <AuthNHelp.ContentLine style={{ marginTop: '26px' }}>
                <InputComponent
                  type={'TEXT_INPUT_OUTLINE_SUPPORT'}
                  valueType='text'
                  defaultValue='николай'
                  required={false}
                  widthType={'%'}
                  widthValue={100}
                  heightValue={'50px'}
                  label={"Введите ваше имя"}
                  isError={authDataLoginError}
                  isDisabled={false}
                  labelShrinkLeft={"0px"}
                  innerLabel={null}
                  store={[ 'SUPPORT_NAME', () => {} ]}
                  css={{
                    fontSize: '12px',
                    position: 'relative',
                    boxSizing: 'border-box',
                    marginBottom: '0px',
                  }}
                />
              </AuthNHelp.ContentLine>
              <AuthNHelp.ContentLine style={{ marginTop: '18px' }}>
                <InputComponent
                  type={'TEXT_INPUT_OUTLINE_SUPPORT'}
                  valueType='text'
                  defaultValue='nik.shipov@gmail.com'
                  required={false}
                  widthType={'%'}
                  widthValue={100}
                  heightValue={'50px'}
                  label={"Введите ваш email"}
                  isError={authDataLoginError}
                  isDisabled={false}
                  labelShrinkLeft={"0px"}
                  innerLabel={null}
                  store={[ 'SUPPORT_MAIL', () => {} ]}
                  css={{
                    fontSize: '12px',
                    position: 'relative',
                    boxSizing: 'border-box',
                    marginBottom: '0px',
                  }}
                />
              </AuthNHelp.ContentLine>
              { !css[0] && <AuthNHelp.ContentLine style={{ marginTop: '26px' }}>
                <span style={{ display: 'block', fontWeight: 'bold' }}>Категория вопроса</span>
              </AuthNHelp.ContentLine> }
              { !css[0] && <AuthNHelp.ContentLine style={{ marginTop: '20px' }}>
                <SelectField 
                  placeholder={"Выберите из списка"}
                  params={{ width: 600, height: 50 }}
                  data={[
                    { value: '001', label: 'Общая категория вопросов' },
                    { value: '002', label: 'Новая категория вопросов' }
                  ]}
                  multy={false}
                  action={setCategory}
                  actionType={"SUPPORT"}
                  actionParams={[]}
                  showIcon={true}
                  icon={null}
                  iconStyles={{
                    marginTop: '-12px',
                    marginLeft: '6px',
                    width: '34px',
                  }}
                />
              </AuthNHelp.ContentLine> }
              <AuthNHelp.ContentLine style={{ marginTop: '18px' }}>
                <InputComponent
                  type={'TEXT_INPUT_OUTLINE_SUPPORT'}
                  valueType='text'
                  required={false}
                  widthType={'%'}
                  widthValue={100}
                  heightValue={'50px'}
                  label={"Введите ваш вопрос"}
                  isError={false}
                  isDisabled={false}
                  labelShrinkLeft={"0px"}
                  innerLabel={null}
                  store={[ 'SUPPORT_MESSAGE', () => {} ]}
                  css={{
                    fontSize: '12px',
                    position: 'relative',
                    boxSizing: 'border-box',
                    marginTop: '0px',
                  }}
                />
              </AuthNHelp.ContentLine>
              <AuthNHelp.ContentLine>
                <span
                  style={{
                    display: 'block',
                    position: 'relative',
                    boxSizing: 'border-box',
                    width: '600px',
                    lineHeight: '22px',
                    backgroundColor: supportInfoColor,
                    padding: '14px',
                    paddingLeft: '20px',
                    borderRadius: '4px',
                    marginTop: '16px'
                  }}
                >{ supportInfoMessage }</span>
              </AuthNHelp.ContentLine>
              <AuthNHelp.ContentLine style={{ marginTop: '30px', justifyContent: 'flex-end' }}>
                <ButtonComponent
                  inner={"Отправить"} 
                  type='CONTAINED_DEFAULT' 
                  action={supportValidate}
                  actionData={null}
                  widthType={'px'}
                  widthValue={200}
                  children={""}
                  childrenCss={undefined}
                  iconSrc={null}
                  iconCss={undefined}
                  muiIconSize={30}
                  MuiIconChildren={EmailIcon}
                  css={{
                    position: 'relative',
                    boxSizing: 'border-box',
                    padding: '4px',
                    backgroundColor: blueColor2,
                    color: 'white',
                    width: '56px',
                    height: '43px',
                  }}
                />
              </AuthNHelp.ContentLine>
              <AuthNHelp.ContentLine style={{ marginTop: '18px' }}>
                <ButtonComponent
                  inner={"Форма восстановления пароля"} 
                  type='CONTAINED_DEFAULT' 
                  action={() => dispatch(setShowType('authRestore'))}
                  actionData={null}
                  widthType={'%'}
                  widthValue={100}
                  children={""}
                  childrenCss={undefined}
                  iconSrc={null}
                  iconCss={undefined}
                  muiIconSize={30}
                  MuiIconChildren={EmailIcon}
                  css={{
                    position: 'relative',
                    boxSizing: 'border-box',
                    padding: '4px',
                    backgroundColor: "transparent",
                    boxShadow: 'none',
                    color: greyColor2,
                    width: '56px',
                    height: '43px',
                  }}
                />
              </AuthNHelp.ContentLine>
            </AuthNHelp.FOS>
          </React.Fragment> 
          : showType === 'changeAvatar'
          ? <React.Fragment>
              <ChangeAvatar.FOS width={"680px"}>
                <ChangeAvatar.CloseContainer onClick={closeFos}>
                  <img
                    alt={""}
                    src={closeIcon}
                  />
                </ChangeAvatar.CloseContainer>
                <ChangeAvatar.ContentLine style={{ justifyContent: 'flex-start' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      width: '150px', 
                      height: '150px',
                      backgroundColor: 'rgb(217, 231, 240)',
                      borderRadius: '50%',
                      overflow: 'hidden'
                    }}
                  >
                    { avatarFile === 404 && <React.Fragment>
                      { USER_ROLE === 'EXECUTOR' &&
                        <img
                          alt={""}
                          src={
                            EXECUTOR[0].avatar === '1' ? bearAvatar :
                            EXECUTOR[0].avatar === '2' ? enotAvatar :
                            EXECUTOR[0].avatar === '3' ? foxAvatar :
                            EXECUTOR[0].avatar === '4' ? groupAvatar :
                            EXECUTOR[0].avatar === '5' ? manAvatar :
                            EXECUTOR[0].avatar === '6' ? womanAvatar : bearAvatar
                          }
                          style={
                            EXECUTOR[0].avatar === '1' ? { width: '100px', marginTop: '9px' } :
                            EXECUTOR[0].avatar === '2' ? { width: '100px', marginTop: '3px' } :
                            EXECUTOR[0].avatar === '3' ? { width: '90px', marginTop: '3px' } :
                            EXECUTOR[0].avatar === '4' ? { width: '140px', marginTop: '44px' } :
                            EXECUTOR[0].avatar === '5' ? { width: '100px', marginTop: '36px' } :
                            EXECUTOR[0].avatar === '6' ? { width: '100px', marginTop: '36px'  } : 
                            { width: '100px', marginTop: '6px' }
                          }
                        /> 
                      }
                      { USER_ROLE === 'CUSTOMER' &&
                        <img
                          alt={""}
                          src={
                            CUSTOMER[0].avatar === '1' ? bearAvatar :
                            CUSTOMER[0].avatar === '2' ? enotAvatar :
                            CUSTOMER[0].avatar === '3' ? foxAvatar :
                            CUSTOMER[0].avatar === '4' ? groupAvatar :
                            CUSTOMER[0].avatar === '5' ? manAvatar :
                            CUSTOMER[0].avatar === '6' ? womanAvatar : bearAvatar
                          }
                          style={
                            CUSTOMER[0].avatar === '1' ? { width: '100px', marginTop: '9px' } :
                            CUSTOMER[0].avatar === '2' ? { width: '100px', marginTop: '3px' } :
                            CUSTOMER[0].avatar === '3' ? { width: '90px', marginTop: '3px' } :
                            CUSTOMER[0].avatar === '4' ? { width: '140px', marginTop: '44px' } :
                            CUSTOMER[0].avatar === '5' ? { width: '100px', marginTop: '36px' } :
                            CUSTOMER[0].avatar === '6' ? { width: '100px', marginTop: '36px'  } : 
                            { width: '100px', marginTop: '6px' }
                          }
                        /> 
                      }
                    </React.Fragment> }
                    { avatarFile === 200 && <img
                      
                      alt={""}
                      src={`http://localhost:3000/techDocs/${USER_ID}.avatar.jpg`}
                      style={{ height: '100%' }}
                      onClick={changeAvatar}
                      
                    /> }
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '30px' }}>
                    <span style={{ fontSize: '28px', marginBottom: '10px' }}>Сменить аватар</span>
                    <span style={{ marginBottom: '18px' }}>Загрузите аватар или выберите из предложенных</span>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <div 
                        style={{ ...avatarContainerCSS, border: `3px solid ${avatarBorders[0]}` }}
                        onClick={() => {
                          setAvatarNumber('1')
                          setAvatarBorders([ blueColor2, greyColor3, greyColor3, greyColor3, greyColor3, greyColor3 ])
                          changeAvatar()
                        }}
                      >
                        <img
                          alt={""}
                          src={avatar1}
                          style={{ ...miniAvatarCSS, marginBottom: '-5px' }}
                        />
                      </div>
                      <div 
                        style={{ ...avatarContainerCSS, border: `3px solid ${avatarBorders[1]}` }}
                        onClick={() => {
                          setAvatarNumber('2')
                          setAvatarBorders([ greyColor3, blueColor2, greyColor3, greyColor3, greyColor3, greyColor3 ])
                          changeAvatar()
                        }}
                      >
                        <img
                          alt={""}
                          src={avatar2}
                          style={{ ...miniAvatarCSS, marginBottom: '-3px' }}
                        />
                      </div>
                      <div 
                        style={{ ...avatarContainerCSS, border: `3px solid ${avatarBorders[2]}` }}
                        onClick={() => {
                          setAvatarNumber('3')
                          setAvatarBorders([ greyColor3, greyColor3, blueColor2, greyColor3, greyColor3, greyColor3 ])
                          changeAvatar()
                        }}
                      >
                        <img
                          alt={""}
                          src={avatar3}
                          style={{
                            display: 'block',
                            position: 'relative',
                            width: '66%', 
                            marginBottom: '-5px'
                           }}
                        />
                      </div>
                      <div 
                        style={{ ...avatarContainerCSS, border: `3px solid ${avatarBorders[3]}` }}
                        onClick={() => {
                          setAvatarNumber('4')
                          setAvatarBorders([ greyColor3, greyColor3, greyColor3, blueColor2, greyColor3, greyColor3 ])
                          changeAvatar()
                        }}
                      >
                        <img
                          alt={""}
                          src={avatar4}
                          style={{ ...miniAvatarCSS, marginBottom: '-16px', width: '100%' }}
                        />
                      </div>
                      <div 
                        style={{ ...avatarContainerCSS, border: `3px solid ${avatarBorders[4]}` }}
                        onClick={() => {
                          setAvatarNumber('5')
                          setAvatarBorders([ greyColor3, greyColor3, greyColor3, greyColor3, blueColor2, greyColor3 ])
                          changeAvatar()
                        }}
                      >
                        <img
                          alt={""}
                          src={avatar5}
                          style={{ ...miniAvatarCSS, marginBottom: '-10px' }}
                        />
                      </div>
                      <div 
                        style={{ ...avatarContainerCSS, border: `3px solid ${avatarBorders[5]}` }}
                        onClick={() => {
                          setAvatarNumber('6')
                          setAvatarBorders([ greyColor3, greyColor3, greyColor3, greyColor3, greyColor3, blueColor2 ])
                          changeAvatar()
                        }}
                      >
                        <img
                          alt={""}
                          src={avatar6}
                          style={{ ...miniAvatarCSS, marginBottom: '-10px' }}
                        />
                      </div>
                    </div>
                  </div>
                </ChangeAvatar.ContentLine>
                <ChangeAvatar.ContentLine>
                  <div style={downloadAreaCSS}>

                    <ButtonComponent
                      inner={''} 
                      type='UPLOAD' 
                      action={() => {}}
                      actionData={[ changeAvatarCustom ]}
                      widthType={'%'}
                      widthValue={100}
                      children={''}
                      childrenCss={undefined}
                      iconSrc={null}
                      iconCss={undefined}
                      muiIconSize={null}
                      MuiIconChildren={EmailIcon}
                      css={{
                        backgroundColor: 'transparent',
                        color: 'grey',
                        fontSize: '12px',
                        height: '200px',
                        borderRadius: '6px',
                        position: 'absolute',
                        boxSizing: 'border-box',
                        boxShadow: 'none',
                        top: '0%',
                        left: '0%',
                        zIndex: 10
                      }}
                    />

                    <img
                      alt={""}
                      src={download}
                      style={{ marginTop: '28px', width: '95px', opacity: 0.44 }}
                    />
                    <span style={{ color: blueColor2, marginTop: '18px' }}>
                      <i style={{ fontStyle: 'normal', fontWeight: 600 }}>Выберите файл</i> или перетащите сюда
                    </span>
                  </div>
                </ChangeAvatar.ContentLine>
                <ChangeAvatar.ContentLine style={{ justifyContent: 'space-around', marginTop: '32px' }}>
                  <ButtonComponent
                    inner={"Сохранить аватар"} 
                    type='CONTAINED_DEFAULT' 
                    action={changeAvatarCustomSend}
                    actionData={null}
                    widthType={'px'}
                    widthValue={240}
                    children={""}
                    childrenCss={undefined}
                    iconSrc={null}
                    iconCss={undefined}
                    muiIconSize={30}
                    MuiIconChildren={EmailIcon}
                    css={{
                      position: 'relative',
                      boxSizing: 'border-box',
                      padding: '4px',
                      backgroundColor: blueColor2,
                      color: 'white',
                      width: '56px',
                      height: '43px',
                    }}
                  />
                </ChangeAvatar.ContentLine>
              </ChangeAvatar.FOS>
          </React.Fragment> 
          : showType === 'showFile' 
          ? <React.Fragment>

            <ShowFile.FOS>
              <ShowFile.CloseContainer onClick={closeFos}>
                <img
                  alt={""}
                  src={closeIcon}
                />
              </ShowFile.CloseContainer>
              <ShowFile.ContentLine style={{ padding: '0 80px', boxSizing: 'border-box', marginTop: '66px' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold', lineHeight: '30px' }}>{ techTaskFile.name }</span>
                <a 
                  href={`http://localhost:3000/techDocs/${techTaskFile.name}`} 
                  target='_blank' 
                  rel="noreferrer"
                  style={{
                    display: 'block',
                    position: 'relative',
                    width: '180px',
                    height: '40px',
                    borderRadius: '6px',
                    backgroundColor: 'rgb(22, 124, 191)',
                    color: 'white',
                    textDecoration: 'none',
                    lineHeight: '37px',
                    textAlign: 'center',
                    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
                  }}
                >
                  Скачать файл
                </a>
                { false && <ButtonComponent
                  inner={"Скачать файл"} 
                  type="CONTAINED_DEFAULT"
                  action={() => {}}
                  actionData={null}
                  widthType={"px"}
                  widthValue={184}
                  children={""}
                  childrenCss={{}}
                  iconSrc={null}
                  iconCss={undefined}
                  muiIconSize={null}
                  MuiIconChildren={EmailIcon}
                  css={{
                    backgroundColor: '#167CBF',
                    color: 'white',
                    fontSize: '12px',
                    height: '40px',
                    borderRadius: '6px',
                    position: 'relative',
                    boxSizing: 'border-box',
                    marginBottom: '6px',
                  }}
                /> }
              </ShowFile.ContentLine>
              <ShowFile.FOSInner>
                <ShowFile.FOSFile style={{ padding: '18px 24px 20px', boxSizing: 'border-box', lineHeight: '26px' }}>
                  { techTaskFile.type === 'txt' ? techTaskFile.text : 'Для формата PDF доступно только скачивание' }
                </ShowFile.FOSFile>
              </ShowFile.FOSInner>
              <ShowFile.ContentLine style={{ justifyContent: 'space-around' }}>
                <span
                  style={{
                    display: 'block',
                    position: 'relative',
                    width: '30px',
                    height: '30px',
                    lineHeight: '30px',
                    textAlign: 'center',
                    fontSize: '13px',
                    borderRadius: '6px',
                    backgroundColor: 'white',
                    color: 'grey'
                  }}
                >
                  1
                </span>
              </ShowFile.ContentLine>
              <ShowFile.ContentLine style={{ justifyContent: 'flex-start', paddingLeft: '80px', marginTop: '14px' }}>
                <span style={{ fontWeight: 'bold', width: '120px' }}>Сохранен</span>
                <span>Нет данных</span>
              </ShowFile.ContentLine>
              <ShowFile.ContentLine style={{ justifyContent: 'flex-start', paddingLeft: '80px', marginTop: '7px' }}>
                <span style={{ fontWeight: 'bold', width: '120px' }}>Размер</span>
                <span>{ ( techTaskFile.size / 1024 / 1024 ).toFixed(2) + ' MB' }</span>
              </ShowFile.ContentLine>
              <ShowFile.ContentLine style={{ justifyContent: 'flex-start', paddingLeft: '80px', marginTop: '7px', marginBottom: '33px' }}>
                <span style={{ fontWeight: 'bold', width: '120px' }}>Загружен</span>
                <span>Нет данных</span>
              </ShowFile.ContentLine>
            </ShowFile.FOS>

          </React.Fragment>
          : showType === 'showFileContract' 
          ? <React.Fragment>

            <ShowFile.FOS>
              <ShowFile.CloseContainer onClick={closeFos}>
                <img
                  alt={""}
                  src={closeIcon}
                />
              </ShowFile.CloseContainer>
              <ShowFile.ContentLine style={{ padding: '0 80px', boxSizing: 'border-box', marginTop: '66px' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold', lineHeight: '30px' }}>{ techTaskFile.name }</span>
                <a 
                  href={`http://localhost:3000/techContracts/${techTaskFile.name}`} 
                  target='_blank' 
                  rel="noreferrer"
                  style={{
                    display: 'block',
                    position: 'relative',
                    width: '180px',
                    height: '40px',
                    borderRadius: '6px',
                    backgroundColor: 'rgb(22, 124, 191)',
                    color: 'white',
                    textDecoration: 'none',
                    lineHeight: '37px',
                    textAlign: 'center',
                    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
                  }}
                >
                  Скачать файл
                </a>
                { false && <ButtonComponent
                  inner={"Скачать файл"} 
                  type="CONTAINED_DEFAULT"
                  action={() => {}}
                  actionData={null}
                  widthType={"px"}
                  widthValue={184}
                  children={""}
                  childrenCss={{}}
                  iconSrc={null}
                  iconCss={undefined}
                  muiIconSize={null}
                  MuiIconChildren={EmailIcon}
                  css={{
                    backgroundColor: '#167CBF',
                    color: 'white',
                    fontSize: '12px',
                    height: '40px',
                    borderRadius: '6px',
                    position: 'relative',
                    boxSizing: 'border-box',
                    marginBottom: '6px',
                  }}
                /> }
              </ShowFile.ContentLine>
              <ShowFile.FOSInner>
                <ShowFile.FOSFile style={{ padding: '18px 24px 20px', boxSizing: 'border-box', lineHeight: '26px' }}>
                  { techTaskFile.text }
                </ShowFile.FOSFile>
              </ShowFile.FOSInner>
              <ShowFile.ContentLine style={{ justifyContent: 'space-around' }}>
                <span
                  style={{
                    display: 'block',
                    position: 'relative',
                    width: '30px',
                    height: '30px',
                    lineHeight: '30px',
                    textAlign: 'center',
                    fontSize: '13px',
                    borderRadius: '6px',
                    backgroundColor: 'white',
                    color: 'grey'
                  }}
                >
                  1
                </span>
              </ShowFile.ContentLine>
              <ShowFile.ContentLine style={{ justifyContent: 'flex-start', paddingLeft: '80px', marginTop: '14px' }}>
                <span style={{ fontWeight: 'bold', width: '120px' }}>Сохранен</span>
                <span>Нет данных</span>
              </ShowFile.ContentLine>
              <ShowFile.ContentLine style={{ justifyContent: 'flex-start', paddingLeft: '80px', marginTop: '7px' }}>
                <span style={{ fontWeight: 'bold', width: '120px' }}>Размер</span>
                <span>{ ( techTaskFile.size / 1024 ).toFixed(3) + ' МБ' }</span>
              </ShowFile.ContentLine>
              <ShowFile.ContentLine style={{ justifyContent: 'flex-start', paddingLeft: '80px', marginTop: '7px', marginBottom: '33px' }}>
                <span style={{ fontWeight: 'bold', width: '120px' }}>Загружен</span>
                <span>Нет данных</span>
              </ShowFile.ContentLine>
            </ShowFile.FOS>

          </React.Fragment> : <React.Fragment></React.Fragment>
        
        }

      </ShadowContainer>
    </React.Fragment>
  )
}

export default FOS