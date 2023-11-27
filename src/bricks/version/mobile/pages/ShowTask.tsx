// ----------------------------------------------------------------
/* eslint-disable array-callback-return */
// ----------------------------------------------------------------
import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { useNavigate } from 'react-router-dom'
import { CSSProperties } from 'styled-components'
import { setShow, setShowType } from '../../../store/slices/fos-slice'
import { setShow as setShowRCC } from '../../../store/slices/right-content-slice'
import ButtonComponent from '../../desktop/comps/button/Button'
import EmailIcon from '@mui/icons-material/Email'

import star from '../img/star.svg'
import avatar from '../img/enot.svg'
import showHidden from '../img/showHiddenRow.svg'

const ShowTask: React.FC = () => {

  const selectTask = useAppSelector(state => state.taskContentReducer.TASKS_DATA.actualOne)
  const taskList = useAppSelector(state => state.taskContentReducer.TASKS_DATA.list)
  const USER_ROLE = useAppSelector(state => state.roleTypeReducer.activeRole)

  const blue2 = useAppSelector(state => state.theme.blue2)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [ progressShow, setProgressShow ] = useState<'short' | 'long'>('long')

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
    padding: '20px',
    paddingBottom: '22px',
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
  const progressVerticalLine: CSSProperties = {
    display: progressShow === 'long' ? 'flex' : 'none',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    width: '10px',
    height: '220px',
    marginTop: '18px',
  }

  function authLogin(): void {
    dispatch(setShow(true))
    dispatch(setShowType('authLogin'))
    dispatch(setShowRCC('undefined'))
  }

  // ----------------------------------------------------------------
  // основная стилизация компонентов
  // ----------------------------------------------------------------

  return <React.Fragment>

    <div style={title}>
      <span style={{ marginRight: '15px', cursor: 'pointer' }} onClick={() => navigate('/task-list-all')}>Ко всем заданиям</span>
    </div>
    <div style={mainWrapper}>
      <div style={customerWrapperContentLine}>
        <span style={{ color: 'gray', fontSize: '13px', margin: 0 }}>
          { taskList.filter(item => item.id === selectTask)[0].date }
        </span>
        <span style={{ color: 'gray', fontSize: '13px', margin: 0 }}>
          {"Безопасная сделка"}
        </span>
      </div>
      <div style={{ ...customerWrapperContentLine, marginTop: '10px' }}>
        <h3 style={{ margin: 0, lineHeight: '23px' }}>
          { taskList.filter(item => item.id === selectTask)[0].name }
        </h3>
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
          { taskList.filter(item => item.id === selectTask)[0].coast.value }₽
        </span>
      </div>
      <div style={{ ...customerWrapperContentLine, marginTop: '10px', justifyContent: 'flex-start' }}>
        <span
          style={{
            display: 'block',
            position: 'relative',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#FFBF1A',
            marginRight: '8px'
          }}
        />
        <span style={{ color: 'gray', fontSize: '13px', margin: 0 }}>
          {"Поиск исполнителей"}
        </span>
      </div>
      <div style={{ ...customerWrapperContentLine, flexWrap: 'wrap', marginTop: '11px' }}>
        { taskList.filter(item => item.id === selectTask)[0].tags.map(spec => {

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
        { taskList.filter(item => item.id === selectTask)[0].tags.length === 0 && <span 
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
      <div style={{ ...customerWrapperContentLine, marginTop: '20px', justifyContent: 'space-between' }}>
        <span><i style={{ fontWeight: 'bold', fontStyle: 'normal' }}>Сроки</i></span>
        <span>{ taskList.filter(item => item.id === selectTask)[0].deadline }</span>
      </div>
      <div style={customerWrapperContentLine}>
        <hr 
          style={{ 
            display: 'block', 
            position: 'relative', 
            width: '100%', 
            height: '1px', 
            backgroundColor: '#E8F0F6',
            border: 'none',
            marginTop: '13.3px',
            marginBottom: '12px',
          }}
        />
      </div>
      <div style={{ ...customerWrapperContentLine, justifyContent: 'space-between' }}>
        <span><i style={{ fontWeight: 'bold', fontStyle: 'normal' }}>Аванс</i></span>
        { taskList.filter(item => item.id === selectTask)[0].coast.prepay !== '0' 
          
          && <span>{ taskList.filter(item => item.id === selectTask)[0].coast.prepay }₽</span> 
          
        }
        { taskList.filter(item => item.id === selectTask)[0].coast.prepay === '0' 
          
          && <span>{"Нет аванса"}</span> 
          
        }
      </div>
      <div style={customerWrapperContentLine}>
        <hr 
          style={{ 
            display: 'block', 
            position: 'relative', 
            width: '100%', 
            height: '1px', 
            backgroundColor: '#E8F0F6',
            border: 'none',
            marginTop: '13.6px',
            marginBottom: '12px',
          }}
        />
      </div>
      <div style={{ ...customerWrapperContentLine, justifyContent: 'space-between' }}>
        <span><i style={{ fontWeight: 'bold', fontStyle: 'normal' }}>Экспертиза</i></span>
        <span>{ taskList.filter(item => item.id === selectTask)[0].exper }</span>
      </div>
      <ButtonComponent
        inner={"Откликнуться"} 
        type={"CONTAINED_DEFAULT"}
        action={() => {
          if ( USER_ROLE === 'UNDEFINED' ) {
            authLogin()
          }
        }}
        actionData={null}
        widthType={"%"}
        widthValue={100}
        children={""}
        childrenCss={{}}
        iconSrc={null}
        iconCss={undefined}
        muiIconSize={null}
        MuiIconChildren={EmailIcon}
        css={{
          backgroundColor: blue2,
          fontSize: '12px',
          height: '40px',
          borderRadius: '6px',
          position: 'relative',
          boxSizing: 'border-box',
          marginBottom: '0px',
          marginTop: '22px',
        }}
      />
      <span style={{ textAlign: 'center', width: '100%', display: 'block', marginTop: '16px', marginBottom: '16px' }}>
        Откликнулось { taskList.filter(item => item.id === selectTask)[0].responds.length } пользователей
      </span>
    </div>
    <div style={mainWrapper}>
      <div style={customerWrapperContentLine}>
        <span style={{ fontWeight: 'bold' }}>Заказчик</span>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <img
            alt={""}
            src={star}
          />
          <span style={{ fontSize: '18px', marginLeft: '5px' }}>{"5.00"}</span>
        </div>
      </div>
      <div style={{ ...customerWrapperContentLine, justifyContent: 'flex-start' }}>
        <span
          style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            width: '50px', 
            height: '50px',
            overflow: 'hidden',
            marginTop: '10px',
            marginBottom: '5px',
          }}
        >
          <img
            alt={""}
            src={avatar}
            style={{ width: '50px' }}
          />
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '14px' }}>
          <span style={{ display: 'block', color: '#167CBF', fontSize: '15px' }}>{ taskList.filter(item => item.id === selectTask)[0].customer.slice(0, 16) }...</span>
          <span style={{ display: 'block', fontSize: '13px', color: 'gray', marginTop: '3px' }}>{ taskList.filter(item => item.id === selectTask)[0].customer.slice(0, 16) }...</span>
        </div>
      </div>
    </div>
    <div style={mainWrapper}>
      <div style={customerWrapperContentLine}>
        <span style={{ fontWeight: 'bold' }}>Данные об объекте</span>
      </div>
      <div style={customerWrapperContentLine}>
        <span style={{ color: 'gray', marginBottom: '4px', marginTop: '10px' }}>Вид</span>
      </div>
      <div style={customerWrapperContentLine}>
        <span>{ taskList.filter(item => item.id === selectTask)[0].objectData?.constructionType }</span>
      </div>
      <div style={customerWrapperContentLine}>
        <span style={{ color: 'gray', marginBottom: '4px', marginTop: '10px' }}>Регион</span>
      </div>
      <div style={customerWrapperContentLine}>
        <span>{ taskList.filter(item => item.id === selectTask)[0].objectData?.region }</span>
      </div>
      <div style={customerWrapperContentLine}>
        <span style={{ color: 'gray', marginBottom: '4px', marginTop: '10px' }}>Тип</span>
      </div>
      <div style={customerWrapperContentLine}>
        <span>{ taskList.filter(item => item.id === selectTask)[0].objectData?.type }</span>
      </div>
      <div style={customerWrapperContentLine}>
        <span style={{ color: 'gray', marginBottom: '4px', marginTop: '10px' }}>Назначение</span>
      </div>
      <div style={customerWrapperContentLine}>
        <span>{ taskList.filter(item => item.id === selectTask)[0].objectData?.spec }</span>
      </div>
      <div style={customerWrapperContentLine}>
        <span style={{ color: 'gray', marginBottom: '4px', marginTop: '10px' }}>Площадь</span>
      </div>
      <div style={customerWrapperContentLine}>
        <span>{ taskList.filter(item => item.id === selectTask)[0].objectParams?.square } кв.м</span>
      </div>
    </div>
    <div style={mainWrapper}>
      <div style={customerWrapperContentLine}>
        <span style={{ fontWeight: 'bold' }}>Описание задания</span>
      </div>
      <div style={customerWrapperContentLine}>
        <span style={{ marginTop: '10px', lineHeight: '22px' }}>{ taskList.filter(item => item.id === selectTask)[0].description }</span>
      </div>
    </div>
    <div style={mainWrapper}>
      <div style={customerWrapperContentLine}>
        <span style={{ fontWeight: 'bold' }}>Прогресс выполнения</span>
      </div>
      <img
        alt={""}
        src={showHidden}
        style={{
          display: 'block',
          position: 'absolute',
          left: '100%',
          marginLeft: '-33px',
          top: '0%',
          marginTop: '22px',
          width: '12px',
          cursor: 'pointer',
          transform: progressShow === 'long' ? 'rotate(0deg)' : 'rotate(180deg)',
        }}
        onClick={() => {
          setProgressShow((prev: 'short' | 'long'): 'short' | 'long' => {
            if ( prev === 'long' ) return 'short'
            if ( prev === 'short' ) return 'long'

            return 'long'
          })
        }}
      />

      <div>
        <div style={progressVerticalLine}>
          <span
            style={{
              display: 'block',
              position: 'absolute',
              boxSizing: 'border-box',
              width: '3px',
              height: '100%',
              backgroundColor: '#D9D9D9',
              borderRadius: '2px'
            }}
          />

          <span
            style={{
              display: 'block',
              position: 'relative',
              boxSizing: 'border-box',
              width: '18px',
              height: '18px',
              borderRadius: '9px',
              backgroundColor: '#167CBF',
              border: '3px solid white'
            }}
          >
            <span 
              style={{ 
                width: '200px',
                display: 'block',
                position: 'absolute',
                marginLeft: '25px',
                marginTop: '-2px'
              }}
            >
              Начало заказа
            </span>
          </span>
          <span
            style={{
              display: 'block',
              position: 'relative',
              boxSizing: 'border-box',
              width: '18px',
              height: '18px',
              borderRadius: '9px',
              backgroundColor: '#D9D9D9',
              border: '3px solid white'
            }}
          >
            <span 
              style={{ 
                width: '200px',
                display: 'block',
                position: 'absolute',
                marginLeft: '25px',
                marginTop: '-2px'
              }}
            >
              Предварительное решение
            </span>
          </span>
          <span
            style={{
              display: 'block',
              position: 'relative',
              boxSizing: 'border-box',
              width: '18px',
              height: '18px',
              borderRadius: '9px',
              backgroundColor: '#D9D9D9',
              border: '3px solid white'
            }}
          >
            <span 
              style={{ 
                width: '200px',
                display: 'block',
                position: 'absolute',
                marginLeft: '25px',
                marginTop: '-2px'
              }}
            >
              Все разделы задания
            </span>
          </span>
          <span
            style={{
              display: 'block',
              position: 'relative',
              boxSizing: 'border-box',
              width: '18px',
              height: '18px',
              borderRadius: '9px',
              backgroundColor: '#D9D9D9',
              border: '3px solid white'
            }}
          >
            <span 
              style={{ 
                width: '200px',
                display: 'block',
                position: 'absolute',
                marginLeft: '25px',
                marginTop: '-2px'
              }}
            >
              Экспертиза ( при наличии )
            </span>
          </span>
          <span
            style={{
              display: 'block',
              position: 'relative',
              boxSizing: 'border-box',
              width: '18px',
              height: '18px',
              borderRadius: '9px',
              backgroundColor: '#D9D9D9',
              border: '3px solid white'
            }}
          >
            <span 
              style={{ 
                width: '200px',
                display: 'block',
                position: 'absolute',
                marginLeft: '25px',
                marginTop: '-2px'
              }}
            >
              Заказ принят
            </span>
          </span>
        </div>
      </div>

    </div>
    <div style={mainWrapper}>
      <div style={customerWrapperContentLine}>
        <span style={{ fontWeight: 'bold' }}>
          Вложения <i style={{ opacity: 0.4, fontStyle: 'normal', marginLeft: '0px' }}> * ограничено</i>
        </span>
      </div>
    </div>
    <div style={mainWrapper}>
      <div style={customerWrapperContentLine}>
        <span style={{ fontWeight: 'bold' }}>
          Основное техзадание <i style={{ opacity: 0.4, fontStyle: 'normal', marginLeft: '0px' }}> * ограничено</i>
        </span>
      </div>
    </div>
  </React.Fragment>

}

export default ShowTask