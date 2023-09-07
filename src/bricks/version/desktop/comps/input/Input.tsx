// ----------------------------------------------------------------
/* eslint-disable @typescript-eslint/no-unused-vars */
// ----------------------------------------------------------------
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
import { setName as setNameSupport, 
  setEmail as setEmailSupport,
  setMessage as setMessageSupport,
  setFocused as setFocusedSupport } from '../../../../store/slices/support-form-slice'
import { setNewCoast, 
  setNewPrepay, 
  setNewExpert, 
  setNewText, 
  setFocused as setFocusedChangeAgree } from '../../../../store/slices/change-agree-slice'
import { setCaseName,
  setCaseSY,
  setCaseSM,
  setCaseFY,
  setCaseFM,
  setCasePay,
  setCaseParams1,
  setCaseParams2,
  setCaseParams3,
  setCaseParams4,
  setCaseText,
  setCaseTags,
  setFocused as setFocusedCase } from '../../../../store/slices/new-case-slice'
import {
  addInEducation1Title, 
  addInEducation1Finish,
  addInEducation1Special,

  addInEducation2Title, 
  addInEducation2Finish,
  addInEducation2Special,

  addInEducation3Title, 
  addInEducation3Finish,
  addInEducation3Special,

  addInSkills1Title,
  addInSkills1Site,
  addInSkills1Sm,
  addInSkills1Sy,
  addInSkills1Fm,
  addInSkills1Fy,
  addInSkills1NowTime,
  addInSkills1Job,
  addInSkills1JobTasks,

  addInSkills2Title,
  addInSkills2Site,
  addInSkills2Sm,
  addInSkills2Sy,
  addInSkills2Fm,
  addInSkills2Fy,
  addInSkills2NowTime,
  addInSkills2Job,
  addInSkills2JobTasks,

  addInSkills3Title,
  addInSkills3Site,
  addInSkills3Sm,
  addInSkills3Sy,
  addInSkills3Fm,
  addInSkills3Fy,
  addInSkills3NowTime,
  addInSkills3Job,
  addInSkills3JobTasks,

  addInSkills4Title,
  addInSkills4Site,
  addInSkills4Sm,
  addInSkills4Sy,
  addInSkills4Fm,
  addInSkills4Fy,
  addInSkills4NowTime,
  addInSkills4Job,
  addInSkills4JobTasks,

  addInSkills5Title,
  addInSkills5Site,
  addInSkills5Sm,
  addInSkills5Sy,
  addInSkills5Fm,
  addInSkills5Fy,
  addInSkills5NowTime,
  addInSkills5Job,
  addInSkills5JobTasks,

  addInSkills6Title,
  addInSkills6Site,
  addInSkills6Sm,
  addInSkills6Sy,
  addInSkills6Fm,
  addInSkills6Fy,
  addInSkills6NowTime,
  addInSkills6Job,
  addInSkills6JobTasks,

  removeFromEducation, 
  removeFromSkills,
  setFocused as setFocusedSkills
}  from '../../../../store/slices/new-skills-slice'

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

  // ----------------------------------------------------------------
  // данные для формы заявки в техподдержку
  // ----------------------------------------------------------------

  const SUPPORT_NAME = useAppSelector(state => state.supportFormReducer.name)
  const SUPPORT_EMAIL = useAppSelector(state => state.supportFormReducer.email)
  const SUPPORT_CATEGORY = useAppSelector(state => state.supportFormReducer.category)
  const SUPPORT_MESSAGE = useAppSelector(state => state.supportFormReducer.message)
  const SUPPORT_FOCUS = useAppSelector(state => state.supportFormReducer.focused)

  // ----------------------------------------------------------------
  // данные для формы дополнительного соглашения
  // ----------------------------------------------------------------

  const NEW_AGREE_COAST = useAppSelector(state => state.changeAgreeReducer.newCoast)
  const NEW_AGREE_PREPAY = useAppSelector(state => state.changeAgreeReducer.newPrepay)
  const NEW_AGREE_EXPERT = useAppSelector(state => state.changeAgreeReducer.newExpert)
  const NEW_AGREE_TEXT = useAppSelector(state => state.changeAgreeReducer.newText)
  const NEW_AGREE_FOCUS = useAppSelector(state => state.changeAgreeReducer.focused)

  // ----------------------------------------------------------------
  // данные для формы сохранения нового кейса
  // ----------------------------------------------------------------

  const CASE_NAME = useAppSelector(state => state.newCaseReducer.caseName)
  const CASE_SY = useAppSelector(state => state.newCaseReducer.caseStartYear)
  const CASE_SM = useAppSelector(state => state.newCaseReducer.caseStartMonth)
  const CASE_FY = useAppSelector(state => state.newCaseReducer.caseFinishYear)
  const CASE_FM = useAppSelector(state => state.newCaseReducer.caseFinishMonth)
  const CASE_PAY = useAppSelector(state => state.newCaseReducer.casePay)
  const CASE_P1 = useAppSelector(state => state.newCaseReducer.caseParams.one)
  const CASE_P2 = useAppSelector(state => state.newCaseReducer.caseParams.two)
  const CASE_P3 = useAppSelector(state => state.newCaseReducer.caseParams.three)
  const CASE_P4 = useAppSelector(state => state.newCaseReducer.caseParams.four)
  const CASE_TEXT = useAppSelector(state => state.newCaseReducer.caseText)
  const CASE_TAGS = useAppSelector(state => state.newCaseReducer.caseTags)
  const CASE_FOCUS = useAppSelector(state => state.newCaseReducer.focused)

  // ----------------------------------------------------------------
  // данные для формы сохранения образования и опыта
  // ----------------------------------------------------------------

  const EDUCATION_BLOCK_1 = useAppSelector(state => state.newSkillsReducer.education[0])
  const EDUCATION_BLOCK_2 = useAppSelector(state => state.newSkillsReducer.education[1])
  const EDUCATION_BLOCK_3 = useAppSelector(state => state.newSkillsReducer.education[2])

  const JOB_BLOCK_1 = useAppSelector(state => state.newSkillsReducer.skills[0])
  const JOB_BLOCK_2 = useAppSelector(state => state.newSkillsReducer.skills[1])
  const JOB_BLOCK_3 = useAppSelector(state => state.newSkillsReducer.skills[2])
  const JOB_BLOCK_4 = useAppSelector(state => state.newSkillsReducer.skills[3])
  const JOB_BLOCK_5 = useAppSelector(state => state.newSkillsReducer.skills[4])
  const JOB_BLOCK_6 = useAppSelector(state => state.newSkillsReducer.skills[5])

  const EDSKILL_FOCUS = useAppSelector(state => state.newSkillsReducer.focused)

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

  const reduceSupportForm = (event: React.ChangeEvent<HTMLInputElement>) => {

    if ( store ) {

      store[0] === 'SUPPORT_NAME' && dispatch(setNameSupport(event.target.value))
      store[0] === 'SUPPORT_MAIL' && dispatch(setEmailSupport(event.target.value))
      store[0] === 'SUPPORT_MESSAGE' && dispatch(setMessageSupport(event.target.value))

      store[0] === 'SUPPORT_NAME' && dispatch(setFocusedSupport('SUPPORT_NAME'))
      store[0] === 'SUPPORT_MAIL' && dispatch(setFocusedSupport('SUPPORT_MAIL'))
      store[0] === 'SUPPORT_MESSAGE' && dispatch(setFocusedSupport('SUPPORT_MESSAGE'))

    }

  }

  const reduceSupportFormFocus = (event: any) => {

    if ( store ) {

      store[0] === 'SUPPORT_NAME' && dispatch(setFocusedSupport('SUPPORT_NAME'))
      store[0] === 'SUPPORT_MAIL' && dispatch(setFocusedSupport('SUPPORT_MAIL'))
      store[0] === 'SUPPORT_MESSAGE' && dispatch(setFocusedSupport('SUPPORT_MESSAGE'))

    }

  }

  const reduceSupportFormBlur = (event: any) => {

    if ( store ) {

      dispatch(setFocusedSupport(''))

    }

  }

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------

  const reduceChangeAgreeForm = (event: React.ChangeEvent<HTMLInputElement>) => {

    if ( store ) {

      store[0] === 'NEW_COAST' && dispatch(setNewCoast(event.target.value))
      store[0] === 'NEW_PREPAY' && dispatch(setNewPrepay(event.target.value))
      store[0] === 'NEW_EXPERT' && dispatch(setNewExpert(event.target.value))
      store[0] === 'NEW_TEXT' && dispatch(setNewText(event.target.value))

      store[0] === 'NEW_COAST' && dispatch(setFocusedChangeAgree('NEW_COAST'))
      store[0] === 'NEW_PREPAY' && dispatch(setFocusedChangeAgree('NEW_PREPAY'))
      store[0] === 'NEW_EXPERT' && dispatch(setFocusedChangeAgree('NEW_EXPERT'))
      store[0] === 'NEW_TEXT' && dispatch(setFocusedChangeAgree('NEW_TEXT'))

    }

  }

  const reduceChangeAgreeFormFocus = (event: any) => {

    if ( store ) {

      store[0] === 'NEW_COAST' && dispatch(setFocusedChangeAgree('NEW_COAST'))
      store[0] === 'NEW_PREPAY' && dispatch(setFocusedChangeAgree('NEW_PREPAY'))
      store[0] === 'NEW_EXPERT' && dispatch(setFocusedChangeAgree('NEW_EXPERT'))
      store[0] === 'NEW_TEXT' && dispatch(setFocusedChangeAgree('NEW_TEXT'))

    }

  }

  const reduceChangeAgreeFormBlur = (event: any) => {

    if ( store ) {

      dispatch(setFocusedChangeAgree(''))

    }

  }

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------

  const reduceNewCaseForm = (event: React.ChangeEvent<HTMLInputElement>) => {

    if ( store ) {

      store[0] === 'CASE_NAME' && dispatch(setCaseName(event.target.value))
      store[0] === 'CASE_SY' && dispatch(setCaseSY(event.target.value))
      store[0] === 'CASE_SM' && dispatch(setCaseSM(event.target.value))
      store[0] === 'CASE_FY' && dispatch(setCaseFY(event.target.value))
      store[0] === 'CASE_FM' && dispatch(setCaseFM(event.target.value))
      store[0] === 'CASE_PAY' && dispatch(setCasePay(event.target.value))
      store[0] === 'CASE_P1' && dispatch(setCaseParams1(event.target.value))
      store[0] === 'CASE_P2' && dispatch(setCaseParams2(event.target.value))
      store[0] === 'CASE_P3' && dispatch(setCaseParams3(event.target.value))
      store[0] === 'CASE_P4' && dispatch(setCaseParams4(event.target.value))
      store[0] === 'CASE_TEXT' && dispatch(setCaseText(event.target.value))
      store[0] === 'CASE_TAGS' && dispatch(setCaseTags(event.target.value))

      store[0] === 'CASE_NAME' && dispatch(setFocusedCase('CASE_NAME'))
      store[0] === 'CASE_SY' && dispatch(setFocusedCase('CASE_SY'))
      store[0] === 'CASE_SM' && dispatch(setFocusedCase('CASE_SM'))
      store[0] === 'CASE_FY' && dispatch(setFocusedCase('CASE_FY'))
      store[0] === 'CASE_FM' && dispatch(setFocusedCase('CASE_FM'))
      store[0] === 'CASE_PAY' && dispatch(setFocusedCase('CASE_PAY'))
      store[0] === 'CASE_P1' && dispatch(setFocusedCase('CASE_P1'))
      store[0] === 'CASE_P2' && dispatch(setFocusedCase('CASE_P2'))
      store[0] === 'CASE_P3' && dispatch(setFocusedCase('CASE_P3'))
      store[0] === 'CASE_P4' && dispatch(setFocusedCase('CASE_P4'))
      store[0] === 'CASE_TEXT' && dispatch(setFocusedCase('CASE_TEXT'))
      store[0] === 'CASE_TAGS' && dispatch(setFocusedCase('CASE_TAGS'))

    }

  }

  const reduceNewCaseFormFocus = (event: any) => {

    if ( store ) {

      store[0] === 'CASE_NAME' && dispatch(setFocusedCase('CASE_NAME'))
      store[0] === 'CASE_SY' && dispatch(setFocusedCase('CASE_SY'))
      store[0] === 'CASE_SM' && dispatch(setFocusedCase('CASE_SM'))
      store[0] === 'CASE_FY' && dispatch(setFocusedCase('CASE_FY'))
      store[0] === 'CASE_FM' && dispatch(setFocusedCase('CASE_FM'))
      store[0] === 'CASE_PAY' && dispatch(setFocusedCase('CASE_PAY'))
      store[0] === 'CASE_P1' && dispatch(setFocusedCase('CASE_P1'))
      store[0] === 'CASE_P2' && dispatch(setFocusedCase('CASE_P2'))
      store[0] === 'CASE_P3' && dispatch(setFocusedCase('CASE_P3'))
      store[0] === 'CASE_P4' && dispatch(setFocusedCase('CASE_P4'))
      store[0] === 'CASE_TEXT' && dispatch(setFocusedCase('CASE_TEXT'))
      store[0] === 'CASE_TAGS' && dispatch(setFocusedCase('CASE_TAGS'))

    }

  }

  const reduceNewCaseFormBlur = (event: any) => {

    if ( store ) {

      dispatch(setFocusedCase(''))

    }

  }

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------

  const reduceNewSkillsForm = (event: React.ChangeEvent<HTMLInputElement>) => {

    if ( store ) {

      store[0] === 'EDUCATION_BLOCK_1_TITLE' && dispatch(addInEducation1Title(event.target.value))
      store[0] === 'EDUCATION_BLOCK_1_FINISH' && dispatch(addInEducation1Finish(event.target.value))
      store[0] === 'EDUCATION_BLOCK_1_SPECIAL' && dispatch(addInEducation1Special(event.target.value))
      store[0] === 'EDUCATION_BLOCK_2_TITLE' && dispatch(addInEducation2Title(event.target.value))
      store[0] === 'EDUCATION_BLOCK_2_FINISH' && dispatch(addInEducation2Finish(event.target.value))
      store[0] === 'EDUCATION_BLOCK_2_SPECIAL' && dispatch(addInEducation2Special(event.target.value))
      store[0] === 'EDUCATION_BLOCK_3_TITLE' && dispatch(addInEducation3Title(event.target.value))
      store[0] === 'EDUCATION_BLOCK_3_FINISH' && dispatch(addInEducation3Finish(event.target.value))
      store[0] === 'EDUCATION_BLOCK_3_SPECIAL' && dispatch(addInEducation3Special(event.target.value))
      
      store[0] === 'JOB_BLOCK_1_TITLE' && dispatch(addInSkills1Title(event.target.value))
      store[0] === 'JOB_BLOCK_1_SITE' && dispatch(addInSkills1Site(event.target.value))
      store[0] === 'JOB_BLOCK_1_SM' && dispatch(addInSkills1Sm(event.target.value))
      store[0] === 'JOB_BLOCK_1_SY' && dispatch(addInSkills1Sy(event.target.value))
      store[0] === 'JOB_BLOCK_1_FM' && dispatch(addInSkills1Fm(event.target.value))
      store[0] === 'JOB_BLOCK_1_FY' && dispatch(addInSkills1Fy(event.target.value))
      store[0] === 'JOB_BLOCK_1_NOW_TIME' && dispatch(addInSkills1NowTime(true))
      store[0] === 'JOB_BLOCK_1_JOB' && dispatch(addInSkills1Job(event.target.value))
      store[0] === 'JOB_BLOCK_1_JOB_TASKS' && dispatch(addInSkills1JobTasks(event.target.value))

      store[0] === 'JOB_BLOCK_2_TITLE' && dispatch(addInSkills2Title(event.target.value))
      store[0] === 'JOB_BLOCK_2_SITE' && dispatch(addInSkills2Site(event.target.value))
      store[0] === 'JOB_BLOCK_2_SM' && dispatch(addInSkills2Sm(event.target.value))
      store[0] === 'JOB_BLOCK_2_SY' && dispatch(addInSkills2Sy(event.target.value))
      store[0] === 'JOB_BLOCK_2_FM' && dispatch(addInSkills2Fm(event.target.value))
      store[0] === 'JOB_BLOCK_2_FY' && dispatch(addInSkills2Fy(event.target.value))
      store[0] === 'JOB_BLOCK_2_NOW_TIME' && dispatch(addInSkills2NowTime(true))
      store[0] === 'JOB_BLOCK_2_JOB' && dispatch(addInSkills2Job(event.target.value))
      store[0] === 'JOB_BLOCK_2_JOB_TASKS' && dispatch(addInSkills2JobTasks(event.target.value))

      store[0] === 'JOB_BLOCK_3_TITLE' && dispatch(addInSkills3Title(event.target.value))
      store[0] === 'JOB_BLOCK_3_SITE' && dispatch(addInSkills3Site(event.target.value))
      store[0] === 'JOB_BLOCK_3_SM' && dispatch(addInSkills3Sm(event.target.value))
      store[0] === 'JOB_BLOCK_3_SY' && dispatch(addInSkills3Sy(event.target.value))
      store[0] === 'JOB_BLOCK_3_FM' && dispatch(addInSkills3Fm(event.target.value))
      store[0] === 'JOB_BLOCK_3_FY' && dispatch(addInSkills3Fy(event.target.value))
      store[0] === 'JOB_BLOCK_3_NOW_TIME' && dispatch(addInSkills3NowTime(true))
      store[0] === 'JOB_BLOCK_3_JOB' && dispatch(addInSkills3Job(event.target.value))
      store[0] === 'JOB_BLOCK_3_JOB_TASKS' && dispatch(addInSkills3JobTasks(event.target.value))

      store[0] === 'JOB_BLOCK_4_TITLE' && dispatch(addInSkills4Title(event.target.value))
      store[0] === 'JOB_BLOCK_4_SITE' && dispatch(addInSkills4Site(event.target.value))
      store[0] === 'JOB_BLOCK_4_SM' && dispatch(addInSkills4Sm(event.target.value))
      store[0] === 'JOB_BLOCK_4_SY' && dispatch(addInSkills4Sy(event.target.value))
      store[0] === 'JOB_BLOCK_4_FM' && dispatch(addInSkills4Fm(event.target.value))
      store[0] === 'JOB_BLOCK_4_FY' && dispatch(addInSkills4Fy(event.target.value))
      store[0] === 'JOB_BLOCK_4_NOW_TIME' && dispatch(addInSkills4NowTime(true))
      store[0] === 'JOB_BLOCK_4_JOB' && dispatch(addInSkills4Job(event.target.value))
      store[0] === 'JOB_BLOCK_4_JOB_TASKS' && dispatch(addInSkills4JobTasks(event.target.value))

      store[0] === 'JOB_BLOCK_5_TITLE' && dispatch(addInSkills5Title(event.target.value))
      store[0] === 'JOB_BLOCK_5_SITE' && dispatch(addInSkills5Site(event.target.value))
      store[0] === 'JOB_BLOCK_5_SM' && dispatch(addInSkills5Sm(event.target.value))
      store[0] === 'JOB_BLOCK_5_SY' && dispatch(addInSkills5Sy(event.target.value))
      store[0] === 'JOB_BLOCK_5_FM' && dispatch(addInSkills5Fm(event.target.value))
      store[0] === 'JOB_BLOCK_5_FY' && dispatch(addInSkills5Fy(event.target.value))
      store[0] === 'JOB_BLOCK_5_NOW_TIME' && dispatch(addInSkills5NowTime(true))
      store[0] === 'JOB_BLOCK_5_JOB' && dispatch(addInSkills5Job(event.target.value))
      store[0] === 'JOB_BLOCK_5_JOB_TASKS' && dispatch(addInSkills5JobTasks(event.target.value))

      store[0] === 'JOB_BLOCK_6_TITLE' && dispatch(addInSkills6Title(event.target.value))
      store[0] === 'JOB_BLOCK_6_SITE' && dispatch(addInSkills6Site(event.target.value))
      store[0] === 'JOB_BLOCK_6_SM' && dispatch(addInSkills6Sm(event.target.value))
      store[0] === 'JOB_BLOCK_6_SY' && dispatch(addInSkills6Sy(event.target.value))
      store[0] === 'JOB_BLOCK_6_FM' && dispatch(addInSkills6Fm(event.target.value))
      store[0] === 'JOB_BLOCK_6_FY' && dispatch(addInSkills6Fy(event.target.value))
      store[0] === 'JOB_BLOCK_6_NOW_TIME' && dispatch(addInSkills6NowTime(true))
      store[0] === 'JOB_BLOCK_6_JOB' && dispatch(addInSkills6Job(event.target.value))
      store[0] === 'JOB_BLOCK_6_JOB_TASKS' && dispatch(addInSkills6JobTasks(event.target.value))

      store[0] === 'EDUCATION_BLOCK_1_TITLE' && dispatch(setFocusedSkills('EDUCATION_BLOCK_1_TITLE'))
      store[0] === 'EDUCATION_BLOCK_1_FINISH' && dispatch(setFocusedSkills('EDUCATION_BLOCK_1_FINISH'))
      store[0] === 'EDUCATION_BLOCK_1_SPECIAL' && dispatch(setFocusedSkills('EDUCATION_BLOCK_1_SPECIAL'))
      store[0] === 'EDUCATION_BLOCK_2_TITLE' && dispatch(setFocusedSkills('EDUCATION_BLOCK_2_TITLE'))
      store[0] === 'EDUCATION_BLOCK_2_FINISH' && dispatch(setFocusedSkills('EDUCATION_BLOCK_2_FINISH'))
      store[0] === 'EDUCATION_BLOCK_2_SPECIAL' && dispatch(setFocusedSkills('EDUCATION_BLOCK_2_SPECIAL'))
      store[0] === 'EDUCATION_BLOCK_3_TITLE' && dispatch(setFocusedSkills('EDUCATION_BLOCK_3_TITLE'))
      store[0] === 'EDUCATION_BLOCK_3_FINISH' && dispatch(setFocusedSkills('EDUCATION_BLOCK_3_FINISH'))
      store[0] === 'EDUCATION_BLOCK_3_SPECIAL' && dispatch(setFocusedSkills('EDUCATION_BLOCK_3_SPECIAL'))

      store[0] === 'JOB_BLOCK_1_TITLE' && dispatch(setFocusedSkills('JOB_BLOCK_1_TITLE'))
      store[0] === 'JOB_BLOCK_1_SITE' && dispatch(setFocusedSkills('JOB_BLOCK_1_SITE'))
      store[0] === 'JOB_BLOCK_1_SM' && dispatch(setFocusedSkills('JOB_BLOCK_1_SM'))
      store[0] === 'JOB_BLOCK_1_SY' && dispatch(setFocusedSkills('JOB_BLOCK_1_SY'))
      store[0] === 'JOB_BLOCK_1_FM' && dispatch(setFocusedSkills('JOB_BLOCK_1_FM'))
      store[0] === 'JOB_BLOCK_1_FY' && dispatch(setFocusedSkills('JOB_BLOCK_1_FY'))
      store[0] === 'JOB_BLOCK_1_NOW_TIME' && dispatch(setFocusedSkills('JOB_BLOCK_1_NOW_TIME'))
      store[0] === 'JOB_BLOCK_1_JOB' && dispatch(setFocusedSkills('JOB_BLOCK_1_JOB'))
      store[0] === 'JOB_BLOCK_1_JOB_TASKS' && dispatch(setFocusedSkills('JOB_BLOCK_1_JOB_TASKS'))

      store[0] === 'JOB_BLOCK_2_TITLE' && dispatch(setFocusedSkills('JOB_BLOCK_2_TITLE'))
      store[0] === 'JOB_BLOCK_2_SITE' && dispatch(setFocusedSkills('JOB_BLOCK_2_SITE'))
      store[0] === 'JOB_BLOCK_2_SM' && dispatch(setFocusedSkills('JOB_BLOCK_2_SM'))
      store[0] === 'JOB_BLOCK_2_SY' && dispatch(setFocusedSkills('JOB_BLOCK_2_SY'))
      store[0] === 'JOB_BLOCK_2_FM' && dispatch(setFocusedSkills('JOB_BLOCK_2_FM'))
      store[0] === 'JOB_BLOCK_2_FY' && dispatch(setFocusedSkills('JOB_BLOCK_2_FY'))
      store[0] === 'JOB_BLOCK_2_NOW_TIME' && dispatch(setFocusedSkills('JOB_BLOCK_2_NOW_TIME'))
      store[0] === 'JOB_BLOCK_2_JOB' && dispatch(setFocusedSkills('JOB_BLOCK_2_JOB'))
      store[0] === 'JOB_BLOCK_2_JOB_TASKS' && dispatch(setFocusedSkills('JOB_BLOCK_2_JOB_TASKS'))

      store[0] === 'JOB_BLOCK_3_TITLE' && dispatch(setFocusedSkills('JOB_BLOCK_3_TITLE'))
      store[0] === 'JOB_BLOCK_3_SITE' && dispatch(setFocusedSkills('JOB_BLOCK_3_SITE'))
      store[0] === 'JOB_BLOCK_3_SM' && dispatch(setFocusedSkills('JOB_BLOCK_3_SM'))
      store[0] === 'JOB_BLOCK_3_SY' && dispatch(setFocusedSkills('JOB_BLOCK_3_SY'))
      store[0] === 'JOB_BLOCK_3_FM' && dispatch(setFocusedSkills('JOB_BLOCK_3_FM'))
      store[0] === 'JOB_BLOCK_3_FY' && dispatch(setFocusedSkills('JOB_BLOCK_3_FY'))
      store[0] === 'JOB_BLOCK_3_NOW_TIME' && dispatch(setFocusedSkills('JOB_BLOCK_3_NOW_TIME'))
      store[0] === 'JOB_BLOCK_3_JOB' && dispatch(setFocusedSkills('JOB_BLOCK_3_JOB'))
      store[0] === 'JOB_BLOCK_3_JOB_TASKS' && dispatch(setFocusedSkills('JOB_BLOCK_3_JOB_TASKS'))

      store[0] === 'JOB_BLOCK_4_TITLE' && dispatch(setFocusedSkills('JOB_BLOCK_4_TITLE'))
      store[0] === 'JOB_BLOCK_4_SITE' && dispatch(setFocusedSkills('JOB_BLOCK_4_SITE'))
      store[0] === 'JOB_BLOCK_4_SM' && dispatch(setFocusedSkills('JOB_BLOCK_4_SM'))
      store[0] === 'JOB_BLOCK_4_SY' && dispatch(setFocusedSkills('JOB_BLOCK_4_SY'))
      store[0] === 'JOB_BLOCK_4_FM' && dispatch(setFocusedSkills('JOB_BLOCK_4_FM'))
      store[0] === 'JOB_BLOCK_4_FY' && dispatch(setFocusedSkills('JOB_BLOCK_4_FY'))
      store[0] === 'JOB_BLOCK_4_NOW_TIME' && dispatch(setFocusedSkills('JOB_BLOCK_4_NOW_TIME'))
      store[0] === 'JOB_BLOCK_4_JOB' && dispatch(setFocusedSkills('JOB_BLOCK_4_JOB'))
      store[0] === 'JOB_BLOCK_4_JOB_TASKS' && dispatch(setFocusedSkills('JOB_BLOCK_4_JOB_TASKS'))

      store[0] === 'JOB_BLOCK_5_TITLE' && dispatch(setFocusedSkills('JOB_BLOCK_5_TITLE'))
      store[0] === 'JOB_BLOCK_5_SITE' && dispatch(setFocusedSkills('JOB_BLOCK_5_SITE'))
      store[0] === 'JOB_BLOCK_5_SM' && dispatch(setFocusedSkills('JOB_BLOCK_5_SM'))
      store[0] === 'JOB_BLOCK_5_SY' && dispatch(setFocusedSkills('JOB_BLOCK_5_SY'))
      store[0] === 'JOB_BLOCK_5_FM' && dispatch(setFocusedSkills('JOB_BLOCK_5_FM'))
      store[0] === 'JOB_BLOCK_5_FY' && dispatch(setFocusedSkills('JOB_BLOCK_5_FY'))
      store[0] === 'JOB_BLOCK_5_NOW_TIME' && dispatch(setFocusedSkills('JOB_BLOCK_5_NOW_TIME'))
      store[0] === 'JOB_BLOCK_5_JOB' && dispatch(setFocusedSkills('JOB_BLOCK_5_JOB'))
      store[0] === 'JOB_BLOCK_5_JOB_TASKS' && dispatch(setFocusedSkills('JOB_BLOCK_5_JOB_TASKS'))

      store[0] === 'JOB_BLOCK_6_TITLE' && dispatch(setFocusedSkills('JOB_BLOCK_6_TITLE'))
      store[0] === 'JOB_BLOCK_6_SITE' && dispatch(setFocusedSkills('JOB_BLOCK_6_SITE'))
      store[0] === 'JOB_BLOCK_6_SM' && dispatch(setFocusedSkills('JOB_BLOCK_6_SM'))
      store[0] === 'JOB_BLOCK_6_SY' && dispatch(setFocusedSkills('JOB_BLOCK_6_SY'))
      store[0] === 'JOB_BLOCK_6_FM' && dispatch(setFocusedSkills('JOB_BLOCK_6_FM'))
      store[0] === 'JOB_BLOCK_6_FY' && dispatch(setFocusedSkills('JOB_BLOCK_6_FY'))
      store[0] === 'JOB_BLOCK_6_NOW_TIME' && dispatch(setFocusedSkills('JOB_BLOCK_6_NOW_TIME'))
      store[0] === 'JOB_BLOCK_6_JOB' && dispatch(setFocusedSkills('JOB_BLOCK_6_JOB'))
      store[0] === 'JOB_BLOCK_6_JOB_TASKS' && dispatch(setFocusedSkills('JOB_BLOCK_6_JOB_TASKS'))

    }

  }

  const reduceNewSkillsFormFocus = () => {

    if ( store ) {

      store[0] === 'EDUCATION_BLOCK_1_TITLE' && dispatch(setFocusedSkills('EDUCATION_BLOCK_1_TITLE'))
      store[0] === 'EDUCATION_BLOCK_1_FINISH' && dispatch(setFocusedSkills('EDUCATION_BLOCK_1_FINISH'))
      store[0] === 'EDUCATION_BLOCK_1_SPECIAL' && dispatch(setFocusedSkills('EDUCATION_BLOCK_1_SPECIAL'))
      store[0] === 'EDUCATION_BLOCK_2_TITLE' && dispatch(setFocusedSkills('EDUCATION_BLOCK_2_TITLE'))
      store[0] === 'EDUCATION_BLOCK_2_FINISH' && dispatch(setFocusedSkills('EDUCATION_BLOCK_2_FINISH'))
      store[0] === 'EDUCATION_BLOCK_2_SPECIAL' && dispatch(setFocusedSkills('EDUCATION_BLOCK_2_SPECIAL'))
      store[0] === 'EDUCATION_BLOCK_3_TITLE' && dispatch(setFocusedSkills('EDUCATION_BLOCK_3_TITLE'))
      store[0] === 'EDUCATION_BLOCK_3_FINISH' && dispatch(setFocusedSkills('EDUCATION_BLOCK_3_FINISH'))
      store[0] === 'EDUCATION_BLOCK_3_SPECIAL' && dispatch(setFocusedSkills('EDUCATION_BLOCK_3_SPECIAL'))

      store[0] === 'JOB_BLOCK_1_TITLE' && dispatch(setFocusedSkills('JOB_BLOCK_1_TITLE'))
      store[0] === 'JOB_BLOCK_1_SITE' && dispatch(setFocusedSkills('JOB_BLOCK_1_SITE'))
      store[0] === 'JOB_BLOCK_1_SM' && dispatch(setFocusedSkills('JOB_BLOCK_1_SM'))
      store[0] === 'JOB_BLOCK_1_SY' && dispatch(setFocusedSkills('JOB_BLOCK_1_SY'))
      store[0] === 'JOB_BLOCK_1_FM' && dispatch(setFocusedSkills('JOB_BLOCK_1_FM'))
      store[0] === 'JOB_BLOCK_1_FY' && dispatch(setFocusedSkills('JOB_BLOCK_1_FY'))
      store[0] === 'JOB_BLOCK_1_NOW_TIME' && dispatch(setFocusedSkills('JOB_BLOCK_1_NOW_TIME'))
      store[0] === 'JOB_BLOCK_1_JOB' && dispatch(setFocusedSkills('JOB_BLOCK_1_JOB'))
      store[0] === 'JOB_BLOCK_1_JOB_TASKS' && dispatch(setFocusedSkills('JOB_BLOCK_1_JOB_TASKS'))

      store[0] === 'JOB_BLOCK_2_TITLE' && dispatch(setFocusedSkills('JOB_BLOCK_2_TITLE'))
      store[0] === 'JOB_BLOCK_2_SITE' && dispatch(setFocusedSkills('JOB_BLOCK_2_SITE'))
      store[0] === 'JOB_BLOCK_2_SM' && dispatch(setFocusedSkills('JOB_BLOCK_2_SM'))
      store[0] === 'JOB_BLOCK_2_SY' && dispatch(setFocusedSkills('JOB_BLOCK_2_SY'))
      store[0] === 'JOB_BLOCK_2_FM' && dispatch(setFocusedSkills('JOB_BLOCK_2_FM'))
      store[0] === 'JOB_BLOCK_2_FY' && dispatch(setFocusedSkills('JOB_BLOCK_2_FY'))
      store[0] === 'JOB_BLOCK_2_NOW_TIME' && dispatch(setFocusedSkills('JOB_BLOCK_2_NOW_TIME'))
      store[0] === 'JOB_BLOCK_2_JOB' && dispatch(setFocusedSkills('JOB_BLOCK_2_JOB'))
      store[0] === 'JOB_BLOCK_2_JOB_TASKS' && dispatch(setFocusedSkills('JOB_BLOCK_2_JOB_TASKS'))

      store[0] === 'JOB_BLOCK_3_TITLE' && dispatch(setFocusedSkills('JOB_BLOCK_3_TITLE'))
      store[0] === 'JOB_BLOCK_3_SITE' && dispatch(setFocusedSkills('JOB_BLOCK_3_SITE'))
      store[0] === 'JOB_BLOCK_3_SM' && dispatch(setFocusedSkills('JOB_BLOCK_3_SM'))
      store[0] === 'JOB_BLOCK_3_SY' && dispatch(setFocusedSkills('JOB_BLOCK_3_SY'))
      store[0] === 'JOB_BLOCK_3_FM' && dispatch(setFocusedSkills('JOB_BLOCK_3_FM'))
      store[0] === 'JOB_BLOCK_3_FY' && dispatch(setFocusedSkills('JOB_BLOCK_3_FY'))
      store[0] === 'JOB_BLOCK_3_NOW_TIME' && dispatch(setFocusedSkills('JOB_BLOCK_3_NOW_TIME'))
      store[0] === 'JOB_BLOCK_3_JOB' && dispatch(setFocusedSkills('JOB_BLOCK_3_JOB'))
      store[0] === 'JOB_BLOCK_3_JOB_TASKS' && dispatch(setFocusedSkills('JOB_BLOCK_3_JOB_TASKS'))

      store[0] === 'JOB_BLOCK_4_TITLE' && dispatch(setFocusedSkills('JOB_BLOCK_4_TITLE'))
      store[0] === 'JOB_BLOCK_4_SITE' && dispatch(setFocusedSkills('JOB_BLOCK_4_SITE'))
      store[0] === 'JOB_BLOCK_4_SM' && dispatch(setFocusedSkills('JOB_BLOCK_4_SM'))
      store[0] === 'JOB_BLOCK_4_SY' && dispatch(setFocusedSkills('JOB_BLOCK_4_SY'))
      store[0] === 'JOB_BLOCK_4_FM' && dispatch(setFocusedSkills('JOB_BLOCK_4_FM'))
      store[0] === 'JOB_BLOCK_4_FY' && dispatch(setFocusedSkills('JOB_BLOCK_4_FY'))
      store[0] === 'JOB_BLOCK_4_NOW_TIME' && dispatch(setFocusedSkills('JOB_BLOCK_4_NOW_TIME'))
      store[0] === 'JOB_BLOCK_4_JOB' && dispatch(setFocusedSkills('JOB_BLOCK_4_JOB'))
      store[0] === 'JOB_BLOCK_4_JOB_TASKS' && dispatch(setFocusedSkills('JOB_BLOCK_4_JOB_TASKS'))

      store[0] === 'JOB_BLOCK_5_TITLE' && dispatch(setFocusedSkills('JOB_BLOCK_5_TITLE'))
      store[0] === 'JOB_BLOCK_5_SITE' && dispatch(setFocusedSkills('JOB_BLOCK_5_SITE'))
      store[0] === 'JOB_BLOCK_5_SM' && dispatch(setFocusedSkills('JOB_BLOCK_5_SM'))
      store[0] === 'JOB_BLOCK_5_SY' && dispatch(setFocusedSkills('JOB_BLOCK_5_SY'))
      store[0] === 'JOB_BLOCK_5_FM' && dispatch(setFocusedSkills('JOB_BLOCK_5_FM'))
      store[0] === 'JOB_BLOCK_5_FY' && dispatch(setFocusedSkills('JOB_BLOCK_5_FY'))
      store[0] === 'JOB_BLOCK_5_NOW_TIME' && dispatch(setFocusedSkills('JOB_BLOCK_5_NOW_TIME'))
      store[0] === 'JOB_BLOCK_5_JOB' && dispatch(setFocusedSkills('JOB_BLOCK_5_JOB'))
      store[0] === 'JOB_BLOCK_5_JOB_TASKS' && dispatch(setFocusedSkills('JOB_BLOCK_5_JOB_TASKS'))

      store[0] === 'JOB_BLOCK_6_TITLE' && dispatch(setFocusedSkills('JOB_BLOCK_6_TITLE'))
      store[0] === 'JOB_BLOCK_6_SITE' && dispatch(setFocusedSkills('JOB_BLOCK_6_SITE'))
      store[0] === 'JOB_BLOCK_6_SM' && dispatch(setFocusedSkills('JOB_BLOCK_6_SM'))
      store[0] === 'JOB_BLOCK_6_SY' && dispatch(setFocusedSkills('JOB_BLOCK_6_SY'))
      store[0] === 'JOB_BLOCK_6_FM' && dispatch(setFocusedSkills('JOB_BLOCK_6_FM'))
      store[0] === 'JOB_BLOCK_6_FY' && dispatch(setFocusedSkills('JOB_BLOCK_6_FY'))
      store[0] === 'JOB_BLOCK_6_NOW_TIME' && dispatch(setFocusedSkills('JOB_BLOCK_6_NOW_TIME'))
      store[0] === 'JOB_BLOCK_6_JOB' && dispatch(setFocusedSkills('JOB_BLOCK_6_JOB'))
      store[0] === 'JOB_BLOCK_6_JOB_TASKS' && dispatch(setFocusedSkills('JOB_BLOCK_6_JOB_TASKS'))

    }

  }

  const reduceNewSkillsFormBlur = () => {

    if ( store ) {

      dispatch(setFocusedSkills(''))

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

          : type === 'TEXT_INPUT_OUTLINE_NEW_CASE'
          ? <CustomTextField 
              ref={inputRef}
              type={valueType}
              value={
                !store ? '' :
                  store[0] === 'CASE_NAME' ? CASE_NAME :
                  store[0] === 'CASE_SY' ? CASE_SY :
                  store[0] === 'CASE_SM' ? CASE_SM :
                  store[0] === 'CASE_FY' ? CASE_FY :
                  store[0] === 'CASE_FM' ? CASE_FM : 
                  store[0] === 'CASE_PAY' ? CASE_PAY :
                  store[0] === 'CASE_P1' ? CASE_P1 :
                  store[0] === 'CASE_P2' ? CASE_P2 :
                  store[0] === 'CASE_P3' ? CASE_P3 :
                  store[0] === 'CASE_P4' ? CASE_P4 :
                  store[0] === 'CASE_TEXT' ? CASE_TEXT :
                  store[0] === 'CASE_TAGS' ? CASE_TAGS : ''
              }
              onChange={reduceNewCaseForm}
              onFocus={reduceNewCaseFormFocus}
              onBlur={reduceNewCaseFormBlur}
              autoFocus={store && CASE_FOCUS === store[0] && true}
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

          : type === 'TEXT_INPUT_OUTLINE_NEW_EDUCATION_SKILLS'
          ? <CustomTextField 
              ref={inputRef}
              type={valueType}
              value={
                !store ? '' :
                  store[0] === 'EDUCATION_BLOCK_1_TITLE' ? EDUCATION_BLOCK_1.title :
                  store[0] === 'EDUCATION_BLOCK_1_FINISH' ? EDUCATION_BLOCK_1.finish : 
                  store[0] === 'EDUCATION_BLOCK_1_SPECIAL' ? EDUCATION_BLOCK_1.special :

                  store[0] === 'EDUCATION_BLOCK_2_TITLE' ? EDUCATION_BLOCK_2.title :
                  store[0] === 'EDUCATION_BLOCK_2_FINISH' ? EDUCATION_BLOCK_2.finish : 
                  store[0] === 'EDUCATION_BLOCK_2_SPECIAL' ? EDUCATION_BLOCK_2.special :
                  
                  store[0] === 'EDUCATION_BLOCK_3_TITLE' ? EDUCATION_BLOCK_3.title :
                  store[0] === 'EDUCATION_BLOCK_3_FINISH' ? EDUCATION_BLOCK_3.finish : 
                  store[0] === 'EDUCATION_BLOCK_3_SPECIAL' ? EDUCATION_BLOCK_3.special :

                  store[0] === 'JOB_BLOCK_1_TITLE' ? JOB_BLOCK_1.title :
                  store[0] === 'JOB_BLOCK_1_SITE' ? JOB_BLOCK_1.site :
                  store[0] === 'JOB_BLOCK_1_SM' ? JOB_BLOCK_1.sm :
                  store[0] === 'JOB_BLOCK_1_SY' ? JOB_BLOCK_1.sy :
                  store[0] === 'JOB_BLOCK_1_FM' ? JOB_BLOCK_1.fm :
                  store[0] === 'JOB_BLOCK_1_FY' ? JOB_BLOCK_1.fy :
                  store[0] === 'JOB_BLOCK_1_NOW_TIME' ? JOB_BLOCK_1.nowTime :
                  store[0] === 'JOB_BLOCK_1_JOB' ? JOB_BLOCK_1.job :
                  store[0] === 'JOB_BLOCK_1_JOB_TASKS' ? JOB_BLOCK_1.jobTasks :

                  store[0] === 'JOB_BLOCK_2_TITLE' ? JOB_BLOCK_2.title :
                  store[0] === 'JOB_BLOCK_2_SITE' ? JOB_BLOCK_2.site :
                  store[0] === 'JOB_BLOCK_2_SM' ? JOB_BLOCK_2.sm :
                  store[0] === 'JOB_BLOCK_2_SY' ? JOB_BLOCK_2.sy :
                  store[0] === 'JOB_BLOCK_2_FM' ? JOB_BLOCK_2.fm :
                  store[0] === 'JOB_BLOCK_2_FY' ? JOB_BLOCK_2.fy :
                  store[0] === 'JOB_BLOCK_2_NOW_TIME' ? JOB_BLOCK_2.nowTime :
                  store[0] === 'JOB_BLOCK_2_JOB' ? JOB_BLOCK_2.job :
                  store[0] === 'JOB_BLOCK_2_JOB_TASKS' ? JOB_BLOCK_2.jobTasks :

                  store[0] === 'JOB_BLOCK_3_TITLE' ? JOB_BLOCK_3.title :
                  store[0] === 'JOB_BLOCK_3_SITE' ? JOB_BLOCK_3.site :
                  store[0] === 'JOB_BLOCK_3_SM' ? JOB_BLOCK_3.sm :
                  store[0] === 'JOB_BLOCK_3_SY' ? JOB_BLOCK_3.sy :
                  store[0] === 'JOB_BLOCK_3_FM' ? JOB_BLOCK_3.fm :
                  store[0] === 'JOB_BLOCK_3_FY' ? JOB_BLOCK_3.fy :
                  store[0] === 'JOB_BLOCK_3_NOW_TIME' ? JOB_BLOCK_3.nowTime :
                  store[0] === 'JOB_BLOCK_3_JOB' ? JOB_BLOCK_3.job :
                  store[0] === 'JOB_BLOCK_3_JOB_TASKS' ? JOB_BLOCK_3.jobTasks :

                  store[0] === 'JOB_BLOCK_4_TITLE' ? JOB_BLOCK_4.title :
                  store[0] === 'JOB_BLOCK_4_SITE' ? JOB_BLOCK_4.site :
                  store[0] === 'JOB_BLOCK_4_SM' ? JOB_BLOCK_4.sm :
                  store[0] === 'JOB_BLOCK_4_SY' ? JOB_BLOCK_4.sy :
                  store[0] === 'JOB_BLOCK_4_FM' ? JOB_BLOCK_4.fm :
                  store[0] === 'JOB_BLOCK_4_FY' ? JOB_BLOCK_4.fy :
                  store[0] === 'JOB_BLOCK_4_NOW_TIME' ? JOB_BLOCK_4.nowTime :
                  store[0] === 'JOB_BLOCK_4_JOB' ? JOB_BLOCK_4.job :
                  store[0] === 'JOB_BLOCK_4_JOB_TASKS' ? JOB_BLOCK_4.jobTasks :

                  store[0] === 'JOB_BLOCK_5_TITLE' ? JOB_BLOCK_5.title :
                  store[0] === 'JOB_BLOCK_5_SITE' ? JOB_BLOCK_5.site :
                  store[0] === 'JOB_BLOCK_5_SM' ? JOB_BLOCK_5.sm :
                  store[0] === 'JOB_BLOCK_5_SY' ? JOB_BLOCK_5.sy :
                  store[0] === 'JOB_BLOCK_5_FM' ? JOB_BLOCK_5.fm :
                  store[0] === 'JOB_BLOCK_5_FY' ? JOB_BLOCK_5.fy :
                  store[0] === 'JOB_BLOCK_5_NOW_TIME' ? JOB_BLOCK_5.nowTime :
                  store[0] === 'JOB_BLOCK_5_JOB' ? JOB_BLOCK_5.job :
                  store[0] === 'JOB_BLOCK_5_JOB_TASKS' ? JOB_BLOCK_5.jobTasks :

                  store[0] === 'JOB_BLOCK_6_TITLE' ? JOB_BLOCK_6.title :
                  store[0] === 'JOB_BLOCK_6_SITE' ? JOB_BLOCK_6.site :
                  store[0] === 'JOB_BLOCK_6_SM' ? JOB_BLOCK_6.sm :
                  store[0] === 'JOB_BLOCK_6_SY' ? JOB_BLOCK_6.sy :
                  store[0] === 'JOB_BLOCK_6_FM' ? JOB_BLOCK_6.fm :
                  store[0] === 'JOB_BLOCK_6_FY' ? JOB_BLOCK_6.fy :
                  store[0] === 'JOB_BLOCK_6_NOW_TIME' ? JOB_BLOCK_6.nowTime :
                  store[0] === 'JOB_BLOCK_6_JOB' ? JOB_BLOCK_6.job :
                  store[0] === 'JOB_BLOCK_6_JOB_TASKS' ? JOB_BLOCK_6.jobTasks : ''
              }
              onChange={reduceNewSkillsForm}
              onFocus={reduceNewSkillsFormFocus}
              onBlur={reduceNewSkillsFormBlur}
              autoFocus={store && EDSKILL_FOCUS === store[0] && true}
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

          : type === 'TEXT_INPUT_OUTLINE_SUPPORT'
          ? <CustomTextField 
              ref={inputRef}
              type={valueType}
              value={
                !store ? '' :
                  store[0] === 'SUPPORT_NAME' ? SUPPORT_NAME :
                  store[0] === 'SUPPORT_MAIL' ? SUPPORT_EMAIL :
                  store[0] === 'SUPPORT_CATEGORY' ? SUPPORT_CATEGORY :
                  store[0] === 'SUPPORT_MESSAGE' ? SUPPORT_MESSAGE : ''
              }
              onChange={reduceSupportForm}
              onFocus={reduceSupportFormFocus}
              onBlur={reduceSupportFormBlur}
              autoFocus={store && SUPPORT_FOCUS === store[0] && true}
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

          : type === 'TEXT_INPUT_OUTLINE_CHANGE_AGREE'
          ? <CustomTextField 
              required={required}
              type={valueType}
              value={
                !store ? '' :
                  store[0] === 'NEW_COAST' ? NEW_AGREE_COAST :
                  store[0] === 'NEW_PREPAY' ? NEW_AGREE_PREPAY :
                  store[0] === 'NEW_EXPERT' ? NEW_AGREE_EXPERT : 
                  store[0] === 'NEW_TEXT' ? NEW_AGREE_TEXT : ''
              }
              onChange={reduceChangeAgreeForm}
              onFocus={reduceChangeAgreeFormFocus}
              onBlur={reduceChangeAgreeFormBlur}
              autoFocus={store && NEW_AGREE_FOCUS === store[0] && true}
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