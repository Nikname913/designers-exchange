import React, { useState } from 'react'
import Main from './desktop/Main'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { setDevice } from '../store/slices/device-type-slice'
import Fab from '@mui/material/Fab'
import LogoutIcon from '@mui/icons-material/Logout'
import FeedbackIcon from '@mui/icons-material/Feedback'
import ComputerIcon from '@mui/icons-material/Computer'

import MobileHeader from './mobile/comps/Header'
import MobileFooter from './mobile/comps/Footer'
import MobileContent from './mobile/comps/Content'
import RMNotAuth from './mobile/views/rightMenu/RM.unauth'

import { ShowRM } from './mobile/Context'

const Selector: React.FC = () => {

  const DEVICE = useAppSelector(state => state.deviceTypeReducer.device)
  const dispatch = useAppDispatch()

  // ----------------------------------------------------------------
  // данные для контекста
  // ----------------------------------------------------------------

  const [ showRM, setShowRM ] = useState<{
    show: boolean,
    type: string
  }>({
    show: false,
    type: 'no-auth'
  })

  return (
    <React.Fragment>
      { DEVICE === 'PC' && <Main></Main> }
      { DEVICE === 'MOBILE' && <React.Fragment>

        <ShowRM.Provider value={[ showRM, setShowRM ]}>
          <section 
            style={{ 
              display: 'block', 
              position: 'relative', 
              width: '350px',
              marginLeft: '60px' 
            }}
          >
            { ( showRM.show && showRM.type === 'no-auth' ) && <RMNotAuth /> }

            <MobileHeader />
            <MobileContent />
            <MobileFooter />
          </section>
        </ShowRM.Provider>

        <Fab 
          color="primary" 
          aria-label="add"
          style={{
            display: 'block',
            position: 'fixed',
            width: '70px',
            height: '70px',
            top: '100vh',
            left: '0%',
            marginTop: '-268px',
            marginLeft: '30px'
          }}
        >
          <FeedbackIcon sx={{ marginBottom: '-5px', fontSize: '33px' }} />
        </Fab>
        <Fab 
          color="primary" 
          aria-label="add"
          style={{
            display: 'block',
            position: 'fixed',
            width: '70px',
            height: '70px',
            top: '100vh',
            left: '0%',
            marginTop: '-184px',
            marginLeft: '30px'
          }}
        >
          <LogoutIcon sx={{ marginBottom: '-5px', fontSize: '33px' }} />
        </Fab>
        <Fab 
          onClick={() => {
            dispatch(setDevice('PC'))
          }}
          color="primary" 
          aria-label="add"
          style={{
            display: 'block',
            position: 'fixed',
            width: '70px',
            height: '70px',
            top: '100vh',
            left: '0%',
            marginTop: '-100px',
            marginLeft: '30px'
          }}
        >
          <ComputerIcon sx={{ marginBottom: '-5px', fontSize: '33px' }} />
        </Fab>

      </React.Fragment> }
    </React.Fragment>
  )

}

export default Selector