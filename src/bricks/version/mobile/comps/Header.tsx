import React, { useContext } from 'react'
import { ShowRM } from '../Context'
import css from '../styles/css.css'
import mobileMenu from '../img/mobileMenu.svg'
import logo from '../img/logo.svg'

const { Header } = css

const MobileHeader: React.FC = () => {

  const [ ,setShowRM ] = useContext(ShowRM)

  return <Header.Container>

    <img
      alt={""}
      src={logo}
      style={{
        display: 'block',
        position: 'absolute',
        height: '33px'
      }}
    />
    <h1 
      style={{
        display: 'block',
        position: 'relative',
        fontSize: '14px',
        fontWeight: 'normal',
        letterSpacing: '1.6px',
        marginLeft: '44px'
      }}
    >ПРИЛОЖЕНИЕ</h1>
    <img
      alt={""}
      src={mobileMenu}
      onClick={() => {
        setShowRM({
          show: true,
          type: 'no-auth'
        })
      }}
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