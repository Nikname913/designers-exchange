import React from 'react'
import { useNavigate } from 'react-router-dom'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import InputComponent from '../../comps/input/Input'
import { useAppSelector } from '../../../../store/hooks'
import SelectField from '../../comps/select/SelectField'
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
  
  const navigate = useNavigate()

  const ROLE_TYPE = useAppSelector(state => state.roleTypeReducer.activeRole)
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

  const tasks = (): void => navigate('/spisok-zadaniy')
  const arkhiv = (): void => navigate('/zadaniya-arkhiv')

  return (
    <ContentArea
      flexDirection={null}
      alignItems={null}
      justify={null}
    > 
      { ROLE_TYPE !== 'UNDEFINED' ? <React.Fragment>
        <div style={headBlockCSS}>
          <PageTitle>Активные заказы</PageTitle>
          <div style={divCSS}>
            <span style={{ ...spanActiveCSS, opacity: 0.6 }} onClick={tasks}>Задания (166)</span>
            <span style={spanActiveCSS}>В работе (26)</span>
            <span style={spanNoActiveCSS} onClick={arkhiv}>Архивные (233)</span>
          </div>
        </div>
        <MenuContainer>
          { ROLE_TYPE === "CUSTOMER" || ROLE_TYPE === "EXECUTOR" ? <React.Fragment>
            <TextFieldTitle style={{ marginTop: '0px' }}>Сортировать по</TextFieldTitle>
            <SelectField 
              placeholder={"Новизне"}
              params={{ width: 300, mb: '35px', height: 50 }}
              data={[
                { value: '1', label: 'За последние три дня' },
                { value: '2', label: 'За последнюю неделю' },
                { value: '3', label: 'За месяц' },
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
            <InputComponent
              type={'TEXT_INPUT_OUTLINE_SEARCH'}
              valueType='text'
              required={false}
              widthType={'px'}
              widthValue={300}
              heightValue={'50px'}
              label={"Найти задания"}
              isError={false}
              isDisabled={false}
              labelShrinkLeft={"0px"}
              innerLabel={null}
              css={{
                fontSize: '12px',
                position: 'relative',
                boxSizing: 'border-box',
                marginBottom: '16px',
                backgroundColor: 'white',
              }}
            />
            <SelectField 
              placeholder={"Местонахождение"}
              params={{ width: 300, mb: '16px', height: 50 }}
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
            <SelectField 
              placeholder={"Сортировать по специализации"}
              params={{ width: 300, mb: '20px', height: 50 }}
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
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked/>} label="Только задания ТС"/>
              <FormControlLabel control={<Checkbox defaultChecked/>} label="Безопасная сделка"/>
              <FormControlLabel control={<Checkbox/>} label="Простая сделка"/>
            </FormGroup>
            <TextFieldTitle style={{ marginBottom: '10px', marginTop: '10px' }}>Навыки</TextFieldTitle>
            <FormGroup style={{ fontSize: '15px !important' }}>
              <FormControlLabel control={<Checkbox defaultChecked/>} label="2D"/>
              <FormControlLabel control={<Checkbox defaultChecked/>} label="3D"/>
              <FormControlLabel control={<Checkbox/>} label="BIM"/>
            </FormGroup>
            <TextFieldTitle style={{ marginBottom: '10px', marginTop: '10px' }}>Экспертиза</TextFieldTitle>
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked/>} label="Без экспертизы"/>
            </FormGroup>
            <TextFieldTitle style={{ marginBottom: '14px', marginTop: '10px' }}>Цена</TextFieldTitle>
            <CoastRangeContainer>
              <InputComponent
                type={'TEXT_INPUT_OUTLINE'}
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
                css={{
                  fontSize: '12px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '11px',
                  backgroundColor: whiteColor
                }}
              />
              <InputComponent
                type={'TEXT_INPUT_OUTLINE'}
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
                css={{
                  fontSize: '12px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '11px',
                  backgroundColor: whiteColor
                }}
              />
            </CoastRangeContainer>
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
          </React.Fragment> : <React.Fragment></React.Fragment> }
        </MenuContainer>
        <CustExecContentInnerArea>
          { Array(6).fill(0).map((item, index) => {
            return (
              <TaskTable key={index}
                viewType={"orderType"}
                taskInitDate={"Позавчера в 18:33"}
                taskTitle={"Конструктивные решения"}
                taskDeadline={"18.11.2022-28.11.2022"}
                taskExpertType={"государственная"}
                taskCustomer={"ООО \"Технические Системы\""}
                taskExecutor={"ИП Макаров А.Ю."}
                taskLocation={"Екатеринбург"}
                taskSpecializationTags={["Сигнализация","Вентиляция","Пожарная безопасность"]}
                taskDescription={"lorem ipsum dolor sit amet, consectetur adipiscing"}
                dealStatus={"work"}
                cardWidth={'100%'}
                marbo={"16px"}
                deal={{
                  type: 'safe',
                  prepaid: 30000,
                  expert: 74000
                }}
              />
            )
          })}

          <PagintationContainer>
            <span style={showMoreButtonCSS}>Загрузить еще</span>
            <Pagintation></Pagintation>
          </PagintationContainer>

        </CustExecContentInnerArea>
      </React.Fragment> : <React.Fragment>
        <div style={headBlockCSS}>
          <PageTitle style={{ marginBottom: '34px' }}>Пользователь не авторизован</PageTitle>
        </div>
      </React.Fragment> }
    </ContentArea>
  )

}

export default ExchangePage