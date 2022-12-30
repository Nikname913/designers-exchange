import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { IModal } from '../../../../models-ts/comps/comps-models'

const ModalComponent: React.FC<IModal> = (props: IModal) => {

  const { 
    type, 
    title,
    message,
    isShow,
    action } = props

  return (
    <React.Fragment>
      { type === 'AGREE_OR_NOT'
        ? <Dialog
            open={isShow}
            onClose={() => action(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle 
              id="alert-dialog-title"
              style={{
                marginTop: '14px',
                marginLeft: '18px'
              }}
            >
              { title }
            </DialogTitle>
            <DialogContent
              style={{
                marginTop: '4px',
                marginLeft: '18px',
                marginRight: '18px',
              }}
            >
              <DialogContentText id="alert-dialog-description">
                { message }
              </DialogContentText>
            </DialogContent>
            <DialogActions
              style={{
                marginTop: '4px',
                marginLeft: '18px',
                marginRight: '18px',
                marginBottom: '18px'
              }}
            >
              <Button style={{ color: 'grey', padding: '12px 16px 10px' }} onClick={() => action(false)}>{"Отклонить"}</Button>
              <Button style={{ color: 'grey', padding: '12px 16px 10px' }} onClick={() => action(false)}>{"Принять"}</Button>
            </DialogActions>
          </Dialog>
        : <React.Fragment></React.Fragment> }
    </React.Fragment>
  )

}

export default ModalComponent