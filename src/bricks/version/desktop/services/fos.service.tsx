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
import RequestActionsComponent from './request.service'
import InputComponent from '../comps/input/Input'
import SelectField from '../comps/select/SelectField'
import ButtonComponent from '../comps/button/Button'
import css from '../styles/services/fosContainer.css'

import EmailIcon from '@mui/icons-material/Email'
import closeIcon from '../../../img/icons/close.svg'
import avatar from '../../../img/stock/avatar.svg'
import cross from '../../../img/icons/greyCross.svg'
import addUser from '../../../img/icons/addUser.svg'
import download from '../../../img/icons/download.svg'
import avatar1 from '../../../img/avatars/bear.svg'
import avatar2 from '../../../img/avatars/enot.svg'
import avatar3 from '../../../img/avatars/fox.svg'
import avatar4 from '../../../img/avatars/group.svg'
import avatar5 from '../../../img/avatars/man.svg'
import avatar6 from '../../../img/avatars/woman.svg'

const { ShadowContainer, RespondFromList, Command, AuthNHelp, ChangeAvatar } = css

const FOS: React.FC<IFos> = (props: IFos) => {

  const { showType, scroll } = props

  const [ authDataLogin, setAuthDataLogin ] = useState('nik.shipov@gmail.com')
  const [ authDataLoginError, setAuthDataLoginError ] = useState(false)
  const [ authDataPassError, setAuthDataPassError ] = useState(false)

  const [ AUTH_REQUEST, SET_AUTH_REQUEST ] = useState(false)
  const [ RESPOND_REQUEST, SET_RESPOND_REQUEST ] = useState(false)

  const AUTH_EMAIL = useAppSelector(state => state.enterReducer.email)
  const AUTH_PASSWORD = useAppSelector(state => state.enterReducer.password)

  const RESPOND_DEADLINE = useAppSelector(state => state.respondReducer.deadline)
  const RESPOND_COAST = useAppSelector(state => state.respondReducer.coast)
  const RESPOND_SOLUTION = useAppSelector(state => state.respondReducer.solution)
  const RESPOND_PREPAY = useAppSelector(state => state.respondReducer.prepay)
  const RESPOND_EXPERT = useAppSelector(state => state.respondReducer.expert)
  const RESPOND_EXPERT_COAST = useAppSelector(state => state.respondReducer.expertCost)
  const RESPOND_COMMENT = useAppSelector(state => state.respondReducer.comment)
  const RESPOND_TASK = useAppSelector(state => state.respondReducer.task)
  const RESPOND_EXECUTOR = useAppSelector(state => state.respondReducer.executor)
  const RESPOND_DATE_FINISH = useAppSelector(state => state.respondReducer.dateFinish)
  const RESPOND_DATE_EXPERT = useAppSelector(state => state.respondReducer.dateExpert)

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
    fontSize: '18px',
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
    borderRadius: '4px',
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

  const changeLogin = (param: string): void => {
    setAuthDataLogin(param)
    setAuthDataLoginError(false)
    setAuthDataPassError(false)
  } 

  const restorePass = (): void => {
    dispatch(setShowType('authRestore'))
  }

  const support = (): void => {
    dispatch(setShowType('authSupport'))
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

  const success = (param: any): void => {

    console.log(param)

    if ( param.clientId !== undefined ) {

      dispatch(setActiveRole(param.type))
      dispatch(setRoleData({ uid: param.clientId, una: param.email }))
      dispatch(setShow(false))
      dispatch(setShowRCC(false))
      navigate('/customers')
    } else {

      if ( param.email === 'incorrect' ) setAuthDataLoginError(true)
      if ( param.password === 'incorrect' ) setAuthDataPassError(true)

    }

  }

  const respondSuccess = (param: any): void => {

    SET_RESPOND_REQUEST(true)

    console.log(RESPOND_DEADLINE)
    console.log(RESPOND_COAST)
    console.log(RESPOND_SOLUTION)
    console.log(RESPOND_PREPAY)
    console.log(RESPOND_EXPERT)
    console.log(RESPOND_EXPERT_COAST)
    console.log(RESPOND_COMMENT)
    console.log(RESPOND_TASK)
    console.log(RESPOND_EXECUTOR)

    dispatch(setShowAlert(true))
    dispatch(setType('success'))
    dispatch(setMessage('Ваш отклик на задание был успешно оставлен'))

    setTimeout(() => closeFos(), 1300)

  }
  
  useEffect(() => { false && SET_AUTH_REQUEST(AUTH_REQUEST) }, [ AUTH_REQUEST ])

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

      { RESPOND_REQUEST && <RequestActionsComponent

        callbackAction={() => {}}
        requestData={{
          type: 'POST',
          urlstring: '/add-respond',
          body: {
            taskID: RESPOND_TASK,
            executorID: RESPOND_EXECUTOR,
            executroName: RESPOND_EXECUTOR,
            deadline: RESPOND_DATE_FINISH,
            coast: RESPOND_COAST,
            preSolution: RESPOND_SOLUTION,
            prePay: RESPOND_PREPAY,
            expert: RESPOND_DATE_EXPERT,
            expertCoast: RESPOND_EXPERT_COAST,
            comment: RESPOND_COMMENT
        }
        }}
      
      /> }

      <ShadowContainer 
        marginTop={scroll} 
        background={"rgba(0, 0, 0, 0.4)"}
        style={{ zIndex: 40 }}
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
                <RespondFromList.ContentLine style={{ marginBottom: '22px', marginTop: '20px' }}>
                  <span style={spanTitleCSS}>Предварительное решение</span>
                  <span style={spanDelimiterCSS} />
                  <span style={spanTitleCSS}>Сумма аванса</span>
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE_RESPOND'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={50}
                    heightValue={'50px'}
                    label={"Количество дней"}
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
                <RespondFromList.ContentLine style={{ marginBottom: '15px', marginTop: '20px' }}>
                  <span style={spanTitleCSS}>Экспертиза</span>
                  <span style={spanDelimiterCSS} />
                  <span style={spanTitleCSS}>Стоимость экспертизы</span>
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE_DATEPICK_TASK_DATE_EXPERT'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={50}
                    heightValue={'50px'}
                    label={"Дата экспертизы"}
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
                    store={[ 'RESPOND_EXPERT_COAST', () => {} ]}
                    css={{
                      fontSize: '12px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginBottom: '-4px',
                    }}
                  />
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine style={{ marginBottom: '16px', marginTop: '34px' }}>
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
                <RespondFromList.Title style={{ marginBottom: '38px' }}>Пригласить в команду</RespondFromList.Title>
              </RespondFromList.ContentLine>
              <RespondFromList.ContentLine>
                <SelectField 
                  placeholder={"Выбрать исполнителя"}
                  params={{ width: 300, height: 50 }}
                  data={[]}
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
              </RespondFromList.ContentLine>
              <RespondFromList.ContentLine style={{ marginBottom: '15px', marginTop: '24px' }}>
                <span style={spanTitleCSS}>Предлагаемый гонорар</span>
              </RespondFromList.ContentLine> 
              <RespondFromList.ContentLine>
                <InputComponent
                  type={'TEXT_INPUT_OUTLINE'}
                  valueType='text'
                  required={false}
                  widthType={'px'}
                  widthValue={300}
                  heightValue={'50px'}
                  label={"50 000₽"}
                  isError={false}
                  isDisabled={false}
                  labelShrinkLeft={"0px"}
                  innerLabel={null}
                  css={{
                    fontSize: '12px',
                    position: 'relative',
                    boxSizing: 'border-box',
                    marginBottom: '0px',
                  }}
                />
              </RespondFromList.ContentLine>
              <RespondFromList.ContentLine>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={100}
                    heightValue={'50px'}
                    label={"Ваш комментарий"}
                    isError={false}
                    isDisabled={true}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    css={{
                      fontSize: '12px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginBottom: '0px',
                      marginTop: '30px',
                    }}
                  />
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine style={{ justifyContent: 'space-around' }}>
                  <ButtonComponent
                    inner={"Отправить приглашение"} 
                    type="CONTAINED_DEFAULT" 
                    action={() => {}}
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
                      marginTop: '50px',
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
                  <Command.Title style={{ marginBottom: '40px' }}>Команда</Command.Title>
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
                  <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '10px', cursor: 'pointer' }}>
                    <img
                      alt={""}
                      src={addUser}
                    />
                  </span>
                  <span style={{ cursor: 'pointer' }}>Пригласить в заказ</span>
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
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
                      <span style={nameSubtitleCSS}>ИП</span>
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
                            <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
                            <span style={nameSubtitleCSS}>Самозанятый</span>
                          </Command.NameContainer>
                        </div>
                        <div style={resetDivCSS}>
                          <SelectField 
                            placeholder={"Выберите действие"}
                            params={{ width: 300, height: 50 }}
                            data={[]}
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
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
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
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
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
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
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
                  <Command.Title style={{ marginBottom: '40px' }}>Команда</Command.Title>
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
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
                      <span style={nameSubtitleCSS}>ИП</span>
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
                            <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
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
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
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
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
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
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
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
                  <Command.Title style={{ marginBottom: '40px' }}>Команда</Command.Title>
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
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
                      <span style={nameSubtitleCSS}>ИП</span>
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
                            <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
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
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
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
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
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
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
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
              <AuthNHelp.Title>Войти</AuthNHelp.Title>
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
                  inner={"Войти"} 
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
            <AuthNHelp.FOS width={"600px"} style={{ padding: '44px 64px' }}>
            <AuthNHelp.CloseContainer onClick={closeFos}>
                <img
                  alt={""}
                  src={closeIcon}
                />
              </AuthNHelp.CloseContainer>
              <AuthNHelp.Title>Регистрация аккаунта</AuthNHelp.Title>
              <AuthNHelp.ContentLine style={{ justifyContent: 'space-around' }}>
                <span>Выберите подходящий тип аккаунта</span>
              </AuthNHelp.ContentLine>
              <AuthNHelp.ContentLine style={{ marginTop: '40px' }}>
                <div 
                  style={userTypeCSS}
                  onClick={() => {
                    closeFos()
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
                    dispatch(setFaceType('PHIS_FACE'))
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
              </AuthNHelp.ContentLine>
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
              <AuthNHelp.Title>Восстановление пароля</AuthNHelp.Title>
              <AuthNHelp.ContentLine>
                <span style={{ textAlign: 'center', lineHeight: '20px', display: 'block', width: '100%' }}>Введите email адрес, указанный вами при регистрации<br/>Мы вышлем на него новый пароль</span>
              </AuthNHelp.ContentLine>
              <AuthNHelp.ContentLine style={{ marginTop: '26px' }}>
                <InputComponent
                  type={'TEXT_INPUT_OUTLINE'}
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
                  store={[ authDataLogin, changeLogin ]}
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
                  inner={"Отправить новый пароль"} 
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
              <AuthNHelp.Title>Обратиться в поддержку</AuthNHelp.Title>
              <AuthNHelp.ContentLine>
                <span style={{ lineHeight: '20px', display: 'block', width: '100%' }}>Заполните формы ниже<br/>Ответ на ваш вопрос вы получите на почту</span>
              </AuthNHelp.ContentLine>
              <AuthNHelp.ContentLine style={{ marginTop: '26px' }}>
                <InputComponent
                  type={'TEXT_INPUT_OUTLINE'}
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
                  type={'TEXT_INPUT_OUTLINE'}
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
                  store={[ authDataLogin, changeLogin ]}
                  css={{
                    fontSize: '12px',
                    position: 'relative',
                    boxSizing: 'border-box',
                    marginBottom: '0px',
                  }}
                />
              </AuthNHelp.ContentLine>
              <AuthNHelp.ContentLine style={{ marginTop: '26px' }}>
                <span style={{ display: 'block', fontWeight: 'bold' }}>Категория вопроса</span>
              </AuthNHelp.ContentLine>
              <AuthNHelp.ContentLine style={{ marginTop: '20px' }}>
                <SelectField 
                  placeholder={"Выберите из списка"}
                  params={{ width: 600, height: 50 }}
                  data={[]}
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
              </AuthNHelp.ContentLine>
              <AuthNHelp.ContentLine style={{ marginTop: '18px' }}>
                <InputComponent
                  type={'TEXT_INPUT_OUTLINE'}
                  valueType='text'
                  required={false}
                  widthType={'%'}
                  widthValue={100}
                  heightValue={'50px'}
                  label={"Введите ваш вопрос"}
                  isError={false}
                  isDisabled={true}
                  labelShrinkLeft={"0px"}
                  innerLabel={null}
                  css={{
                    fontSize: '12px',
                    position: 'relative',
                    boxSizing: 'border-box',
                    marginTop: '0px',
                  }}
                />
              </AuthNHelp.ContentLine>
              <AuthNHelp.ContentLine style={{ marginTop: '30px', justifyContent: 'flex-end' }}>
                <ButtonComponent
                  inner={"Отправить"} 
                  type='CONTAINED_DEFAULT' 
                  action={validate}
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
                  inner={"Вернуться назад"} 
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
                  <div>
                    <img
                      alt={""}
                      src={avatar}
                      style={{ width: '150px' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '30px' }}>
                    <span style={{ fontSize: '32px', marginBottom: '10px' }}>Аватар</span>
                    <span style={{ marginBottom: '18px' }}>Загрузите аватар или выберите из предложенных</span>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <div 
                        style={{ ...avatarContainerCSS, border: `3px solid ${avatarBorders[0]}` }}
                        onClick={() => setAvatarBorders([ blueColor2, greyColor3, greyColor3, greyColor3, greyColor3, greyColor3 ])}
                      >
                        <img
                          alt={""}
                          src={avatar1}
                          style={{ ...miniAvatarCSS, marginBottom: '-5px' }}
                        />
                      </div>
                      <div 
                        style={{ ...avatarContainerCSS, border: `3px solid ${avatarBorders[1]}` }}
                        onClick={() => setAvatarBorders([ greyColor3, blueColor2, greyColor3, greyColor3, greyColor3, greyColor3 ])}
                      >
                        <img
                          alt={""}
                          src={avatar2}
                          style={{ ...miniAvatarCSS, marginBottom: '-3px' }}
                        />
                      </div>
                      <div 
                        style={{ ...avatarContainerCSS, border: `3px solid ${avatarBorders[2]}` }}
                        onClick={() => setAvatarBorders([ greyColor3, greyColor3, blueColor2, greyColor3, greyColor3, greyColor3 ])}
                      >
                        <img
                          alt={""}
                          src={avatar3}
                          style={{ ...miniAvatarCSS, marginBottom: '-3px' }}
                        />
                      </div>
                      <div 
                        style={{ ...avatarContainerCSS, border: `3px solid ${avatarBorders[3]}` }}
                        onClick={() => setAvatarBorders([ greyColor3, greyColor3, greyColor3, blueColor2, greyColor3, greyColor3 ])}
                      >
                        <img
                          alt={""}
                          src={avatar4}
                          style={{ ...miniAvatarCSS, marginBottom: '-16px', width: '100%' }}
                        />
                      </div>
                      <div 
                        style={{ ...avatarContainerCSS, border: `3px solid ${avatarBorders[4]}` }}
                        onClick={() => setAvatarBorders([ greyColor3, greyColor3, greyColor3, greyColor3, blueColor2, greyColor3 ])}
                      >
                        <img
                          alt={""}
                          src={avatar5}
                          style={{ ...miniAvatarCSS, marginBottom: '-10px' }}
                        />
                      </div>
                      <div 
                        style={{ ...avatarContainerCSS, border: `3px solid ${avatarBorders[5]}` }}
                        onClick={() => setAvatarBorders([ greyColor3, greyColor3, greyColor3, greyColor3, greyColor3, blueColor2 ])}
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
                    <img
                      alt={""}
                      src={download}
                      style={{ marginTop: '28px' }}
                    />
                    <span style={{ color: blueColor2, marginTop: '18px' }}>
                      <i style={{ fontStyle: 'normal', fontWeight: 600 }}>Выберите файл</i> или перетащите сюда
                    </span>
                  </div>
                </ChangeAvatar.ContentLine>
                <ChangeAvatar.ContentLine style={{ justifyContent: 'space-around', marginTop: '32px' }}>
                  <ButtonComponent
                    inner={"Отправить на проверку"} 
                    type='CONTAINED_DEFAULT' 
                    action={validate}
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
          </React.Fragment> : <React.Fragment></React.Fragment>
        
        }

      </ShadowContainer>
    </React.Fragment>
  )
}

export default FOS