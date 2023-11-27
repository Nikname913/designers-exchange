import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Main from './desktop/Main'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { setDevice } from '../store/slices/device-type-slice'
import { setActiveRole, setRoleData } from '../store/slices/role-type-slice'
import Fab from '@mui/material/Fab'
import LogoutIcon from '@mui/icons-material/Logout'
import FeedbackIcon from '@mui/icons-material/Feedback'
import ComputerIcon from '@mui/icons-material/Computer'

import MobileHeader from './mobile/comps/Header'
import MobileFooter from './mobile/comps/Footer'
import MobileContent from './mobile/comps/Content'

import RMNotAuth from './mobile/views/rightMenu/RM.unauth'
import RMAuth from './mobile/views/rightMenu/RM.auth'
import RMCabinet from './mobile/views/rightMenu/RM.cabinet'

import { ShowRM } from './mobile/Context'
import { MenuActive } from './mobile/Context'

const Selector: React.FC = () => {

  const DEVICE = useAppSelector(state => state.deviceTypeReducer.device)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // ----------------------------------------------------------------
  // данные для контекста
  // ----------------------------------------------------------------

  const [ selectMenu, setSelectMenu ] = useState<0 | 1 | 2 | 3 | 4 | 5>(1)
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

        <MenuActive.Provider value={[ selectMenu, setSelectMenu ]}>
        <ShowRM.Provider value={[ showRM, setShowRM ]}>
          <section 
            style={{ 
              display: 'block', 
              position: 'relative', 
              width: '350px',
              marginLeft: '130.8px',
              marginTop: '44px',
              overflowX: 'hidden',
              overflowY: 'hidden',
              height: 'calc(100vh - 64px)'
            }}
          >
            <RMNotAuth></RMNotAuth>
            <RMAuth></RMAuth>
            <RMCabinet></RMCabinet>

            <MobileHeader />
            <MobileContent />
            <MobileFooter />
          </section>
        </ShowRM.Provider>
        </MenuActive.Provider>

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
          onClick={() => {
            setSelectMenu(1)
            navigate('/task-list-all')
            dispatch(setActiveRole('UNDEFINED'))
            dispatch(setRoleData({
              uid: '',
              una: ''
            }))
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