import React from 'react'
import { useAppDispatch } from '../../../store/hooks'
import { setShow } from '../../../store/slices/alert-content-slice'
import AlertComponent from '../comps/alert/Alert'
import { IAlert } from '../../../models-ts/services/alert-models'
import { CSSProperties } from 'styled-components'

const Alert: React.FC<IAlert> = (props: IAlert) => {

  const { messageType, message, styles } = props
  const dispatch = useAppDispatch()

  const alertContainerCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'fixed',
    width: '550px',
    top: '100%',
    marginTop: '-100px',
    left: '50%',
    marginLeft: '-275px',
    zIndex: 30,
    textAlign: 'center'
  }

  const closeAlert = (): void => {
    setTimeout(() => dispatch(setShow(false)), 800)
  }

  return (
    <React.Fragment>
      <div style={alertContainerCSS} onClick={closeAlert}>
        <AlertComponent 
          type={messageType}
          message={message}
          css={styles}
        />
      </div>
    </React.Fragment>
  )

}

export default Alert