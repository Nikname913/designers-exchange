import React from 'react'
import { CSSProperties } from 'styled-components'
import css from '../../styles/views/footer.css'
import EmailIcon from '@mui/icons-material/Email'
import { useAppSelector } from '../../../../store/hooks'
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

  const logoDivStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
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