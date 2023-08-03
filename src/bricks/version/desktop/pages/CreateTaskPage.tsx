import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { setShow, setType, setMessage } from '../../../store/slices/alert-content-slice'
import { setTitle, 
  setCoast, 
  setPrepay, 
  setPrepayDays,
  setExpertiseCoast, 
  setDescription, 
  setFocused as setFocusedTask,
  setObjectParamsSquare,
  setObjectParamsStoreys,
  setObjectParamsHeight,
  setChapters,
  setChapterLN,
  setChapterLD,
  setTechTaskFile,
  removeTechTaskFile,
  resetTechTaskFile,
  setTags
 } from '../../../store/slices/create-task-slice'
import EmailIcon from '@mui/icons-material/Email'
import InputComponent from '../comps/input/Input'
import FormGroup from '@mui/material/FormGroup'
import ButtonComponent from '../comps/button/Button'
import RequestActionsComponent from '../services/request.service'
import ChapterController from '../views/localViews/СhapterController'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import SelectField from '../comps/select/SelectFieldPercentWidth'
import cssContentArea from '../styles/views/contentArea.css'
import cssAsideMenu from '../styles/pages/createTaskPageAside.css'
import backIcon from '../../../img/icons/back.svg'
import CloseIcon from '@mui/icons-material/Clear'

const { ContentArea, 
  CustExecContentInnerArea, 
  PageTitle,
  BackwardButton } = cssContentArea
const { MenuContainer, 
  TextFieldTitle,
  TextFieldSubTitle, 
  TextFieldContainerLine,
  StepsContainer,
  StepsContainerVertical,
  StepsContainerVerticalForRound,
  StepsContainerVerticalStep,
  StepsContainerVerticalStepRound,
  StepsContainerVerticalStepRoundLabel } = cssAsideMenu
const label = { inputProps: { 'aria-label': 'Checkbox demo' }}

const CreateTaskPage: React.FC = () => {

  const inputBackground = useAppSelector(state => state.theme.white)
  const uploadButtonBackground = useAppSelector(state => state.theme.blue3)
  const backwardButtonColor = useAppSelector(state => state.theme.grey)
  const stepsContainerColor = useAppSelector(state => state.theme.grey3)
  const stepContainerRoundColor = useAppSelector(state => state.theme.blue2)
  const stepContainerRoundLabelColor = useAppSelector(state => state.theme.grey2)
  const blackColor = useAppSelector(state => state.theme.black)

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
  const TASK_CHAPTERS = useAppSelector(state => state.createTaskReducer.chapters)
  const TASK_CHAPTER_NAME = useAppSelector(state => state.createTaskReducer.chapterLocalName)
  const TASK_CHAPTER_DESCR = useAppSelector(state => state.createTaskReducer.chapterLocalDescription)
  const TASK_TECH_FILE = useAppSelector(state => state.createTaskReducer.techTaskFile)
  const TASK_CHAPTER_EDIT_FORM = useAppSelector(state => state.createTaskReducer.showChaptersEditForms)
  const TASK_TAGS = useAppSelector(state => state.createTaskReducer.tags)

  const USER_ID = useAppSelector(state => state.roleTypeReducer.roleData.userID)
  const [ CREATE_TASK_REQUEST, SET_CREATE_TASK_REQUEST ] = useState(false)
  const [ CREATE_DRAFT_REQUEST, SET_CREATE_DRAFT_REQUEST ] = useState(false)
  const [ CREATE_TASK_TTDF_REQUEST, SET_CREATE_TASK_TTDF_REQUEST ] = useState(false)
  const [ showNewChapter, setShowNewChapter ] = useState(false)

  const [ newChapterNameValidateError, setNewChapterNameValidateError ] = useState(false)
  const [ newChapterDescrValidateError, setNewChapterDescrValidateError ] = useState(false)
  const [ agreeCoast, setAgreeCoast ] = useState<boolean>(false)

  const [ step1Color, setStep1Color ] = useState('rgb(58, 75, 86)')  
  const [ step2Color, setStep2Color ] = useState('rgb(58, 75, 86)')  
  const [ step3Color, setStep3Color ] = useState('rgb(58, 75, 86)')  
  const [ step4Color, setStep4Color ] = useState('rgb(58, 75, 86)')  
  const [ step5Color, setStep5Color ] = useState('rgb(58, 75, 86)')  

  const [ line1Color, setLine1Color ] = useState(stepContainerRoundLabelColor) 
  const [ line2Color, setLine2Color ] = useState(stepContainerRoundLabelColor)
  const [ line3Color, setLine3Color ] = useState(stepContainerRoundLabelColor)
  const [ line4Color, setLine4Color ] = useState(stepContainerRoundLabelColor)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dateString = year + '-' + month + '-' + day

  const headBlockCSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
    paddingRight: '120px'
  }
  const spanDelimiterCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '16px'
  }
  const divHalfWidthCSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '50%',
  }

  const changeTechTaskFile = (param: File) => {
    dispatch(resetTechTaskFile(''))
    dispatch(setTechTaskFile(param))
  }

  const addTaskData = () => {

    false && console.log(TASK_DATE_START)
    false && console.log(TASK_DATE_FINISH)

    SET_CREATE_TASK_REQUEST(true)

    setTimeout(() => { SET_CREATE_TASK_TTDF_REQUEST(true) }, 1300)

    dispatch(setShow(true))
    dispatch(setType('success'))
    dispatch(setMessage('Вы успешно разместили новое задание'))

    false && dispatch(setTitle(''))
    false && dispatch(setCoast(''))
    false && dispatch(setPrepay(''))
    false && dispatch(setPrepayDays(''))
    false && dispatch(setExpertiseCoast(''))
    false && dispatch(setDescription(''))
    false && dispatch(setObjectParamsSquare(''))
    false && dispatch(setObjectParamsStoreys(''))
    false && dispatch(setObjectParamsHeight(''))
    false && dispatch(setFocusedTask(''))

  }

  const addDraftData = () => {

    SET_CREATE_DRAFT_REQUEST(true)

    setTimeout(() => { SET_CREATE_TASK_TTDF_REQUEST(true) }, 1300)

    dispatch(setShow(true))
    dispatch(setType('success'))
    dispatch(setMessage('Вы успешно сохранили черновик задания. Он будет доступен вам из раздела ваших заказов - черновики'))

    false && dispatch(setTitle(''))
    false && dispatch(setCoast(''))
    false && dispatch(setPrepay(''))
    false && dispatch(setPrepayDays(''))
    false && dispatch(setExpertiseCoast(''))
    false && dispatch(setDescription(''))
    false && dispatch(setObjectParamsSquare(''))
    false && dispatch(setObjectParamsStoreys(''))
    false && dispatch(setObjectParamsHeight(''))
    false && dispatch(setFocusedTask(''))

  }

  const newChapterSelector = (param: boolean) => {
    setShowNewChapter(param)
  }

  const addNewChapter = () => {

    TASK_CHAPTER_NAME === '' ? setNewChapterNameValidateError(true) : setNewChapterNameValidateError(false)
    TASK_CHAPTER_DESCR === '' ? setNewChapterDescrValidateError(true) : setNewChapterDescrValidateError(false)

    if ( TASK_CHAPTER_NAME !== '' && TASK_CHAPTER_DESCR !== '' ) {

      let chapter = { 
        title: TASK_CHAPTER_NAME, 
        tags: [ 'options_download' ], 
        description: TASK_CHAPTER_DESCR
      }

      let chapterArr: any[] = []
      TASK_CHAPTERS.forEach(item => chapterArr.push(item))
      chapterArr.push(chapter)

      false && console.log(chapter)
      false && console.log(chapterArr)

      dispatch(setChapters(chapterArr))
      console.log(TASK_CHAPTERS)

    }

  }

  const removeFile = (param: string) => dispatch(removeTechTaskFile(param))

  const changeTaskTags = (param: string) => {

    dispatch(setTags([ param ]))

  }

  useEffect(() => {

    if ( TASK_TITLE !== '' && 
         TASK_DATE_START !== '' &&
         TASK_DATE_FINISH !== '' && 
         TASK_COAST !== '' ) {

          setStep1Color(stepContainerRoundColor)

         } else setStep1Color('rgb(58, 75, 86)')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ TASK_COAST, TASK_DATE_FINISH, TASK_DATE_START, TASK_TITLE ])

  useEffect(() => {

    if ( TASK_PREPAY !== '' && 
         TASK_PREPAY_DAYS !== '' &&
         TASK_EXPERT_DAYS !== '' && 
         TASK_EXPERT_COAST !== '' ) {

          setStep2Color(stepContainerRoundColor)

         } else setStep2Color('rgb(58, 75, 86)')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ TASK_EXPERT_COAST, TASK_EXPERT_DAYS, TASK_PREPAY, TASK_PREPAY_DAYS ])

  useEffect(() => {

    if ( TASK_DESCRIPTION !== '' && 
         TASK_OP_SQUARE !== '' &&
         TASK_OP_STOREYS !== '' && 
         TASK_OP_HEIGHT !== '' ) {

          setStep3Color(stepContainerRoundColor)

         } else setStep3Color('rgb(58, 75, 86)')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ TASK_DESCRIPTION, TASK_OP_HEIGHT, TASK_OP_SQUARE, TASK_OP_STOREYS ])

  useEffect(() => {

    if ( TASK_TECH_FILE.length > 0 ) {

          setStep4Color(stepContainerRoundColor)

         } else setStep4Color('rgb(58, 75, 86)')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ TASK_TECH_FILE ])

  useEffect(() => {

    if ( TASK_CHAPTERS.length > 0 ) {

          setStep5Color(stepContainerRoundColor)

         } else setStep5Color('rgb(58, 75, 86)')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ TASK_CHAPTERS ])

  useEffect(() => {

    if ( TASK_TITLE !== '' && 
         TASK_DATE_START !== '' &&
         TASK_DATE_FINISH !== '' && 
         TASK_COAST !== '' &&
         TASK_PREPAY !== '' && 
         TASK_PREPAY_DAYS !== '' &&
         TASK_EXPERT_DAYS !== '' && 
         TASK_EXPERT_COAST !== '' ) {

          setLine1Color(stepContainerRoundColor)

         } else setLine1Color(stepContainerRoundLabelColor)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ 
    
    TASK_COAST, 
    TASK_DATE_FINISH, 
    TASK_DATE_START, 
    TASK_EXPERT_COAST, 
    TASK_EXPERT_DAYS, 
    TASK_PREPAY, 
    TASK_PREPAY_DAYS, 
    TASK_TITLE 
    
  ])

  useEffect(() => {

    if ( TASK_TITLE !== '' && 
         TASK_DATE_START !== '' &&
         TASK_DATE_FINISH !== '' && 
         TASK_COAST !== '' &&
         TASK_PREPAY !== '' && 
         TASK_PREPAY_DAYS !== '' &&
         TASK_EXPERT_DAYS !== '' && 
         TASK_EXPERT_COAST !== '' &&
         TASK_DESCRIPTION !== '' && 
         TASK_OP_SQUARE !== '' &&
         TASK_OP_STOREYS !== '' && 
         TASK_OP_HEIGHT !== '' ) {

          setLine2Color(stepContainerRoundColor)

         } else setLine2Color(stepContainerRoundLabelColor)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ 
    
    TASK_COAST, 
    TASK_DATE_FINISH, 
    TASK_DATE_START, 
    TASK_DESCRIPTION, 
    TASK_EXPERT_COAST, 
    TASK_EXPERT_DAYS, 
    TASK_OP_HEIGHT, 
    TASK_OP_SQUARE, 
    TASK_OP_STOREYS, 
    TASK_PREPAY, 
    TASK_PREPAY_DAYS, 
    TASK_TITLE 
  
  ])

  useEffect(() => {

    if ( TASK_TITLE !== '' && 
         TASK_DATE_START !== '' &&
         TASK_DATE_FINISH !== '' && 
         TASK_COAST !== '' &&
         TASK_PREPAY !== '' && 
         TASK_PREPAY_DAYS !== '' &&
         TASK_EXPERT_DAYS !== '' && 
         TASK_EXPERT_COAST !== '' &&
         TASK_DESCRIPTION !== '' && 
         TASK_OP_SQUARE !== '' &&
         TASK_OP_STOREYS !== '' && 
         TASK_OP_HEIGHT !== '' &&
         TASK_TECH_FILE.length > 0 ) {

          setLine3Color(stepContainerRoundColor)

         } else setLine3Color(stepContainerRoundLabelColor)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ 
    
    TASK_COAST, 
    TASK_DATE_FINISH, 
    TASK_DATE_START, 
    TASK_DESCRIPTION, 
    TASK_EXPERT_COAST, 
    TASK_EXPERT_DAYS, 
    TASK_OP_HEIGHT, 
    TASK_OP_SQUARE, 
    TASK_OP_STOREYS, 
    TASK_PREPAY, 
    TASK_PREPAY_DAYS, 
    TASK_TITLE,
    TASK_TECH_FILE
  
  ])

  useEffect(() => {

    if ( TASK_TITLE !== '' && 
         TASK_DATE_START !== '' &&
         TASK_DATE_FINISH !== '' && 
         TASK_COAST !== '' &&
         TASK_PREPAY !== '' && 
         TASK_PREPAY_DAYS !== '' &&
         TASK_EXPERT_DAYS !== '' && 
         TASK_EXPERT_COAST !== '' &&
         TASK_DESCRIPTION !== '' && 
         TASK_OP_SQUARE !== '' &&
         TASK_OP_STOREYS !== '' && 
         TASK_OP_HEIGHT !== '' &&
         TASK_TECH_FILE.length > 0 &&
         TASK_CHAPTERS.length > 0 ) {

          setLine4Color(stepContainerRoundColor)

         } else setLine4Color(stepContainerRoundLabelColor)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ 
    
    TASK_COAST, 
    TASK_DATE_FINISH, 
    TASK_DATE_START, 
    TASK_DESCRIPTION, 
    TASK_EXPERT_COAST, 
    TASK_EXPERT_DAYS, 
    TASK_OP_HEIGHT, 
    TASK_OP_SQUARE, 
    TASK_OP_STOREYS, 
    TASK_PREPAY, 
    TASK_PREPAY_DAYS, 
    TASK_TITLE,
    TASK_TECH_FILE,
    TASK_CHAPTERS
  
  ])

  useEffect(() => { false && console.log(TASK_TECH_FILE) }, [ TASK_TECH_FILE ])
  useEffect(() => {

    agreeCoast === true && false && dispatch(setCoast('contract'))
    agreeCoast === false && false && dispatch(setCoast(''))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ agreeCoast ])
  useEffect(() => {

    console.log(TASK_CHAPTER_EDIT_FORM)

  }, [ TASK_CHAPTER_EDIT_FORM ])
  useEffect(() => {

    console.log(TASK_TAGS)

  }, [ TASK_TAGS ])

  return (
    <ContentArea
      flexDirection={null}
      alignItems={null}
      justify={null}
    > 

      { CREATE_TASK_REQUEST && <RequestActionsComponent

        callbackAction={() => {}}
        requestData={{
          type: 'POST',
          urlstring: '/add-task',
          body: {
            title: TASK_TITLE, 
            coast: agreeCoast === false ? TASK_COAST : 'Договорная', 
            prepay: agreeCoast === false ? TASK_PREPAY : 'Договорной', 
            prepayDays: TASK_PREPAY_DAYS,
            expertDays: TASK_EXPERT_DAYS ? TASK_EXPERT_DAYS.$D + '-' + ( TASK_EXPERT_DAYS.$M + 1 ) + '-' + TASK_EXPERT_DAYS.$y : '01-1-2023',
            expertCoast: agreeCoast === false ? TASK_EXPERT_COAST : 'Договорная', 
            dateStart: TASK_DATE_START ? TASK_DATE_START.$D + '-' + ( TASK_DATE_START.$M + 1 ) + '-' + TASK_DATE_START.$y : '01-1-2023',
            dateFinish: TASK_DATE_FINISH ? TASK_DATE_FINISH.$D + '-' + ( TASK_DATE_FINISH.$M + 1 ) + '-' + TASK_DATE_FINISH.$y : '01-1-2023',
            square: TASK_OP_SQUARE, 
            storeys: TASK_OP_STOREYS, 
            height: TASK_OP_HEIGHT,
            description: TASK_DESCRIPTION,
            customer: USER_ID,
            status: 'TASK-ACTIVE',
            date: dateString,
            taskId: USER_ID.slice(0, 10) + '-' + USER_ID.slice(3, 8) + '-' + USER_ID.slice(10, 15),
            chapters: TASK_CHAPTERS,
            tags: TASK_TAGS
          }
        }}
      
      /> }

      { CREATE_DRAFT_REQUEST && <RequestActionsComponent

        callbackAction={() => {}}
        requestData={{
          type: 'POST',
          urlstring: '/add-task',
          body: {
            title: TASK_TITLE, 
            coast: agreeCoast === false ? TASK_COAST : 'Договорная', 
            prepay: agreeCoast === false ? TASK_PREPAY : 'Договорной', 
            prepayDays: TASK_PREPAY_DAYS,
            expertDays: TASK_EXPERT_DAYS ? TASK_EXPERT_DAYS.$D + '-' + ( TASK_EXPERT_DAYS.$M + 1 ) + '-' + TASK_EXPERT_DAYS.$y : '01-1-2023',
            expertCoast: agreeCoast === false ? TASK_EXPERT_COAST : 'Договорная', 
            dateStart: TASK_DATE_START ? TASK_DATE_START.$D + '-' + ( TASK_DATE_START.$M + 1 ) + '-' + TASK_DATE_START.$y : '01-1-2023',
            dateFinish: TASK_DATE_FINISH ? TASK_DATE_FINISH.$D + '-' + ( TASK_DATE_FINISH.$M + 1 ) + '-' + TASK_DATE_FINISH.$y : '01-1-2023',
            square: TASK_OP_SQUARE, 
            storeys: TASK_OP_STOREYS, 
            height: TASK_OP_HEIGHT,
            description: TASK_DESCRIPTION,
            customer: USER_ID,
            status: 'TASK-DRAFT',
            date: dateString,
            taskId: USER_ID.slice(0, 10) + '-' + USER_ID.slice(3, 8) + '-' + USER_ID.slice(10, 15),
            chapters: TASK_CHAPTERS,
            tags: TASK_TAGS
          }
        }}
      
      /> }

      { CREATE_TASK_TTDF_REQUEST && <RequestActionsComponent

        callbackAction={() => {}}
        requestData={{
          type: 'POSTFILE_TTDF',
          urlstring: '/add-file-techtask',
          body: [ USER_ID.slice(0, 10) + '-' + USER_ID.slice(3, 8) + '-' + USER_ID.slice(10, 15), TASK_TECH_FILE[0] ]
        }}
      
      /> }

      <div style={{ ...headBlockCSS, justifyContent: 'flex-start', marginTop: '35px' }}>
        <img
          alt={""}
          src={backIcon}
          style={{
            display: 'block',
            position: 'relative',
            width: '10px',
            marginRight: '12px',
            marginLeft: '2px',
            cursor: 'pointer'
          }}
        />
        <BackwardButton color={backwardButtonColor} onClick={() => navigate('/task-list-all')}>Ко всем заданиям</BackwardButton>
      </div>
      <div style={headBlockCSS}>
        <PageTitle style={{ marginTop: '20px' }}>Создание задания</PageTitle>
      </div>
      <MenuContainer>
        <StepsContainer>
          <StepsContainerVertical backgroundColor={stepsContainerColor}>
            <StepsContainerVerticalStep style={{ marginTop: '8px' }} backgroundColor={line1Color}/>
            <StepsContainerVerticalStep backgroundColor={line2Color}/>
            <StepsContainerVerticalStep backgroundColor={line3Color}/>
            <StepsContainerVerticalStep style={{ marginBottom: '8px' }} backgroundColor={line4Color}/>
            <StepsContainerVerticalForRound backgroundColor={"transparent"}>
              <StepsContainerVerticalStepRound backgroundColor={step1Color}>
                <StepsContainerVerticalStepRoundLabel color={stepContainerRoundLabelColor}>
                  {"Данные о заказе"}
                </StepsContainerVerticalStepRoundLabel>
              </StepsContainerVerticalStepRound>
              <StepsContainerVerticalStepRound backgroundColor={step2Color}>
                <StepsContainerVerticalStepRoundLabel color={stepContainerRoundLabelColor}>
                  {"Условия"}
                </StepsContainerVerticalStepRoundLabel>
              </StepsContainerVerticalStepRound>
              <StepsContainerVerticalStepRound backgroundColor={step3Color}>
                <StepsContainerVerticalStepRoundLabel color={stepContainerRoundLabelColor}>
                  {"Об объекте"}
                </StepsContainerVerticalStepRoundLabel>
              </StepsContainerVerticalStepRound>
              <StepsContainerVerticalStepRound backgroundColor={step4Color}>
                <StepsContainerVerticalStepRoundLabel color={stepContainerRoundLabelColor}>
                  {"Вложения"}
                </StepsContainerVerticalStepRoundLabel>
              </StepsContainerVerticalStepRound>
              <StepsContainerVerticalStepRound backgroundColor={step5Color}>
                <StepsContainerVerticalStepRoundLabel color={stepContainerRoundLabelColor}>
                  {"Разделы"}
                </StepsContainerVerticalStepRoundLabel>
              </StepsContainerVerticalStepRound>
            </StepsContainerVerticalForRound>
          </StepsContainerVertical>
        </StepsContainer>
        <ButtonComponent
          inner={'Сохранить'} 
          type='OUTLINED' 
          action={addDraftData}
          actionData={null}
          widthType={'%'}
          widthValue={100}
          children={''}
          childrenCss={undefined}
          iconSrc={null}
          iconCss={undefined}
          muiIconSize={null}
          MuiIconChildren={EmailIcon}
          css={{
            backgroundColor: uploadButtonBackground,
            color: blackColor,
            border: 'none',
            fontSize: '12px',
            height: '46px',
            borderRadius: '6px',
            position: 'relative',
            boxSizing: 'border-box',
            marginTop: '46px',
            boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '24px' }}>
          <Checkbox {...label} disabled />
          <span style={{ lineHeight: '20px' }}>Принимаю предложения<br/> с большей стоимостью</span>
        </div>
        <ButtonComponent
          inner={'Опубликовать'} 
          type='OUTLINED' 
          action={addTaskData}
          actionData={null}
          widthType={'%'}
          widthValue={100}
          children={''}
          childrenCss={undefined}
          iconSrc={null}
          iconCss={undefined}
          muiIconSize={null}
          MuiIconChildren={EmailIcon}
          css={{
            backgroundColor: stepContainerRoundColor,
            color: 'white',
            fontSize: '12px',
            height: '46px',
            borderRadius: '6px',
            position: 'relative',
            boxSizing: 'border-box',
            marginTop: '26px',
            boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
          }}
        />
      </MenuContainer>
      <CustExecContentInnerArea>
        <TextFieldTitle>Данные о заказе</TextFieldTitle>
        <TextFieldContainerLine>
          <InputComponent
            type={'TEXT_INPUT_OUTLINE_NEW_TASK'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={100}
            heightValue={'50px'}
            label={"Название задания"}
            isError={false}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={null}
            store={[ "TASK_TITLE", () => null ]}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '10px',
              marginTop: '8px',
              backgroundColor: inputBackground
            }}
          />
        </TextFieldContainerLine>
        <TextFieldContainerLine>
          <InputComponent
            type={'TEXT_INPUT_OUTLINE_DATEPICK_TASK_DATE_START'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
            heightValue={'50px'}
            label={"Дата начала заказа"}
            isError={false}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={null}
            store={[ "", () => null ]}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '0px',
              marginTop: '0px',
              backgroundColor: 'white'
            }}
          />
          <span style={spanDelimiterCSS} />
          <InputComponent
            type={'TEXT_INPUT_OUTLINE_DATEPICK_TASK_DATE_FINISH'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
            heightValue={'50px'}
            label={"Дата сдачи заказа"}
            isError={false}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={null}
            store={[ "TASK_DATE_TO", () => null ]}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '0px',
              marginTop: '0px',
              backgroundColor: 'white'
            }}
          />
        </TextFieldContainerLine>
        <TextFieldContainerLine style={{ marginTop: '18px' }}>
          <SelectField 
            placeholder={"Необходимые навыки"}
            params={{ width: 50, mb: '18px', height: 50 }}
            data={[
              { value: 'Инженерно-геодезические изыскания', label: 'Геодезические изыскания' },
              { value: 'Инженерно-геологические изыскания', label: 'Геологические изыскания' },
              { value: 'Инженерно-гидрометеорологические изыскания', label: 'Гидрометеорология' },
              { value: 'Инженерно-экологические изыскания', label: 'Экологические изыскания' },
              { value: 'Историко-культурные изыскания', label: 'Исторические изыскания' },
              { value: 'Обследование строительных конструкций', label: 'Обследование конструкций' },
              { value: 'Генеральный план', label: 'Генеральный план' },
              { value: 'Автомобильные дороги', label: 'Автомобильные дороги' },
              { value: 'Архитектурные решения', label: 'Архитектурные решения' },
              { value: 'Конструкции железобетонные', label: 'Конструкции железобетонные' },
              { value: 'Конструкции металлические', label: 'Конструкции металлические' },
              { value: 'Гидротехнические решения ', label: 'Гидротехнические решения' },
              { value: 'Электроснабжение', label: 'Электроснабжение' },
              { value: 'Электрическое освещение', label: 'Электрическое освещение' },
              { value: 'Силовое электрооборудование', label: 'Силовое электрооборудование' },
              { value: 'Водоснабжение и канализация', label: 'Водоснабжение и канализация' },
              { value: 'Отопление, вентиляция, кондиционирование', label: 'Отопление и вентиляция' },
              { value: 'Воздухоснабжение', label: 'Воздухоснабжение' },
              { value: 'Холодоснабжение', label: 'Холодоснабжение' },
              { value: 'Тепломеханические решения', label: 'Тепломеханические решения' },
              { value: 'Сети связи', label: 'Сети связи' },
              { value: 'Пожарная безопасность', label: 'Пожарная безопасность' },
              { value: 'Газоснабжение', label: 'Газоснабжение' },
              { value: 'Технология производства', label: 'Технология производства' },
              { value: 'Автоматизация', label: 'Автоматизация' },
              { value: 'Проект организации строительства / сносу / демонтажу', label: 'Проект строительства и сноса' },
              { value: 'Охрана окружающей среды', label: 'Охрана окружающей среды' },
              { value: 'Безопасная эксплуатация объекта', label: 'Безопасная эксплуатация объекта' },
              { value: 'Энергетическая эффективность', label: 'Энергетическая эффективность' },
              { value: 'Обеспечение доступа инвалидов', label: 'Обеспечение доступа инвалидов' },
              { value: 'Мероприятия по гражданской обороне и предупреждению чрезвычайных ситуаций', label: 'Гражданская оборона' },
              { value: 'Сметная документация', label: 'Сметная документация' },
              { value: 'Иная документация', label: 'Иная документация' }
            ]}
            multy={false}
            action={changeTaskTags}
            actionType={"TASK_TAGS"}
            actionParams={[]}
            showIcon={true}
            icon={null}
            iconStyles={{
              marginTop: '-12px',
              marginLeft: '6px',
              width: '34px',
            }}
          />
          <span style={spanDelimiterCSS} />
          <span style={{ ...spanDelimiterCSS, width: '50%' }} />
        </TextFieldContainerLine>
        <TextFieldContainerLine>
          { agreeCoast === false && <InputComponent
            type={'TEXT_INPUT_OUTLINE_NEW_TASK'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
            heightValue={'50px'}
            label={"Стоимость заказа"}
            isError={false}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={null}
            store={[ "TASK_COAST", () => null ]}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '16px',
              backgroundColor: inputBackground
            }}
          /> }
          { agreeCoast === true && <InputComponent
            type={'TEXT_INPUT_OUTLINE_NEW_TASK'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
            heightValue={'50px'}
            label={"Договорная стоимость заказа"}
            isError={false}
            isDisabled={true}
            labelShrinkLeft={"0px"}
            innerLabel={null}
            store={[ "TASK_COAST", () => null ]}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '16px',
              backgroundColor: inputBackground
            }}
          /> }
          <span style={spanDelimiterCSS}></span>
          <div style={{ ...divHalfWidthCSS, paddingBottom: '14px' }}>
            <FormGroup>
              <FormControlLabel 
                control={ 
                  <Checkbox checked={agreeCoast} onChange={() => setAgreeCoast(!agreeCoast)}/>
                } 
                label="Договорная стоимость"
              />
            </FormGroup>
          </div>
        </TextFieldContainerLine>
        <TextFieldTitle style={{ marginTop: '22px' }}>Заказ условия</TextFieldTitle>
        <TextFieldSubTitle style={{ fontSize: '14px' }} mt={'0px'} mb={'18px'}>Предварительное решение</TextFieldSubTitle>
        <TextFieldContainerLine>
          { agreeCoast === false && <InputComponent
            type={'TEXT_INPUT_OUTLINE_NEW_TASK'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
            heightValue={'50px'}
            label={"Сумма аванса"}
            isError={false}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={null}
            store={[ "TASK_PREPAY", () => null ]}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '16px',
              backgroundColor: inputBackground
            }}
          /> }
          { agreeCoast === true && <InputComponent
            type={'TEXT_INPUT_OUTLINE_NEW_TASK'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
            heightValue={'50px'}
            label={"Аванс оговаривается"}
            isError={false}
            isDisabled={true}
            labelShrinkLeft={"0px"}
            innerLabel={null}
            store={[ "TASK_PREPAY", () => null ]}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '16px',
              backgroundColor: inputBackground
            }}
          /> }
          <span style={spanDelimiterCSS} />
          <InputComponent
            type={'TEXT_INPUT_OUTLINE_INLABEL_TASK'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
            heightValue={'50px'}
            label={"Срок принятия решения"}
            isError={false}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={'дней'}
            store={[ "TASK_PREPAY_DAYS", () => null ]}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '16px',
              backgroundColor: inputBackground
            }}
          />
        </TextFieldContainerLine>
        <TextFieldSubTitle style={{ fontSize: '14px' }} mt={'0px'} mb={'18px'}>Вид экспертизы</TextFieldSubTitle>
        <TextFieldContainerLine>
          <SelectField 
            placeholder={"Государственная"}
            params={{ width: 50, mb: '16px', height: 50 }}
            data={[
              { value: '1', label: 'Государственная' },
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
          <span style={spanDelimiterCSS}></span>
          <div style={{ ...divHalfWidthCSS }}>
            <div style={{ display: 'block', width: agreeCoast === false ? '50%' : '100%', marginTop: '-23px' }}>
              <InputComponent
                type={'TEXT_INPUT_OUTLINE_DATEPICK_TASK_DATE_EXPERT'}
                valueType='text'
                required={false}
                widthType={'%'}
                widthValue={100}
                heightValue={'50px'}
                label={"Дата экспертизы"}
                isError={false}
                isDisabled={false}
                labelShrinkLeft={"0px"}
                innerLabel={null}
                store={[ "TASK_DATE_TO", () => null ]}
                css={{
                  fontSize: '12px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '30px',
                  marginTop: '0px',
                  backgroundColor: 'white'
                }}
              />
            </div>
            { agreeCoast === false && <span style={spanDelimiterCSS} /> }
            { agreeCoast === false && <InputComponent
              type={'TEXT_INPUT_OUTLINE_NEW_TASK'}
              valueType='text'
              required={false}
              widthType={'%'}
              widthValue={50}
              heightValue={'50px'}
              label={"Сумма экспертизы"}
              isError={false}
              isDisabled={false}
              labelShrinkLeft={"0px"}
              innerLabel={null}
              store={[ "TASK_EXPERT_COAST", () => null ]}
              css={{
                fontSize: '12px',
                position: 'relative',
                boxSizing: 'border-box',
                marginBottom: '16px',
                backgroundColor: inputBackground
              }}
            /> }
          </div>
        </TextFieldContainerLine>
        <TextFieldTitle style={{ marginTop: '22px' }}>Данные об объекте</TextFieldTitle>
        <TextFieldContainerLine style={{ marginTop: '8px' }}>
          <SelectField 
            placeholder={"Вид строительства"}
            params={{ width: 50, mb: '16px', height: 50 }}
            data={[
              { value: '1', label: 'Новое здание' },
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
          <span style={spanDelimiterCSS} />
          <InputComponent
            type={'TEXT_INPUT_OUTLINE_INLABEL_TASK'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
            heightValue={'50px'}
            label={"Обшая площадь"}
            isError={false}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={'кв.м'}
            store={[ "TASK_OP_SQUARE", () => null ]}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '16px',
              backgroundColor: inputBackground
            }}
          />
        </TextFieldContainerLine>
        <TextFieldContainerLine style={{ marginTop: '8px' }}>
          <SelectField 
            placeholder={"Регион"}
            params={{ width: 50, mb: '16px', height: 50 }}
            data={[
              { value: '1', label: 'Свердловская область' },
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
          <span style={spanDelimiterCSS} />
          <InputComponent
            type={'TEXT_INPUT_OUTLINE_INLABEL_TASK'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
            heightValue={'50px'}
            label={"Этажность наземная"}
            isError={false}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={'этажей'}
            store={[ "TASK_OP_STOREYS", () => null ]}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '16px',
              backgroundColor: inputBackground
            }}
          />
        </TextFieldContainerLine>
        <TextFieldContainerLine style={{ marginTop: '8px' }}>
          <SelectField 
            placeholder={"Тип постройки"}
            params={{ width: 50, mb: '16px', height: 50 }}
            data={[
              { value: '1', label: 'Промышленные здания' },
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
          <span style={spanDelimiterCSS} />
          <InputComponent
            type={'TEXT_INPUT_OUTLINE_INLABEL_TASK'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
            heightValue={'50px'}
            label={"Высота объекта"}
            isError={false}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={'метры'}
            store={[ "TASK_OP_HEIGHT", () => null ]}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '16px',
              backgroundColor: inputBackground
            }}
          />
        </TextFieldContainerLine>
        <TextFieldContainerLine style={{ marginTop: '8px' }}>
          <SelectField 
            placeholder={"Назначение"}
            params={{ width: 50, mb: '16px', height: 50 }}
            data={[
              { value: '1', label: 'Складские помещения' },
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
          <span style={spanDelimiterCSS} />
          <span style={{ ...spanDelimiterCSS, width: '50%' }} />
        </TextFieldContainerLine>
        <TextFieldTitle style={{ marginTop: '22px' }}>Описание задачи</TextFieldTitle>
        <TextFieldContainerLine>
          <InputComponent
            type={'TEXT_INPUT_OUTLINE_NEW_TASK'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={100}
            heightValue={'50px'}
            label={"Подробнее опишите вашу задачу"}
            isError={false}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={null}
            store={[ "TASK_DESCRIPTION", () => null ]}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '0px',
              marginTop: '8px',
              backgroundColor: inputBackground
            }}
          />
        </TextFieldContainerLine>
        <TextFieldContainerLine style={{ marginBottom: '12px', marginTop: '22px' }}>
          <div style={{ ...divHalfWidthCSS }}>
            <TextFieldTitle>Техническое задание</TextFieldTitle>
          </div>
          <span style={spanDelimiterCSS}></span>
          <div style={{ ...divHalfWidthCSS }}>
            <TextFieldTitle>Дополнительные вложения</TextFieldTitle>
          </div>
        </TextFieldContainerLine>
        <TextFieldContainerLine style={{ marginBottom: '2px' }}>
          <div style={{ ...divHalfWidthCSS }}>
            <ButtonComponent
              inner={'Добавить файлы'} 
              type='UPLOAD' 
              action={() => {}}
              actionData={[ changeTechTaskFile ]}
              widthType={'px'}
              widthValue={280}
              children={''}
              childrenCss={undefined}
              iconSrc={null}
              iconCss={undefined}
              muiIconSize={null}
              MuiIconChildren={EmailIcon}
              css={{
                backgroundColor: uploadButtonBackground,
                color: blackColor,
                fontSize: '12px',
                height: '46px',
                borderRadius: '6px',
                position: 'relative',
                boxSizing: 'border-box',
                marginBottom: '12px'
              }}
            />
          </div>
          <span style={spanDelimiterCSS}></span>
          <div style={{ ...divHalfWidthCSS }}>
            <ButtonComponent
              inner={'Добавить файлы'} 
              type='CONTAINED_DISABLED' 
              action={() => {}}
              actionData={null}
              widthType={'px'}
              widthValue={280}
              children={''}
              childrenCss={undefined}
              iconSrc={null}
              iconCss={undefined}
              muiIconSize={null}
              MuiIconChildren={EmailIcon}
              css={{
                backgroundColor: uploadButtonBackground,
                color: blackColor,
                fontSize: '12px',
                height: '46px',
                borderRadius: '6px',
                position: 'relative',
                boxSizing: 'border-box',
                marginBottom: '12px',
                boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
              }}
            />
          </div>
        </TextFieldContainerLine>
        { TASK_TECH_FILE.length > 0 && <TextFieldContainerLine style={{ marginBottom: '0px' }}>
          <div style={{ ...divHalfWidthCSS, flexDirection: 'column', alignItems: 'flex-start', marginTop: '12px' }}>
            { TASK_TECH_FILE.filter(
              
              fileData => (
                fileData.name.indexOf('.txt') !== -1 || 
                fileData.name.indexOf('.doc') !== -1 ||
                fileData.name.indexOf('.docx') !== -1 )).map(fileData => {

              return (
                <div 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    justifyContent: 'space-between' 
                  }}
                >
                  <span 
                    style={{ 
                      display: 'block', 
                      position: 'relative', 
                      lineHeight: '28px', 
                      fontWeight: 'bold',
                      color: 'rgb(81, 102, 116)',
                      cursor: 'pointer',
                      marginRight: '8px'
                    }}
                  >{`Приложение тех. задание: ${fileData.name}`}</span>
                  <CloseIcon 
                    style={{ width: '16px', cursor: 'pointer' }}
                    onClick={() => removeFile(fileData.name)}
                  />
                </div>
              )

            })}

            { TASK_TECH_FILE.filter(fileData => (
                fileData.name.indexOf('.txt')  !== -1 || 
                fileData.name.indexOf('.doc')  !== -1 ||
                fileData.name.indexOf('.docx') !== -1 )).length === 0 && <div 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    justifyContent: 'space-between' 
                  }}
                >
                  <span 
                    style={{ 
                      display: 'block', 
                      position: 'relative', 
                      lineHeight: '28px', 
                      fontWeight: 'bold',
                      color: 'rgb(81, 102, 116)',
                      cursor: 'pointer',
                      marginRight: '8px'
                    }}
                  >{`Неверный формат файла`}</span>
                  <CloseIcon 
                    style={{ width: '16px', cursor: 'pointer' }}
                    onClick={() => dispatch(resetTechTaskFile(''))}
                  />
                </div> }
          </div>
        </TextFieldContainerLine> }
        <TextFieldTitle 
          style={{ 
            marginTop: '22px', 
            marginBottom: '106px',
            cursor: 'pointer'
          }}
          onDoubleClick={() => dispatch(setChapters([]))}
        >
          Разделы в проекте
        </TextFieldTitle>
        <TextFieldContainerLine style={{ flexWrap: 'wrap', marginBottom: showNewChapter ? '' : '28px' }}>
          <ChapterController actions={[ newChapterSelector ]}></ChapterController>
        </TextFieldContainerLine>
        { showNewChapter && <React.Fragment>
          <TextFieldTitle style={{ marginTop: '18px' }}>Добавить новый раздел</TextFieldTitle>
          <TextFieldContainerLine style={{ marginTop: '8px' }}>
            <InputComponent
              type={'TEXT_INPUT_OUTLINE_NEW_TASK'}
              valueType='text'
              required={false}
              widthType={'%'}
              widthValue={50}
              heightValue={'50px'}
              label={"Название раздела"}
              isError={newChapterNameValidateError}
              isDisabled={false}
              labelShrinkLeft={"0px"}
              innerLabel={null}
              store={[ "TASK_CHAPTER_NAME", () => null ]}
              css={{
                fontSize: '12px',
                position: 'relative',
                boxSizing: 'border-box',
                marginBottom: '16px',
                backgroundColor: inputBackground
              }}
            />
            <span style={spanDelimiterCSS} />
            <SelectField 
              placeholder={"Выберите необходимые навыки"}
              params={{ width: 50, mb: '16px', height: 50 }}
              data={[
                { value: 'Инженерно-геодезические изыскания', label: 'Геодезические изыскания' },
                { value: 'Инженерно-геологические изыскания', label: 'Геологические изыскания' },
                { value: 'Инженерно-гидрометеорологические изыскания', label: 'Гидрометеорология' },
                { value: 'Инженерно-экологические изыскания', label: 'Экологические изыскания' },
                { value: 'Историко-культурные изыскания', label: 'Исторические изыскания' },
                { value: 'Обследование строительных конструкций', label: 'Обследование конструкций' },
                { value: 'Генеральный план', label: 'Генеральный план' },
                { value: 'Автомобильные дороги', label: 'Автомобильные дороги' },
                { value: 'Архитектурные решения', label: 'Архитектурные решения' },
                { value: 'Конструкции железобетонные', label: 'Конструкции железобетонные' },
                { value: 'Конструкции металлические', label: 'Конструкции металлические' },
                { value: 'Гидротехнические решения ', label: 'Гидротехнические решения' },
                { value: 'Электроснабжение', label: 'Электроснабжение' },
                { value: 'Электрическое освещение', label: 'Электрическое освещение' },
                { value: 'Силовое электрооборудование', label: 'Силовое электрооборудование' },
                { value: 'Водоснабжение и канализация', label: 'Водоснабжение и канализация' },
                { value: 'Отопление, вентиляция, кондиционирование', label: 'Отопление и вентиляция' },
                { value: 'Воздухоснабжение', label: 'Воздухоснабжение' },
                { value: 'Холодоснабжение', label: 'Холодоснабжение' },
                { value: 'Тепломеханические решения', label: 'Тепломеханические решения' },
                { value: 'Сети связи', label: 'Сети связи' },
                { value: 'Пожарная безопасность', label: 'Пожарная безопасность' },
                { value: 'Газоснабжение', label: 'Газоснабжение' },
                { value: 'Технология производства', label: 'Технология производства' },
                { value: 'Автоматизация', label: 'Автоматизация' },
                { value: 'Проект организации строительства / сносу / демонтажу', label: 'Проект строительства и сноса' },
                { value: 'Охрана окружающей среды', label: 'Охрана окружающей среды' },
                { value: 'Безопасная эксплуатация объекта', label: 'Безопасная эксплуатация объекта' },
                { value: 'Энергетическая эффективность', label: 'Энергетическая эффективность' },
                { value: 'Обеспечение доступа инвалидов', label: 'Обеспечение доступа инвалидов' },
                { value: 'Мероприятия по гражданской обороне и предупреждению чрезвычайных ситуаций', label: 'Гражданская оборона' },
                { value: 'Сметная документация', label: 'Сметная документация' },
                { value: 'Иная документация', label: 'Иная документация' }
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
          </TextFieldContainerLine>
          <TextFieldContainerLine>
            <InputComponent
              type={'TEXT_INPUT_OUTLINE_NEW_TASK'}
              valueType='text'
              required={false}
              widthType={'%'}
              widthValue={100}
              heightValue={'50px'}
              label={"Описание нового раздела"}
              isError={newChapterDescrValidateError}
              isDisabled={false}
              labelShrinkLeft={"0px"}
              innerLabel={null}
              store={[ "TASK_CHAPTER_DESCR", () => null ]}
              css={{
                fontSize: '12px',
                position: 'relative',
                boxSizing: 'border-box',
                marginBottom: '16px',
                marginTop: '0px',
                backgroundColor: inputBackground
              }}
            />
          </TextFieldContainerLine>
          <TextFieldContainerLine>
            <ButtonComponent
              inner={'Добавить вложения'} 
              type='CONTAINED_DISABLED' 
              action={() => console.log('this is button')}
              actionData={null}
              widthType={'px'}
              widthValue={280}
              children={''}
              childrenCss={undefined}
              iconSrc={null}
              iconCss={undefined}
              muiIconSize={null}
              MuiIconChildren={EmailIcon}
              css={{
                backgroundColor: uploadButtonBackground,
                color: blackColor,
                fontSize: '12px',
                height: '46px',
                borderRadius: '6px',
                position: 'relative',
                boxSizing: 'border-box',
                marginBottom: '16px'
              }}
            />
          </TextFieldContainerLine>
          <TextFieldContainerLine>
            <ButtonComponent
              inner={'Очистить поля'} 
              type='CONTAINED_DEFAULT' 
              action={() => {
                dispatch(setChapterLN(''))
                dispatch(setChapterLD(''))
              }}
              actionData={null}
              widthType={'px'}
              widthValue={280}
              children={''}
              childrenCss={undefined}
              iconSrc={null}
              iconCss={undefined}
              muiIconSize={null}
              MuiIconChildren={EmailIcon}
              css={{
                backgroundColor: uploadButtonBackground,
                color: blackColor,
                fontSize: '12px',
                height: '46px',
                borderRadius: '6px',
                position: 'relative',
                boxSizing: 'border-box',
                marginBottom: '16px'
              }}
            />
          </TextFieldContainerLine>
          <TextFieldContainerLine>
            <ButtonComponent
              inner={'Добавить раздел'} 
              type='CONTAINED_DEFAULT' 
              action={addNewChapter}
              actionData={null}
              widthType={'px'}
              widthValue={280}
              children={''}
              childrenCss={undefined}
              iconSrc={null}
              iconCss={undefined}
              muiIconSize={null}
              MuiIconChildren={EmailIcon}
              css={{
                backgroundColor: stepContainerRoundColor,
                color: 'white',
                fontSize: '12px',
                height: '46px',
                borderRadius: '6px',
                position: 'relative',
                boxSizing: 'border-box',
                marginBottom: '40px'
              }}
            />
          </TextFieldContainerLine>
        </React.Fragment> }
        { TASK_CHAPTER_EDIT_FORM?.show === true && TASK_CHAPTERS.length > 0 && <React.Fragment>
          <TextFieldTitle style={{ marginTop: '-10px' }}>
            Редактировать раздел - { TASK_CHAPTERS.length > 0 && TASK_CHAPTERS[TASK_CHAPTER_EDIT_FORM.num].title && TASK_CHAPTERS[TASK_CHAPTER_EDIT_FORM.num].title }
          </TextFieldTitle>
          <TextFieldContainerLine style={{ marginTop: '8px' }}>
            <InputComponent
              type={'TEXT_INPUT_OUTLINE_NEW_TASK'}
              valueType='text'
              required={false}
              widthType={'%'}
              widthValue={50}
              heightValue={'50px'}
              label={"Название раздела"}
              isError={newChapterNameValidateError}
              isDisabled={false}
              labelShrinkLeft={"0px"}
              innerLabel={null}
              store={[ "TASK_CHAPTER_NAME", () => null ]}
              css={{
                fontSize: '12px',
                position: 'relative',
                boxSizing: 'border-box',
                marginBottom: '16px',
                backgroundColor: inputBackground
              }}
            />
            <span style={spanDelimiterCSS} />
            <SelectField 
              placeholder={"Выберите необходимые навыки"}
              params={{ width: 50, mb: '16px', height: 50 }}
              data={[
                { value: 'Инженерно-геодезические изыскания', label: 'Геодезические изыскания' },
                { value: 'Инженерно-геологические изыскания', label: 'Геологические изыскания' },
                { value: 'Инженерно-гидрометеорологические изыскания', label: 'Гидрометеорология' },
                { value: 'Инженерно-экологические изыскания', label: 'Экологические изыскания' },
                { value: 'Историко-культурные изыскания', label: 'Исторические изыскания' },
                { value: 'Обследование строительных конструкций', label: 'Обследование конструкций' },
                { value: 'Генеральный план', label: 'Генеральный план' },
                { value: 'Автомобильные дороги', label: 'Автомобильные дороги' },
                { value: 'Архитектурные решения', label: 'Архитектурные решения' },
                { value: 'Конструкции железобетонные', label: 'Конструкции железобетонные' },
                { value: 'Конструкции металлические', label: 'Конструкции металлические' },
                { value: 'Гидротехнические решения ', label: 'Гидротехнические решения' },
                { value: 'Электроснабжение', label: 'Электроснабжение' },
                { value: 'Электрическое освещение', label: 'Электрическое освещение' },
                { value: 'Силовое электрооборудование', label: 'Силовое электрооборудование' },
                { value: 'Водоснабжение и канализация', label: 'Водоснабжение и канализация' },
                { value: 'Отопление, вентиляция, кондиционирование', label: 'Отопление и вентиляция' },
                { value: 'Воздухоснабжение', label: 'Воздухоснабжение' },
                { value: 'Холодоснабжение', label: 'Холодоснабжение' },
                { value: 'Тепломеханические решения', label: 'Тепломеханические решения' },
                { value: 'Сети связи', label: 'Сети связи' },
                { value: 'Пожарная безопасность', label: 'Пожарная безопасность' },
                { value: 'Газоснабжение', label: 'Газоснабжение' },
                { value: 'Технология производства', label: 'Технология производства' },
                { value: 'Автоматизация', label: 'Автоматизация' },
                { value: 'Проект организации строительства / сносу / демонтажу', label: 'Проект строительства и сноса' },
                { value: 'Охрана окружающей среды', label: 'Охрана окружающей среды' },
                { value: 'Безопасная эксплуатация объекта', label: 'Безопасная эксплуатация объекта' },
                { value: 'Энергетическая эффективность', label: 'Энергетическая эффективность' },
                { value: 'Обеспечение доступа инвалидов', label: 'Обеспечение доступа инвалидов' },
                { value: 'Мероприятия по гражданской обороне и предупреждению чрезвычайных ситуаций', label: 'Гражданская оборона' },
                { value: 'Сметная документация', label: 'Сметная документация' },
                { value: 'Иная документация', label: 'Иная документация' }
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
          </TextFieldContainerLine>
          <TextFieldContainerLine>
            <InputComponent
              type={'TEXT_INPUT_OUTLINE_NEW_TASK'}
              valueType='text'
              required={false}
              widthType={'%'}
              widthValue={100}
              heightValue={'50px'}
              label={"Описание выбранного раздела"}
              isError={newChapterDescrValidateError}
              isDisabled={false}
              labelShrinkLeft={"0px"}
              innerLabel={null}
              store={[ "TASK_CHAPTER_DESCR", () => null ]}
              css={{
                fontSize: '12px',
                position: 'relative',
                boxSizing: 'border-box',
                marginBottom: '16px',
                marginTop: '0px',
                backgroundColor: inputBackground
              }}
            />
          </TextFieldContainerLine>
          <TextFieldContainerLine>
            <ButtonComponent
              inner={'Отмена редактирования'} 
              type='CONTAINED_DEFAULT' 
              action={() => {}}
              actionData={null}
              widthType={'px'}
              widthValue={280}
              children={''}
              childrenCss={undefined}
              iconSrc={null}
              iconCss={undefined}
              muiIconSize={null}
              MuiIconChildren={EmailIcon}
              css={{
                backgroundColor: uploadButtonBackground,
                color: blackColor,
                fontSize: '12px',
                height: '46px',
                borderRadius: '6px',
                position: 'relative',
                boxSizing: 'border-box',
                marginBottom: '16px'
              }}
            />
          </TextFieldContainerLine>
          <TextFieldContainerLine>
            <ButtonComponent
              inner={'Сохранить изменения'} 
              type='CONTAINED_DEFAULT' 
              action={() => {}}
              actionData={null}
              widthType={'px'}
              widthValue={280}
              children={''}
              childrenCss={undefined}
              iconSrc={null}
              iconCss={undefined}
              muiIconSize={null}
              MuiIconChildren={EmailIcon}
              css={{
                backgroundColor: stepContainerRoundColor,
                color: 'white',
                fontSize: '12px',
                height: '46px',
                borderRadius: '6px',
                position: 'relative',
                boxSizing: 'border-box',
                marginBottom: '40px'
              }}
            />
          </TextFieldContainerLine>
        </React.Fragment> }
      </CustExecContentInnerArea>
    </ContentArea>
  )

}

export default CreateTaskPage