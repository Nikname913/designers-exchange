import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuActive } from '../Context'
import css from '../styles/css.css'

import exchange from '../img/exchange.svg'
import star from '../img/star.svg'
import chat from '../img/chat.svg'
import alarm from '../img/alarm.svg'
import profile from '../img/profile.svg'

const { Foooter } = css

const MobileFooter: React.FC = () => {

  const [ selectMenu, setSelectMenu ] = useContext(MenuActive)

  const navigate = useNavigate()

  const changeStep = (param: 1 | 2 | 3 | 4 | 5) => setSelectMenu(param)

  return <Foooter.Container style={{ overflow: 'hidden' }}>

    <Foooter.MenuItem 
      onClick={() => {
        navigate('/task-list-all')
        changeStep(1)
      }}
    >
      { false && <img
        alt={""}
        src={exchange}
        style={{ width: '24px' }}
      /> }
      <img
        alt={""}
        src={profile}
        style={{ width: '24px' }}
      />
      <span style={{ fontSize: '11px', marginTop: '3px' }}>Биржа</span>
      { selectMenu === 1 && <span
        style={{
          display: 'block',
          position: 'absolute',
          width: '100%',
          height: '4px',
          borderTopLeftRadius: '2px',
          borderTopRightRadius: '2px',
          backgroundColor: 'rgb(22, 124, 191)',
          top: '100%',
          marginTop: '6.6px'
        }}
      /> }
    </Foooter.MenuItem>
    <Foooter.MenuItem onClick={() => changeStep(2)}>
      <img
        alt={""}
        src={star}
        style={{ width: '24px' }}
      />
      <span style={{ fontSize: '11px', marginTop: '3px' }}>Заказы</span>
      { selectMenu === 2 && <span
        style={{
          display: 'block',
          position: 'absolute',
          width: '100%',
          height: '4px',
          borderTopLeftRadius: '2px',
          borderTopRightRadius: '2px',
          backgroundColor: 'rgb(22, 124, 191)',
          top: '100%',
          marginTop: '6.6px'
        }}
      /> }
    </Foooter.MenuItem>
    <Foooter.MenuItem onClick={() => changeStep(3)}>
      <img
        alt={""}
        src={chat}
        style={{ width: '24px' }}
      />
      <span style={{ fontSize: '11px', marginTop: '3px' }}>Общение</span>
      { selectMenu === 3 && <span
        style={{
          display: 'block',
          position: 'absolute',
          width: '100%',
          height: '4px',
          borderTopLeftRadius: '2px',
          borderTopRightRadius: '2px',
          backgroundColor: 'rgb(22, 124, 191)',
          top: '100%',
          marginTop: '6.6px'
        }}
      /> }
    </Foooter.MenuItem>
    <Foooter.MenuItem onClick={() => changeStep(4)}>
      <img
        alt={""}
        src={alarm}
        style={{ width: '22px' }}
      />
      <span style={{ fontSize: '11px', marginTop: '5px' }}>Новое</span>
      { selectMenu === 4 && <span
        style={{
          display: 'block',
          position: 'absolute',
          width: '100%',
          height: '4px',
          borderTopLeftRadius: '2px',
          borderTopRightRadius: '2px',
          backgroundColor: 'rgb(22, 124, 191)',
          top: '100%',
          marginTop: '6.6px'
        }}
      /> }
    </Foooter.MenuItem>
    <Foooter.MenuItem onClick={() => changeStep(5)}>
      <img
        alt={""}
        src={profile}
        style={{ width: '24px' }}
      />
      <span style={{ fontSize: '11px', marginTop: '3px' }}>Профиль</span>
      { selectMenu === 5 && <span
        style={{
          display: 'block',
          position: 'absolute',
          width: '100%',
          height: '4px',
          borderTopLeftRadius: '2px',
          borderTopRightRadius: '2px',
          backgroundColor: 'rgb(22, 124, 191)',
          top: '100%',
          marginTop: '6.6px'
        }}
      /> }
    </Foooter.MenuItem>

  </Foooter.Container>

}

export default MobileFooter