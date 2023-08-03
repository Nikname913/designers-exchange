import React from 'react'
import css from '../styles/css.css'
import mobileMenu from '../img/mobileMenu.svg'

const { Header } = css

const MobileHeader: React.FC = () => {

  return <Header.Container>

    <h1 
      style={{
        display: 'block',
        position: 'relative',
        fontSize: '16px',
        fontWeight: 'normal',
        letterSpacing: '1.6px'
      }}
    >ПРИЛОЖЕНИЕ</h1>
    <img
      alt={""}
      src={mobileMenu}
      style={{
        display: 'block',
        position: 'relative',
        width: '22px',
        cursor: 'pointer'
      }}
    />

  </Header.Container>

}

export default MobileHeader