// ----------------------------------------------------------------
/* eslint-disable react-hooks/exhaustive-deps */
// ----------------------------------------------------------------
import React, { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { setScrollTop } from '../../store/slices/right-content-slice'
import { setScrollTop as setScrollFos } from '../../store/slices/fos-slice'
import { CSSProperties } from 'styled-components'
import Header from './views/globalViews/Header'
import DeskRoutes from './routes/DeskRoutes'
import Footer from './views/globalViews/Footer'
import Alert from './services/alert.service'
import FOS from './services/fos.service'
import RightContentContainer from './services/rightContentContainer.service'

const Main: React.FC = () => {

  const showRightContent = useAppSelector(state => state.rightContentReducer.isShow)
  const typeRightContent = useAppSelector(state => state.rightContentReducer.showType)
  const scrollRightContent = useAppSelector(state => state.rightContentReducer.scrollTop)
  const scrollFosContent = useAppSelector(state => state.FOSReducer.scrollTop)
  const showAlertContent = useAppSelector(state => state.alertContentReducer.isShow)
  const alertType = useAppSelector(state => state.alertContentReducer.type)
  const alertMessage = useAppSelector(state => state.alertContentReducer.message)
  const alertCSS = useAppSelector(state => state.alertContentReducer.styles)
  const showFos = useAppSelector(state => state.FOSReducer.isShow)
  const fosType = useAppSelector(state => state.FOSReducer.showType)
  const mainContainer = useRef<HTMLElement | null>(null)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const USER_ROLE = useAppSelector(state => state.roleTypeReducer.activeRole)
  const MAIN_STYLES: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '110%',
    height: '100vh',
    overflowY: showRightContent ? 'hidden' : 'scroll',
  }

  useEffect(() => {

    console.log(mainContainer.current?.scrollTop)
    mainContainer.current !== null && dispatch(setScrollTop(mainContainer.current.scrollTop))
    mainContainer.current !== null && dispatch(setScrollFos(mainContainer.current.scrollTop))

    USER_ROLE === 'UNDEFINED' && console.log('нет авторизации')

  },[ dispatch, showRightContent, showFos, USER_ROLE ])

  useEffect(() => navigate('/zakazchiki'),[])

  return (
    <React.Fragment>
      <main ref={mainContainer} style={MAIN_STYLES}>
        { showAlertContent && <Alert
          messageType={alertType}
          message={alertMessage}
          styles={alertCSS}
        /> }
        { showRightContent === true && <RightContentContainer 
          contentType={typeRightContent}
          scroll={scrollRightContent}
          chatData={{
            userID: '0000008',
            userName: 'Иванов Петр Владимирович',
            userLastctive: 'вчера в 12:43'
          }}
        /> }
        { showFos && <FOS 
          showType={fosType} 
          showShadow={true} 
          scroll={scrollFosContent} 
        /> }
        <Header></Header>
        <DeskRoutes></DeskRoutes>
        <Footer></Footer>
      </main>
    </React.Fragment>
  )

}

export default Main