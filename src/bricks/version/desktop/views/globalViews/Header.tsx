import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CSSProperties } from 'styled-components'
import { useAppSelector } from '../../../../store/hooks'
import css from '../../styles/views/header.css'
import defaultAvatar from '../../../../img/stock/avatar.svg'
import questionIcon from '../../../../img/icons/question.svg'
import postIcon from '../../../../img/icons/post.svg'
import bellIcon from '../../../../img/icons/bell.svg'
import walletIcon from '../../../../img/icons/wallet.svg'

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

  return (
    <React.Fragment>

      <HeadWrapper backgroundColor={"transparent"}>
      <HeadWrapperShadow></HeadWrapperShadow>
      <HeadWrapperInner backgroundColor={whiteColor}>
        <Logo style={{ fontSize: '30px' }}>BIRLOGO</Logo>
        <HeadMenu>
          <span style={menuItemStyle} onClick={() => navigate('/birzha')}>Биржа</span>
          <span style={menuItemStyle} onClick={() => navigate('/ispolniteli')}>Исполнители</span>
          <span style={menuItemStyle} onClick={() => navigate('/zakazchiki')}>Заказчики</span>
          <span style={menuItemStyle} onClick={() => navigate('/novoe-zadanie')}>Новое задание</span>
        </HeadMenu>
        <HeadControllers>
          <span style={{ ...menuItemStyle, marginRight: '24px' }}>Мои заказы</span>
          <HeadControllersIcon backgroundColor={blueColorForIcon}>
            <img
              alt={""}
              src={questionIcon}
              style={questionIconStyle}
            />
          </HeadControllersIcon>
          <HeadControllersIcon backgroundColor={'transparent'}>
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
              style={{ ...bellIconStyle, marginLeft: '-13px' }}
            />
          </HeadControllersIcon>
          <span style={{ display: 'block', width: '16px' }} />
          <HeadControllersIcon backgroundColor={'transparent'}>
            <img
              alt={""}
              src={walletIcon}
              style={walletIconStyle}
            />
          </HeadControllersIcon>
          <span 
            style={{ 
              ...menuItemStyle, 
              color: greyColor, 
              fontWeight: '600', 
              fontSize: '16px',
              marginRight: '24px'
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

      <div
        style={{
          display: 'none',
          flexDirection: 'row',
          alignContent: 'flex-start',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          position: 'relative',
          width: '100%',
          maxWidth: '1950px',
          minWidth: '1350px',
          margin: '0 auto',
          boxSizing: 'border-box',
          paddingLeft: '30px',
          paddingRight: '30px',
          paddingTop: '24px',
          color: 'rgb(46, 46, 46)'
        }}
      >
        <span
          style={{ display: 'block', position: 'relative', fontSize: '14px', marginBottom: '16px', marginRight: '12px', cursor: 'pointer' }}
        ><Link style={{ textDecoration: 'none', color: 'inherit' }} to="/rabota-birzhy">Работа биржи</Link></span>
        <span
          style={{ display: 'block', position: 'relative', fontSize: '14px', marginRight: '12px', cursor: 'pointer' }}
        ><Link style={{ textDecoration: 'none', color: 'inherit' }} to="/chat">Страница чата</Link></span>
        <span
          style={{ display: 'block', position: 'relative', fontSize: '14px', marginRight: '12px', cursor: 'pointer' }}
        ><Link style={{ textDecoration: 'none', color: 'inherit' }} to="/zakazchiki">Заказчики</Link></span>
        <span
          style={{ display: 'block', position: 'relative', fontSize: '14px', marginRight: '12px', cursor: 'pointer' }}
        ><Link style={{ textDecoration: 'none', color: 'inherit' }} to="/cabinet-zakazchika">Профиль заказчика</Link></span>
        <span
          style={{ display: 'block', position: 'relative', fontSize: '14px', marginRight: '12px', cursor: 'pointer' }}
        ><Link style={{ textDecoration: 'none', color: 'inherit' }} to="/birzha">Биржа</Link></span>
        <span
          style={{ display: 'block', position: 'relative', fontSize: '14px', marginRight: '12px', cursor: 'pointer' }}
        ><Link style={{ textDecoration: 'none', color: 'inherit' }} to="/ispolniteli">Исполнители</Link></span>
        <span
          style={{ display: 'block', position: 'relative', fontSize: '14px', marginRight: '12px', cursor: 'pointer' }}
        ><Link style={{ textDecoration: 'none', color: 'inherit' }} to="/cabinet-ispolnitelya">Профиль исполнителя</Link></span>
        <span
          style={{ display: 'block', position: 'relative', fontSize: '14px', marginRight: '12px', cursor: 'pointer' }}
        ><Link style={{ textDecoration: 'none', color: 'inherit' }} to="/glavnaya">Главная</Link></span>
        <span
          style={{ display: 'block', position: 'relative', fontSize: '14px', marginRight: '12px', cursor: 'pointer' }}
        ><Link style={{ textDecoration: 'none', color: 'inherit' }} to="/moi-zakazy">Мои заказы</Link></span>
        <span
          style={{ display: 'block', position: 'relative', fontSize: '14px', marginRight: '12px', cursor: 'pointer' }}
        ><Link style={{ textDecoration: 'none', color: 'inherit' }} to="/koshelek">Кошелек</Link></span>
        <span
          style={{ display: 'block', position: 'relative', fontSize: '14px', marginRight: '12px', cursor: 'pointer' }}
        ><Link style={{ textDecoration: 'none', color: 'inherit' }} to="/ceny-i-usloviya">Цены и условия</Link></span>
        <span
          style={{ display: 'block', position: 'relative', fontSize: '14px', marginRight: '12px', cursor: 'pointer' }}
        ><Link style={{ textDecoration: 'none', color: 'inherit' }} to="/politika">Политика конфиденциальности</Link></span>
        <span
          style={{ display: 'block', position: 'relative', fontSize: '14px', marginRight: '12px', cursor: 'pointer' }}
        ><Link style={{ textDecoration: 'none', color: 'inherit' }} to="/podderzhka">Поддержка</Link></span>
        <span
          style={{ display: 'block', position: 'relative', fontSize: '14px', marginRight: '12px', cursor: 'pointer' }}
        ><Link style={{ textDecoration: 'none', color: 'inherit' }} to="/komanda">Команда</Link></span>
        <span
          style={{ display: 'block', position: 'relative', fontSize: '14px', marginRight: '12px', cursor: 'pointer' }}
        ><Link style={{ textDecoration: 'none', color: 'inherit' }} to="/soglashenie">Пользовательское соглашение</Link></span>
        <span
          style={{ display: 'block', position: 'relative', fontSize: '14px', marginRight: '12px', cursor: 'pointer' }}
        ><Link style={{ textDecoration: 'none', color: 'inherit' }} to="/stranica-sotrudnika">Страница сотрудника</Link></span>
        <span
          style={{ display: 'block', position: 'relative', fontSize: '14px', marginRight: '12px', cursor: 'pointer' }}
        ><Link style={{ textDecoration: 'none', color: 'inherit' }} to="/ui-kit">Набор сквозных компонентов</Link></span>
      </div>

    </React.Fragment>
  )

}

export default Header