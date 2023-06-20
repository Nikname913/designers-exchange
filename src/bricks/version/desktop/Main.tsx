// ----------------------------------------------------------------
/* eslint-disable no-lone-blocks */
// ----------------------------------------------------------------
/* eslint-disable react-hooks/exhaustive-deps */
// ----------------------------------------------------------------
import React, { useRef, useEffect, useState } from 'react'
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
import Updater from './views/globalViews/Updater'

const DeskRoutesMemo = React.memo(DeskRoutes)

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
  const alertData = useAppSelector(state => state.headerReducer.alertData)
  const updating = useAppSelector(state => state.dataUpdateReducer.updating)
  
  const mainContainer = useRef<HTMLElement | null>(null)
  const requestReduceValue = useAppSelector(state => state.requestReducer.reduceValue)
  const [ ,setAddressIP ] = useState<{
    IPv4: string,
    city: string,
    country_code: string,
    country_name: string,
    postal: string,
  }>()

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

  const getDataIP = async () => {

    fetch('https://geolocation-db.com/json/')
      .then(res => res.json())
      .then(
        (data: {
          IPv4: string,
          city: string,
          country_code: string,
          country_name: string,
          latitude: number,
          longitude: number,
          postal: string,
          state: string
        }): PromiseLike<never> | void => 
          setAddressIP({
            IPv4: data.IPv4,
            city: data.city,
            country_code: data.country_code,
            country_name: data.country_name,
            postal: data.postal
          })
      )

  }

  useEffect(() => {

    false && console.log(mainContainer.current?.scrollTop)
    mainContainer.current !== null && dispatch(setScrollTop(mainContainer.current.scrollTop))
    mainContainer.current !== null && dispatch(setScrollFos(mainContainer.current.scrollTop))

    USER_ROLE === 'UNDEFINED' && console.log('нет авторизации')

  },[ dispatch, showRightContent, showFos, USER_ROLE ])
  useEffect(() => navigate('/customers'),[])
  useEffect(() => {}, [ requestReduceValue ])
  useEffect(() => { false && console.log(alertData) }, [ alertData ])
  useEffect(() => { getDataIP() }, [])

  return (
    <React.Fragment>

      {/* ----------------------------------------- */}
      {/* компонент который обновляет данные */}
      {/* ----------------------------------------- */}

        { updating && <Updater></Updater> }

      {/* ----------------------------------------- */}
      {/* компонент который обновляет данные */}
      {/* ----------------------------------------- */}

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
        <DeskRoutesMemo></DeskRoutesMemo>
        <Footer></Footer>
      </main>
    </React.Fragment>
  )

}

export default Main