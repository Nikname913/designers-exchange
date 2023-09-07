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

  const CUSTOMERS = useAppSelector(state => state.userContentReducer.USERS_DATA.listCustomers)

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
    padding: '14px'
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
      <span style={{ marginRight: '15px', fontWeight: 'bold', cursor: 'pointer' }}>Заказчики</span>
      <span style={{ cursor: 'pointer' }} onClick={() => navigate('/executors')}>Исполнители</span>
    </div>
    { CUSTOMERS.map((customer, index: number) => {

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
          <span style={{ fontSize: '16px', marginTop: '14px', fontWeight: 'normal' }}>
            { customer.bio.name } 
            { customer.bio.name !== customer.bio.surname && customer.bio.surname }
          </span>
        </div>
        <div style={customerWrapperContentLine}>
          <span style={{ fontSize: '13px', color: 'gray', marginTop: '3px' }}>
            { customer.bio.name } 
            { customer.bio.name !== customer.bio.surname && customer.bio.surname }
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
        <div style={{ ...customerWrapperContentLine, marginTop: '16px', flexWrap: 'wrap' }}>
          { customer.spec && customer.spec.map((specItem: any) => {

            if ( typeof(specItem) === 'string' ) return (
              <span 
                style={{ 
                  backgroundColor: '#F7FAFC', 
                  padding: '11px 13px 14px', 
                  borderRadius: '4px',
                  fontSize: '13px' 
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
                      fontSize: '13px'
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
  </React.Fragment>

}

export default Customers