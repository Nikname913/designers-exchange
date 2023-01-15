import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CSSProperties } from 'styled-components'
import { useAppSelector } from '../../../../store/hooks'
import css from '../../styles/views/header.css'
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
  const [ execCustButtonInner, setExecCustButtoninner ] = useState<'Исполнители' | 'Заказчики'>('Исполнители')

  const wallet = useAppSelector(state => state.headerReducer.walletCount)
  const whiteColor = useAppSelector(state => state.theme.white)
  const greyColor = useAppSelector(state => state.theme.grey)
  const blueColorForIcon = useAppSelector(state => state.theme.blue3)
  
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
    execCustButtonInner === 'Исполнители' && navigate('/ispolniteli')
    execCustButtonInner === 'Заказчики' && navigate('/zakazchiki')
  }

  return (
    <React.Fragment>

      <HeadWrapper backgroundColor={"transparent"}>
      <HeadWrapperShadow></HeadWrapperShadow>
      <HeadWrapperInner backgroundColor={whiteColor}>
        <Logo style={{ fontSize: '30px' }}>BIRLOGO</Logo>
        <HeadMenu>
          <span style={menuItemStyle} onClick={() => navigate('/birzha')}>Биржа</span>
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
        <HeadControllers>
          <span style={{ ...menuItemStyle, marginRight: '30px' }}>Мои заказы</span>
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
          >{wallet} ₽</span>
          <HeadControllersAvatar backgroundColor={blueColorForIcon}>

            <img
              alt={""}
              src={defaultAvatar}
              style={avatarStyle}
            />

          </HeadControllersAvatar>
        </HeadControllers>
      </HeadWrapperInner>
      </HeadWrapper>
    </React.Fragment>
  )

}

export default Header