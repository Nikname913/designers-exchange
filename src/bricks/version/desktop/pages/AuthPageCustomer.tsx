import React, { useState, useEffect, CSSProperties } from 'react'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { useNavigate, Link } from 'react-router-dom'
import { setShow, setType, setMessage } from '../../../store/slices/alert-content-slice'
import { setActiveRole } from '../../../store/slices/role-type-slice'
import { setCode, setFaceType } from '../../../store/slices/reg-slice'
import SelectField from '../comps/select/SelectField'
import InputComponent from '../comps/input/Input'
import ButtonComponent from '../comps/button/Button'
import Checkbox from '@mui/material/Checkbox'
import RequestActionsComponent from '../services/request.service'
import cssContentArea from '../styles/views/contentArea.css'

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import correctIcon from '../../../img/icons/correctBlue.svg'

const { ContentArea, PageTitle, ContentContainer, ContentLine } = cssContentArea
const label = { inputProps: { 'aria-label': 'Checkbox demo' }}

const AuthPage: React.FC = () => {

  const [ AUTH_REQUEST, SET_AUTH_REQUEST ] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [ ,setSunameError ] = useState(false)
  const [ nameError, setNameError ] = useState(false)
  const [ mailError, setMailError ] = useState(false)
  const [ passwordError, setPasswordError ] = useState(false)

  const [ passValid1, setPassValid1 ] = useState(false)
  const [ passValid2, setPassValid2 ] = useState(false)
  const [ passValid3, setPassValid3 ] = useState(false)

  const SURNAME = useAppSelector(state => state.regReducer.surname)
  const NAME = useAppSelector(state => state.regReducer.name)
  const SECOND_NAME = useAppSelector(state => state.regReducer.secondName)
  const EMAIL = useAppSelector(state => state.regReducer.email)
  const NUMBER = useAppSelector(state => state.regReducer.number)
  const PASSWORD = useAppSelector(state => state.regReducer.password)

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

  useEffect(() => {

    false && console.log(SURNAME)
    false && console.log(NAME)
    false && console.log(SECOND_NAME)
    false && console.log(EMAIL)
    false && console.log(NUMBER)
    false && console.log(PASSWORD)

    setSunameError(false)
    setNameError(false)
    setMailError(false)
    setPasswordError(false)

  }, [EMAIL, NAME, NUMBER, PASSWORD, SECOND_NAME, SURNAME])

  const validate = () => {

    if ( SURNAME !== '' && NAME !== '' && EMAIL !== '' && PASSWORD !== '' ) {

      !false && console.log(SURNAME)
      !false && console.log(NAME)
      !false && console.log(SECOND_NAME)
      !false && console.log(EMAIL)
      !false && console.log(NUMBER)
      !false && console.log(PASSWORD)

      SET_AUTH_REQUEST(true)

      // ---------------------------------------
      setTimeout(() => SET_AUTH_REQUEST(false), 1300)
      // ---------------------------------------

    } else {

      if ( SURNAME === '' ) setSunameError(true)
      if ( NAME === '' ) setNameError(true)
      if ( EMAIL === '' ) setMailError(true)
      if ( PASSWORD === '' ) setPasswordError(true)

      if ( SURNAME !== '' ) setSunameError(false)
      if ( NAME !== '' ) setNameError(false)
      if ( EMAIL !== '' ) setMailError(false)
      if ( PASSWORD !== '' ) setPasswordError(false)

    }

  }

  const registrationStepSecond = (param: { email: string, password: string }) => {

    if ( param.email === 'no-original' ) {

      dispatch(setShow(true))
      dispatch(setType('error'))
      dispatch(setMessage('Адрес электронной почты уже существует в системе'))

    } else {

      dispatch(setShow(true))
      dispatch(setType('success'))
      dispatch(setMessage('Остался один шаг - подтвердите адрес вашей почты'))
      false && dispatch(setActiveRole('EXECUTOR'))
      
      setTimeout(() => {

        dispatch(setCode(''))
        dispatch(setShow(false))
        navigate('/exec-registration-success')

      }, 2000)

    }

  }

  const changeFaceTime = (param: string) => dispatch(setFaceType(param))

  useEffect(() => {

    PASSWORD.length > 7 ? setPassValid1(true) : setPassValid1(false)

    let toUpper = 0

    for ( let i = 0; i < PASSWORD.length; i++ ) {

      if ( 

        PASSWORD[i] !== '0' &&
        PASSWORD[i] !== '1' &&
        PASSWORD[i] !== '2' &&
        PASSWORD[i] !== '3' &&
        PASSWORD[i] !== '4' &&
        PASSWORD[i] !== '5' &&
        PASSWORD[i] !== '6' &&
        PASSWORD[i] !== '7' &&
        PASSWORD[i] !== '8' &&
        PASSWORD[i] !== '9'

       ) { PASSWORD[i].charAt(0) === PASSWORD[i].charAt(0).toUpperCase() && toUpper++ }

    }

    setPassValid3(false)

    for ( let i = 0; i < PASSWORD.length; i++ ) {

      if ( 

        PASSWORD[i] === '0' ||
        PASSWORD[i] === '1' ||
        PASSWORD[i] === '2' ||
        PASSWORD[i] === '3' ||
        PASSWORD[i] === '4' ||
        PASSWORD[i] === '5' ||
        PASSWORD[i] === '6' ||
        PASSWORD[i] === '7' ||
        PASSWORD[i] === '8' ||
        PASSWORD[i] === '9'

       ) { setPassValid3(true) }

    }

    toUpper > 0 ? setPassValid2(true) : setPassValid2(false)

  },[ PASSWORD ])

  const passValidateCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '50%',
    height: 'auto',
    minHeight: '60px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0px 3px 16px 2px rgba(0, 0, 0, 0.12)',
    padding: '33px',
    boxSizing: 'border-box'
  }
  const passValidateLineCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    marginTop: '24px'
  }

  return (
    <ContentArea
      flexDirection={null}
      alignItems={null}
      justify={null}
    >

      { AUTH_REQUEST && <RequestActionsComponent

        callbackAction={registrationStepSecond}
        requestData={{
          type: 'POST',
          urlstring: '/add-auth',
          body: {
            email: EMAIL,
            password: PASSWORD,
            type: 'CUSTOMER',
            name: NAME,
            surname: SURNAME,
            secondName: SECOND_NAME,
            number: NUMBER
          }
        }}
      
      /> }

      <ContentContainer style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
        <div style={headBlockCSS}>
          <PageTitle>Создание аккаунта заказчика</PageTitle>
        </div>
        <ContentLine style={{ marginTop: '14px' }}>
          <span style={{ fontWeight: 'bold' }}>Личные данные</span>
        </ContentLine>
        <ContentLine style={{ marginTop: '20px' }}>
          <div style={{ display: 'block', position: 'relative', width: '50%' }}>
            <SelectField 
              placeholder={"Статус"}
              params={{ height: 50 }}
              data={[
                { value: 1, label: 'Физическое лицо' },
                { value: 2, label: 'Самозанятый' },
                { value: 3, label: 'Индивидуальный предприниматель' },
                { value: 4, label: 'Юридическое лицо' }
              ]}
              multy={false}
              action={changeFaceTime}
              actionType={"AUTH_FACE_TYPE"}
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
          <span style={{ display: 'block', width: '20px' }}/>
          { true && <React.Fragment>

            <InputComponent
              type={'TEXT_INPUT_OUTLINE_AUTH'}
              valueType='text'
              required={false}
              widthType={'%'}
              widthValue={50}
              heightValue={'50px'}
              label={"Введите название организации *"}
              isError={nameError}
              isDisabled={false}
              labelShrinkLeft={"0px"}
              innerLabel={null}
              store={[ "ORG_NAME", () => null ]}
              css={{
                fontSize: '12px',
                position: 'relative',
                boxSizing: 'border-box',
                marginBottom: '0px',
                marginTop: '0px',
                backgroundColor: 'white'
              }}
            />

          </React.Fragment> }
        </ContentLine>
        <ContentLine style={{ marginTop: '26px' }}>
          <span style={{ fontWeight: 'bold' }}>Имя пользователя</span>
        </ContentLine>
        <ContentLine style={{ marginTop: '16px' }}>
          <InputComponent
            type={'TEXT_INPUT_OUTLINE_AUTH'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
            heightValue={'50px'}
            label={"Email *"}
            isError={mailError}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={null}
            store={[ "EMAIL", () => null ]}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '0px',
              marginTop: '0px',
              backgroundColor: 'white'
            }}
          />
          <span style={{ display: 'block', width: '20px' }}/>
          <InputComponent
            type={'TEXT_INPUT_OUTLINE_AUTH'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
            heightValue={'50px'}
            label={"Номер телефона"}
            isError={false}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={null}
            store={[ "NUMBER", () => null ]}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '0px',
              marginTop: '0px',
              backgroundColor: 'white'
            }}
          />
        </ContentLine>
        <ContentLine style={{ marginTop: '20px' }}>
          <span style={{ fontWeight: 'bold' }}>Специализация</span>
        </ContentLine>
        <ContentLine style={{ marginTop: '16px' }}>
          <div style={{ display: 'block', position: 'relative', width: '50%' }}>
            <SelectField 
              placeholder={"Выберите специализацию [ список временно сокращен ]"}
              params={{ height: 50 }}
              data={[
                { value: 1, label: 'Геодезические изыскания' },
                { value: 2, label: 'Геологические изыскания' },
                { value: 3, label: 'Гидрометеорология' },
                { value: 4, label: 'Экологические изыскания' },
                { value: 5, label: 'Исторические изыскания' },
                { value: 6, label: 'Обследование констукций' },
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
          </div>
          <span style={{ display: 'block', width: '20px' }}/>
          <div style={{ display: 'block', width: '50%' }}/>
        </ContentLine>
        <ContentLine style={{ marginTop: '20px' }}>
          <span style={{ fontWeight: 'bold' }}>Пароль</span>
        </ContentLine>
        <ContentLine style={{ marginTop: '16px' }}>
          <InputComponent
            type={'TEXT_INPUT_OUTLINE_PASSWORD_VISIBILITY'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
            heightValue={'50px'}
            label={"Придумайте пароль *"}
            isError={passwordError}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={null}
            store={[ "PASSWORD", () => null ]}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '0px',
              marginTop: '0px',
              backgroundColor: 'white'
            }}
          />
          <span style={{ display: 'block', width: '20px' }}/>
          <InputComponent
            type={'TEXT_INPUT_OUTLINE_PASSWORD_VISIBILITY'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
            heightValue={'50px'}
            label={"Повторите пароль"}
            isError={false}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={null}
            store={[ "PASSWORD_AGAIN", () => null ]}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '0px',
              marginTop: '0px',
              backgroundColor: 'white'
            }}
          />
        </ContentLine>
        <ContentLine style={{ marginTop: '26px' }}>
          <div style={passValidateCSS}>
            <span style={{ fontWeight: 'bold' }}>Требования к паролю</span>
            <div style={passValidateLineCSS}>
              <img
                alt={""}
                src={correctIcon}
                style={{ 
                  marginRight: '14px',
                  filter: passValid1 ? 'grayscale(0)' : 'grayscale(1)' 
                }}
              />
              <span>Минимум 8 символов</span>
            </div>
            <div style={passValidateLineCSS}>
              <img
                alt={""}
                src={correctIcon}
                style={{ 
                  marginRight: '14px',
                  filter: passValid2 ? 'grayscale(0)' : 'grayscale(1)' 
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>Хотя бы одна строчная буква латинского алфавита</span>
                <span style={{ fontSize: '12px', color: '#516674', marginTop: '4px' }}>Проверьте, что Capslock отключен</span>
              </div>
            </div>
            <div style={passValidateLineCSS}>
              <img
                alt={""}
                src={correctIcon}
                style={{ 
                  marginRight: '14px',
                  filter: passValid3 ? 'grayscale(0)' : 'grayscale(1)' 
                }}
              />
              <span>Хотя бы одна цифра</span>
            </div>
          </div>
          <span style={{ display: 'block', width: '20px' }}/>
          <div style={{ display: 'block', width: '50%' }}/>
        </ContentLine>
        <ContentLine style={{ alignItems: 'center', marginTop: '14px', marginBottom: '14px' }}>
          <Checkbox {...label} />
          <span>Согласен на обработку персональных данных и согласен с <Link to="/terms-of-use">пользовательским соглашением</Link></span>
        </ContentLine>
        <ContentLine style={{ marginBottom: '35px' }}>
          <ButtonComponent
            inner={"Зарегистрироваться"} 
            type='CONTAINED_DEFAULT' 
            action={validate}
            actionData={null}
            widthType={'px'}
            widthValue={320}
            children={""}
            childrenCss={undefined}
            iconSrc={null}
            iconCss={undefined}
            muiIconSize={30}
            MuiIconChildren={ArrowUpwardIcon}
            css={{
              position: 'relative',
              boxSizing: 'border-box',
              padding: '4px',
              backgroundColor: '#167CBF',
              color: 'white',
              width: '56px',
              height: '43px',
            }}
          />
        </ContentLine>
      </ContentContainer>
    </ContentArea>
  )

}

export default AuthPage