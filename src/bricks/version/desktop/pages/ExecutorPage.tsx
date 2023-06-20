/* eslint-disable array-callback-return */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useNavigate } from 'react-router-dom'
import Checkbox from '@mui/material/Checkbox'
import InputComponent from '../comps/input/Input'
import Pagintation from '../services/pagination.service'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { setSelectedUsersType } from '../../../store/slices/header-slice'
import { setUpdating, setEFN } from '../../../store/slices/data-update-slice'
import SelectField from '../comps/select/SelectField'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Search from '@mui/icons-material/Search'
import { styled } from '@mui/material/styles'
import ButtonComponent from '../comps/button/Button'
import CustomerExecutorCardPreview from '../views/localViews/CustomerExecutorCardPrev'
import CustomerExecutorCardPreviewLoading from '../views/localViews/CustomerExecutorCardPrevLoading'
import cssContentArea from '../styles/views/contentArea.css'
import cssAsideMenu from '../styles/pages/executorPageAside.css'
import EmailIcon from '@mui/icons-material/Email'
import Stack from '@mui/material/Stack'
import LinearProgress from '@mui/material/LinearProgress'
import defaultAvatar from '../../../img/stock/avatar.svg'

const { ContentArea, CustExecContentInnerArea, PageTitle } = cssContentArea
const { MenuContainer, TextFieldTitle, PagintationContainer } = cssAsideMenu

const ExecutorPage: React.FC = () => {

  const [ filterLoading, setFilterLoading ] = useState<boolean>(false)

  const resetButtonBackground = useAppSelector(state => state.theme.blue3)
  const blackColor = useAppSelector(state => state.theme.black)
  const greyColor = useAppSelector(state => state.theme.grey)

  const filterName = useAppSelector(state => state.dataUpdateReducer.executorFilterName)
  const executors = useAppSelector(state => state.userContentReducer.USERS_DATA.listExecutors)
  .filter(executor => {
    const superName = (executor.bio.name + ' ' + executor.bio.surname).toLowerCase()
    false && console.log(superName)
    false && console.log(filterName)

    if ( superName.indexOf(filterName.toLowerCase()) !== -1 ) {
      return executor
    }

  })

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
  const specializationFilterContainerCSS: React.CSSProperties = {
    display: 'block',
    position:'relative',
    width: '100%',
    height: 'auto',
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

  function customerPage() {
    navigate('/customers')
  }

  const baseInputValueChangeEvent = (event: any) => {
    setFilterLoading(true)
    dispatch(setEFN(event.target.value))

    setTimeout(() => { setFilterLoading(false) }, 1300 )
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { dispatch(setSelectedUsersType('EXEC')) }, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { dispatch(setUpdating(true)) }, [])

  return (
    <ContentArea
      flexDirection={null}
      alignItems={null}
      justify={null}
    > 
      <div style={headBlockCSS}>
        <PageTitle>Исполнители</PageTitle>
        <div style={divCSS}>
          <span style={spanActiveCSS}>Исполнители</span>
          <span style={spanNoActiveCSS} onClick={customerPage}>Заказчики</span>
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
          label={"Поиск по исполнителям"}
          isError={false}
          isDisabled={true}
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
          label={"Поиск по исполнителям"}
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
        </span> }

        <TextFieldTitle>Выберете специализацию</TextFieldTitle>
        <div style={specializationFilterContainerCSS}>
          <SelectField 
            placeholder={"Сортировать по специализации"}
            params={{ width: 300, mb: '11px', height: 58 }}
            data={[
              { value: '1', label: '[ options download ]' },
            ]}
            multy={true}
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
        </div>
        <TextFieldTitle style={{ marginBottom: '8px', marginTop: '20px' }}>Навыки</TextFieldTitle>
        <FormGroup style={{ marginBottom: '26px' }}>
          <FormControlLabel control={<Checkbox disabled defaultChecked/>} label="2D"/>
          <FormControlLabel control={<Checkbox disabled defaultChecked/>} label="3D"/>
          <FormControlLabel control={<Checkbox disabled/>} label="BIM"/>
        </FormGroup>
        <SelectField 
          placeholder={"Местонахождение"}
          params={{ width: 300, mb: '2px', height: 58 }}
          data={[
            { value: '1', label: '[ options download ]' },
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
        <TextFieldTitle>Сортировать по</TextFieldTitle>
        <SelectField 
          placeholder={"Сортировать по рейтингу"}
          params={{ width: 300, mb: '14px', height: 58 }}
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
        <ButtonComponent
          inner={'Сбросить все'} 
          type='CONTAINED_DEFAULT' 
          action={() => { 
            setFilterLoading(true)
            dispatch(setEFN(''))
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
          { executors.map((item: any, index: number): ReactJSXElement => {

            console.log(item)

            return (
              <CustomerExecutorCardPreview
                key={index}
                isDisabledMessage={false}
                userName={ item.bio && item.bio.name + ' ' + item.bio.surname }
                userId={item.clientId}
                userAvatar={defaultAvatar}
                userType={"EXECUTOR"}
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

          { executors.length === 0 && 
            
            <span 
              style={{
                display: 'block',
                textAlign: 'center',
                width: '100%',
                color: 'gray',
                marginTop: '100px',
                marginBottom: '80px'
              }}
            >
              Пользователи не найдены
            </span> 
            
          }

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
            ( executors.length / 20 ) < 1 ? 1 :
            ( executors.length / 20 ) + ( executors.length % 20 )
          }></Pagintation>
        </PagintationContainer> }

      </CustExecContentInnerArea>
    </ContentArea>
  )

}

export default ExecutorPage