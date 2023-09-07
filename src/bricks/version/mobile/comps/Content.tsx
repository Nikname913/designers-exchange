import React from 'react'
import css from '../styles/css.css'
import DeskRoutes from '../routes/DeskRoutes'

const { Content } = css

const MobileContent: React.FC = () => {

  return <Content.Container>
    <div 
      style={{ 
        display: 'block', 
        position: 'relative', 
        boxSizing: 'border-box',
        overflowY: 'scroll', 
        paddingRight: '18px',
        width: 'calc(100% + 18px)' 
      }}
    >
      <DeskRoutes></DeskRoutes>
    </div>
  </Content.Container>

}

export default MobileContent