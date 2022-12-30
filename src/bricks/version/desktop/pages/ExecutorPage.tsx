import React from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useNavigate } from 'react-router-dom'
import Checkbox from '@mui/material/Checkbox'
import InputComponent from '../comps/input/Input'
import Pagintation from '../services/pagination.service'
import { useAppSelector } from '../../../store/hooks'
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

  function customerPage() {
    navigate('/zakazchiki')
  }

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
        <InputComponent
          type={'TEXT_INPUT_OUTLINE_SEARCH'}
          valueType='text'
          required={false}
          widthType={'px'}
          widthValue={300}
          label={"Поиск по исполнителям"}
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
        <TextFieldTitle>Выберете специализацию</TextFieldTitle>
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
        <TextFieldTitle style={{ marginBottom: '6px' }}>Навыки</TextFieldTitle>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked/>} label="2D"/>
          <FormControlLabel control={<Checkbox defaultChecked/>} label="3D"/>
          <FormControlLabel control={<Checkbox/>} label="BIM"/>
        </FormGroup>
        <TextFieldTitle style={{ marginTop: '8px' }}>Местонахождение</TextFieldTitle>
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
              isDisabledMessage={false}
              userName={"Николай Шипов"}
              userAvatar={defaultAvatar}
              userEmployment={"Самозанятый"}
              userLocation={"Екатеринбург"}
              userReviews={24}
              userRate={4.98}
              userProjects={[130,40,10]}
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

export default ExecutorPage