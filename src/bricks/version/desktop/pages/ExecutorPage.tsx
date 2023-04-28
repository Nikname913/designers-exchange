import React, { useState } from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useNavigate } from 'react-router-dom'
import Checkbox from '@mui/material/Checkbox'
import InputComponent from '../comps/input/Input'
import RequestActionsComponent from '../services/request.service'
import Pagintation from '../services/pagination.service'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { setExecutors } from '../../../store/slices/user-content-slice'
import SelectField from '../comps/select/SelectField'
import ButtonComponent from '../comps/button/Button'
import CustomerExecutorCardPreview from '../views/localViews/CustomerExecutorCardPrev'
import cssContentArea from '../styles/views/contentArea.css'
import cssAsideMenu from '../styles/pages/executorPageAside.css'
import EmailIcon from '@mui/icons-material/Email'
import defaultAvatar from '../../../img/stock/avatar.svg'

const { ContentArea, CustExecContentInnerArea, PageTitle } = cssContentArea
const { MenuContainer, TextFieldTitle, PagintationContainer } = cssAsideMenu

const ExecutorPage: React.FC = () => {

  const resetButtonBackground = useAppSelector(state => state.theme.blue3)
  const blackColor = useAppSelector(state => state.theme.black)
  const greyColor = useAppSelector(state => state.theme.grey)
  const executors = useAppSelector(state => state.userContentReducer.USERS_DATA.listExecutors)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [ AUTH_REQUEST, ] = useState(true)

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

  function customerPage() {
    navigate('/customers')
  }

  const callbackSetTasksList = (param: any) => {

    const filterUsers = param.users.filter((user: any) => user.type === 'EXECUTOR')
    dispatch(setExecutors(filterUsers))

  }

  return (
    <ContentArea
      flexDirection={null}
      alignItems={null}
      justify={null}
    > 

      { AUTH_REQUEST && <RequestActionsComponent

        callbackAction={callbackSetTasksList}
        requestData={{
          type: 'POST',
          urlstring: '/users',
          body: {
            status: ''
          }
        }}
      
      /> }

      <div style={headBlockCSS}>
        <PageTitle>Исполнители</PageTitle>
        <div style={divCSS}>
          <span style={spanActiveCSS}>Исполнители</span>
          <span style={spanNoActiveCSS} onClick={customerPage}>Заказчики</span>
        </div>
      </div>
      <MenuContainer>
        <InputComponent
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
        />
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
            marginTop: '22px',
            marginBottom: '34px',
          }}
        />
      </MenuContainer>
      <CustExecContentInnerArea>
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
              userRate={4.88}
              userProjects={[ 0, 0, 0 ]}
              cardWidth={"calc(50% - 8px)"}
              marginBottom={'16px'}
              marginRight={'0px'}
              userTags={[]}
            />
          )
        })}

        <CustomerExecutorCardPreview
          isDisabledMessage={true}
          userName={"[ пустая карточка ]"}
          userAvatar={defaultAvatar}
          userType={"EXECUTOR"}
          userEmployment={""}
          userLocation={"Екатеринбург"}
          userReviews={0}
          userRate={4.88}
          userProjects={[ 0, 0, 0 ]}
          cardWidth={"calc(50% - 8px)"}
          marginBottom={'16px'}
          marginRight={'0px'}
          userTags={[]}
        />
        <CustomerExecutorCardPreview
          isDisabledMessage={true}
          userName={"[ пустая карточка ]"}
          userAvatar={defaultAvatar}
          userType={"EXECUTOR"}
          userEmployment={""}
          userLocation={"Екатеринбург"}
          userReviews={0}
          userRate={4.88}
          userProjects={[ 0, 0, 0 ]}
          cardWidth={"calc(50% - 8px)"}
          marginBottom={'16px'}
          marginRight={'0px'}
          userTags={[]}
        />

        <PagintationContainer>
          <span style={showMoreButtonCSS}>Загрузить еще</span>
          <Pagintation count={
            ( executors.length / 20 ) < 1 ? 1 :
            ( executors.length / 20 ) + ( executors.length % 20 )
          }></Pagintation>
        </PagintationContainer>

      </CustExecContentInnerArea>
    </ContentArea>
  )

}

export default ExecutorPage