// ----------------------------------------------------------------
/* eslint-disable react-hooks/exhaustive-deps */
// ----------------------------------------------------------------
/* eslint-disable array-callback-return */
// ----------------------------------------------------------------
import React, { useContext, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { selectActualTask } from '../../../store/slices/task-content-slice'
import { useNavigate } from 'react-router-dom'
import { CSSProperties } from 'styled-components'
import { MenuActive } from '../Context'

import calendar from '../img/calendar.svg'
import file from '../img/file.svg'

const ExchangeMain: React.FC = () => {

  const [ ,setSelectMenu ] = useContext(MenuActive)
  const TASKS = useAppSelector(state => state.taskContentReducer.TASKS_DATA.list)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

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

  const mainWrapper: CSSProperties = {
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

  useEffect(() => {

    setSelectMenu(1)

  }, [])

  // ----------------------------------------------------------------
  // основная стилизация компонентов
  // ----------------------------------------------------------------

  return <React.Fragment>

    <div style={title}>
      <span style={{ marginRight: '15px', cursor: 'pointer' }}>Задания на бирже - { TASKS.length }</span>
    </div>

    { TASKS.map(taskItem => {

      return (
        <React.Fragment>
          <div 
            style={mainWrapper} 
            onClick={() => { 
              setSelectMenu(0)
              dispatch(selectActualTask(taskItem.id))
              navigate('/task-review') 
            }}
          >
            <div style={customerWrapperContentLine}>
              <span style={{ color: 'gray', fontSize: '13px', margin: 0 }}>{ taskItem.date }</span>
            </div>
            <div style={{ ...customerWrapperContentLine, marginTop: '10px' }}>
              <h3 style={{ margin: 0, lineHeight: '23px' }}>{ taskItem.name }</h3>
            </div>
            <div style={{ ...customerWrapperContentLine, marginTop: '9px' }}>
              <span 
                style={{ 
                  margin: 0, 
                  color: '#167CBF', 
                  fontSize: '18px', 
                  letterSpacing: '1px', 
                  fontWeight: 'bold' 
                }}
              >
                { taskItem.coast.value }₽
              </span>
            </div>
            <div style={{ ...customerWrapperContentLine, marginTop: '8px' }}>
              <span style={{ lineHeight: '22px' }}>
                { taskItem.description }
              </span>
            </div>
            <div style={{ ...customerWrapperContentLine, justifyContent: 'flex-start', marginTop: '11px' }}>
              <img
                alt={""}
                src={calendar}
              />
              <span style={{ fontSize: '13px', marginLeft: '7px', color: 'gray' }}>{ taskItem.deadline }</span>
            </div>
            <div style={{ ...customerWrapperContentLine, justifyContent: 'flex-start', marginTop: '6px' }}>
              <img
                alt={""}
                src={file}
              />
              <span style={{ fontSize: '13px', marginLeft: '7px', color: 'gray' }}>{ taskItem.exper }</span>
            </div>
            <div style={{ ...customerWrapperContentLine, flexWrap: 'wrap', marginTop: '12px' }}>
              { taskItem.tags.map(spec => {

                return (
                  <span 
                    style={{ 
                      backgroundColor: '#F7FAFC', 
                      padding: '11px 13px 14px', 
                      borderRadius: '4px',
                      fontSize: '13px',
                      marginTop: '8px'
                    }}
                  >
                    { spec }
                  </span>
                )

              })}
              { taskItem.tags.length === 0 && <span 
                style={{ 
                  backgroundColor: '#F7FAFC', 
                  padding: '11px 13px 14px', 
                  borderRadius: '4px',
                  fontSize: '13px',
                  marginTop: '8px'
                }}
              >
                {"Все специализации"}
              </span> }
            </div>
          </div>
        </React.Fragment>
      )

    })}
    { TASKS.length === 0 && [ null ].map(taskItem => {

      return (
        <React.Fragment>
          <div 
            style={mainWrapper} 
            onClick={() => {}}
          >
            <div style={customerWrapperContentLine}>
              <span style={{ color: 'gray', fontSize: '13px', margin: 0, filter: 'blur(2.4px)' }}>{ "01.11.2023 - 01.11.2023" }</span>
            </div>
            <div style={{ ...customerWrapperContentLine, marginTop: '10px', filter: 'blur(2.4px)' }}>
              <h3 style={{ margin: 0, lineHeight: '23px' }}>{ "Название задания" }</h3>
            </div>
            <div style={{ ...customerWrapperContentLine, marginTop: '9px', filter: 'blur(2px)' }}>
              <span 
                style={{ 
                  margin: 0, 
                  color: '#167CBF', 
                  fontSize: '18px', 
                  letterSpacing: '1px', 
                  fontWeight: 'bold' 
                }}
              >
                { "100 000" }₽
              </span>
            </div>
            <div style={{ ...customerWrapperContentLine, marginTop: '8px', filter: 'blur(2.4px)' }}>
              <span style={{ lineHeight: '22px' }}>
                { "Описание выбранного задания" }
              </span>
            </div>
            <div style={{ ...customerWrapperContentLine, justifyContent: 'flex-start', marginTop: '11px', filter: 'blur(2.4px)' }}>
              <img
                alt={""}
                src={calendar}
              />
              <span style={{ fontSize: '13px', marginLeft: '7px', color: 'gray' }}>{ "01.11.2023" }</span>
            </div>
            <div style={{ ...customerWrapperContentLine, justifyContent: 'flex-start', marginTop: '6px', filter: 'blur(2.4px)' }}>
              <img
                alt={""}
                src={file}
              />
              <span style={{ fontSize: '13px', marginLeft: '7px', color: 'gray' }}>{ "01.11.2023" }</span>
            </div>
            <div style={{ ...customerWrapperContentLine, flexWrap: 'wrap', marginTop: '12px' }}>
              { true && <span 
                style={{ 
                  backgroundColor: '#F7FAFC', 
                  padding: '11px 13px 14px', 
                  borderRadius: '4px',
                  fontSize: '13px',
                  marginTop: '8px',
                  filter: 'blur(3px)'
                }}
              >
                {"Все специализации"}
              </span> }
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
      )

    })}
  </React.Fragment>

}

export default ExchangeMain