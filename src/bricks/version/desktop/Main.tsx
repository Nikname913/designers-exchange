import React from 'react'
import { CSSProperties } from 'styled-components'
import Header from './views/globalViews/Header'
import DeskRoutes from './routes/DeskRoutes'
import Footer from './views/globalViews/Footer'

const Main: React.FC = () => {

  const MAIN_STYLES: CSSProperties = {

    display: 'block',
    position: 'relative',
    width: '110%',
    height: '100vh',
    overflowY: 'scroll',

  }

  return (
    <React.Fragment>
      <main style={MAIN_STYLES}>
        <Header></Header>
        <DeskRoutes></DeskRoutes>
        <Footer></Footer>
      </main>
    </React.Fragment>
  )

}

export default Main