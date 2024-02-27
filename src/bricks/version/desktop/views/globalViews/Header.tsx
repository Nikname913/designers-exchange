/* eslint-disable jsx-a11y/iframe-has-title */
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
import { setShow as setShowRCC, setShowType as setShowTypeRCC } from '../../../../store/slices/right-content-slice'
import { setAlertData } from '../../../../store/slices/header-slice'
import RequestActionsComponent from '../../services/request.service'
import css from '../../styles/views/header.css'

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import logo from '../../../../img/stock/logo.svg'

import questionIcon from '../../../../img/icons/question.svg'
import postIcon from '../../../../img/icons/post.svg'
import bellIcon from '../../../../img/icons/bell.svg'
import walletIcon from '../../../../img/icons/wallet.svg'
import arrowIcon from '../../../../img/icons/arrowDropDown.svg'

import bearAvatar from '../../../../img/avatars/bear.svg'
import enotAvatar from '../../../../img/avatars/enot.svg'
import foxAvatar from '../../../../img/avatars/fox.svg'
import groupAvatar from '../../../../img/avatars/group.svg'
import manAvatar from '../../../../img/avatars/man.svg'
import womanAvatar from '../../../../img/avatars/woman.svg'

const { HeadWrapper,
  HeadWrapperInner, 
  HeadWrapperShadow,
  Logo, 
  HeadMenu, 
  HeadControllers, 
  HeadControllersIcon,
  HeadControllersAvatar } = css

const Header: React.FC<{ userCity?: string, mainScroll?: number | undefined }> = (
  props: { 
    userCity?: string,
    mainScroll?: number | undefined 
  }) => {

  const { userCity } = props

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [ ,SET_SEND_PING_REQUEST ] = useState(false)

  const [ execCustButtonInner, setExecCustButtoninner ] = useState<'Исполнители' | 'Заказчики'>('Исполнители')
  const [ showChat, setShowChat ] = useState<boolean>(false)

  const USER_ROLE = useAppSelector(state => state.roleTypeReducer.activeRole)
  const USER_ID = useAppSelector(state => state.roleTypeReducer.roleData.userID)
  const ORDER_LIST = useAppSelector(state => state.taskContentReducer.TASKS_DATA.listOrders)
  const selectedUsersType = useAppSelector(state => state.headerReducer.selectedUsersType)
  const avatarFile = useAppSelector(state => state.avatarReducer.avatarFile)
  const showRCC = useAppSelector(state => state.rightContentReducer.isShow)

  const EXECUTOR = useAppSelector(state => state.userContentReducer.USERS_DATA.listExecutors)
    .filter((executor: any) => executor.clientId === USER_ID)
  const CUSTOMER = useAppSelector(state => state.userContentReducer.USERS_DATA.listCustomers)
    .filter((customer: any) => customer.clientId === USER_ID)

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
    width: '33px',
    height: '33px',
    cursor: 'pointer',
    marginTop: '3px'
  }
  const questionIconStyle: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '11px',
    cursor: 'pointer',
  }
  const postIconStyle: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '22px',
    cursor: 'pointer',
  }
  const bellIconStyle: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '28px',
    cursor: 'pointer',
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

    false && dispatch(setAlertData([]))

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

      false && dispatch(setAlertData(alerts[0]))

    }

  }, [ ORDER_LIST, USER_ID ])

  useEffect(() => {

    selectedUsersType === 'CUST' && setExecCustButtoninner('Заказчики')
    selectedUsersType === 'EXEC' && setExecCustButtoninner('Исполнители')

  }, [ selectedUsersType ])

  useEffect(() => { console.log(alertData) }, [ alertData ])
  useEffect(() => {

    if ( USER_ROLE === 'EXECUTOR' ) { console.log(EXECUTOR[0]) }

  }, [])
  useEffect(() => {

    if ( USER_ROLE !== 'UNDEFINED' ) { SET_SEND_PING_REQUEST(false) }

  }, [ USER_ROLE, USER_ID ])
  useEffect(() => {

    USER_ROLE !== 'UNDEFINED' && fetch('http://localhost:3000/8000/pingMarkOne', {
      method: 'POST',
      headers: { "Content-type": "application/json; charset=UTF-8" }, 
      body: JSON.stringify({
        userId: USER_ID,
        time: new Date().toLocaleString()
      })
    }).then(res => res.json())

  }, [ USER_ROLE ])

  return (
    <React.Fragment>

      { false && <RequestActionsComponent

        callbackAction={() => {}}
        requestData={{
          type: 'POST',
          urlstring: '/8000/pingMarkOne',
          body: {
            userId: USER_ID,
            time: new Date().toLocaleString()
          }
        }}
      
      /> }  

      <HeadWrapper 
        backgroundColor={"transparent"}
        style={{ 
          position: 'fixed', 
          zIndex: 100, 
          opacity: showRCC ? 1 : 1,
        }} 
      >
        
        { showChat && false && <div 
          style={{ 
            display: 'block', 
            position: 'absolute',
            top: '50vh',
            left: '50%',
            zIndex: 10,
            marginLeft: '-400px',
            marginTop: '-300px',
            width: '800px',
            height: '600px' 
          }}
        >
          <span
            onClick={() => setShowChat(false)}
            style={{
              display: 'block',
              position: 'absolute',
              top: '0%',
              left: '100%',
              marginLeft: '-88px',
              marginTop: '18px',
              zIndex: 11,
              cursor: 'pointer',
            }}
          >
            Закрыть
          </span>
          <iframe
            style={{
              display: 'block',
              position: 'absolute',
              border: 'none',
              left: '50%',
              zIndex: 10,
              marginLeft: '-400px',
              width: '800px',
              height: '600px',
              borderRadius: '10px',
              boxShadow: '10px 18px 8px rgba(163,163,163,0.02), 6px 10px 7px rgba(163,163,163,0.07), 2px 4px 5px rgba(163,163,163,0.11), 1px 1px 3px rgba(163,163,163,0.13), 0px 0px 0px rgba(163,163,163,0.13)'
            }}
            src="http://localhost:3005">  
          </iframe>
        </div> }
        <HeadWrapperShadow></HeadWrapperShadow>
        <HeadWrapperInner backgroundColor={whiteColor}>
          <div 
            style={{
              display: 'flex',
              flexFlow: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              width: '100%'
            }}
          >
          <div style={logoContainerStyle} onClick={() => navigate('/task-list-all')}>
            <img
              alt={""}
              src={logo}
            />
            <Logo style={{ fontSize: '26px', letterSpacing: '3px' }}>ПРИЛОЖЕНИЕ</Logo>
            <span
              style={{ 
                display: 'block',
                position: 'absolute',
                left: '0%',
                top: '100%',
                marginTop: '-9px',
                marginLeft: '53px',
                fontWeight: 'bold',
                color: 'rgb(22, 124, 191)',
                opacity: 0.8
              }}
            >
              { false && userCity }
              { USER_ROLE === 'CUSTOMER' && "Кабинет заказчика" }
              { USER_ROLE === 'EXECUTOR' && "Кабинет исполнителя" }
            </span>
          </div>
          <HeadMenu>
            <span style={menuItemStyle} onClick={() => navigate('/task-list-all')}>Все задания</span>
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
              style={{ marginRight: '16px' }}
              onClick={() => {
                setShowChat(!showChat)
                dispatch(setShowRCC(true))
                dispatch(setShowTypeRCC('ECC'))
              }}
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
                onClick={() => {
                  USER_ROLE === 'CUSTOMER' && navigate('cust-office/alarms')
                  USER_ROLE === 'EXECUTOR' && navigate('exec-office/alarms')
                }}
              />
              { ( USER_ROLE === 'EXECUTOR' 
              
                && EXECUTOR.length > 0 
                && EXECUTOR[0].alertData
                && alertData ) && EXECUTOR[0].alertData?.length && <span
                
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
                  fontSize: '10px',
                  textAlign: 'center',
                  lineHeight: '18px',
                  paddingRight: '0.4px',
                  boxSizing: 'border-box'
                }}
              >{ EXECUTOR[0].alertData?.length + alertData.reduce((akkum, alert) => akkum.concat(alert), []).length }</span> }
              { ( USER_ROLE === 'CUSTOMER' 
                
                && CUSTOMER.length > 0 
                && CUSTOMER[0].alertData 
                && alertData ) && CUSTOMER[0].alertData?.length && <span
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
              >{ CUSTOMER[0].alertData?.length + alertData.reduce((akkum, alert) => akkum.concat(alert), []).length }</span> }
            </HeadControllersIcon>
            <span style={{ display: 'block', width: '30px' }} />
            <HeadControllersIcon 
              backgroundColor={'transparent'}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                USER_ROLE === 'CUSTOMER' && navigate('cust-office/wallet')
                USER_ROLE === 'EXECUTOR' && navigate('exec-office/wallet')
              }}
            >
              <img
                alt={""}
                src={walletIcon}
                style={walletIconStyle}
              />
            </HeadControllersIcon>
            </div>
            <span 
              onClick={() => {
                USER_ROLE === 'CUSTOMER' && navigate('cust-office/wallet')
                USER_ROLE === 'EXECUTOR' && navigate('exec-office/wallet')
              }}
              style={{ 
                ...menuItemStyle, 
                color: greyColor, 
                fontWeight: '600', 
                fontSize: '16px',
                marginRight: '30px',
                marginLeft: '4px',
                cursor: 'pointer'
              }}
            >{ wallet } ₽</span>
            <HeadControllersAvatar 
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                overflow: 'hidden',
              }}
              backgroundColor={blueColorForIcon}
              onClick={() => {
                USER_ROLE === 'EXECUTOR' && navigate('/exec-office/about')
                USER_ROLE === 'CUSTOMER' && navigate('/cust-office/about')
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
          </div>
        </HeadWrapperInner>
      </HeadWrapper>
    </React.Fragment>
  )

}

export default Header