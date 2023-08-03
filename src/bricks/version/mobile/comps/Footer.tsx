import React from 'react'
import css from '../styles/css.css'

import exchange from '../img/exchange.svg'
import star from '../img/star.svg'
import chat from '../img/chat.svg'
import alarm from '../img/alarm.svg'
import profile from '../img/profile.svg'

const { Foooter } = css

const MobileFooter: React.FC = () => {

  return <Foooter.Container>

    <Foooter.MenuItem>
      <img
        alt={""}
        src={exchange}
        style={{ width: '24px' }}
      />
      <span style={{ fontSize: '11px', marginTop: '3px' }}>Биржа</span>
    </Foooter.MenuItem>
    <Foooter.MenuItem>
      <img
        alt={""}
        src={star}
        style={{ width: '24px' }}
      />
      <span style={{ fontSize: '11px', marginTop: '3px' }}>Заказы</span>
    </Foooter.MenuItem>
    <Foooter.MenuItem>
      <img
        alt={""}
        src={chat}
        style={{ width: '24px' }}
      />
      <span style={{ fontSize: '11px', marginTop: '3px' }}>Общение</span>
    </Foooter.MenuItem>
    <Foooter.MenuItem>
      <img
        alt={""}
        src={alarm}
        style={{ width: '22px' }}
      />
      <span style={{ fontSize: '11px', marginTop: '5px' }}>Новое</span>
    </Foooter.MenuItem>
    <Foooter.MenuItem>
      <img
        alt={""}
        src={profile}
        style={{ width: '24px' }}
      />
      <span style={{ fontSize: '11px', marginTop: '3px' }}>Профиль</span>
    </Foooter.MenuItem>

  </Foooter.Container>

}

export default MobileFooter