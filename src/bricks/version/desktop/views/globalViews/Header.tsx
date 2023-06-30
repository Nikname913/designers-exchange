// ----------------------------------------------------------------
/* eslint-disable array-callback-return */
// ----------------------------------------------------------------
/* eslint-disable react-hooks/exhaustive-deps */
// ----------------------------------------------------------------
import React, { useState, useEffect } from 'react'
import ButtonComponent from '../../comps/button/Button'
import { db } from '../../../../firebase/check' 
import { useNavigate } from 'react-router-dom'
import { CSSProperties } from 'styled-components'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { setShow, setShowType } from '../../../../store/slices/fos-slice'
import { setShow as setShowRCC } from '../../../../store/slices/right-content-slice'
import { setAlertData } from '../../../../store/slices/header-slice'
import css from '../../styles/views/header.css'

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import logo from '../../../../img/stock/logo.svg'
import defaultAvatar from '../../../../img/stock/avatar.svg'
import questionIcon from '../../../../img/icons/question.svg'
import postIcon from '../../../../img/icons/post.svg'
import bellIcon from '../../../../img/icons/bell.svg'
import walletIcon from '../../../../img/icons/wallet.svg'
import arrowIcon from '../../../../img/icons/arrowDropDown.svg'

const { HeadWrapper,
  HeadWrapperInner, 
  HeadWrapperShadow,
  Logo, 
  HeadMenu, 
  HeadControllers, 
  HeadControllersIcon,
  HeadControllersAvatar } = css

const Header: React.FC = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [ execCustButtonInner, setExecCustButtoninner ] = useState<'Исполнители' | 'Заказчики'>('Исполнители')
  const USER_ROLE = useAppSelector(state => state.roleTypeReducer.activeRole)
  const USER_ID = useAppSelector(state => state.roleTypeReducer.roleData.userID)
  const ORDER_LIST = useAppSelector(state => state.taskContentReducer.TASKS_DATA.listOrders)
  const selectedUsersType = useAppSelector(state => state.headerReducer.selectedUsersType)

  const wallet = useAppSelector(state => state.headerReducer.walletCount)
  const alertData = useAppSelector(state => state.headerReducer.alertData)
  const whiteColor = useAppSelector(state => state.theme.white)
  const greyColor = useAppSelector(state => state.theme.grey)
  const blueColorForIcon = useAppSelector(state => state.theme.blue3)
  const defaultColor = useAppSelector(state => state.theme.blue2)
  
  const menuItemStyle: CSSProperties = {
    fontSize: '15px',
    display: 'block',
    position: 'relative',
    marginRight: '14px',
    cursor: 'pointer',
    letterSpacing: 0.2
  }
  const menuItemIconStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-around',
    position: 'relative',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
  }
  const menuItemIconRotateStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-around',
    position: 'relative',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    transform: 'rotate(180deg)',
    marginTop: '2px',
  }
  const avatarStyle: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '50px',
    height: '50px',
    cursor: 'pointer',
  }
  const questionIconStyle: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '11px'
  }
  const postIconStyle: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '22px'
  }
  const bellIconStyle: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '28px'
  }
  const walletIconStyle: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '40px'
  }
  const iconsDivStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
  }
  const logoContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    cursor: 'pointer',
  }

  function reverseButton(): void {
    setExecCustButtoninner((prev: 'Исполнители' | 'Заказчики'): React.ComponentState => {
      if (prev === 'Исполнители') {
        return 'Заказчики'
      } else if (prev === 'Заказчики') {
        return 'Исполнители'
      }
    })
  }

  function navigation(): void {
    execCustButtonInner === 'Исполнители' && navigate('/executors')
    execCustButtonInner === 'Заказчики' && navigate('/customers')
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

  useEffect(() => console.log(db), [])
  useEffect(() => { 

    dispatch(setAlertData([]))

    if ( ORDER_LIST.length > 0 ) {

      const alerts = ORDER_LIST.map(order => {
        if ( order.executor === USER_ID ) {

          const unicAlertsData = new Set()
          order.alertData?.map(alert => Object.entries(alert))
            .map(alert => {
              const part1 = alert[0].join('>>')
              const part2 = alert[1].join('>>')

              return `${part1}>>>>${part2}`
            })
            .forEach(alert => unicAlertsData.add(alert))

          return Array.from(unicAlertsData)

        }
      })

      dispatch(setAlertData(alerts[0]))

    }

  }, [ ORDER_LIST, USER_ID ])

  useEffect(() => {

    selectedUsersType === 'CUST' && setExecCustButtoninner('Заказчики')
    selectedUsersType === 'EXEC' && setExecCustButtoninner('Исполнители')

  }, [ selectedUsersType ])

  return (
    <React.Fragment>
      <HeadWrapper backgroundColor={"transparent"}>
      <HeadWrapperShadow></HeadWrapperShadow>
      <HeadWrapperInner backgroundColor={whiteColor}>
        <div style={logoContainerStyle} onClick={() => navigate('/task-list-all')}>
          <img
            alt={""}
            src={logo}
          />
          <Logo style={{ fontSize: '26px', letterSpacing: '3px' }}>ПРИЛОЖЕНИЕ</Logo>
        </div>
        <HeadMenu>
          <span style={menuItemStyle} onClick={() => navigate('/task-list-all')}>Биржа</span>
          <span style={{ ...menuItemStyle, marginRight: '3px' }} onClick={navigation}>{ execCustButtonInner }</span>
          { execCustButtonInner === 'Исполнители' && <span onClick={reverseButton} style={menuItemIconStyle}>
            <img
              alt={""}
              src={arrowIcon}
            />
          </span> }
          { execCustButtonInner === 'Заказчики' && <span onClick={reverseButton} style={menuItemIconRotateStyle}>
            <img
              alt={""}
              src={arrowIcon}
            />
          </span> }
        </HeadMenu>
        { USER_ROLE !== 'UNDEFINED' && <HeadControllers>
          { USER_ROLE === "CUSTOMER" && <span
            onClick={() => navigate('/task-list-cust')} 
            style={{ 
              ...menuItemStyle, 
              marginRight: '30px' 
            }}
          >Мои заказы</span> }
          { USER_ROLE === "EXECUTOR" && <span
            onClick={() => navigate('/task-list-exec')} 
            style={{ 
              ...menuItemStyle, 
              marginRight: '30px' 
            }}
          >Мои заказы</span> }
          <div style={iconsDivStyle}>
          <HeadControllersIcon 
            backgroundColor={blueColorForIcon}
            style={{ marginRight: '20px' }}
          >
            <img
              alt={""}
              src={questionIcon}
              style={questionIconStyle}
            />
          </HeadControllersIcon>
          <HeadControllersIcon 
            backgroundColor={'transparent'}
            style={{ marginRight: '20px' }}
          >
            <img
              alt={""}
              src={postIcon}
              style={postIconStyle}
            />
          </HeadControllersIcon>
          <HeadControllersIcon backgroundColor={'transparent'}>
            <img
              alt={""}
              src={bellIcon}
              style={{ ...bellIconStyle }}
            />
            { alertData && alertData.length > 0 && <span
              style={{
                display: 'block',
                position: 'absolute',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: 'rgb(22, 124, 191)',
                top: '0',
                left: '100%',
                marginLeft: '-8px',
                color: 'white',
                fontSize: '9px',
                textAlign: 'center',
                lineHeight: '18px',
                paddingRight: '1px',
                boxSizing: 'border-box'
              }}
            >{ alertData.length }</span> }
          </HeadControllersIcon>
          <span style={{ display: 'block', width: '30px' }} />
          <HeadControllersIcon backgroundColor={'transparent'}>
            <img
              alt={""}
              src={walletIcon}
              style={walletIconStyle}
            />
          </HeadControllersIcon>
          </div>
          <span 
            style={{ 
              ...menuItemStyle, 
              color: greyColor, 
              fontWeight: '600', 
              fontSize: '16px',
              marginRight: '30px'
            }}
          >{ wallet } ₽</span>
          <HeadControllersAvatar 
            backgroundColor={blueColorForIcon}
            onClick={() => {
              USER_ROLE === 'EXECUTOR' && navigate('/exec-office')
              USER_ROLE === 'CUSTOMER' && navigate('/cust-office')
            }}
          >

            <img
              alt={""}
              src={defaultAvatar}
              style={avatarStyle}
            />

          </HeadControllersAvatar>
        </HeadControllers> }
        { USER_ROLE === 'UNDEFINED' && <HeadControllers>
          <ButtonComponent
            inner={"Войти"} 
            type='CONTAINED_DEFAULT' 
            action={authLogin}
            actionData={null}
            widthType={'px'}
            widthValue={100}
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
              backgroundColor: "transparent",
              boxShadow: 'none',
              color: 'black',
              width: '56px',
              height: '43px',
              marginLeft: '20px'
            }}
          />
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
              backgroundColor: defaultColor,
              color: 'white',
              width: '56px',
              height: '43px',
              marginLeft: '20px'
            }}
          />
        </HeadControllers> }
      </HeadWrapperInner>
      </HeadWrapper>
    </React.Fragment>
  )

}

export default Header