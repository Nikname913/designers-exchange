import React, { useContext } from 'react'
import { ShowRM, MenuActive } from '../../Context'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../../store/hooks'
import { CSSProperties } from 'styled-components'
import { useAppDispatch } from '../../../../store/hooks'
import { setShow, setShowType } from '../../../../store/slices/fos-slice'
import { setShow as setShowRCC } from '../../../../store/slices/right-content-slice'
import { setActiveRole, setRoleData } from '../../../../store/slices/role-type-slice'
import ButtonComponent from '../../../desktop/comps/button/Button'
import css from '../../styles/css.css'

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import logo from '../../img/logo.svg'
import close from '../../img/close.svg'
import walletIcon from '../../../../img/icons/wallet.svg'

import bearAvatar from '../../../../img/avatars/bear.svg'
import enotAvatar from '../../../../img/avatars/enot.svg'
import foxAvatar from '../../../../img/avatars/fox.svg'
import groupAvatar from '../../../../img/avatars/group.svg'
import manAvatar from '../../../../img/avatars/man.svg'
import womanAvatar from '../../../../img/avatars/woman.svg'

const { RMe } = css

const RM: React.FC = () => {

  const [ showRM, setShowRM ] = useContext(ShowRM)
  const [ ,setSelectMenu ] = useContext(MenuActive)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const avatarFile = useAppSelector(state => state.avatarReducer.avatarFile)
  const USER_ROLE = useAppSelector(state => state.roleTypeReducer.activeRole)
  const USER_ID = useAppSelector(state => state.roleTypeReducer.roleData.userID)

  const EXECUTOR = useAppSelector(state => state.userContentReducer.USERS_DATA.listExecutors)
  .filter((executor: any) => executor.clientId === USER_ID)
const CUSTOMER = useAppSelector(state => state.userContentReducer.USERS_DATA.listCustomers)
  .filter((customer: any) => customer.clientId === USER_ID)

  const menuItem: CSSProperties = {
    color: 'white',
    marginBottom: '16px',
    cursor: 'pointer',
  }

  const avatarStyle: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '33px',
    height: '33px',
    cursor: 'pointer',
    marginTop: '3px'
  }
  const walletIconStyle: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '33px',
    marginLeft: '60px'
  }

  function authLogin(): void {
    dispatch(setShow(true))
    dispatch(setShowType('authLogin'))
    dispatch(setShowRCC('undefined'))
  }

  return (
    <React.Fragment>
      <RMe.Container style={{ left:
        ( showRM.show && showRM.type === 'auth' ) ? '23.5%' : '103%',
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
        <RMe.ContentLine 
          style={{ 
            alignItems: 'center',
            marginTop: '32px'
          }}
        >
          <span
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'rgb(217, 231, 240)',
              overflow: 'hidden',
            }}
          >
            { avatarFile === 404 && <React.Fragment>
              { USER_ROLE === 'EXECUTOR' && EXECUTOR.length > 0 && <img
                alt={""}
                src={
                  EXECUTOR[0].avatar === '1' ? bearAvatar :
                  EXECUTOR[0].avatar === '2' ? enotAvatar :
                  EXECUTOR[0].avatar === '3' ? foxAvatar :
                  EXECUTOR[0].avatar === '4' ? groupAvatar :
                  EXECUTOR[0].avatar === '5' ? manAvatar :
                  EXECUTOR[0].avatar === '6' ? womanAvatar : bearAvatar
                }
                style={
                  EXECUTOR[0].avatar === '1' ? { ...avatarStyle } :
                  EXECUTOR[0].avatar === '2' ? { ...avatarStyle } :
                  EXECUTOR[0].avatar === '3' ? { ...avatarStyle } :
                  EXECUTOR[0].avatar === '4' ? {
                    display: 'block',
                    position: 'relative',
                    width: '43px',
                    height: '43px',
                    cursor: 'pointer',
                    marginTop: '15px'
                  } :
                  EXECUTOR[0].avatar === '5' ? { 
                    display: 'block',
                    position: 'relative',
                    width: '43px',
                    height: '43px',
                    cursor: 'pointer',
                    marginTop: '10px'
                  } :
                  EXECUTOR[0].avatar === '6' ? { 
                    display: 'block',
                    position: 'relative',
                    width: '43px',
                    height: '43px',
                    cursor: 'pointer',
                    marginTop: '10px'
                  } : { ...avatarStyle }
                }
              /> }
              { USER_ROLE === 'CUSTOMER' && CUSTOMER.length > 0 && <img
                alt={""}
                src={
                  CUSTOMER[0].avatar === '1' ? bearAvatar :
                  CUSTOMER[0].avatar === '2' ? enotAvatar :
                  CUSTOMER[0].avatar === '3' ? foxAvatar :
                  CUSTOMER[0].avatar === '4' ? groupAvatar :
                  CUSTOMER[0].avatar === '5' ? manAvatar :
                  CUSTOMER[0].avatar === '6' ? womanAvatar : bearAvatar
                }
                style={
                  CUSTOMER[0].avatar === '1' ? { ...avatarStyle } :
                  CUSTOMER[0].avatar === '2' ? { ...avatarStyle } :
                  CUSTOMER[0].avatar === '3' ? { ...avatarStyle } :
                  CUSTOMER[0].avatar === '4' ? {
                    display: 'block',
                    position: 'relative',
                    width: '43px',
                    height: '43px',
                    cursor: 'pointer',
                    marginTop: '15px'
                  } :
                  CUSTOMER[0].avatar === '5' ? { 
                    display: 'block',
                    position: 'relative',
                    width: '43px',
                    height: '43px',
                    cursor: 'pointer',
                    marginTop: '10px'
                  } :
                  CUSTOMER[0].avatar === '6' ? { 
                    display: 'block',
                    position: 'relative',
                    width: '43px',
                    height: '43px',
                    cursor: 'pointer',
                    marginTop: '10px'
                  } : { ...avatarStyle }
                }
              /> }
            </React.Fragment> }
            { avatarFile === 200 && <img
                alt={""}
                src={`http://localhost:3000/techDocs/${USER_ID}.avatar.jpg`} 
                style={{ height: '100%', cursor: 'pointer' }}
              /> 
            } 
          </span>
          { USER_ROLE === 'EXECUTOR' && EXECUTOR.length > 0 && <span 
            onClick={() => {
              navigate('/executors')
              setSelectMenu(0)
              setShowRM({
                show: false,
                type: 'no-auth'
              })
            }} 
            style={{ 
              ...menuItem, 
              lineHeight: '20px', 
              marginBottom: '0px',
              boxSizing: 'border-box',
              width: 'calc(100% - 66px)',
            }}
          >
            <React.Fragment>
              { ( EXECUTOR[0].faceType !== 'PHIS_FACE' && EXECUTOR[0].faceType !== 'SELF_FACE' ) 
                    
                && EXECUTOR[0].bio.name
              
              }
            </React.Fragment>
            <React.Fragment>
              { ( EXECUTOR[0].faceType === 'PHIS_FACE' || EXECUTOR[0].faceType === 'SELF_FACE' ) 
                
                && EXECUTOR[0].bio.name + ' ' + EXECUTOR[0].bio.surname
              
              }
            </React.Fragment>
          </span> }
          { USER_ROLE === 'CUSTOMER' && CUSTOMER.length > 0 && <span 
            onClick={() => {
              navigate('/executors')
              setSelectMenu(0)
              setShowRM({
                show: false,
                type: 'no-auth'
              })
            }} 
            style={{ 
              ...menuItem, 
              lineHeight: '20px', 
              marginBottom: '0px',
              boxSizing: 'border-box',
              width: 'calc(100% - 66px)',
            }}
          >
            <React.Fragment>
              { ( CUSTOMER[0].faceType !== 'PHIS_FACE' && CUSTOMER[0].faceType !== 'SELF_FACE' ) 
                    
                && CUSTOMER[0].bio.name
              
              }
            </React.Fragment>
            <React.Fragment>
              { ( CUSTOMER[0].faceType === 'PHIS_FACE' || CUSTOMER[0].faceType === 'SELF_FACE' ) 
                
                && CUSTOMER[0].bio.name + ' ' + CUSTOMER[0].bio.surname
              
              }
            </React.Fragment>
          </span> }
        </RMe.ContentLine>
        <RMe.ContentLine style={{ justifyContent: 'flex-start', marginTop: '-10px' }}>
          <img
            alt={""}
            src={walletIcon}
            style={walletIconStyle}
          />
          <span
            style={{
              display: 'block',
              fontWeight: 'bold',
              color: 'white',
              marginLeft: '6px'
            }}
          >
            80 000 ₽
          </span>
        </RMe.ContentLine>
        <RMe.ContentLine>
          <ButtonComponent
            inner={"Выйти из аккаунта"} 
            type='CONTAINED_DEFAULT' 
            action={() => {
              setShowRM({
                show: false,
                type: 'no-auth'
              })
              setSelectMenu(1)
              navigate('/task-list-all')
              dispatch(setActiveRole('UNDEFINED'))
              dispatch(setRoleData({
                uid: '',
                una: ''
              }))
            }}
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
              marginTop: '36px'
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
            Биржа проектировщиков
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
        <RMe.ContentLine style={{ marginTop: '16px' }}>
          <span style={menuItem}>Есть вопросы по сервису?</span>
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
            inner={"Вопрос в поддержку"} 
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
        <RMe.ContentLine style={{ marginTop: '33px' }}>
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
            Пользовательское соглашение
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
            Политика сервиса
          </span>
        </RMe.ContentLine>
      </RMe.Container>
    </React.Fragment>
  )

}

export default RM