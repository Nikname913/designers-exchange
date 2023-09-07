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
              <span style={{ lineHeight: '20px' }}>
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
  </React.Fragment>

}

export default ExchangeMain