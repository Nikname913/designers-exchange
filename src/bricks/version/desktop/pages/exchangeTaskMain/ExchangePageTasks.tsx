// ----------------------------------------------------------------
/* eslint-disable react-hooks/exhaustive-deps */
// ----------------------------------------------------------------
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import InputComponent from '../../comps/input/Input'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { setShow, setType, setMessage } from '../../../../store/slices/alert-content-slice' 
import { selectActualTask } from '../../../../store/slices/task-content-slice'
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
  const dispatch = useAppDispatch()

  const ROLE_TYPE = useAppSelector(state => state.roleTypeReducer.activeRole)
  const TASKS_LIST = useAppSelector(state => state.taskContentReducer.TASKS_DATA)

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

  const orders = (): void => {
    TASKS_LIST.list.filter(item => item.status === 'work').length > 0 && navigate('/active-orders-all')
    if ( TASKS_LIST.list.filter(item => item.status === 'work').length === 0 ) {
      dispatch(setShow(true))
      dispatch(setType("info"))
      dispatch(setMessage("В настоящий момент задания в работе отсутствуют"))
    }
  }
  const arkhiv = (): void => {
    TASKS_LIST.list.filter(item => item.status === 'backside').length > 0 && navigate('/tasks-archive-all')
    if ( TASKS_LIST.list.filter(item => item.status === 'backside').length === 0 ) {
      dispatch(setShow(true))
      dispatch(setType("info"))
      dispatch(setMessage("В настоящий момент задания в архиве отсутствуют"))
    }
  }

  const actualTask = (param: string) => {
    dispatch(selectActualTask(param))
  }

  useEffect(() => {
    dispatch(setShow(true))
    dispatch(setType('info'))
    dispatch(setMessage('Просмотр карточки задания в заказчике и исполнителе сейчас возможен со страницы Мои заказы'))
  },[])

  return (
    <ContentArea
      flexDirection={null}
      alignItems={null}
      justify={null}
    >

      <div style={headBlockCSS}>
        <PageTitle>Задания</PageTitle>
        <div style={divCSS}>
          <span style={{ ...spanActiveCSS }}>Открытые задания ({TASKS_LIST.list.filter(item => item.status === 'searching').length})</span>
          { false && <span style={{ ...spanActiveCSS, opacity: 0.6 }} onClick={orders}>В работе ({TASKS_LIST.list.filter(item => item.status === 'work').length})</span> }
          { false && <span style={spanNoActiveCSS} onClick={arkhiv}>Архивные ({TASKS_LIST.list.filter(item => item.status === 'backside').length})</span> }
        </div>
      </div>
      <MenuContainer>

        { ROLE_TYPE === "CUSTOMER" || ROLE_TYPE === "EXECUTOR" || ROLE_TYPE === "UNDEFINED" ? <React.Fragment>

          <TextFieldTitle style={{ marginTop: '0px', marginBottom: '18px' }}>Стоимость</TextFieldTitle>
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
              isDisabled={true}
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
              isDisabled={true}
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
          <InputComponent
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
          />
          <TextFieldTitle style={{ marginTop: '0px', marginBottom: '20px' }}>Сортировать по</TextFieldTitle>
          <SelectField 
            placeholder={"Новизне"}
            params={{ width: 300, mb: '40px', height: 50 }}
            data={[
              { value: '1', label: '[ options downloading ]' },
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
          <TextFieldTitle style={{ marginTop: '0px', marginBottom: '20px' }}>Фильтры</TextFieldTitle>
          <SelectField 
            placeholder={"Местонахождение"}
            params={{ width: 300, mb: '16px', height: 50 }}
            data={[
              { value: '1', label: '[ options downloading ]' },
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
            params={{ width: 300, mb: '40px', height: 50 }}
            data={[
              { value: '1', label: '[ options downloading ]' },
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
          <TextFieldTitle style={{ marginBottom: '10px', marginTop: '38px' }}>Навыки</TextFieldTitle>
          <FormGroup style={{ fontSize: '15px !important' }}>
            <FormControlLabel control={<Checkbox disabled defaultChecked/>} label="2D"/>
            <FormControlLabel control={<Checkbox disabled defaultChecked/>} label="3D"/>
            <FormControlLabel control={<Checkbox disabled/>} label="BIM"/>
          </FormGroup>
          <TextFieldTitle style={{ marginBottom: '10px', marginTop: '36px' }}>Экспертиза</TextFieldTitle>
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
        </React.Fragment> : <React.Fragment></React.Fragment> }
      </MenuContainer>
      <CustExecContentInnerArea>
        { TASKS_LIST.list.filter(item => item.status === 'searching').map((item, index) => {

          console.log(item)

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