import React from 'react'
import InputComponent from '../comps/input/Input'
import { useAppSelector } from '../../../store/hooks'
import { useNavigate } from 'react-router-dom'
import SelectField from '../comps/select/SelectField'
import ButtonComponent from '../comps/button/Button'
import Pagintation from '../services/pagination.service'
import CustomerExecutorCardPreview from '../views/localViews/CustomerExecutorCardPrev'
import cssContentArea from '../styles/views/contentArea.css'
import cssAsideMenu from '../styles/pages/customersPageAside.css'
import EmailIcon from '@mui/icons-material/Email'
import defaultAvatar from '../../../img/stock/avatar.svg'

const { ContentArea, CustExecContentInnerArea, PageTitle } = cssContentArea
const { MenuContainer, TextFieldTitle, PagintationContainer } = cssAsideMenu

const CustomerPage: React.FC = () => {

  const resetButtonBackground = useAppSelector(state => state.theme.blue3)
  const blackColor = useAppSelector(state => state.theme.black)
  const greyColor = useAppSelector(state => state.theme.grey)
  const navigate = useNavigate()

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

  function executorPage() {
    navigate("/ispolniteli")
  }

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
        <InputComponent
          type={'TEXT_INPUT_OUTLINE_SEARCH'}
          valueType='text'
          required={false}
          widthType={'px'}
          widthValue={300}
          label={"Поиск по заказчикам"}
          isError={false}
          isDisabled={false}
          labelShrinkLeft={"0px"}
          innerLabel={null}
          css={{
            fontSize: '12px',
            position: 'relative',
            boxSizing: 'border-box',
            marginBottom: '0px',
            backgroundColor: 'white'
          }}
        />
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
          icon={null}
          iconStyles={{
            marginTop: '-12px',
            marginLeft: '6px',
            width: '34px',
          }}
        />
        <TextFieldTitle>Сортировать по</TextFieldTitle>
        <SelectField 
          placeholder={"Сортировать по специализации"}
          params={{ width: 300, mb: '11px', height: 58 }}
          data={[
            { value: '1', label: 'Вентиляция' },
            { value: '2', label: 'Пожарная безопасность' },
            { value: '3', label: 'Тепломеханические решения' },
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
        <TextFieldTitle>Местонахождение</TextFieldTitle>
        <SelectField 
          placeholder={"Местонахождение"}
          params={{ width: 300, mb: '11px', height: 58 }}
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
        { Array(6).fill(0).map((item, index) => {
          return (
            <CustomerExecutorCardPreview
              key={index}
              isDisabledMessage={true}
              userName={"Николай Шипов"}
              userAvatar={defaultAvatar}
              userEmployment={"ИП"}
              userLocation={"Екатеринбург"}
              userReviews={24}
              userRate={4.96}
              userProjects={[98,24,12]}
              cardWidth={"calc(50% - 8px)"}
              marginBottom={'16px'}
              marginRight={'0px'}
              userTags={[
                "Пожарная безопасность",
                "Сигнализация",
                "Сигнализация",
                "Пожарная безопасность",
                "Сигнализация",
                "Пожарная безопасность"
              ]}
            />
          )
        })}

        <PagintationContainer>
          <span style={showMoreButtonCSS}>Загрузить еще</span>
          <Pagintation></Pagintation>
        </PagintationContainer>

      </CustExecContentInnerArea>
    </ContentArea>
  )

}

export default CustomerPage