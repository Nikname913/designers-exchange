// ----------------------------------------------------------------
/* eslint-disable react-hooks/exhaustive-deps */
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
import { setFromCoast, setToCoast } from '../../../../store/slices/filter-slice'
import SelectField from '../../comps/select/SelectField'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Search from '@mui/icons-material/Search'
import { styled } from '@mui/material/styles'
import ButtonComponent from '../../comps/button/Button'
import TaskTable from '../../views/localViews/TaskTable'
import TaskTableLoading from '../../views/localViews/TaskTableLoading'
import Stack from '@mui/material/Stack'
import LinearProgress from '@mui/material/LinearProgress'
import Pagintation from '../../services/pagination.service'
import cssContentArea from '../../styles/views/contentArea.css'
import cssAsideMenu from '../../styles/pages/exchangePageAside.css'
import EmailIcon from '@mui/icons-material/Email'
import closeIcon from '../../../../img/icons/close.svg'

const { ContentArea, CustExecContentInnerArea, PageTitle } = cssContentArea
const { MenuContainer, 
  TextFieldTitle, 
  CoastRangeContainer, 
  PagintationContainer 
} = cssAsideMenu

const ExchangePage: React.FC = () => {

  const [ filterLoading, setFilterLoading ] = useState<boolean>(false)
  const [ filterSpec, setFilterSpec ] = useState<string>('')

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const filterCoastFrom = useAppSelector(state => state.filterReducer.fromCoast)
  const filterCoastTo = useAppSelector(state => state.filterReducer.toCoast)
  const filterName = useAppSelector(state => state.filterReducer.taskFilterName)
  const ROLE_TYPE = useAppSelector(state => state.roleTypeReducer.activeRole)
  const TASKS_LIST_CLEAR = useAppSelector(state => state.taskContentReducer.TASKS_DATA)

  let TASKS_LIST: Array<any> = []

  if ( filterCoastFrom !== '' ) 

    TASKS_LIST = TASKS_LIST_CLEAR.list.filter(item => +item.coast.value >= +filterCoastFrom)
      .filter(item => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 )
      .filter(item => item.tags && item.tags?.join(' ').indexOf(filterSpec) > -1)

  if ( filterCoastTo !== '' ) 

    TASKS_LIST = TASKS_LIST_CLEAR.list.filter(item => +item.coast.value <= +filterCoastTo)
      .filter(item => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 )
      .filter(item => item.tags && item.tags?.join(' ').indexOf(filterSpec) > -1)

  if ( filterCoastFrom !== '' && filterCoastTo !== '' )
  
    TASKS_LIST = TASKS_LIST_CLEAR.list.filter(item => (+item.coast.value >= +filterCoastFrom && +item.coast.value <= +filterCoastTo))
      .filter(item => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 )
      .filter(item => item.tags && item.tags?.join(' ').indexOf(filterSpec) > -1)

  if ( filterCoastFrom === '' && filterCoastTo === '' )

    TASKS_LIST = TASKS_LIST_CLEAR.list
      .filter(item => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 )
      .filter(item => item.tags && item.tags?.join(' ').indexOf(filterSpec) > -1)

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

  const orders = (): void => {
    TASKS_LIST.filter(item => item.status === 'work').length > 0 && navigate('/active-orders-all')
    if ( TASKS_LIST.filter(item => item.status === 'work').length === 0 ) {
      dispatch(setShow(true))
      dispatch(setType("info"))
      dispatch(setMessage("В настоящий момент задания в работе отсутствуют"))
    }
  }
  const arkhiv = (): void => {
    TASKS_LIST.filter(item => item.status === 'backside').length > 0 && navigate('/tasks-archive-all')
    if ( TASKS_LIST.filter(item => item.status === 'backside').length === 0 ) {
      dispatch(setShow(true))
      dispatch(setType("info"))
      dispatch(setMessage("В настоящий момент задания в архиве отсутствуют"))
    }
  }

  const actualTask = (param: string) => {
    dispatch(selectActualTask(param))
  }

  const baseInputValueChangeEvent = (event: any) => {
    setFilterLoading(true)
    dispatch(setTFN(event.target.value))

    setTimeout(() => { setFilterLoading(false) }, 1300 )
  }

  const changeFilterSpec = (param: string) => {
    setFilterSpec(param)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { dispatch(setUpdating(true)) }, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { console.log(TASKS_LIST[0]) }, [])

  return (
    <ContentArea
      flexDirection={null}
      alignItems={null}
      justify={null}
    >

      <div style={headBlockCSS}>
        <PageTitle>Задания</PageTitle>
        <div style={divCSS}>
          <span style={{ ...spanActiveCSS }}>Открытые задания ({TASKS_LIST.filter(item => item.status === 'searching').length})</span>
          { false && <span style={{ ...spanActiveCSS, opacity: 0.6 }} onClick={orders}>В работе ({TASKS_LIST.filter(item => item.status === 'work').length})</span> }
          { false && <span style={spanNoActiveCSS} onClick={arkhiv}>Архивные ({TASKS_LIST.filter(item => item.status === 'backside').length})</span> }
        </div>
      </div>
      <MenuContainer>

        { ROLE_TYPE === "CUSTOMER" || ROLE_TYPE === "EXECUTOR" || ROLE_TYPE === "UNDEFINED" ? <React.Fragment>

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
              borderRadius: '4px',
              lineHeight: '22px',
              padding: '13px 16px 15px',
              paddingLeft: '16px',
              paddingRight: '33px',
              boxSizing: 'border-box',
              marginBottom: '0px',
              marginTop: '12px',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            <i style={{ textDecoration: 'none', fontStyle: 'normal', fontWeight: 'bold' }}>{"Поиск по: "}</i>
            { filterName }

            <img
              alt={""}
              src={closeIcon}
              onClick={() => dispatch(setTFN(''))}
              style={{
                display: 'block',
                position: 'absolute',
                width: '18px',
                left: '100%',
                top: '50%',
                marginTop: '-9px',
                marginLeft: '-30px',
                cursor: 'pointer'
              }}
            />

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
              { value: '1', label: 'Все доступные регионы' },
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
            placeholder={ filterSpec === 'helloo' ? "helloo" : "Сортировать по специализации" }
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
            action={changeFilterSpec}
            actionType={"FILTER"}
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
            <FormControlLabel control={<Checkbox disabled defaultChecked/>} label="Государственная"/>
            <FormControlLabel control={<Checkbox disabled defaultChecked/>} label="Без экспертизы"/>
            <FormControlLabel control={<Checkbox disabled defaultChecked/>} label="Частная экспертиза"/>
            <FormControlLabel control={<Checkbox disabled defaultChecked/>} label="Все варианты"/>
          </FormGroup>
          <ButtonComponent
            inner={'Сбросить все'} 
            type='CONTAINED_DEFAULT' 
            action={() => {
              setFilterLoading(true)
              dispatch(setTFN(''))
              setFilterSpec('')
              dispatch(setFromCoast(''))
              dispatch(setToCoast(''))

              setTimeout(() => { setFilterLoading(false) }, 1300 )
            }}
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
        </React.Fragment> : <React.Fragment></React.Fragment> }
      </MenuContainer>
      <CustExecContentInnerArea>

        { filterLoading === true && <TaskTableLoading
          viewType={'mainView'}
          taskInitDate={"----"}
          taskTitle={"----"}
          taskDeadline={"----"}
          taskExpertType={"----"}
          taskCustomer={"----"}
          taskExecutor={"----"}
          taskLocation={"----"}
          taskSpecializationTags={[]}
          taskDescription={"----"}
          dealStatus={"----"}
          cardWidth={'100%'}
          marbo={"16px"}
          actions={[]}
          actionsParams={[]}
          deal={{
            type: 'safe',
            coast: 100000,
            prepaid: 20000,
            expert: 80000,
          }}
        /> }

        { filterLoading === true && <Stack sx={{ width: '100%', color: 'rgb(22, 124, 191)', borderRadius: '4px' }} spacing={2}>
          <LinearProgress style={{ borderRadius: '4px' }} color="inherit" />
        </Stack> }
        
        { filterLoading === false && <React.Fragment>
          { TASKS_LIST.filter(item => item.status === 'searching').map((item, index) => {

            return (
              <TaskTable 
                key={index}
                viewType={'mainView'}
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
                actionsParams={[item.id, item.responds]}
                deal={{
                  type: item.coast.issafe === true ? 'safe' : 'simple',
                  coast: item.coast.value,
                  prepaid: item.coast.issafe === true ? item.coast.prepay : 0,
                  expert: item.coast.issafe === true ? item.coast.exper : 0,
                }}
              />
            )
          })}
        </React.Fragment> }

        <React.Fragment>
          { TASKS_LIST.length === 0 && 
            <TaskTableLoading
              viewType={'mainView'}
              taskInitDate={"----"}
              taskTitle={"----"}
              taskDeadline={"----"}
              taskExpertType={"----"}
              taskCustomer={"----"}
              taskExecutor={"----"}
              taskLocation={"----"}
              taskSpecializationTags={[]}
              taskDescription={"----"}
              dealStatus={"----"}
              cardWidth={'100%'}
              marbo={"16px"}
              actions={[]}
              actionsParams={[]}
              deal={{
                type: 'safe',
                coast: 100000,
                prepaid: 20000,
                expert: 80000,
              }}
            /> }
          { TASKS_LIST.length === 0 &&
            <Stack sx={{ width: '100%', color: 'rgb(22, 124, 191)', borderRadius: '4px' }} spacing={2}>
              <LinearProgress style={{ borderRadius: '4px' }} color="inherit" />
            </Stack> }
          { TASKS_LIST.length === 0 && <span
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
              marginTop: '15px',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            <i style={{ textDecoration: 'none', fontStyle: 'normal', fontWeight: 'bold' }}>{"Внимание: "}</i>
            {"Данные не получены, проверьте соединение с интернетом"}
          </span> }
        </React.Fragment>

        { filterLoading === false && <PagintationContainer>
          <span style={showMoreButtonCSS}>Загрузить еще</span>
          <Pagintation count={
            ( TASKS_LIST.filter(item => item.status === 'searching').length / 10 ) < 1 ? 1 :
            ( TASKS_LIST.filter(item => item.status === 'searching').length / 10 ) + ( TASKS_LIST.filter(item => item.status === 'searching').length % 10 ) 
          }></Pagintation>
        </PagintationContainer> }

      </CustExecContentInnerArea>
    </ContentArea>
  )

}

export default ExchangePage