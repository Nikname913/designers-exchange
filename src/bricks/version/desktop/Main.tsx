import React, { useRef, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { setScrollTop } from '../../store/slices/right-content-slice'
import { CSSProperties } from 'styled-components'
import Header from './views/globalViews/Header'
import DeskRoutes from './routes/DeskRoutes'
import Footer from './views/globalViews/Footer'
import RightContentContainer from './services/rightContentContainer.service'

const Main: React.FC = () => {

  const showRightContent = useAppSelector(state => state.rightContentReducer.isShow)
  const scrollRightContent = useAppSelector(state => state.rightContentReducer.scrollTop)
  const mainContainer = useRef<HTMLElement | null>(null)
  const dispatch = useAppDispatch()

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

  },[ dispatch, showRightContent ])

  return (
    <React.Fragment>
      <main ref={mainContainer} style={MAIN_STYLES}>
        { showRightContent && <RightContentContainer 
          contentType={"ECC"}
          scroll={scrollRightContent}
          chatData={{
            userID: '0000008',
            userName: 'Иванов Петр Владимирович',
            userLastctive: 'вчера в 12:43'
          }}
        /> }
        <Header></Header>
        <DeskRoutes></DeskRoutes>
        <Footer></Footer>
      </main>
    </React.Fragment>
  )

}

export default Main