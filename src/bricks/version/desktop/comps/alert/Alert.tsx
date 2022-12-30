import React, { useState } from 'react'
import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { IAlert } from '../../../../models-ts/comps/comps-models'

const AlertComponent: React.FC<IAlert> = (props: IAlert) => {

  const { type, message, css } = props
  const [ open, setOpen ] = useState(true)

  return (
    <React.Fragment>
      <Collapse in={open}>
        <Alert 
          severity={
            type === 'success' 
            ? 'success' 
            : type === 'info' 
            ? 'info'
            : type === 'warning'
            ? 'warning'
            : type === 'error'
            ? 'error' : 'success' } 
          style={css}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false)
              }}
            >
              <CloseIcon/>
            </IconButton>
          }
        >{ message }</Alert>
      </Collapse>
    </React.Fragment>
  )

}

export default AlertComponent