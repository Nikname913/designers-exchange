import React, { useState, useRef, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { setName, 
  setSurname, 
  setSecondName, 
  setEmail, 
  setNumber, 
  setSpec, 
  setPassword,
  setFocused,
  setCode } from '../../../../store/slices/reg-slice'
import { setTitle, 
  setDateStart,
  setDateFinish,
  setCoast, 
  setPrepay, 
  setPrepayDays,
  setExpertiseDays,
  setExpertiseCoast, 
  setDescription, 
  setFocused as setFocusedTask,
  setObjectParamsSquare,
  setObjectParamsStoreys,
  setObjectParamsHeight,
  setChapterLN,
  setChapterLD,
 } from '../../../../store/slices/create-task-slice'
import { setDeadline, 
  setCoast as setCoastRespond, 
  setSolution, 
  setPrepay as setPrepayRespond, 
  setExpert, 
  setExpertCoast, 
  setComment,
  setFocused as setFocusedRespond,
  setDateFinish as setDateFinishRespond,
  setDateExpert } from '../../../../store/slices/respond-slice'
import { setSeri, 
  setNumber as setNumPas, 
  setWho, 
  setAdress, 
  setSnils, 
  setInn,
  setFocused as setFocusedPas } from '../../../../store/slices/passport-slice'
import { setShortName,
  setFullName,
  setInn as setInnBuss,
  setKpp,
  setOgrn,
  setYurAddress,
  setPostAddress, 
  setBossName,
  setBossType,
  setFocused as setFocusedBuss } from '../../../../store/slices/bussData-slice'
import { setEmail as setEmailEnter, setPassword as setPasswordEnter } from '../../../../store/slices/enter-slice'
import { setFromCoast, setToCoast, setFocused as setFocusedFilter } from '../../../../store/slices/filter-slice'
import { setAboutText, setFocused as setFocusedAboutText } from '../../../../store/slices/about-text-slice'
import { setFee, setComment as setCommentInvite, setFocused as setFocusedInvite } from '../../../../store/slices/invite-form-slice' 

import { setUpdating } from '../../../../store/slices/data-update-slice'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import Search from '@mui/icons-material/Search'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { ruRU } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { IInput } from '../../../../models-ts/comps/comps-models'
import css from './input-style'

const { InputWrapper } = css

const InputComponent: React.FC<IInput> = (props: IInput) => {

  const { 
    type,
    css,
    widthType,
    widthValue,
    heightValue,
    valueType,
    required,
    isError,
    isDisabled,
    label,
    innerLabel,
    labelShrinkLeft,
    defaultValue,
    store } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()

  const FOCUS = useAppSelector(state => state.regReducer.focused)
  const SURNAME = useAppSelector(state => state.regReducer.surname)
  const NAME = useAppSelector(state => state.regReducer.name)
  const SECOND_NAME = useAppSelector(state => state.regReducer.secondName)
  const EMAIL = useAppSelector(state => state.regReducer.email)
  const NUMBER = useAppSelector(state => state.regReducer.number)
  const PASSWORD = useAppSelector(state => state.regReducer.password)
  const CODE = useAppSelector(state => state.regReducer.code)

  const EMAIL_ENTER = useAppSelector(state => state.enterReducer.email)
  const PASSWORD_ENTER = useAppSelector(state => state.enterReducer.password)

  // ----------------------------------------------------------------
  // данные для страницы создания задания
  // ----------------------------------------------------------------

  const TASK_TITLE = useAppSelector(state => state.createTaskReducer.title)
  const TASK_COAST = useAppSelector(state => state.createTaskReducer.coast)
  const TASK_PREPAY = useAppSelector(state => state.createTaskReducer.prepay)
  const TASK_PREPAY_DAYS = useAppSelector(state => state.createTaskReducer.prepayDays)
  const TASK_EXPERT_DAYS = useAppSelector(state => state.createTaskReducer.expertiseDays)
  const TASK_EXPERT_COAST = useAppSelector(state => state.createTaskReducer.expertiseCoast)
  const TASK_DESCRIPTION = useAppSelector(state => state.createTaskReducer.description)
  const TASK_OP_SQUARE = useAppSelector(state => state.createTaskReducer.objectParamsSquare)
  const TASK_OP_STOREYS = useAppSelector(state => state.createTaskReducer.objectParamsStoreys)
  const TASK_OP_HEIGHT = useAppSelector(state => state.createTaskReducer.objectParamsHeight)
  const TASK_DATE_START = useAppSelector(state => state.createTaskReducer.dateStart)
  const TASK_DATE_FINISH = useAppSelector(state => state.createTaskReducer.dateFinish)
  const TASK_FOCUS = useAppSelector(state => state.createTaskReducer.focused)
  const TASK_CHAPTER_NAME = useAppSelector(state => state.createTaskReducer.chapterLocalName)
  const TASK_CHAPTER_DESCR = useAppSelector(state => state.createTaskReducer.chapterLocalDescription)

  // ----------------------------------------------------------------
  // данные для отклика на задание
  // ----------------------------------------------------------------

  const RESPOND_DEADLINE = useAppSelector(state => state.respondReducer.deadline)
  const RESPOND_COAST = useAppSelector(state => state.respondReducer.coast)
  const RESPOND_SOLUTION = useAppSelector(state => state.respondReducer.solution)
  const RESPOND_PREPAY = useAppSelector(state => state.respondReducer.prepay)
  const RESPOND_EXPERT = useAppSelector(state => state.respondReducer.expert)
  const RESPOND_EXPERT_COAST = useAppSelector(state => state.respondReducer.expertCost)
  const RESPOND_COMMENT = useAppSelector(state => state.respondReducer.comment)
  const RESPOND_DATE_FINISH = useAppSelector(state => state.respondReducer.dateFinish)
  const RESPOND_DATE_EXPERT = useAppSelector(state => state.respondReducer.dateExpert)
  const RESPOND_FOCUS = useAppSelector(state => state.respondReducer.focused)

  // ----------------------------------------------------------------
  // данные для паспорта снилс инн
  // ----------------------------------------------------------------

  const PASSPORT_SERI = useAppSelector(state => state.passportReducer.seri)
  const PASSPORT_NUMBER = useAppSelector(state => state.passportReducer.number)
  const PASSPORT_WHO_GET = useAppSelector(state => state.passportReducer.who)
  const PASSPORT_ADRESS = useAppSelector(state => state.passportReducer.adress)
  const PASSPORT_SNILS = useAppSelector(state => state.passportReducer.snils)
  const PASSPORT_INN = useAppSelector(state => state.passportReducer.inn)
  const PASSPORT_FOCUS = useAppSelector(state => state.passportReducer.focused)

  // ----------------------------------------------------------------
  // данные для фильтра
  // ----------------------------------------------------------------

  const FROM_COAST = useAppSelector(state => state.filterReducer.fromCoast)
  const TO_COAST = useAppSelector(state => state.filterReducer.toCoast)
  const FILTER_FOCUS = useAppSelector(state => state.filterReducer.focused)

  // ----------------------------------------------------------------
  // данные для заведения компании в лк
  // ----------------------------------------------------------------

  const SHORT_NAME = useAppSelector(state => state.bussDataReducer.shortName)
  const FULL_NAME = useAppSelector(state => state.bussDataReducer.fullName)
  const BUSS_INN = useAppSelector(state => state.bussDataReducer.inn)
  const BUSS_KPP = useAppSelector(state => state.bussDataReducer.kpp)
  const BUSS_OGRN = useAppSelector(state => state.bussDataReducer.ogrn)
  const YUR_ADDRESS = useAppSelector(state => state.bussDataReducer.yurAddress)
  const POST_ADDRESS = useAppSelector(state => state.bussDataReducer.postAddress)
  const BOSS_NAME = useAppSelector(state => state.bussDataReducer.boss.name)
  const BOSS_TYPE = useAppSelector(state => state.bussDataReducer.boss.type)
  const BUSS_FOCUS = useAppSelector(state => state.bussDataReducer.focused)

  // ----------------------------------------------------------------
  // данные для заведения текста о себе
  // ----------------------------------------------------------------

  const ABOUT_TEXT = useAppSelector(state => state.aboutTextReducer.aboutText)
  const ABOUT_FOCUS = useAppSelector(state => state.aboutTextReducer.focused)

  // ----------------------------------------------------------------
  // данные для приглашения в команду
  // ----------------------------------------------------------------

  const INVITE_FEE = useAppSelector(state => state.inviteFromReducer.fee)
  const INVITE_COMMENT = useAppSelector(state => state.inviteFromReducer.comment)
  const INVITE_FOCUS = useAppSelector(state => state.inviteFromReducer.focused)

  interface IState {
    showPassword: boolean,
    password: string
  }

  const [ taskDateStart, setTaskDateStart ] = React.useState<Dayjs | null>(null)
  const [ taskDateFinish, setTaskDateFinish ] = React.useState<Dayjs | null>(null)
  const [ taskExpertDate, setTaskExpertDate ] = React.useState<Dayjs | null>(null)
  const [ respondDateFinish, setRespondDateFinish ] = React.useState<Dayjs | null>(null)
  const [ respondDateExpert, setRespondDateExpert ] = React.useState<Dayjs | null>(null)

  const [ values, setValues ] = useState<IState>({
    showPassword: false,
    password: ''
  })

  const CustomTextField = styled(TextField)({
    '& .MuiInputLabel-root': {}, 
    // ----------------------------------------------------------------
    // placeholder стилизуется в строке выше
    // ----------------------------------------------------------------
    '& .MuiInputLabel-shrink': {
      marginLeft: labelShrinkLeft,
    },
    '& .MuiInputBase-input': {
      fontSize: '15px',
    },
    '& .MuiOutlinedInput-input': {
      paddingBottom: '18px',
    },
    '& .MuiInput-root:before': {
      borderBottom: '1px solid #2E2E2E',
      fontSize: '15px'
    },
    '& .MuiFormLabel-root': {
      fontSize: '15px',
      marginLeft: '2px',
      marginTop: heightValue === '50px'
        ? '-2.6px' 
        : heightValue === '56px'
        ? '-0.4px' : '-2.6px',
    },
    '& label.Mui-focused': {
      color: '#2E2E2E',
    },
    '& .MuiInput-underline:after': {
      display: 'none',
      borderBottomColor: '#2E2E2E',
    },
    '& .MuiOutlinedInput-root': {
      height: heightValue,
        '& fieldset': {},
        '&:hover fieldset': {},
        '&.Mui-focused fieldset': {
          borderColor: '#167CBF'
        },
    },
  })

  // ----------------------------------------------------------------
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange = (prop: keyof IState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
    store && store[1](event.target.value)
  }

  const handleChangeSimple = (event: React.ChangeEvent<HTMLInputElement>) => { 
    event.preventDefault()
    store && store[1](event.target.value)
  } 

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------

  const reduceAuthState = (event: React.ChangeEvent<HTMLInputElement>) => {

    if ( store ) {

      store[0] === 'NAME' && event.target.value.length < 21 && dispatch(setName(event.target.value))
      store[0] === 'SURNAME' && event.target.value.length < 21 && dispatch(setSurname(event.target.value))
      store[0] === 'SECOND_NAME' && event.target.value.length < 21 && dispatch(setSecondName(event.target.value))
      store[0] === 'EMAIL' && event.target.value.length < 41 && dispatch(setEmail(event.target.value))
      store[0] === 'NUMBER' && event.target.value.replace(/\D/g,'').length < 12 && dispatch(setNumber(event.target.value.replace(/\D/g,'')))
      store[0] === 'SPEC' && dispatch(setSpec(event.target.value))
      store[0] === 'PASSWORD' && dispatch(setPassword(event.target.value))
      store[0] === 'CODE' && dispatch(setCode(event.target.value))

      store[0] === 'PASSWORD_ENTER' && dispatch(setPasswordEnter(event.target.value))
      store[0] === 'EMAIL_ENTER' && dispatch(setEmailEnter(event.target.value))

      if ( store[0] === 'ORG_NAME' ) {
        dispatch(setName(event.target.value))
        dispatch(setSurname(event.target.value))
      }

      store[0] === 'NAME' && dispatch(setFocused('NAME'))
      store[0] === 'SURNAME' && dispatch(setFocused('SURNAME'))
      store[0] === 'SECOND_NAME' && dispatch(setFocused('SECOND_NAME'))
      store[0] === 'EMAIL' && dispatch(setFocused('EMAIL'))
      store[0] === 'NUMBER' && dispatch(setFocused('NUMBER'))
      store[0] === 'SPEC' && dispatch(setFocused('SPEC'))
      store[0] === 'PASSWORD' && dispatch(setFocused('PASSWORD'))
      store[0] === 'CODE' && dispatch(setFocused('CODE'))

      store[0] === 'PASSWORD_ENTER' && dispatch(setFocused('PASSWORD_ENTER'))
      store[0] === 'EMAIL_ENTER' && dispatch(setFocused('EMAIL_ENTER'))

      if ( store[0] === 'ORG_NAME' ) {
        dispatch(setFocused('ORG_NAME'))
      }

    }

  }

  const reduceAuthStateFocus = (event: any) => {

    if ( store ) {

      store[0] === 'NAME' && dispatch(setFocused('NAME'))
      store[0] === 'SURNAME' && dispatch(setFocused('SURNAME'))
      store[0] === 'SECOND_NAME' && dispatch(setFocused('SECOND_NAME'))
      store[0] === 'EMAIL' && dispatch(setFocused('EMAIL'))
      store[0] === 'NUMBER' && dispatch(setFocused('NUMBER'))
      store[0] === 'SPEC' && dispatch(setFocused('SPEC'))
      store[0] === 'PASSWORD' && dispatch(setFocused('PASSWORD'))
      store[0] === 'CODE' && dispatch(setFocused('CODE'))

      store[0] === 'PASSWORD_ENTER' && dispatch(setFocused('PASSWORD_ENTER'))
      store[0] === 'EMAIL_ENTER' && dispatch(setFocused('EMAIL_ENTER'))

      if ( store[0] === 'ORG_NAME' ) {
        dispatch(setFocused('ORG_NAME'))
      }

    }

  }

  const reduceAuthStateBlur = (event: any) => {

    if ( store ) {

      dispatch(setFocused(''))

    }

  }

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------

  const reduceNewTaskState = (event: React.ChangeEvent<HTMLInputElement>) => {

    if ( store ) {

      store[0] === 'TASK_TITLE' && event.target.value.length < 100 && dispatch(setTitle(event.target.value))
      
      store[0] === 'TASK_COAST' && event.target.value.replace(/\D/g,'').length < 8 && dispatch(setCoast(event.target.value.replace(/\D/g,'')))
      store[0] === 'TASK_COAST' && dispatch(setPrepay(''))
      store[0] === 'TASK_COAST' && dispatch(setExpertiseCoast(''))

      store[0] === 'TASK_PREPAY' 
        && Number(event.target.value.replace(/\D/g,'')) < ( Number(TASK_COAST) / 2 + 1 ) 
        && dispatch(setPrepay(event.target.value.replace(/\D/g,'')))
      store[0] === 'TASK_PREPAY_DAYS' && event.target.value.replace(/\D/g,'').length < 3 && dispatch(setPrepayDays(event.target.value.replace(/\D/g,'')))
      store[0] === 'TASK_EXPERT_COAST' 
        && Number(event.target.value.replace(/\D/g,'')) < (Number(TASK_COAST) - Number(TASK_PREPAY)) + 1
        && dispatch(setExpertiseCoast(event.target.value.replace(/\D/g,'')))
      store[0] === 'TASK_DESCRIPTION' && dispatch(setDescription(event.target.value))
      store[0] === 'TASK_OP_SQUARE' && event.target.value.replace(/\D/g,'').length < 6 && dispatch(setObjectParamsSquare(event.target.value.replace(/\D/g,'')))
      store[0] === 'TASK_OP_STOREYS' && Number(event.target.value.replace(/\D/g,'')) < 30 && dispatch(setObjectParamsStoreys(event.target.value.replace(/\D/g,'')))
      store[0] === 'TASK_OP_HEIGHT' && event.target.value.replace(/\D/g,'').length < 4 && dispatch(setObjectParamsHeight(event.target.value.replace(/\D/g,'')))
      store[0] === 'TASK_CHAPTER_NAME' && dispatch(setChapterLN(event.target.value))
      store[0] === 'TASK_CHAPTER_DESCR' && dispatch(setChapterLD(event.target.value))

      store[0] === 'TASK_TITLE' && dispatch(setFocusedTask('TASK_TITLE'))
      store[0] === 'TASK_COAST' && dispatch(setFocusedTask('TASK_COAST'))
      store[0] === 'TASK_PREPAY' && dispatch(setFocusedTask('TASK_PREPAY'))
      store[0] === 'TASK_PREPAY_DAYS' && dispatch(setFocusedTask('TASK_PREPAY_DAYS'))
      store[0] === 'TASK_EXPERT_COAST' && dispatch(setFocusedTask('TASK_EXPERT_COAST'))
      store[0] === 'TASK_DESCRIPTION' && dispatch(setFocusedTask('TASK_DESCRIPTION'))
      store[0] === 'TASK_OP_SQUARE' && dispatch(setFocusedTask('TASK_OP_SQUARE'))
      store[0] === 'TASK_OP_STOREYS' && dispatch(setFocusedTask('TASK_OP_STOREYS'))
      store[0] === 'TASK_OP_HEIGHT' && dispatch(setFocusedTask('TASK_OP_HEIGHT'))
      store[0] === 'TASK_CHAPTER_NAME' && dispatch(setFocusedTask('TASK_CHAPTER_NAME'))
      store[0] === 'TASK_CHAPTER_DESCR' && dispatch(setFocusedTask('TASK_CHAPTER_DESCR'))

    }

  }

  const reduceNewTaskStateFocus = (event: any) => {

    if ( store ) {

      store[0] === 'TASK_TITLE' && dispatch(setFocusedTask('TASK_TITLE'))
      store[0] === 'TASK_COAST' && dispatch(setFocusedTask('TASK_COAST'))
      store[0] === 'TASK_PREPAY' && dispatch(setFocusedTask('TASK_PREPAY'))
      store[0] === 'TASK_PREPAY_DAYS' && dispatch(setFocusedTask('TASK_PREPAY_DAYS'))
      store[0] === 'TASK_EXPERT_COAST' && dispatch(setFocusedTask('TASK_EXPERT_COAST'))
      store[0] === 'TASK_DESCRIPTION' && dispatch(setFocusedTask('TASK_DESCRIPTION'))
      store[0] === 'TASK_OP_SQUARE' && dispatch(setFocusedTask('TASK_OP_SQUARE'))
      store[0] === 'TASK_OP_STOREYS' && dispatch(setFocusedTask('TASK_OP_STOREYS'))
      store[0] === 'TASK_OP_HEIGHT' && dispatch(setFocusedTask('TASK_OP_HEIGHT'))
      store[0] === 'TASK_CHAPTER_NAME' && dispatch(setFocusedTask('TASK_CHAPTER_NAME'))
      store[0] === 'TASK_CHAPTER_DESCR' && dispatch(setFocusedTask('TASK_CHAPTER_DESCR'))

    }

  }

  const reduceNewTaskStateBlur = (event: any) => {

    if ( store ) {

      dispatch(setFocusedTask(''))

    }

  }

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------

  const reduceRespondState = (event: React.ChangeEvent<HTMLInputElement>) => {

    if ( store ) {

      store[0] === 'RESPOND_DEADLINE' && dispatch(setDeadline(event.target.value))
      store[0] === 'RESPOND_COAST' 
        && event.target.value.replace(/\D/g,'').length < 8 
        && dispatch(setCoastRespond(event.target.value.replace(/\D/g,'')))
      store[0] === 'RESPOND_COAST' && dispatch(setPrepayRespond(''))
      store[0] === 'RESPOND_COAST' && dispatch(setExpertCoast(''))

      store[0] === 'RESPOND_SOLUTION' && event.target.value.replace(/\D/g,'').length < 3 && dispatch(setSolution(event.target.value))
      store[0] === 'RESPOND_PREPAY' 
        && Number(event.target.value.replace(/\D/g,'')) < ( Number(RESPOND_COAST) / 2 + 1 ) 
        && dispatch(setPrepayRespond(event.target.value.replace(/\D/g,'')))
      store[0] === 'RESPOND_EXPERT' && dispatch(setExpert(event.target.value))
      store[0] === 'RESPOND_EXPERT_COAST' 
        && Number(event.target.value.replace(/\D/g,'')) < (Number(RESPOND_COAST) - Number(RESPOND_PREPAY)) + 1
        && dispatch(setExpertCoast(event.target.value.replace(/\D/g,'')))
      store[0] === 'RESPOND_COMMENT' && dispatch(setComment(event.target.value))
      store[0] === 'RESPOND_FOCUS' && dispatch(setFocusedRespond(event.target.value))
      store[0] === 'RESPOND_DATE_FINISH' && dispatch(setDateFinishRespond(event.target.value))
      store[0] === 'RESPOND_DATE_EXPERT' && dispatch(setDateExpert(event.target.value))

      store[0] === 'RESPOND_DEADLINE' && dispatch(setFocusedRespond('RESPOND_DEADLINE'))
      store[0] === 'RESPOND_COAST' && dispatch(setFocusedRespond('RESPOND_COAST'))
      store[0] === 'RESPOND_SOLUTION' && dispatch(setFocusedRespond('RESPOND_SOLUTION'))
      store[0] === 'RESPOND_PREPAY' && dispatch(setFocusedRespond('RESPOND_PREPAY'))
      store[0] === 'RESPOND_EXPERT' && dispatch(setFocusedRespond('RESPOND_EXPERT'))
      store[0] === 'RESPOND_EXPERT_COAST' && dispatch(setFocusedRespond('RESPOND_EXPERT_COAST'))
      store[0] === 'RESPOND_COMMENT' && dispatch(setFocusedRespond('RESPOND_COMMENT'))
      store[0] === 'RESPOND_FOCUS' && dispatch(setFocusedRespond('RESPOND_FOCUS'))
      store[0] === 'RESPOND_DATE_FINISH' && dispatch(setFocusedRespond('RESPOND_DATE_FINISH'))
      store[0] === 'RESPOND_DATE_EXPERT' && dispatch(setFocusedRespond('RESPOND_DATE_EXPERT'))

    }

  }

  const reduceRespondStateFocus = (event: any) => {

    if ( store ) {

      store[0] === 'RESPOND_DEADLINE' && dispatch(setFocusedRespond('RESPOND_DEADLINE'))
      store[0] === 'RESPOND_COAST' && dispatch(setFocusedRespond('RESPOND_COAST'))
      store[0] === 'RESPOND_SOLUTION' && dispatch(setFocusedRespond('RESPOND_SOLUTION'))
      store[0] === 'RESPOND_PREPAY' && dispatch(setFocusedRespond('RESPOND_PREPAY'))
      store[0] === 'RESPOND_EXPERT' && dispatch(setFocusedRespond('RESPOND_EXPERT'))
      store[0] === 'RESPOND_EXPERT_COAST' && dispatch(setFocusedRespond('RESPOND_EXPERT_COAST'))
      store[0] === 'RESPOND_COMMENT' && dispatch(setFocusedRespond('RESPOND_COMMENT'))
      store[0] === 'RESPOND_FOCUS' && dispatch(setFocusedRespond('RESPOND_FOCUS'))
      store[0] === 'RESPOND_DATE_FINISH' && dispatch(setFocusedRespond('RESPOND_DATE_FINISH'))
      store[0] === 'RESPOND_DATE_EXPERT' && dispatch(setFocusedRespond('RESPOND_DATE_EXPERT'))

    }

  }
  const reduceRespondStateBlur = (event: any) => {

    if ( store ) {

      dispatch(setFocusedRespond(''))

    }

  }

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------

  const reducePassportData = (event: React.ChangeEvent<HTMLInputElement>) => {

    if ( store ) {

      store[0] === 'PASSPORT_SERI' && event.target.value.length < 5 && dispatch(setSeri(event.target.value))
      store[0] === 'PASSPORT_NUMBER' && event.target.value.length < 7 && dispatch(setNumPas(event.target.value))
      store[0] === 'PASSPORT_WHO_GET' && dispatch(setWho(event.target.value))
      store[0] === 'PASSPORT_ADRESS' && dispatch(setAdress(event.target.value))
      store[0] === 'PASSPORT_SNILS' && event.target.value.length < 12 && dispatch(setSnils(event.target.value))
      store[0] === 'PASSPORT_INN' && event.target.value.length < 13 && dispatch(setInn(event.target.value))

      store[0] === 'PASSPORT_SERI' && dispatch(setFocusedPas('PASSPORT_SERI'))
      store[0] === 'PASSPORT_NUMBER' && dispatch(setFocusedPas('PASSPORT_NUMBER'))
      store[0] === 'PASSPORT_WHO_GET' && dispatch(setFocusedPas('PASSPORT_WHO_GET'))
      store[0] === 'PASSPORT_ADRESS' && dispatch(setFocusedPas('PASSPORT_ADRESS'))
      store[0] === 'PASSPORT_SNILS' && dispatch(setFocusedPas('PASSPORT_SNILS'))
      store[0] === 'PASSPORT_INN' && dispatch(setFocusedPas('PASSPORT_INN'))

    }

  }

  const reducePassportDataFocus = (event: any) => {

    if ( store ) {

      store[0] === 'PASSPORT_SERI' && dispatch(setFocusedPas('PASSPORT_SERI'))
      store[0] === 'PASSPORT_NUMBER' && dispatch(setFocusedPas('PASSPORT_NUMBER'))
      store[0] === 'PASSPORT_WHO_GET' && dispatch(setFocusedPas('PASSPORT_WHO_GET'))
      store[0] === 'PASSPORT_ADRESS' && dispatch(setFocusedPas('PASSPORT_ADRESS'))
      store[0] === 'PASSPORT_SNILS' && dispatch(setFocusedPas('PASSPORT_SNILS'))
      store[0] === 'PASSPORT_INN' && dispatch(setFocusedPas('PASSPORT_INN'))

    }

  }

  const reducePassportDataBlur = (event: any) => {

    if ( store ) {

      dispatch(setFocusedPas(''))

    }

  }

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------

  const reduceFilterData = (event: React.ChangeEvent<HTMLInputElement>) => {

    if ( store ) {

      store[0] === 'FROM_COAST' && dispatch(setFromCoast(event.target.value.replace(/\D/g,'')))
      store[0] === 'TO_COAST' && dispatch(setToCoast(event.target.value.replace(/\D/g,'')))

      store[0] === 'FROM_COAST' && dispatch(setFocusedFilter('FROM_COAST'))
      store[0] === 'TO_COAST' && dispatch(setFocusedFilter('TO_COAST'))

    }

  }

  const reduceFilterDataFocus = (event: any) => {

    if ( store ) {

      dispatch(setUpdating(false))

      store[0] === 'FROM_COAST' && dispatch(setFocusedFilter('FROM_COAST'))
      store[0] === 'TO_COAST' && dispatch(setFocusedFilter('TO_COAST'))

    }

  }

  const reduceFilterDataBlur = (event: any) => {

    if ( store ) {

      dispatch(setFocusedFilter(''))

    }

  }

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------

  const reduceBussData = (event: React.ChangeEvent<HTMLInputElement>) => {

    if ( store ) {

      store[0] === 'SHORT_NAME' && dispatch(setShortName(event.target.value))
      store[0] === 'FULL_NAME' && dispatch(setFullName(event.target.value))
      store[0] === 'BUSS_INN' && dispatch(setInnBuss(event.target.value.replace(/\D/g,'')))
      store[0] === 'BUSS_KPP' && dispatch(setKpp(event.target.value.replace(/\D/g,'')))
      store[0] === 'BUSS_OGRN' && dispatch(setOgrn(event.target.value.replace(/\D/g,'')))
      store[0] === 'YUR_ADDRESS' && dispatch(setYurAddress(event.target.value))
      store[0] === 'POST_ADDRESS' && dispatch(setPostAddress(event.target.value))
      store[0] === 'BOSS_NAME' && dispatch(setBossName(event.target.value))
      store[0] === 'BOSS_TYPE' && dispatch(setBossType(Number(event.target.value)))

      store[0] === 'SHORT_NAME' && dispatch(setFocusedBuss('SHORT_NAME'))
      store[0] === 'FULL_NAME' && dispatch(setFocusedBuss('FULL_NAME'))
      store[0] === 'BUSS_INN' && dispatch(setFocusedBuss('BUSS_INN'))
      store[0] === 'BUSS_KPP' && dispatch(setFocusedBuss('BUSS_KPP'))
      store[0] === 'BUSS_OGRN' && dispatch(setFocusedBuss('BUSS_OGRN'))
      store[0] === 'YUR_ADDRESS' && dispatch(setFocusedBuss('YUR_ADDRESS'))
      store[0] === 'POST_ADDRESS' && dispatch(setFocusedBuss('POST_ADDRESS'))
      store[0] === 'BOSS_NAME' && dispatch(setFocusedBuss('BOSS_NAME'))
      store[0] === 'BOSS_TYPE' && dispatch(setFocusedBuss('BOSS_TYPE'))

    }

  }

  const reduceBussDataFocus = (event: any) => {

    if ( store ) {

      dispatch(setUpdating(false))

      store[0] === 'SHORT_NAME' && dispatch(setFocusedBuss('SHORT_NAME'))
      store[0] === 'FULL_NAME' && dispatch(setFocusedBuss('FULL_NAME'))
      store[0] === 'BUSS_INN' && dispatch(setFocusedBuss('BUSS_INN'))
      store[0] === 'BUSS_KPP' && dispatch(setFocusedBuss('BUSS_KPP'))
      store[0] === 'BUSS_OGRN' && dispatch(setFocusedBuss('BUSS_OGRN'))
      store[0] === 'YUR_ADDRESS' && dispatch(setFocusedBuss('YUR_ADDRESS'))
      store[0] === 'POST_ADDRESS' && dispatch(setFocusedBuss('POST_ADDRESS'))
      store[0] === 'BOSS_NAME' && dispatch(setFocusedBuss('BOSS_NAME'))
      store[0] === 'BOSS_TYPE' && dispatch(setFocusedBuss('BOSS_TYPE'))

    }

  }

  const reduceBussDataBlur = (event: any) => {

    if ( store ) {

      dispatch(setFocusedBuss(''))

    }

  }

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------

  const reduceAboutText = (event: React.ChangeEvent<HTMLInputElement>) => {

    if ( store ) {

      store[0] === 'ABOUT_TEXT' && dispatch(setAboutText(event.target.value))
      store[0] === 'ABOUT_TEXT' && dispatch(setFocusedAboutText('ABOUT_TEXT'))

    }

  }

  const reduceAboutTextFocus = (event: any) => {

    if ( store ) {

      dispatch(setUpdating(false))

      store[0] === 'ABOUT_TEXT' && dispatch(setFocusedAboutText('ABOUT_TEXT'))

    }

  }

  const reduceAboutTextBlur = (event: any) => {

    if ( store ) {

      dispatch(setFocusedAboutText(''))

    }

  }

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------

  const reduceInviteForm = (event: React.ChangeEvent<HTMLInputElement>) => {

    if ( store ) {

      store[0] === 'INVITE_FEE' && dispatch(setFee(event.target.value.replace(/\D/g,'')))
      store[0] === 'INVITE_COMMENT' && dispatch(setCommentInvite(event.target.value))

      store[0] === 'INVITE_COMMENT' && dispatch(setFocusedInvite('INVITE_COMMENT'))
      store[0] === 'INVITE_FEE' && dispatch(setFocusedInvite('INVITE_FEE'))

    }

  }

  const reduceInviteFormFocus = (event: any) => {

    if ( store ) {

      store[0] === 'INVITE_COMMENT' && dispatch(setFocusedInvite('INVITE_COMMENT'))
      store[0] === 'INVITE_FEE' && dispatch(setFocusedInvite('INVITE_FEE'))

    }

  }

  const reduceInviteFormBlur = (event: any) => {

    if ( store ) {

      dispatch(setFocusedInvite(''))

    }

  }

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------

  const clickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const mouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()

  const baseInputValueChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    store && store[1](event.target.value)
  }

  useEffect(() => {

    dispatch(setDateStart(taskDateStart))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ taskDateStart ])
  useEffect(() => {

    dispatch(setDateFinish(taskDateFinish))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ taskDateFinish ])
  useEffect(() => {

    dispatch(setExpertiseDays(taskExpertDate))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ taskExpertDate ])
  useEffect(() => {

    dispatch(setDateFinishRespond(respondDateFinish))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ respondDateFinish ])
  useEffect(() => {

    dispatch(setDateExpert(respondDateExpert))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ respondDateExpert ])

  return (
    <React.Fragment>
      <InputWrapper isPercent={widthType} width={widthValue}>

        { type === 'TEXT_INPUT_LINE'
          ? <CustomTextField 
              type={valueType}
              id="standard-basic-line" 
              label={label} 
              error={isError}
              disabled={isDisabled}
              autoComplete={"off"}
              variant="standard"
              style={{
                ...css,
                width: '100%'
              }} 
            />
          : type === 'TEXT_INPUT_OUTLINE'
          ? <CustomTextField 
              ref={inputRef}
              type={valueType}
              value={store && store[0]}
              onChange={handleChangeSimple}
              id="standard-basic-outline" 
              label={label}
              error={isError}
              disabled={isDisabled}
              autoComplete={"off"}
              style={{
                ...css,
                width: '100%'
              }} 
            />

          // ---------------------------------------------------------------- !!! 
          // данный тип интпута создан временно, нужно перекинуть функционал
          // на типа просто TEXT_INPUT_OUTLINE 
          // ---------------------------------------------------------------- !!!

          : type === 'TEXT_INPUT_OUTLINE_FILTER'
          ? <CustomTextField 
              ref={inputRef}
              type={valueType}
              value={
                !store ? '' :
                  store[0] === 'FROM_COAST' ? FROM_COAST :
                  store[0] === 'TO_COAST' ? TO_COAST : ''
              }
              onChange={reduceFilterData}
              onFocus={reduceFilterDataFocus}
              onBlur={reduceFilterDataBlur}
              autoFocus={store && FILTER_FOCUS === store[0] && true}
              id="standard-basic-task" 
              label={label}
              error={isError}
              disabled={isDisabled}
              autoComplete={"off"}
              style={{
                ...css,
                width: '100%'
              }} 
            />

          // ---------------------------------------------------------------- !!! 
          // данный тип интпута создан временно, нужно перекинуть функционал
          // на типа просто TEXT_INPUT_OUTLINE 
          // ---------------------------------------------------------------- !!!

          : type === 'TEXT_INPUT_OUTLINE_NEW_TASK'
          ? <CustomTextField 
              ref={inputRef}
              type={valueType}
              value={
                !store ? '' :
                  store[0] === 'TASK_TITLE' ? TASK_TITLE :
                  store[0] === 'TASK_COAST' ? TASK_COAST :
                  store[0] === 'TASK_PREPAY' ? TASK_PREPAY :
                  store[0] === 'TASK_EXPERT_COAST' ? TASK_EXPERT_COAST :
                  store[0] === 'TASK_DESCRIPTION' ? TASK_DESCRIPTION : 
                  store[0] === 'TASK_CHAPTER_NAME' ? TASK_CHAPTER_NAME :
                  store[0] === 'TASK_CHAPTER_DESCR' ? TASK_CHAPTER_DESCR : ''
              }
              onChange={reduceNewTaskState}
              onFocus={reduceNewTaskStateFocus}
              onBlur={reduceNewTaskStateBlur}
              autoFocus={store && TASK_FOCUS === store[0] && true}
              id="standard-basic-task" 
              label={label}
              error={isError}
              disabled={isDisabled}
              autoComplete={"off"}
              style={{
                ...css,
                width: '100%'
              }} 
            />

          // ---------------------------------------------------------------- !!! 
          // данный тип интпута создан временно, нужно перекинуть функционал
          // на типа просто TEXT_INPUT_OUTLINE 
          // ---------------------------------------------------------------- !!!

          : type === 'TEXT_INPUT_OUTLINE_DOCS'
          ? <CustomTextField 
              ref={inputRef}
              type={valueType}
              value={
                !store ? '' :
                  store[0] === 'PASSPORT_SERI' ? PASSPORT_SERI :
                  store[0] === 'PASSPORT_NUMBER' ? PASSPORT_NUMBER :
                  store[0] === 'PASSPORT_WHO_GET' ? PASSPORT_WHO_GET :
                  store[0] === 'PASSPORT_ADRESS' ? PASSPORT_ADRESS :
                  store[0] === 'PASSPORT_SNILS' ? PASSPORT_SNILS : 
                  store[0] === 'PASSPORT_INN' ? PASSPORT_INN : ''
              }
              onChange={reducePassportData}
              onFocus={reducePassportDataFocus}
              onBlur={reducePassportDataBlur}
              autoFocus={store && PASSPORT_FOCUS === store[0] && true}
              id="standard-basic-task" 
              label={label}
              error={isError}
              disabled={isDisabled}
              autoComplete={"off"}
              style={{
                ...css,
                width: '100%'
              }} 
            />

          // ---------------------------------------------------------------- !!! 
          // данный тип интпута создан временно, нужно перекинуть функционал
          // на типа просто TEXT_INPUT_OUTLINE 
          // ---------------------------------------------------------------- !!!

          : type === 'TEXT_INPUT_OUTLINE_DOCS_BUSS'
          ? <CustomTextField 
              ref={inputRef}
              type={valueType}
              value={
                !store ? '' :
                  store[0] === 'SHORT_NAME' ? SHORT_NAME :
                  store[0] === 'FULL_NAME' ? FULL_NAME :
                  store[0] === 'BUSS_INN' ? BUSS_INN :
                  store[0] === 'BUSS_KPP' ? BUSS_KPP :
                  store[0] === 'BUSS_OGRN' ? BUSS_OGRN : 
                  store[0] === 'YUR_ADDRESS' ? YUR_ADDRESS :
                  store[0] === 'POST_ADDRESS' ? POST_ADDRESS :
                  store[0] === 'BOSS_NAME' ? BOSS_NAME :
                  store[0] === 'BOSS_TYPE' ? BOSS_TYPE : ''
              }
              onChange={reduceBussData}
              onFocus={reduceBussDataFocus}
              onBlur={reduceBussDataBlur}
              autoFocus={store && BUSS_FOCUS === store[0] && true}
              id="standard-basic-task" 
              label={label}
              error={isError}
              disabled={isDisabled}
              autoComplete={"off"}
              style={{
                ...css,
                width: '100%'
              }} 
            />  

          // ---------------------------------------------------------------- !!! 
          // данный тип интпута создан временно, нужно перекинуть функционал
          // на типа просто TEXT_INPUT_OUTLINE 
          // ---------------------------------------------------------------- !!!

          : type === 'TEXT_INPUT_OUTLINE_ABOUT_TEXT'
          ? <CustomTextField 
              ref={inputRef}
              type={valueType}
              value={
                !store ? '' :
                  store[0] === 'ABOUT_TEXT' ? ABOUT_TEXT : ''
              }
              onChange={reduceAboutText}
              onFocus={reduceAboutTextFocus}
              onBlur={reduceAboutTextBlur}
              autoFocus={store && ABOUT_FOCUS === store[0] && true}
              id="standard-basic-task" 
              label={label}
              error={isError}
              disabled={isDisabled}
              autoComplete={"off"}
              style={{
                ...css,
                width: '100%'
              }} 
            />  

          // ---------------------------------------------------------------- !!! 
          // данный тип интпута создан временно, нужно перекинуть функционал
          // на типа просто TEXT_INPUT_OUTLINE 
          // ---------------------------------------------------------------- !!!

          : type === 'TEXT_INPUT_OUTLINE_INVITE'
          ? <CustomTextField 
              ref={inputRef}
              type={valueType}
              value={
                !store ? '' :
                  store[0] === 'INVITE_FEE' ? INVITE_FEE :
                  store[0] === 'INVITE_COMMENT' ? INVITE_COMMENT : ''
              }
              onChange={reduceInviteForm}
              onFocus={reduceInviteFormFocus}
              onBlur={reduceInviteFormBlur}
              autoFocus={store && INVITE_FOCUS === store[0] && true}
              id="standard-basic-task" 
              label={label}
              error={isError}
              disabled={isDisabled}
              autoComplete={"off"}
              style={{
                ...css,
                width: '100%'
              }} 
            />  

          // ---------------------------------------------------------------- !!! 
          // данный тип интпута создан временно, нужно перекинуть функционал
          // на типа просто TEXT_INPUT_OUTLINE 
          // ---------------------------------------------------------------- !!!

          : type === 'TEXT_INPUT_OUTLINE_INLABEL_TASK'
          ? <CustomTextField 
              required={required}
              type={valueType}
              value={
                !store ? '' :
                  store[0] === 'TASK_PREPAY_DAYS' ? TASK_PREPAY_DAYS :
                  store[0] === 'TASK_OP_SQUARE' ? TASK_OP_SQUARE :
                  store[0] === 'TASK_OP_STOREYS' ? TASK_OP_STOREYS :
                  store[0] === 'TASK_OP_HEIGHT' ? TASK_OP_HEIGHT : ''
              }
              onChange={reduceNewTaskState}
              onFocus={reduceNewTaskStateFocus}
              onBlur={reduceNewTaskStateBlur}
              autoFocus={store && TASK_FOCUS === store[0] && true}
              id="standard-basic-params" 
              label={label}
              error={isError}
              disabled={isDisabled}
              autoComplete={"off"}
              InputProps={{
                endAdornment: 
                  <InputAdornment 
                    position="end"
                    style={{ marginRight: '6px' }}
                  >{ innerLabel }</InputAdornment>
              }}
              style={{
                ...css,
                width: '100%'
              }} 
            />

          // ---------------------------------------------------------------- !!! 
          // данный тип интпута создан временно, нужно перекинуть функционал
          // на типа просто TEXT_INPUT_OUTLINE 
          // ---------------------------------------------------------------- !!!

          : type === 'TEXT_INPUT_OUTLINE_AUTH'
          ? <CustomTextField 
              ref={inputRef}
              type={valueType}
              value={
                !store ? '' :
                  store[0] === 'SURNAME' ? SURNAME :
                  store[0] === 'NAME' ? NAME :
                  store[0] === 'ORG_NAME' ? NAME :
                  store[0] === 'SECOND_NAME' ? SECOND_NAME :
                  store[0] === 'EMAIL' ? EMAIL :
                  store[0] === 'EMAIL_ENTER' ? EMAIL_ENTER :
                  store[0] === 'NUMBER' ? NUMBER :
                  store[0] === 'PASSWORD' ? PASSWORD : 
                  store[0] === 'CODE' ? CODE : ''
              }
              onChange={reduceAuthState}
              onFocus={reduceAuthStateFocus}
              onBlur={reduceAuthStateBlur}
              autoFocus={store && FOCUS === store[0] && true}
              id="standard-basic-auth" 
              label={label}
              error={isError}
              disabled={isDisabled}
              autoComplete={"off"}
              InputProps={{
                endAdornment: 
                  <InputAdornment 
                    position="end"
                    style={{ marginRight: '6px' }}
                  >
                    { !store ? 0 :
                      store[0] === 'SURNAME' ? 20 - SURNAME.length :
                      store[0] === 'NAME' ? 20 - NAME.length :
                      store[0] === 'ORG_NAME' ? 20 - NAME.length :
                      store[0] === 'SECOND_NAME' ? 20 - SECOND_NAME.length :
                      store[0] === 'EMAIL' ? 40 - EMAIL.length :
                      store[0] === 'EMAIL_ENTER' ? 40 - EMAIL_ENTER.length : 
                      store[0] === 'NUMBER' ? 11 - NUMBER.length :
                      store[0] === 'PASSWORD' ? 30 - PASSWORD.length :
                      store[0] === 'CODE' ? CODE : 0 }
                  </InputAdornment>
              }}
              style={{
                ...css,
                width: '100%'
              }} 
            />

          // ---------------------------------------------------------------- !!! 
          // данный тип интпута создан временно, нужно перекинуть функционал
          // на типа просто TEXT_INPUT_OUTLINE 
          // ---------------------------------------------------------------- !!!

          : type === 'TEXT_INPUT_OUTLINE_RESPOND'
          ? <CustomTextField 
              ref={inputRef}
              type={valueType}
              value={
                !store ? '' :
                  store[0] === 'RESPOND_DEADLINE' ? RESPOND_DEADLINE :
                  store[0] === 'RESPOND_COAST' ? RESPOND_COAST :
                  store[0] === 'RESPOND_SOLUTION' ? RESPOND_SOLUTION :
                  store[0] === 'RESPOND_PREPAY' ? RESPOND_PREPAY :
                  store[0] === 'RESPOND_EXPERT' ? RESPOND_EXPERT :
                  store[0] === 'RESPOND_EXPERT_COAST' ? RESPOND_EXPERT_COAST :
                  store[0] === 'RESPOND_COMMENT' ? RESPOND_COMMENT :
                  store[0] === 'RESPOND_FOCUS' ? RESPOND_FOCUS : ''
              }
              onChange={reduceRespondState}
              onFocus={reduceRespondStateFocus}
              onBlur={reduceRespondStateBlur}
              autoFocus={store && RESPOND_FOCUS === store[0] && true}
              id="standard-basic-reposnd" 
              label={label}
              error={isError}
              disabled={isDisabled}
              autoComplete={"off"}
              style={{
                ...css,
                width: '100%'
              }} 
            />

          // ---------------------------------------------------------------- !!! 
          // данный тип интпута создан временно, нужно перекинуть функционал
          // на типа просто TEXT_INPUT_OUTLINE 
          // ---------------------------------------------------------------- !!!

          : type === 'TEXT_INPUT_OUTLINE_PASSWORD'
          ? <CustomTextField 
              type={'password'}
              required={required}
              id="standard-basic-password" 
              label={label}
              error={isError}
              disabled={isDisabled}
              autoComplete={"off"}
              style={{
                ...css,
                width: '100%'
              }} 
            />
          : type === 'TEXT_INPUT_OUTLINE_PASSWORD_VISIBILITY'
          ? <CustomTextField 
              type={values.showPassword ? 'text' : 'password'}
              defaultValue={defaultValue && defaultValue}
              value={ !store ? '' :
                store[0] === 'PASSWORD' ? PASSWORD : 
                store[0] === 'PASSWORD_ENTER' ? PASSWORD_ENTER : ''
              }
              required={required}
              id="standard-basic-password-visibility" 
              label={label}
              error={isError}
              disabled={isDisabled}
              autoComplete={"off"}
              onChange={reduceAuthState}
              onFocus={reduceAuthStateFocus}
              onBlur={reduceAuthStateBlur}
              autoFocus={store && FOCUS === store[0] && true}
              InputProps={{
                endAdornment: 
                  <InputAdornment position="end">
                    <IconButton 
                      style={{ marginRight: '0px' }} 
                      edge="end"
                      onClick={clickShowPassword}
                      onMouseDown={mouseDownPassword}
                    >
                      <Visibility></Visibility>
                    </IconButton>
                  </InputAdornment>
              }}
              style={{
                ...css,
                width: '100%'
              }} 
            />
          : type === 'TEXT_INPUT_OUTLINE_SEARCH'
          ? <CustomTextField 
              type={'text'}
              required={required}
              autoComplete={"off"}
              onFocus={() => dispatch(setUpdating(false))}
              onChange={baseInputValueChangeEvent}
              id="standard-basic-search" 
              label={label}
              error={isError}
              disabled={isDisabled}
              InputProps={{
                endAdornment: 
                  <InputAdornment position="end">
                    <IconButton 
                      style={{ marginRight: '-6px' }} 
                      edge="end"
                      onClick={clickShowPassword}
                      onMouseDown={mouseDownPassword}
                    >
                      <Search></Search>
                    </IconButton>
                  </InputAdornment>
              }}
              style={{
                ...css,
                width: '100%'
              }} 
            />
          : type === 'TEXT_INPUT_OUTLINE_DATE'
          ? <CustomTextField 
              type={'text'}
              defaultValue={""}
              required={required}
              autoComplete={"off"}
              id="standard-basic-date" 
              label={label}
              error={isError}
              disabled={isDisabled}
              InputProps={{
                endAdornment: 
                  <InputAdornment position="end">
                    <IconButton 
                      style={{ marginRight: '-6px' }} 
                      edge="end"
                      onClick={clickShowPassword}
                      onMouseDown={mouseDownPassword}
                    >
                      <CalendarTodayIcon></CalendarTodayIcon>
                    </IconButton>
                  </InputAdornment>
              }}
              style={{
                ...css,
                width: '100%'
              }} 
            />

          // ---------------------------------------------------------------- !!! 
          // варианты datepicker, нужно свести к одному
          // ---------------------------------------------------------------- !!!

          : type === 'TEXT_INPUT_OUTLINE_DATEPICK_TASK_DATE_START'
          ? <LocalizationProvider 
              dateAdapter={AdapterDayjs} 
              localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
            >
              <DemoContainer 
                sx={{ width: '100%' }} 
                components={['DatePicker']}
              >
                <DatePicker 
                  sx={{ backgroundColor: 'white', width: '100%' }} 
                  label={label} 
                  onChange={ newValue => {
                    setTaskDateStart(newValue)
                  }}
                  value={TASK_DATE_START}
                />
              </DemoContainer>
            </LocalizationProvider>
          : type === 'TEXT_INPUT_OUTLINE_DATEPICK_TASK_DATE_FINISH'
          ? <LocalizationProvider 
              dateAdapter={AdapterDayjs}
              localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
            >
              <DemoContainer 
                sx={{ width: '100%' }} 
                components={['DatePicker']}
              >
                <DatePicker 
                  sx={{ backgroundColor: 'white', width: '100%' }} 
                  label={label} 
                  onChange={ newValue => setTaskDateFinish(newValue)}
                  value={TASK_DATE_FINISH}
                />
              </DemoContainer>
            </LocalizationProvider>
          : type === 'TEXT_INPUT_OUTLINE_DATEPICK_TASK_DATE_EXPERT'
          ? <LocalizationProvider 
              dateAdapter={AdapterDayjs}
              localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
            >
              <DemoContainer 
                sx={{ width: '100%' }} 
                components={['DatePicker']}
              >
                <DatePicker 
                  sx={{ backgroundColor: 'white', width: '100%' }} 
                  label={label} 
                  onChange={ newValue => setTaskExpertDate(newValue)}
                  value={TASK_EXPERT_DAYS}
                />
              </DemoContainer>
            </LocalizationProvider>
          : type === 'TEXT_INPUT_OUTLINE_DATEPICK_RESPOND_DATE_FINISH'
          ? <LocalizationProvider 
              dateAdapter={AdapterDayjs}
              localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
            >
              <DemoContainer 
                sx={{ width: '100%' }} 
                components={['DatePicker']}
              >
                <DatePicker 
                  sx={{ backgroundColor: 'white', width: '100%' }} 
                  label={label} 
                  onChange={ newValue => setRespondDateFinish(newValue)}
                  value={RESPOND_DATE_FINISH}
                />
              </DemoContainer>
            </LocalizationProvider>
          : type === 'TEXT_INPUT_OUTLINE_DATEPICK_RESPOND_DATE_EXPERT'
          ? <LocalizationProvider 
              dateAdapter={AdapterDayjs}
              localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
            >
              <DemoContainer 
                sx={{ width: '100%' }} 
                components={['DatePicker']}
              >
                <DatePicker 
                  sx={{ backgroundColor: 'white', width: '100%' }} 
                  label={label} 
                  onChange={ newValue => setRespondDateExpert(newValue)}
                  value={RESPOND_DATE_EXPERT}
                />
              </DemoContainer>
            </LocalizationProvider>

          // ---------------------------------------------------------------- !!! 
          // базовый datepicker, нужно сделать вариативность
          // ---------------------------------------------------------------- !!!

          : type === 'TEXT_INPUT_OUTLINE_DATEPICK'
          ? <LocalizationProvider 
              dateAdapter={AdapterDayjs}
              localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
            >
              <DemoContainer 
                sx={{ width: '100%' }} 
                components={['DatePicker']}
              >
                <DatePicker 
                  sx={{ backgroundColor: 'white', width: '100%' }} 
                  label={label} 
                  onChange={ newValue => {
                    
                    if ( store ) {
                      store[0] === 'TASK_DATE_START' && setTaskDateStart(newValue)
                      store[0] === 'TASK_DATE_FINISH' && setTaskDateFinish(newValue)
                    }
                  }}
                  value={taskDateStart}
                />
              </DemoContainer>
            </LocalizationProvider>

          // ---------------------------------------------------------------- !!! 
          // базовый datepicker, нужно сделать вариативность
          // ---------------------------------------------------------------- !!!

          : type === 'TEXT_INPUT_OUTLINE_SEARCH'
          ? <CustomTextField 
              type={'search'}
              required={required}
              defaultValue={"Поиск по сайту"}
              id="standard-basic-search-site" 
              label={label}
              error={isError}
              disabled={isDisabled}
              autoComplete={"off"}
              style={{
                ...css,
                width: '100%'
              }} 
            />
          : type === 'TEXT_INPUT_OUTLINE_INLABEL'
          ? <CustomTextField 
              type={valueType}
              required={required}
              id="standard-basic" 
              label={label}
              error={isError}
              disabled={isDisabled}
              autoComplete={"off"}
              InputProps={{
                endAdornment: 
                  <InputAdornment 
                    position="end"
                    style={{ marginRight: '6px' }}
                  >{ innerLabel }</InputAdornment>
              }}
              style={{
                ...css,
                width: '100%'
              }} 
            />
          : <React.Fragment></React.Fragment> }
      </InputWrapper>
    </React.Fragment>
  )

}

export default InputComponent