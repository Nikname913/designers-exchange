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
  setObjectParamsHeight
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

  const USER_ID = useAppSelector(state => state.roleTypeReducer.roleData.userID)
  const [ CREATE_TASK_REQUEST, SET_CREATE_TASK_REQUEST ] = useState(false)

  const [ step1Color, setStep1Color ] = useState('rgb(58, 75, 86)')  
  const [ step2Color, setStep2Color ] = useState('rgb(58, 75, 86)')  
  const [ step3Color, setStep3Color ] = useState('rgb(58, 75, 86)')  
  const [ step4Color, ] = useState('rgb(58, 75, 86)')  
  const [ step5Color, ] = useState('rgb(58, 75, 86)')  

  const [ line1Color, setLine1Color ] = useState(stepsContainerColor) 
  const [ line2Color, setLine2Color ] = useState(stepsContainerColor)
  const [ line3Color, ] = useState(stepsContainerColor)
  const [ line4Color, ] = useState(stepsContainerColor)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dateString = year + '-' + month + '-' + day

  console.log(USER_ID)

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

  const addTaskData = () => {

    false && console.log(TASK_DATE_START)
    false && console.log(TASK_DATE_FINISH)

    SET_CREATE_TASK_REQUEST(true)
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
            coast: TASK_COAST, 
            prepay: TASK_PREPAY, 
            prepayDays: TASK_PREPAY_DAYS,
            expertDays: TASK_EXPERT_DAYS.$D + '-' + ( TASK_EXPERT_DAYS.$M + 1 ) + '-' + TASK_EXPERT_DAYS.$y,
            expertCoast: TASK_EXPERT_COAST, 
            dateStart: TASK_DATE_START.$D + '-' + ( TASK_DATE_START.$M + 1 ) + '-' + TASK_DATE_START.$y,
            dateFinish: TASK_DATE_FINISH.$D + '-' + ( TASK_DATE_FINISH.$M + 1 ) + '-' + TASK_DATE_FINISH.$y,
            square: TASK_OP_SQUARE, 
            storeys: TASK_OP_STOREYS, 
            height: TASK_OP_HEIGHT,
            description: TASK_DESCRIPTION,
            customer: USER_ID,
            status: 'TASK-ACTIVE',
            date: dateString,
            taskId: USER_ID.slice(0, 10) + '-' + (Math.random() * 100000).toFixed(0)
          }
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
        <BackwardButton color={backwardButtonColor} onClick={() => navigate('/zakazchik-moi-zadaniya')}>Ко всем заданиям</BackwardButton>
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
          type='OUTLINED_DISABLED' 
          action={() => console.log('this is button')}
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
            fontSize: '12px',
            height: '46px',
            borderRadius: '6px',
            position: 'relative',
            boxSizing: 'border-box',
            marginTop: '46px'
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '40px' }}>
          <Checkbox {...label} />
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
            marginTop: '20px'
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
            label={"Дата начала работ"}
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
            label={"Дата сдачи задания"}
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
              { value: '1', label: '[ options download ]' },
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
        <TextFieldContainerLine>
          <InputComponent
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
          />
          <span style={spanDelimiterCSS}></span>
          <div style={{ ...divHalfWidthCSS, paddingBottom: '14px' }}>
            <FormGroup>
              <FormControlLabel control={<Checkbox/>} label="Договорная стоимость"/>
            </FormGroup>
          </div>
        </TextFieldContainerLine>
        <TextFieldTitle style={{ marginTop: '30px' }}>Условия</TextFieldTitle>
        <TextFieldSubTitle mt={'0px'} mb={'18px'}>Предварительное решение</TextFieldSubTitle>
        <TextFieldContainerLine>
          <InputComponent
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
          />
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
        <TextFieldSubTitle mt={'0px'} mb={'18px'}>Предварительное решение</TextFieldSubTitle>
        <TextFieldContainerLine>
          <SelectField 
            placeholder={"Государственная"}
            params={{ width: 50, mb: '16px', height: 50 }}
            data={[
              { value: '1', label: '[ options download ]' },
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
            <div style={{ display: 'block', width: '50%', marginTop: '-23px' }}>
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
            <span style={spanDelimiterCSS} />
            <InputComponent
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
            />
          </div>
        </TextFieldContainerLine>
        <TextFieldTitle style={{ marginTop: '30px' }}>Данные об объекте</TextFieldTitle>
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
        <TextFieldTitle style={{ marginTop: '30px' }}>Описание задачи</TextFieldTitle>
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
        <TextFieldContainerLine style={{ marginBottom: '12px', marginTop: '28px' }}>
          <div style={{ ...divHalfWidthCSS }}>
            <TextFieldTitle>Техническое задание</TextFieldTitle>
          </div>
          <span style={spanDelimiterCSS}></span>
          <div style={{ ...divHalfWidthCSS }}>
            <TextFieldTitle>Вложения</TextFieldTitle>
          </div>
        </TextFieldContainerLine>
        <TextFieldContainerLine style={{ marginBottom: '2px' }}>
          <div style={{ ...divHalfWidthCSS }}>
            <ButtonComponent
              inner={'Добавить файлы'} 
              type='UPLOAD' 
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
                marginBottom: '12px'
              }}
            />
          </div>
          <span style={spanDelimiterCSS}></span>
          <div style={{ ...divHalfWidthCSS }}>
            <ButtonComponent
              inner={'Добавить файлы'} 
              type='UPLOAD' 
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
                marginBottom: '12px'
              }}
            />
          </div>
        </TextFieldContainerLine>
        <TextFieldTitle style={{ marginTop: '28px', marginBottom: '42px' }}>Разделы [ дальнейшая разработка ]</TextFieldTitle>
        <TextFieldContainerLine style={{ flexWrap: 'wrap' }}>
          <ChapterController></ChapterController>
        </TextFieldContainerLine>
        <TextFieldTitle style={{ marginTop: '18px' }}>Новый раздел</TextFieldTitle>
        <TextFieldContainerLine style={{ marginTop: '8px' }}>
          <InputComponent
            type={'TEXT_INPUT_OUTLINE'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
            heightValue={'50px'}
            label={"Развание раздела"}
            isError={false}
            isDisabled={true}
            labelShrinkLeft={"0px"}
            innerLabel={null}
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
              { value: '1', label: '[ options download ]' },
            ]}
            multy={true}
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
            type={'TEXT_INPUT_OUTLINE'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={100}
            heightValue={'50px'}
            label={"Подробнее опишите вашу задачу"}
            isError={false}
            isDisabled={true}
            labelShrinkLeft={"0px"}
            innerLabel={null}
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
            inner={'Добавить файлы'} 
            type='UPLOAD' 
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
              marginBottom: '46px'
            }}
          />
        </TextFieldContainerLine>
      </CustExecContentInnerArea>
    </ContentArea>
  )

}

export default CreateTaskPage