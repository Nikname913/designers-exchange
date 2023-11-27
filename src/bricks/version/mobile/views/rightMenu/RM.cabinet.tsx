import React, { useContext } from 'react'
import { ShowRM, MenuActive } from '../../Context'
import { useNavigate } from 'react-router-dom'
import { CSSProperties } from 'styled-components'
import { useAppDispatch } from '../../../../store/hooks'
import { setShow, setShowType } from '../../../../store/slices/fos-slice'
import { setShow as setShowRCC } from '../../../../store/slices/right-content-slice'
import ButtonComponent from '../../../desktop/comps/button/Button'
import css from '../../styles/css.css'

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import logo from '../../img/logo.svg'
import close from '../../img/close.svg'

const { RMe } = css

const RM: React.FC = () => {

  const [ showRM, setShowRM ] = useContext(ShowRM)
  const [ ,setSelectMenu ] = useContext(MenuActive)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const menuItem: CSSProperties = {
    color: 'white',
    marginBottom: '22px',
    cursor: 'pointer',
  }

  function authLogin(): void {
    dispatch(setShow(true))
    dispatch(setShowType('authLogin'))
    dispatch(setShowRCC('undefined'))
  }

  return (
    <React.Fragment>
      <RMe.Container style={{ left:
        ( showRM.show && showRM.type === 'cabinet' ) ? '23.5%' : '103%',
        transition: 'all 300ms'
      }}>
        <RMe.ContentLine style={{ justifyContent: 'flex-start' }}>
          <img
            alt={""}
            src={logo}
            style={{
              display: 'block',
              height: '33px',
            }}
          />
          <h1 
            style={{ 
              color: 'white', 
              fontSize: '14px', 
              fontWeight: '500',
              margin: 0,
              letterSpacing: '1.6px',
              textAlign: 'left',
              marginLeft: '13px'
            }}
          >
            КАБИНЕТ
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
              position: 'absolute',
              width: '13px',
              cursor: 'pointer',
              left: '100%',
              marginLeft: '-40px',
              top: '0',
              marginTop: '28px',
            }}
          />
        </RMe.ContentLine>
        <RMe.ContentLine style={{ marginTop: '33px' }}>
          <span 
            onClick={() => {
              navigate('/task-list-all')
              setSelectMenu(1)
              setShowRM({
                show: false,
                type: 'no-auth'
              })
            }} 
            style={menuItem}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              height="22px" 
              viewBox="0 0 576 512"
              style={{ fill: 'white', marginBottom: '-5px', marginRight: '12px' }}
            >
              <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 256h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zm256-32H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
            </svg>
            Полные данные
          </span>
        </RMe.ContentLine>
        <RMe.ContentLine>
          <span 
            onClick={() => {
              navigate('/executors')
              setSelectMenu(0)
              setShowRM({
                show: false,
                type: 'no-auth'
              })
            }} 
            style={menuItem}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              height="22px" 
              viewBox="0 0 512 512"
              style={{ fill: 'white', marginBottom: '-4px', marginRight: '12px', marginLeft: '2px' }}
            >
              <path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/>
            </svg>
            Мои документы
          </span>
        </RMe.ContentLine>
        <RMe.ContentLine>
          <span 
            onClick={() => {
              navigate('/customers')
              setSelectMenu(0)
              setShowRM({
                show: false,
                type: 'no-auth'
              })
            }} 
            style={menuItem}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              height="22px" 
              viewBox="0 0 448 512"
              style={{ fill: 'white', marginBottom: '-5px', marginRight: '14px', marginLeft: '3px' }}
            >
              <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/>
            </svg>
            Мои уведомления
          </span>
        </RMe.ContentLine>
        <RMe.ContentLine>
          <span style={menuItem}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              height="22px" 
              viewBox="0 0 576 512"
              style={{ fill: 'white', marginBottom: '-5px', marginRight: '12px', marginLeft: '0px' }}
            >
              <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 256h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zm256-32H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
            </svg>
            Мои проекты
          </span>
        </RMe.ContentLine>
        <RMe.ContentLine>
          <span style={menuItem}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              height="22px" 
              viewBox="0 0 512 512"
              style={{ fill: 'white', marginBottom: '-5px', marginRight: '12px', marginLeft: '2px' }}
            >
              <path d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
            </svg>
            Образование и опыт
          </span>
        </RMe.ContentLine>
        <RMe.ContentLine>
          <span style={menuItem}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              height="22px" 
              viewBox="0 0 512 512"
              style={{ fill: 'white', marginBottom: '-5px', marginRight: '12px', marginLeft: '2px' }}
            >
              <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/>
            </svg>
            Настройки
          </span>
        </RMe.ContentLine>
        <RMe.ContentLine>
          <span
            style={{
              display: 'block',
              position: 'relative',
              width: '220px',
              height: '2px',
              borderRadius: '2px',
              backgroundColor: 'white',
              marginBottom: '20px',
              marginTop: '9px',
            }}
          />
        </RMe.ContentLine>
        <RMe.ContentLine>
          <ButtonComponent
            inner={"Вопрос в поддержку"} 
            type='CONTAINED_DEFAULT' 
            action={authLogin}
            actionData={null}
            widthType={'px'}
            widthValue={220}
            children={""}
            childrenCss={undefined}
            iconSrc={null}
            iconCss={undefined}
            muiIconSize={30}
            MuiIconChildren={ArrowUpwardIcon}
            css={{
              position: 'relative',
              boxSizing: 'border-box',
              padding: '4px',
              backgroundColor: 'White',
              color: 'black',
              width: '56px',
              height: '43px',
              marginTop: '10px'
            }}
          />
        </RMe.ContentLine>
      </RMe.Container>
    </React.Fragment>
  )

}

export default RM