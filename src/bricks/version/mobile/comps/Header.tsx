import React, { useContext } from 'react'
import { useAppSelector } from '../../../store/hooks'
import { ShowRM } from '../Context'
import FOS from '../../desktop/services/fos.service'
import css from '../styles/css.css'
import logo from '../img/logo.svg'

const { Header } = css

const MobileHeader: React.FC = () => {

  const [ ,setShowRM ] = useContext(ShowRM)
  const showFos = useAppSelector(state => state.FOSReducer.isShow)
  const fosType = useAppSelector(state => state.FOSReducer.showType)
  const scrollFosContent = useAppSelector(state => state.FOSReducer.scrollTop)

  const USER_ROLE = useAppSelector(state => state.roleTypeReducer.activeRole)

  return <Header.Container>

    { showFos && <FOS 
      showType={fosType} 
      showShadow={true} 
      scroll={scrollFosContent} 
      css={[
        {
          width: '100%',
          paddingLeft: '16px',
          paddingRight: '16px',
        }
      ]}
    /> }

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
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height="22px" 
      viewBox="0 0 448 512"
      style={{ fill: 'black', cursor: 'pointer' }}
      onClick={() => {
        USER_ROLE === 'UNDEFINED' &&
          setShowRM({
            show: true,
            type: 'no-auth'
          })
        USER_ROLE !== 'UNDEFINED' &&
          setShowRM({
            show: true,
            type: 'auth'
          })
      }}
    >
      <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
    </svg>

  </Header.Container>

}

export default MobileHeader