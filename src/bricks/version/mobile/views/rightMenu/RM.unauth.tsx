import React, { useContext } from 'react'
import { ShowRM } from '../../Context'
import css from '../../styles/css.css'
import close from '../../img/close.svg'

const { RMe } = css

const RM: React.FC = () => {

  const [ ,setShowRM ] = useContext(ShowRM)

  return (
    <React.Fragment>
      <RMe.Container>
        <RMe.ContentLine>
          <h1 
            style={{ 
              color: 'white', 
              fontSize: '14px', 
              fontWeight: '500',
              margin: 0,
              letterSpacing: '1.6px' 
            }}
          >
            ПРИЛОЖЕНИЕ
          </h1>
          <img
            alt={""}
            src={close}
            onClick={() => {
              setShowRM({
                show: false,
                type: 'no-auth'
              })
            }}
            style={{
              display: 'block',
              position: 'relative',
              width: '13px',
              cursor: 'pointer'
            }}
          />
        </RMe.ContentLine>
      </RMe.Container>
    </React.Fragment>
  )

}

export default RM