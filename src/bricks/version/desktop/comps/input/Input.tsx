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
import { setEmail as setEmailEnter, setPassword as setPasswordEnter } from '../../../../store/slices/enter-slice'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import Search from '@mui/icons-material/Search'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
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
    '& .MuiInputLabel-root': {}, /* placeholder стилизуется тут */
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange = (prop: keyof IState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
    store && store[1](event.target.value)
  }

  const handleChangeSimple = (event: React.ChangeEvent<HTMLInputElement>) => { 
    event.preventDefault()
    store && store[1](event.target.value)
  } 

  const reduceAuthState = (event: React.ChangeEvent<HTMLInputElement>) => {

    if ( store ) {

      store[0] === 'NAME' && dispatch(setName(event.target.value))
      store[0] === 'SURNAME' && dispatch(setSurname(event.target.value))
      store[0] === 'SECOND_NAME' && dispatch(setSecondName(event.target.value))
      store[0] === 'EMAIL' && dispatch(setEmail(event.target.value))
      store[0] === 'NUMBER' && dispatch(setNumber(event.target.value.replace(/\D/g,'')))
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

  const reduceNewTaskState = (event: React.ChangeEvent<HTMLInputElement>) => {

    if ( store ) {

      store[0] === 'TASK_TITLE' && dispatch(setTitle(event.target.value))
      store[0] === 'TASK_COAST' && dispatch(setCoast(event.target.value))
      store[0] === 'TASK_PREPAY' && dispatch(setPrepay(event.target.value))
      store[0] === 'TASK_PREPAY_DAYS' && dispatch(setPrepayDays(event.target.value))
      store[0] === 'TASK_EXPERT_COAST' && dispatch(setExpertiseCoast(event.target.value))
      store[0] === 'TASK_DESCRIPTION' && dispatch(setDescription(event.target.value))
      store[0] === 'TASK_OP_SQUARE' && dispatch(setObjectParamsSquare(event.target.value))
      store[0] === 'TASK_OP_STOREYS' && dispatch(setObjectParamsStoreys(event.target.value))
      store[0] === 'TASK_OP_HEIGHT' && dispatch(setObjectParamsHeight(event.target.value))
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

  const reduceRespondState = (event: React.ChangeEvent<HTMLInputElement>) => {

    if ( store ) {

      store[0] === 'RESPOND_DEADLINE' && dispatch(setDeadline(event.target.value))
      store[0] === 'RESPOND_COAST' && dispatch(setCoastRespond(event.target.value))
      store[0] === 'RESPOND_SOLUTION' && dispatch(setSolution(event.target.value))
      store[0] === 'RESPOND_PREPAY' && dispatch(setPrepayRespond(event.target.value))
      store[0] === 'RESPOND_EXPERT' && dispatch(setExpert(event.target.value))
      store[0] === 'RESPOND_EXPERT_COAST' && dispatch(setExpertCoast(event.target.value))
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

  const clickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const mouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()

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
              id="standard-basic" 
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
              id="standard-basic" 
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
              autoFocus={store && TASK_FOCUS === store[0] && true}
              id="standard-basic" 
              label={label}
              error={isError}
              disabled={isDisabled}
              autoComplete={"off"}
              style={{
                ...css,
                width: '100%'
              }} 
            />

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
              autoFocus={store && TASK_FOCUS === store[0] && true}
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

          // ---------------------------------------------------------------- !!! 
          // данный тип интпута создан временно, нужно перекинуть функционал
          // на типа просто TEXT_INPUT_OUTLINE 
          // ---------------------------------------------------------------- !!!

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
              autoFocus={store && FOCUS === store[0] && true}
              id="standard-basic" 
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
              autoFocus={store && RESPOND_FOCUS === store[0] && true}
              id="standard-basic" 
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
              id="standard-basic" 
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
              id="standard-basic" 
              label={label}
              error={isError}
              disabled={isDisabled}
              autoComplete={"off"}
              onChange={reduceAuthState}
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
              defaultValue={""}
              required={required}
              autoComplete={"off"}
              id="standard-basic" 
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
              id="standard-basic" 
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
          ? <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          ? <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          ? <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          ? <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          ? <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          ? <LocalizationProvider dateAdapter={AdapterDayjs}>
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
              id="standard-basic" 
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