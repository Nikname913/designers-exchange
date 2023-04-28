import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { setShow, setType, setMessage } from '../../../store/slices/alert-content-slice'
import { setRoleData, setActiveRole } from '../../../store/slices/role-type-slice'
import InputComponent from '../comps/input/Input'
import ButtonComponent from '../comps/button/Button'
import RequestActionsComponent from '../services/request.service'
import cssContentArea from '../styles/views/contentArea.css'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

const { ContentArea, PageTitle, ContentContainer, ContentLine } = cssContentArea

const AuthPageSuccess: React.FC = () => {

  const [ AUTH_REQUEST, SET_AUTH_REQUEST ] = useState(false)
  const [ sunameError, setSunameError ] = useState(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const SURNAME = useAppSelector(state => state.regReducer.surname)
  const NAME = useAppSelector(state => state.regReducer.name)
  const SECOND_NAME = useAppSelector(state => state.regReducer.secondName)
  const EMAIL = useAppSelector(state => state.regReducer.email)
  const NUMBER = useAppSelector(state => state.regReducer.number)
  const PASSWORD = useAppSelector(state => state.regReducer.password)
  const CODE = useAppSelector(state => state.regReducer.code)

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

  const registrationSuccess = (
    param: { 
      result: string, 
      userMail: string, 
      userPassword: string, 
      userClientId: string,
      userType: "UNDEFINED" | "CUSTOMER" | "EXECUTOR"
    }
  ) => {

    if ( param.result === 'error' ) {

      dispatch(setShow(true))
      dispatch(setType('error'))
      dispatch(setMessage('Введен неверный код, попробуйте снова'))

      setTimeout(() => dispatch(setShow(false)), 1300)

    } else {

      dispatch(setShow(true))
      dispatch(setType('success'))
      dispatch(setMessage('Поздравляем, вы успешно зарегистрировались в системе!'))

      dispatch(setActiveRole(param.userType))
      dispatch(setRoleData({
        uid: param.userClientId,
        una: param.userMail
      }))
      navigate('/customers')

    }

  }

  useEffect(() => {

    false && console.log(SURNAME)
    false && console.log(NAME)
    false && console.log(SECOND_NAME)
    false && console.log(EMAIL)
    false && console.log(NUMBER)
    false && console.log(PASSWORD)

    setSunameError(false)

  }, [EMAIL, NAME, NUMBER, PASSWORD, SECOND_NAME, SURNAME])

  return (
    <ContentArea
      flexDirection={null}
      alignItems={null}
      justify={null}
    >

      { AUTH_REQUEST && <RequestActionsComponent

        callbackAction={registrationSuccess}
        requestData={{
          type: 'POST',
          urlstring: '/check-auth',
          body: {
            email: `*${EMAIL}`,
            code: CODE
          }
        }}
      
      /> }

      <ContentContainer style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
        <div style={headBlockCSS}>
          <PageTitle>Подтверждение аккаунта</PageTitle>
        </div>
        <ContentLine style={{ marginTop: '14px' }}>
          <span style={{ fontWeight: 'bold' }}>Введите код, который мы отправили вам на почту { EMAIL } в поле ниже</span>
        </ContentLine>
        <ContentLine style={{ marginTop: '40px' }}>
          <InputComponent
            type={'TEXT_INPUT_OUTLINE_AUTH'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={33.3333}
            heightValue={'50px'}
            label={"Введите код с почты"}
            isError={sunameError}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={null}
            store={[ 'CODE', () => {} ]}
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
        <ContentLine style={{ marginBottom: '44px', marginTop: '24px' }}>
          <ButtonComponent
            inner={"Подтвердить почту"} 
            type='CONTAINED_DEFAULT' 
            action={() => {
              SET_AUTH_REQUEST(true)
              setTimeout(() => SET_AUTH_REQUEST(false), 1300)
            }}
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

export default AuthPageSuccess