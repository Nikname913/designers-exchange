// ----------------------------------------------------------------
/* eslint-disable array-callback-return */
// ----------------------------------------------------------------
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import InputComponent from '../../comps/input/Input'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { setShow, setType, setMessage } from '../../../../store/slices/alert-content-slice' 
import { selectActualTask } from '../../../../store/slices/task-content-slice'
import { setUpdating } from '../../../../store/slices/data-update-slice'
import { setTFN } from '../../../../store/slices/filter-slice'
import SelectField from '../../comps/select/SelectField'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Search from '@mui/icons-material/Search'
import ButtonComponent from '../../comps/button/Button'
import TaskTable from '../../views/localViews/TaskTable'
import Pagintation from '../../services/pagination.service'
import cssContentArea from '../../styles/views/contentArea.css'
import cssAsideMenu from '../../styles/pages/exchangePageAside.css'
import EmailIcon from '@mui/icons-material/Email'

const { ContentArea, CustExecContentInnerArea, PageTitle } = cssContentArea
const { MenuContainer, 
  TextFieldTitle, 
  CoastRangeContainer, 
  PagintationContainer 
} = cssAsideMenu

const ExchangePage: React.FC = () => {

  const [ ,setFilterLoading ] = useState<boolean>(false)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const TASKS_LIST = useAppSelector(state => state.taskContentReducer.TASKS_DATA)
  const ROLE_USER_ID = useAppSelector(state => state.roleTypeReducer.roleData.userID) 
  const filterName = useAppSelector(state => state.filterReducer.taskFilterName)

  const resetButtonBackground = useAppSelector(state => state.theme.blue3)
  const blackColor = useAppSelector(state => state.theme.black)
  const whiteColor = useAppSelector(state => state.theme.white)
  const greyColor = useAppSelector(state => state.theme.grey)

  const divCSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: '-22px'
  }
  const spanNoActiveCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative', 
    opacity: 0.6, 
    cursor: 'pointer',
  }
  const spanActiveCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative', 
    cursor: 'pointer',
    marginRight: '30px'  
  }
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
  const showMoreButtonCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    color: greyColor,
    textDecoration: 'underline',
    marginBottom: '18px',
    cursor: 'pointer',
  }

  const CustomTextField = styled(TextField)({
    '& .MuiInputLabel-root': {}, /* placeholder стилизуется тут */
    '& .MuiInputLabel-shrink': {
      marginLeft: '0px',
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
      marginTop: '-2.6px'
    },
    '& label.Mui-focused': {
      color: '#2E2E2E',
    },
    '& .MuiInput-underline:after': {
      display: 'none',
      borderBottomColor: '#2E2E2E',
    },
    '& .MuiOutlinedInput-root': {
      height: '50px',
        '& fieldset': {},
        '&:hover fieldset': {},
        '&.Mui-focused fieldset': {
          borderColor: '#167CBF'
        },
    },
  })

  const tasks = (): void => {
    TASKS_LIST.list.filter(item => item.status === 'searching').length > 0 && navigate('/task-list-cust')
    TASKS_LIST.list.filter(item => item.status === 'searching').length === 0 && navigate('/task-list-cust')
    false && dispatch(setShow(true))
    false && dispatch(setType("info"))
    false && dispatch(setMessage("В настоящий момент заданий в работе нет"))
  }
  const arkhiv = (): void => {
    TASKS_LIST.listOrdersComplete.filter(item => item.status === 'backside').length > 0 && navigate('/tasks-archive-cust')
    false && dispatch(setShow(true))
    false && dispatch(setType("info"))
    false && dispatch(setMessage("В настоящий момент заданий в работе нет"))
  }

  const actualTask = (param: string) => {
    dispatch(selectActualTask(param))
  } 

  const baseInputValueChangeEvent = (event: any) => {
    setFilterLoading(true)
    dispatch(setTFN(event.target.value))

    setTimeout(() => { setFilterLoading(false) }, 1300 )
  }

  useEffect(() => console.log(ROLE_USER_ID), [ ROLE_USER_ID ])

  return (
    <ContentArea
      flexDirection={null}
      alignItems={null}
      justify={null}
    > 
      <div style={headBlockCSS}>
        <PageTitle>Активные заказы</PageTitle>
        <div style={divCSS}>
          <span style={{ ...spanActiveCSS, opacity: 0.6 }} onClick={tasks}>
            Задания ({
              TASKS_LIST.list.filter(item => item.status === 'searching').filter(item => item.customer === ROLE_USER_ID).length
            })
          </span>
          <span style={{ ...spanActiveCSS }}>
            В работе ({
              TASKS_LIST.listOrders.filter(item => item.status === 'work').filter(item => item.customer === ROLE_USER_ID).length
            })
          </span>
          <span style={spanNoActiveCSS} onClick={arkhiv}>
            Архивные ({ 
              TASKS_LIST.listOrdersComplete.filter(item => item.status === 'backside').filter(item => item.customer === ROLE_USER_ID).length 
            })
          </span>
        </div>
      </div>
      <MenuContainer>
      <TextFieldTitle style={{ marginTop: '0px', marginBottom: '18px' }}>Сумма гонорара</TextFieldTitle>
        <CoastRangeContainer>
          <InputComponent
            type={'TEXT_INPUT_OUTLINE_FILTER'}
            valueType='text'
            required={false}
            widthType={'px'}
            widthValue={142}
            heightValue={'50px'}
            label={"Цена от"}
            isError={false}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={null}
            store={[ "FROM_COAST", () => null ]}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '11px',
              backgroundColor: whiteColor
            }}
          />
          <InputComponent
            type={'TEXT_INPUT_OUTLINE_FILTER'}
            valueType='text'
            required={false}
            widthType={'px'}
            widthValue={142}
            heightValue={'50px'}
            label={"Цена до"}
            isError={false}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={null}
            store={[ "TO_COAST", () => null ]}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '11px',
              backgroundColor: whiteColor
            }}
          />
        </CoastRangeContainer>
        { false && <InputComponent
          type={'TEXT_INPUT_OUTLINE_SEARCH'}
          valueType='text'
          required={false}
          widthType={'px'}
          widthValue={300}
          heightValue={'50px'}
          label={"Найти задания"}
          isError={false}
          isDisabled={true}
          labelShrinkLeft={"0px"}
          innerLabel={null}
          css={{
            fontSize: '12px',
            position: 'relative',
            boxSizing: 'border-box',
            marginBottom: '40px',
            marginTop: '5px',
            backgroundColor: 'white',
          }}
        /> }

        <CustomTextField 
          type={'text'}
          autoComplete={"off"}
          onFocus={() => dispatch(setUpdating(false))}
          onBlur={baseInputValueChangeEvent}
          id="standard-basic-search" 
          label={"Найти задания"}
          disabled={false}
          InputProps={{
            endAdornment: 
              <InputAdornment position="end">
                <IconButton 
                  style={{ marginRight: '-6px' }} 
                  edge="end"
                >
                  <Search></Search>
                </IconButton>
              </InputAdornment>
          }}
          style={{ width: '100%', backgroundColor: 'white', marginTop: '6px' }} 
        />
        { filterName !== '' && <span
          style={{
            display: 'block',
            position: 'relative',
            backgroundColor: 'rgb(242, 244, 252)',
            width: '100%',
            height: '42px',
            borderRadius: '4px',
            lineHeight: '40px',
            paddingLeft: '16px',
            boxSizing: 'border-box',
            marginBottom: '0px',
            marginTop: '12px',
            cursor: 'pointer',
            fontSize: '13px',
          }}
        >
          <i style={{ textDecoration: 'none', fontStyle: 'normal', fontWeight: 'bold' }}>{"Поиск по словам: "}</i>
          { filterName }
        </span> }

        <TextFieldTitle style={{ marginTop: '33px', marginBottom: '20px' }}>Сортировать по</TextFieldTitle>
        <SelectField 
          placeholder={"Новизне"}
          params={{ width: 300, mb: '0px', height: 50 }}
          data={[
            { value: '1', label: 'Сначала более ранние' },
            { value: '1', label: 'Сначала более поздние' },
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
        { true && <span
          style={{
            display: 'block',
            position: 'relative',
            backgroundColor: 'rgb(253, 237, 237)',
            width: '100%',
            height: '42px',
            borderRadius: '4px',
            lineHeight: '41.2222px',
            paddingLeft: '16px',
            boxSizing: 'border-box',
            marginBottom: '33px',
            marginTop: '12px',
            cursor: 'pointer',
            fontSize: '13px',
          }}
        >
          <i style={{ textDecoration: 'none', fontStyle: 'normal', fontWeight: 'bold' }}>{"Сортировка: "}</i>
          {"Неверный формат даты"}
        </span> }
        <TextFieldTitle style={{ marginTop: '0px', marginBottom: '20px' }}>Фильтровать по</TextFieldTitle>
        <SelectField 
          placeholder={"Местонахождение"}
          params={{ width: 300, mb: '16px', height: 50 }}
          data={[
            { value: '1', label: 'Данные не получены...' },
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
        <SelectField 
          placeholder={"Сортировать по специализации"}
          params={{ width: 300, mb: '33px', height: 50 }}
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
        <FormGroup>
          <FormControlLabel control={<Checkbox disabled defaultChecked/>} label="Только задания ТС"/>
          <FormControlLabel control={<Checkbox disabled defaultChecked/>} label="Безопасная сделка"/>
          <FormControlLabel control={<Checkbox disabled/>} label="Простая сделка"/>
        </FormGroup>
        <TextFieldTitle style={{ marginBottom: '10px', marginTop: '26px' }}>Навыки в задании</TextFieldTitle>
        <FormGroup style={{ fontSize: '15px !important' }}>
          <FormControlLabel control={<Checkbox disabled defaultChecked/>} label="2D"/>
          <FormControlLabel control={<Checkbox disabled defaultChecked/>} label="3D"/>
          <FormControlLabel control={<Checkbox disabled/>} label="BIM"/>
        </FormGroup>
        <TextFieldTitle style={{ marginBottom: '10px', marginTop: '26px' }}>Вид экспертизы</TextFieldTitle>
        <FormGroup>
          <FormControlLabel control={<Checkbox disabled defaultChecked/>} label="Без экспертизы"/>
        </FormGroup>
        <ButtonComponent
          inner={'Сбросить все'} 
          type='CONTAINED_DEFAULT' 
          action={() => console.log('this is button')}
          actionData={null}
          widthType={'px'}
          widthValue={300}
          children={null}
          childrenCss={undefined}
          iconSrc={null}
          iconCss={undefined}
          muiIconSize={null}
          MuiIconChildren={EmailIcon}
          css={{
            backgroundColor: resetButtonBackground,
            color: blackColor,
            fontSize: '12px',
            height: '40px',
            borderRadius: '6px',
            position: 'relative',
            boxSizing: 'border-box',
            marginTop: '40px',
            marginBottom: '34px',
          }}
        />
      </MenuContainer>
      <CustExecContentInnerArea>
        { TASKS_LIST.listOrders.filter(item => item.status === 'work').map((item, index) => {

          if ( item.customer === ROLE_USER_ID ) {

            return (
              <TaskTable key={index}
                viewType={item.status}
                taskInitDate={item.date}
                taskTitle={item.name}
                taskDeadline={item.deadline}
                taskExpertType={item.exper}
                taskCustomer={item.customer}
                taskExecutor={item.executor}
                taskLocation={item.region}
                taskSpecializationTags={item.tags}
                taskDescription={item.description}
                dealStatus={item.status}
                cardWidth={'100%'}
                marbo={"16px"}
                actions={[actualTask]}
                actionsParams={[item.id]}
                deal={{
                  type: item.coast.issafe === true ? 'safe' : 'simple',
                  coast: item.coast.value,
                  prepaid: item.coast.issafe === true ? item.coast.prepay : 0,
                  expert: item.coast.issafe === true ? item.coast.exper : 0,
                }}
              />
            )

          }

        })}

        <PagintationContainer>
          <span style={showMoreButtonCSS}>Загрузить еще</span>
          <Pagintation count={
            ( TASKS_LIST.list.filter(item => item.status === 'searching').length / 10 ) < 1 ? 1 :
            ( TASKS_LIST.list.filter(item => item.status === 'searching').length / 10 ) + ( TASKS_LIST.list.filter(item => item.status === 'searching').length % 10 ) 
          }></Pagintation>
        </PagintationContainer>

      </CustExecContentInnerArea>
    </ContentArea>
  )

}

export default ExchangePage