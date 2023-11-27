import React, { useContext, useEffect } from 'react'
import { ShowRM, MenuActive } from '../../Context'
import { useNavigate } from 'react-router-dom'
import { CSSProperties } from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { setShow, setShowType } from '../../../../store/slices/fos-slice'
import { setShow as setShowRCC } from '../../../../store/slices/right-content-slice'
import ButtonComponent from '../../../desktop/comps/button/Button'
import css from '../../styles/css.css'

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import logo from '../../img/logo.svg'
import close from '../../img/close.svg'

const { RMe } = css

const RM: React.FC = () => {

  const [ showRM, setShowRM ] = useContext(ShowRM)
  const [ ,setSelectMenu ] = useContext(MenuActive)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const USER_ROLE = useAppSelector(state => state.roleTypeReducer.activeRole)

  const menuItem: CSSProperties = {
    color: 'white',
    marginBottom: '16px',
    cursor: 'pointer',
  }

  function authLogin(): void {
    dispatch(setShow(true))
    dispatch(setShowType('authLogin'))
    dispatch(setShowRCC('undefined'))
  }

  function authCreate(): void {
    dispatch(setShow(true))
    dispatch(setShowType('authCreate'))
    dispatch(setShowRCC('undefined'))
  }

  useEffect(() => {

    if (  USER_ROLE !== 'UNDEFINED' ) {

      setShowRM({
        show: false,
        type: 'auth'
      })

    }

  }, [ USER_ROLE, setShowRM ])

  return (
    <React.Fragment>
      <RMe.Container style={{ left:
        ( showRM.show && showRM.type === 'no-auth' ) ? '23.5%' : '103%',
        transition: 'all 300ms'
      }}>
        <RMe.ContentLine style={{ justifyContent: 'flex-start' }}>
          <img
            alt={""}
            src={logo}
            style={{
              display: 'block',
              height: '33px',
            }}
          />
          <h1 
            style={{ 
              color: 'white', 
              fontSize: '14px', 
              fontWeight: '500',
              margin: 0,
              letterSpacing: '1.6px',
              textAlign: 'left',
              marginLeft: '13px'
            }}
          >
            МЕНЮ
          </h1>
          <img
            alt={""}
            src={close}
            onClick={() => {
              setShowRM({
                show: false,
                type: 'no-auth'
              })
            }}
            style={{
              display: 'block',
              position: 'absolute',
              width: '13px',
              cursor: 'pointer',
              left: '100%',
              marginLeft: '-40px',
              top: '0',
              marginTop: '28px',
            }}
          />
        </RMe.ContentLine>
        <RMe.ContentLine style={{ marginTop: '33px' }}>
          <span 
            onClick={() => {
              navigate('/task-list-all')
              setSelectMenu(1)
              setShowRM({
                show: false,
                type: 'no-auth'
              })
            }} 
            style={menuItem}
          >
            Биржа
          </span>
        </RMe.ContentLine>
        <RMe.ContentLine>
          <span 
            onClick={() => {
              navigate('/executors')
              setSelectMenu(0)
              setShowRM({
                show: false,
                type: 'no-auth'
              })
            }} 
            style={menuItem}
          >
            Исполнители
          </span>
        </RMe.ContentLine>
        <RMe.ContentLine>
          <span 
            onClick={() => {
              navigate('/customers')
              setSelectMenu(0)
              setShowRM({
                show: false,
                type: 'no-auth'
              })
            }} 
            style={menuItem}
          >
            Заказчики
          </span>
        </RMe.ContentLine>
        <RMe.ContentLine>
          <span style={menuItem}>Работа системы</span>
        </RMe.ContentLine>
        <RMe.ContentLine>
          <ButtonComponent
            inner={"Регистрация"} 
            type='CONTAINED_DEFAULT' 
            action={authCreate}
            actionData={null}
            widthType={'px'}
            widthValue={220}
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
              backgroundColor: 'White',
              color: 'black',
              width: '56px',
              height: '43px',
              marginTop: '16px'
            }}
          />
        </RMe.ContentLine>
        <RMe.ContentLine style={{ marginTop: '22px' }}>
          <span style={menuItem}>Уже есть аккаунт?</span>
        </RMe.ContentLine>
        <RMe.ContentLine>
          <span
            style={{
              display: 'block',
              position: 'relative',
              width: '220px',
              height: '2px',
              borderRadius: '2px',
              backgroundColor: 'white',
              marginBottom: '20px',
              marginTop: '9px',
            }}
          />
        </RMe.ContentLine>
        <RMe.ContentLine>
          <ButtonComponent
            inner={"Вход в приложение"} 
            type='CONTAINED_DEFAULT' 
            action={authLogin}
            actionData={null}
            widthType={'px'}
            widthValue={220}
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
              backgroundColor: 'White',
              color: 'black',
              width: '56px',
              height: '43px',
              marginTop: '10px'
            }}
          />
        </RMe.ContentLine>
      </RMe.Container>
    </React.Fragment>
  )

}

export default RM