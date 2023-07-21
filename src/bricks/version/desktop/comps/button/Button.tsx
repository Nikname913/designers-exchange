import React, { ChangeEvent, useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import IconButton from '@mui/material/IconButton'
import { IButton } from '../../../../models-ts/comps/comps-models'
import css from './button-style'

const { ButtonWrapper } = css

const ButtonComponent: React.FC<IButton> = ( props: IButton ) => {

  const { 
    action, 
    type = 'CONTAINED_DEFAULT', 
    inner, 
    css, 
    actionData,
    widthType,
    widthValue,
    children,
    childrenCss,
    iconSrc,
    iconCss,
    muiIconSize,
    MuiIconChildren } = props

  const [ sendFile, setSendFile ] = useState<File>()
  const changeFile = (e: ChangeEvent<HTMLInputElement>) => {

    e.target.files && setSendFile(e.target.files[0])
    if ( e.target.files && actionData ) {
      actionData[0](e.target.files[0])
    }

  }

  useEffect(() => { console.log(sendFile) }, [ sendFile ])

  return (
    <React.Fragment>
      <ButtonWrapper isPercent={widthType} width={widthValue}>

        { children && <span style={childrenCss}>{ children }</span> }
        { iconSrc && <img alt={""} src={iconSrc} style={iconCss} /> } 

        { type === 'CONTAINED_DEFAULT' 
          ? <Button 
              variant="contained" 
              onClick={() => action(actionData && actionData)} 
              style={{
                ...css,
                width: '100%',
                textTransform: 'none',
                fontSize: '15px',
                fontWeight: 'normal',
              }}
            >{ inner }</Button> 
          : type === 'OUTLINED'
          ? <Button 
              variant="outlined" 
              onClick={() => action(actionData && actionData)} 
              style={{
                ...css,
                width: '100%',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 'normal',
              }}
            >{ inner }</Button>
          : type === 'CONTAINED_DISABLED' 
          ? <Button 
              disabled
              variant="contained" 
              onClick={() => action(actionData && actionData)} 
              style={{
                ...css,
                cursor: 'wait',
                filter: 'grayscale(1)',
                width: '100%',
                textTransform: 'none',
                fontSize: '15px',
                fontWeight: 'normal',
              }}
            >{ inner }</Button> 
          : type === 'OUTLINED_DISABLED' 
          ? <Button 
              disabled
              variant="outlined" 
              onClick={() => action(actionData && actionData)} 
              style={{
                ...css,
                cursor: 'wait',
                filter: 'grayscale(1)',
                width: '100%',
                textTransform: 'none',
                fontSize: '15px',
                fontWeight: 'normal',
              }}
            >{ inner }</Button>
          : type === 'UPLOAD' 
          ? <Button 
              variant="contained" 
              component="label"
              onClick={() => action(actionData && actionData)} 
              style={{
                ...css,
                width: '100%',
                textTransform: 'none',
                fontSize: '15px',
                fontWeight: 'normal',
              }}
            >
              <input 
                hidden 
                type="file"
                onChange={changeFile}
                style={{ zIndex: '2' }}
              /> { inner }
            </Button>
          : type === 'ICON_BUTTON' 
          ? <IconButton 
              color="primary" 
              aria-label="add an alarm"
              onClick={() => action(actionData && actionData)} 
              style={css}
            >
              <MuiIconChildren sx={{ fontSize: muiIconSize }}/>
            </IconButton>
          : type === 'ICON_BUTTON_CHAT_SUBMIT' 
          ? <IconButton 
              color="primary" 
              aria-label="add an alarm"
              onClick={() => action(actionData && actionData)} 
              style={{ ...css, borderRadius: '4px' }}
            >
              <MuiIconChildren sx={{ fontSize: muiIconSize, color: 'white' }}/>
            </IconButton>
          : type === 'ICON_BUTTON_DISABLED' 
          ? <IconButton 
              disabled
              color="primary" 
              aria-label="add an alarm"
              onClick={() => action(actionData && actionData)} 
              style={css}
            >
              <MuiIconChildren sx={{ fontSize: muiIconSize }}/>
            </IconButton>  
          : type === 'UPLOAD' 
          ? <Button 
              variant="contained" 
              component="label"
              onClick={() => action(actionData && actionData)} 
              style={{
                ...css,
                width: '100%',
                textTransform: 'none',
                fontSize: '15px',
                fontWeight: 'normal',
              }}
            >
              <input 
                hidden 
                accept="image/*" 
                multiple 
                type="file"
                style={{ zIndex: '2' }}
              /> { inner }
            </Button>
          : type === 'LOADING_BUTTON' 
          ? <LoadingButton 
              loading 
              variant="outlined"
              onClick={() => action(actionData && actionData)} 
              style={{
                ...css,
                cursor: 'wait',
                filter: 'grayscale(1)',
                width: '100%',
                textTransform: 'none',
                fontSize: '15px',
                fontWeight: 'normal',
              }}
            >{ inner }</LoadingButton>
          : <React.Fragment></React.Fragment> }
      </ButtonWrapper>
    </React.Fragment>
  )

}

export default ButtonComponent