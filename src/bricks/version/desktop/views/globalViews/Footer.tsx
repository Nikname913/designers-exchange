import React, { useState } from 'react'
import { CSSProperties } from 'styled-components'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import css from '../../styles/views/footer.css'
import EmailIcon from '@mui/icons-material/Email'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { setActiveRole } from '../../../../store/slices/role-type-slice'
import { setShow, setType, setMessage } from '../../../../store/slices/alert-content-slice'
import ButtonComponent from '../../comps/button/Button'

const { FooterWrapper, 
  Logo, 
  MemuItemsContainer,
  MenuItem,
  GorizontalLine } = css

const Footer: React.FC = () => {

  const footerBackground = useAppSelector(state => state.theme.footerBackground)
  const LogoColor = useAppSelector(state => state.theme.white)
  const buttonBackgroundColor = useAppSelector(state => state.theme.blue3)
  const buttonColor = useAppSelector(state => state.theme.grey)
  const lineColor = useAppSelector(state => state.theme.white)

  const [ activeButton, setActiveButton ] = useState<Array<boolean>>([ true, false, false ])
  const dispatch = useAppDispatch()

  const logoDivStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  }

  const activeOne = (): void => {
    setActiveButton([ true, false, false ])
    dispatch(setActiveRole('CUSTOMER'))
    dispatch(setShow(true))
    dispatch(setType("info"))
    dispatch(setMessage("Выбрана роль пользователя Заказчик"))
  }
  const activeTwo = (): void => {
    setActiveButton([ false, true, false ])
    dispatch(setActiveRole("EXECUTOR"))
    dispatch(setShow(true))
    dispatch(setType("info"))
    dispatch(setMessage("Выбрана роль пользователя Исполнитель"))
  }
  const activeThree = (): void => {
    setActiveButton([ false, false, true ])
    dispatch(setActiveRole("UNDEFINED"))
    dispatch(setShow(true))
    dispatch(setType("info"))
    dispatch(setMessage("Выбрана роль пользователя Гость"))
  } 

  return (
    <React.Fragment>
      <FooterWrapper backgroundColor={footerBackground}>
        <div style={logoDivStyle}>
          <Logo style={{ fontSize: '30px', color: LogoColor }}>BIRLOGO</Logo>
          <MemuItemsContainer>
            <MenuItem color={LogoColor}>Тарифы и условия</MenuItem>
            <MenuItem color={LogoColor}>Основы работы системы</MenuItem>
          </MemuItemsContainer>
        </div>
        <ButtonGroup variant="contained" aria-label="outlined button group" color="inherit">
          <Button 
            onClick={activeOne}
            style={{ 
              backgroundColor: 
                activeButton[0] ? '#00BFA8' : 'rgba(0, 0, 0, 0.08)', 
              fontSize: '13px',
              color: '#D9E7F0'
              }}
            >CUSTOMER</Button>
          <Button 
            onClick={activeTwo}
            style={{ 
              backgroundColor: 
                activeButton[1] ? '#00BFA8' : 'rgba(0, 0, 0, 0.08)', 
              fontSize: '13px',
              color: '#D9E7F0'
              }}
            >EXECUTOR</Button>
          { false && <Button 
            onClick={activeThree}
            style={{
              backgroundColor: 
                activeButton[2] ? '#00BFA8' : 'rgba(0, 0, 0, 0.08)', 
              fontSize: '13px',
              color: '#D9E7F0'
              }}
            >GUES</Button> }
        </ButtonGroup>
        <ButtonComponent
          inner={'Обратиться в поддержку'} 
          type='CONTAINED_DEFAULT' 
          action={() => console.log('this is button')}
          actionData={null}
          widthType={'px'}
          widthValue={350}
          children={null}
          childrenCss={undefined}
          iconSrc={null}
          iconCss={undefined}
          muiIconSize={null}
          MuiIconChildren={EmailIcon}
          css={{
            backgroundColor: buttonBackgroundColor,
            color: buttonColor,
            fontSize: '12px',
            height: '40px',
            borderRadius: '6px',
            position: 'relative',
            boxSizing: 'border-box',
            marginRight: '110px'
          }}
        />
        <GorizontalLine backgroundColor={lineColor}></GorizontalLine>
        <div style={{ ...logoDivStyle, opacity: '0.6' }}>
          
          <MenuItem color={lineColor}>Пользовательское соглашение</MenuItem>
        
        </div>
        <div style={{ ...logoDivStyle, opacity: '0.6', marginRight: '110px' }}>
          
          <MenuItem color={lineColor}>Политика конфиденциальности</MenuItem>
        
        </div>
      </FooterWrapper>
    </React.Fragment>
  )

}

export default Footer