// ----------------------------------------------------------------
/* eslint-disable array-callback-return */
// ----------------------------------------------------------------
import React from 'react'
import { useAppSelector } from '../../../store/hooks'
import { useNavigate } from 'react-router-dom'
import { CSSProperties } from 'styled-components'

import star from '../img/star.svg'
import semiMenu from '../img/semiMenu.svg'
import enotAvatar from '../img/enot.svg'
import location from '../img/location.svg'

const Customers: React.FC = () => {

  const EXECUTORS = useAppSelector(state => state.userContentReducer.USERS_DATA.listExecutors)

  const navigate = useNavigate()

  // ----------------------------------------------------------------
  // основная стилизация компонентов
  // ----------------------------------------------------------------

  const title: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: '15px',
    marginBottom: '18px',
    color: '#2E2E2E',
    opacity: 0.9
  }

  const customerWrapper: CSSProperties = {
    display: 'block',
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    borderRadius: '8px',
    width: '100%',
    minHeight: '40px',
    marginBottom: '17px',
    padding: '14px',
    cursor: 'pointer'
  }
  const customerWrapperContentLine: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%'
  }

  const customerWrapperAvatar: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'relative',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#F7FAFC'
  }

  // ----------------------------------------------------------------
  // основная стилизация компонентов
  // ----------------------------------------------------------------

  return <React.Fragment>
    <div style={title}>
      <span style={{ marginRight: '15px', cursor: 'pointer' }} onClick={() => navigate('/customers')}>Заказчики</span>
      <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>Исполнители</span>
    </div>
    { EXECUTORS.map((executor, index: number) => {

      return <div style={customerWrapper}>
        <div style={customerWrapperContentLine}>
          <span style={customerWrapperAvatar}>
            <img
              alt={""}
              src={enotAvatar}
              style={{
                display: 'block',
                width: '66%',
                marginTop: '2px'
              }}
            />
          </span>
          <div>
            <div 
              style={{ 
                display: 'flex', 
                flexDirection: 'row', 
                alignItems: 'center', 
                marginBottom: '4px',
                marginRight: '33px' }}>
              <img
                alt={""}
                src={star}
                style={{ marginRight: '6px' }}
              />
              <span style={{ fontSize: '26px' }}>5.00</span>
            </div>
            <span>0 отзывов</span>
          </div>
          <img
            alt={""}
            src={semiMenu}
            style={{ 
              display: 'block', 
              position: 'absolute', 
              width: '22px',
              left: '100%',
              top: '0%',
              marginLeft: '-15px' 
            }}
          />
        </div>
        <div style={customerWrapperContentLine}>
          <span style={{ fontSize: '16px', marginTop: '14px', fontWeight: '700' }}>
            { executor.bio.name } 
            { executor.bio.name !== executor.bio.surname && " " + executor.bio.surname }
          </span>
        </div>
        <div style={customerWrapperContentLine}>
          <span style={{ fontSize: '13px', color: 'gray', marginTop: '3px' }}>
            Вид занятости не загружен
          </span>
        </div>
        <div style={{ ...customerWrapperContentLine, justifyContent: 'flex-start' }}>
          <img
            alt={""}
            src={location}
            style={{ marginTop: '8px' }}
          />
          <span style={{ fontSize: '13px', color: 'gray', marginTop: '8px', marginLeft: '6px' }}>
            Не определено
          </span>
        </div>
        <div style={{ ...customerWrapperContentLine, marginTop: '6px', flexWrap: 'wrap' }}>
          { executor.spec && executor.spec.map((specItem: any) => {

            if ( typeof(specItem) === 'string' ) return (
              <span 
                style={{ 
                  backgroundColor: '#F7FAFC', 
                  padding: '11px 13px 14px', 
                  borderRadius: '4px',
                  fontSize: '13px',
                  marginTop: '10px'
                }}
              >
                { specItem }
              </span>
            )
            if ( typeof(specItem) !== 'string' ) return (
              <React.Fragment>
                { specItem.length > 0 && specItem.map((specItemInner: string) => {

                  return <span 
                    style={{ 
                      backgroundColor: '#F7FAFC', 
                      padding: '11px 13px 14px', 
                      borderRadius: '4px',
                      fontSize: '13px',
                      marginTop: '10px'
                    }}
                  >
                    { specItemInner }
                  </span>

                })}
              </React.Fragment>
            )

          })}
        </div>
      </div>

    })}
    { EXECUTORS.length === 0 && Array(1).fill(null).map((executor, index: number) => {

        return <React.Fragment><div style={customerWrapper}>
          <div style={{ ...customerWrapperContentLine, filter: 'blur(2px)' }}>
            <span style={customerWrapperAvatar}>
              <img
                alt={""}
                src={enotAvatar}
                style={{
                  display: 'block',
                  width: '66%',
                  marginTop: '2px'
                }}
              />
            </span>
            <div>
              <div 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  marginBottom: '4px',
                  marginRight: '33px' }}>
                <img
                  alt={""}
                  src={star}
                  style={{ marginRight: '6px' }}
                />
                <span style={{ fontSize: '26px' }}>5.00</span>
              </div>
              <span>0 отзывов</span>
            </div>
            <img
              alt={""}
              src={semiMenu}
              style={{ 
                display: 'block', 
                position: 'absolute', 
                width: '22px',
                left: '100%',
                top: '0%',
                marginLeft: '-15px' 
              }}
            />
          </div>
          <div style={customerWrapperContentLine}>
            <span style={{ fontSize: '16px', marginTop: '14px', fontWeight: '700', filter: 'blur(2.4px)' }}>
              { "Имя или название пользователя" }
            </span>
          </div>
          <div style={customerWrapperContentLine}>
            <span style={{ fontSize: '13px', color: 'gray', marginTop: '13px', filter: 'blur(2.4px)' }}>
              Вид занятости не загружен
            </span>
          </div>
          <div style={{ ...customerWrapperContentLine, justifyContent: 'flex-start', filter: 'blur(2.4px)' }}>
            <img
              alt={""}
              src={location}
              style={{ marginTop: '8px' }}
            />
            <span style={{ fontSize: '13px', color: 'gray', marginTop: '13px', marginLeft: '6px' }}>
              Не определено
            </span>
          </div>
          <div style={{ ...customerWrapperContentLine, marginTop: '6px', flexWrap: 'wrap' }}>
            <span 
              style={{ 
                backgroundColor: '#F7FAFC', 
                padding: '11px 13px 14px', 
                borderRadius: '4px',
                fontSize: '13px',
                marginTop: '10px',
                filter: 'blur(2.4px)'
              }}
            >
              { "Название специализации" }
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            position: "relative",
            margin: "0 auto",
            marginTop: "30px"
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            height="40px" 
            viewBox="0 0 640 512"
            fill="#167cbf"
          >
            <path 
              d="M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"
            />
          </svg>
        </div>
        <span
          style={{
            display: 'block',
            fontSize: '13px',
            textAlign: 'center',
            color: 'grey',
            width: '100%',
            marginTop: '14px'
          }}
        >
          Соединение с сервером..
        </span>
      </React.Fragment>

    })}
  </React.Fragment>

}

export default Customers