/* eslint-disable array-callback-return */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import InputComponent from '../comps/input/Input'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { useNavigate } from 'react-router-dom'
import { setSelectedUsersType } from '../../../store/slices/header-slice'
import { setUpdating, setCFN } from '../../../store/slices/data-update-slice'
import SelectField from '../comps/select/SelectField'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Search from '@mui/icons-material/Search'
import { styled } from '@mui/material/styles'
import ButtonComponent from '../comps/button/Button'
import Pagintation from '../services/pagination.service'
import CustomerExecutorCardPreview from '../views/localViews/CustomerExecutorCardPrev'
import CustomerExecutorCardPreviewLoading from '../views/localViews/CustomerExecutorCardPrevLoading'
import cssContentArea from '../styles/views/contentArea.css'
import cssAsideMenu from '../styles/pages/customersPageAside.css'
import EmailIcon from '@mui/icons-material/Email'
import Stack from '@mui/material/Stack'
import LinearProgress from '@mui/material/LinearProgress'
import defaultAvatar from '../../../img/stock/avatar.svg'
import closeIcon from '../../../img/icons/close.svg'

import bearAvatar from '../../../img/avatars/bear.svg'
import enotAvatar from '../../../img/avatars/enot.svg'
import foxAvatar from '../../../img/avatars/fox.svg'
import groupAvatar from '../../../img/avatars/group.svg'
import manAvatar from '../../../img/avatars/man.svg'
import womanAvatar from '../../../img/avatars/woman.svg'

const { ContentArea, CustExecContentInnerArea, PageTitle } = cssContentArea
const { MenuContainer, TextFieldTitle, PagintationContainer } = cssAsideMenu

const CustomerPage: React.FC = () => {

  const [ filterLoading, setFilterLoading ] = useState<boolean>(false)
  const [ filterSpec, setFilterSpec ] = useState<string>('')

  const resetButtonBackground = useAppSelector(state => state.theme.blue3)
  const blackColor = useAppSelector(state => state.theme.black)
  const greyColor = useAppSelector(state => state.theme.grey)

  const filterName = useAppSelector(state => state.dataUpdateReducer.customerFilterName)
  const customers = useAppSelector(state => state.userContentReducer.USERS_DATA.listCustomers)
    .filter(customer => {
      const superName = (customer.bio.name + ' ' + customer.bio.surname).toLowerCase()
      false && console.log(superName)
      false && console.log(filterName)

      if ( superName.indexOf(filterName.toLowerCase()) !== -1 ) {
        return customer
      }

    })
    .filter(customer => customer.spec && customer.spec?.join(' ').indexOf(filterSpec) > -1)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

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
    marginRight: '30px' 
  }
  const spanActiveCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative', 
    cursor: 'pointer', 
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

  function executorPage() {
    navigate("/executors")
  }

  const baseInputValueChangeEvent = (event: any) => {
    setFilterLoading(true)
    dispatch(setCFN(event.target.value))

    setTimeout(() => { setFilterLoading(false) }, 1300 )
  }

  const changeFilterSpec = (param: string) => {
    setFilterSpec(param)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { dispatch(setSelectedUsersType('CUST')) }, [])
  useEffect(() => { console.log('новый рендер') }, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { dispatch(setUpdating(true)) }, [])

  return (
    <ContentArea
      flexDirection={null}
      alignItems={null}
      justify={null}
    > 
      <div style={headBlockCSS}>
        <PageTitle>Заказчики</PageTitle>
        <div style={divCSS}>
          <span style={spanNoActiveCSS} onClick={executorPage}>Исполнители</span>
          <span style={spanActiveCSS}>Заказчики</span>
        </div>
      </div>
      <MenuContainer>
        { false && <InputComponent
          type={'TEXT_INPUT_OUTLINE_SEARCH'}
          valueType='text'
          required={false}
          widthType={'px'}
          widthValue={300}
          heightValue={'50px'}
          label={"Поиск по заказчикам"}
          store={[ '', () => {}]}
          isError={false}
          isDisabled={false}
          labelShrinkLeft={"0px"}
          innerLabel={null}
          css={{
            fontSize: '12px',
            position: 'relative',
            boxSizing: 'border-box',
            marginBottom: '8px',
            backgroundColor: 'white'
          }}
        /> } 

        <CustomTextField 
          type={'text'}
          autoComplete={"off"}
          onFocus={() => dispatch(setUpdating(false))}
          onBlur={baseInputValueChangeEvent}
          id="standard-basic-search" 
          label={"Поиск по заказчикам"}
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
          style={{ width: '100%', backgroundColor: 'white' }} 
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

          <img
            alt={""}
            src={closeIcon}
            onClick={() => dispatch(setCFN(''))}
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

        <TextFieldTitle>Сортировать по</TextFieldTitle>
        <SelectField 
          placeholder={"Сортировать по рейтингу"}
          params={{ width: 300, mb: '11px', height: 58 }}
          data={[
            { value: '1', label: 'Сортировать по рейтингу' },
            { value: '2', label: 'Сортировать по отзывам' },
            { value: '3', label: 'Выполненные заказы' },
          ]}
          multy={false}
          action={() => {}}
          actionType={""}
          actionParams={[]}
          showIcon={true}
          isDisabled={true}
          icon={null}
          iconStyles={{
            marginTop: '-12px',
            marginLeft: '6px',
            width: '34px',
          }}
        />
        <TextFieldTitle>Выберите специализацию</TextFieldTitle>
        <SelectField 
          placeholder={ filterSpec === 'helloo' ? "helloo" : "Сортировать по специализации" }
          params={{ width: 300, mb: '11px', height: 58 }}
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
          isDisabled={false}
          icon={null}
          iconStyles={{
            marginTop: '-12px',
            marginLeft: '6px',
            width: '34px',
          }}
        />
        <TextFieldTitle>Местонахождение</TextFieldTitle>
        <SelectField 
          placeholder={"Местонахождение"}
          params={{ width: 300, mb: '14px', height: 58 }}
          data={[
            { value: '1', label: 'Загрузка региона..' },
            { value: '2', label: 'Загрузка региона..' },
            { value: '1', label: 'Загрузка региона..' },
          ]}
          multy={false}
          action={() => {}}
          actionType={""}
          actionParams={[]}
          showIcon={true}
          isDisabled={true}
          icon={null}
          iconStyles={{
            marginTop: '-12px',
            marginLeft: '6px',
            width: '34px',
          }}
        />
        <ButtonComponent
          inner={'Сбросить все'} 
          type='CONTAINED_DEFAULT' 
          action={() => { 
            setFilterLoading(true)
            dispatch(setCFN(''))
            setFilterSpec('')
            dispatch(setUpdating(true))
            
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
            marginTop: '22px',
            marginBottom: '34px',
          }}
        />
      </MenuContainer>
      <CustExecContentInnerArea>
        { filterLoading === false && <React.Fragment>
          { customers.map((item: any, index: number): ReactJSXElement => {
            return (
              <CustomerExecutorCardPreview
                key={index}
                isDisabledMessage={true}
                userName={ item.bio && item.bio.name }
                userId={item.clientId}
                userAvatar={
                  item.avatar === '1' ? bearAvatar :
                  item.avatar === '2' ? enotAvatar :
                  item.avatar === '3' ? foxAvatar :
                  item.avatar === '4' ? groupAvatar :
                  item.avatar === '5' ? manAvatar :
                  item.avatar === '6' ? womanAvatar : bearAvatar
                }
                userType={"CUSTOMER"}
                userEmployment={""}
                userLocation={ item.location && item.location.city }
                userReviews={0}  
                userRate={5.00}
                userProjects={[ 0, 0, 0 ]}
                cardWidth={"calc(50% - 8px)"}
                marginBottom={'16px'}
                marginRight={'0px'}
                userTags={item.spec}
              />
            )
          })}
        </React.Fragment> }
        { filterLoading === false && <React.Fragment>

          { customers.length === 0 && 
            
            <CustomerExecutorCardPreviewLoading
              isDisabledMessage={true}
              userName={ "" }
              userId={ "" }
              userAvatar={defaultAvatar}
              userType={"CUSTOMER"}
              userEmployment={""}
              userLocation={ "" }
              userReviews={0}  
              userRate={5.00}
              userProjects={[ 0, 0, 0 ]}
              cardWidth={"calc(50% - 8px)"}
              marginBottom={'16px'}
              marginRight={'0px'}
              userTags={[]}
            />
            
          }
          { customers.length === 0 && 
            
            <CustomerExecutorCardPreviewLoading
              isDisabledMessage={true}
              userName={ "" }
              userId={ "" }
              userAvatar={defaultAvatar}
              userType={"CUSTOMER"}
              userEmployment={""}
              userLocation={ "" }
              userReviews={0}  
              userRate={5.00}
              userProjects={[ 0, 0, 0 ]}
              cardWidth={"calc(50% - 8px)"}
              marginBottom={'16px'}
              marginRight={'0px'}
              userTags={[]}
            />
            
          }
          { customers.length === 0 && 
            
            <Stack sx={{ width: '100%', color: 'rgb(22, 124, 191)', borderRadius: '4px' }} spacing={2}>
              <LinearProgress style={{ borderRadius: '4px' }} color="inherit" />
            </Stack>
            
          }
          { customers.length === 0 && <span
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

        </React.Fragment> }
        { filterLoading === true && <React.Fragment>
          { Array(2).fill("").map((item: any, index: number): ReactJSXElement => {
            return (
              <CustomerExecutorCardPreviewLoading
                key={index}
                isDisabledMessage={true}
                userName={ item.bio && item.bio.name }
                userId={item.clientId}
                userAvatar={defaultAvatar}
                userType={"CUSTOMER"}
                userEmployment={""}
                userLocation={ item.location && item.location.city }
                userReviews={0}  
                userRate={5.00}
                userProjects={[ 0, 0, 0 ]}
                cardWidth={"calc(50% - 8px)"}
                marginBottom={'16px'}
                marginRight={'0px'}
                userTags={item.spec}
              />
            )
          })}
        </React.Fragment> }

        { filterLoading === true && <Stack sx={{ width: '100%', color: 'rgb(22, 124, 191)', borderRadius: '4px' }} spacing={2}>
          <LinearProgress style={{ borderRadius: '4px' }} color="inherit" />
        </Stack> }

        { filterLoading === false && <PagintationContainer>
          <span style={showMoreButtonCSS}>Загрузить еще</span>
          <Pagintation count={
            ( customers.length / 20 ) < 1 ? 1 :
            ( customers.length / 20 ) + ( customers.length % 20 )
          }></Pagintation>
        </PagintationContainer> }

      </CustExecContentInnerArea>
    </ContentArea>
  )

}

export default CustomerPage