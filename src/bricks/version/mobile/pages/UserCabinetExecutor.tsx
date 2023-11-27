import React, { useEffect, useContext, useState } from 'react'
import { useAppSelector } from '../../../store/hooks'
import { CSSProperties } from 'styled-components'
import { ShowRM } from '../Context'
import InputComponent from '../../desktop/comps/input/Input'
import ButtonComponent from '../../desktop/comps/button/Button'
import RequestActionsComponent from '../../desktop/services/request.service'
import SelectField from '../../desktop/comps/select/SelectFieldPercentWidth'

import enotAvatar from '../img/enot.svg'
import semiMenu from '../img/semiMenu.svg'
import star from '../img/star.svg'
import correct from '../../../img/icons/correctBlue.svg'
import plus from '../../../img/icons/plus.svg'

import bearAvatar from '../../../img/avatars/bear.svg'
import foxAvatar from '../../../img/avatars/fox.svg'
import groupAvatar from '../../../img/avatars/group.svg'
import manAvatar from '../../../img/avatars/man.svg'
import womanAvatar from '../../../img/avatars/woman.svg'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

const UserCabinetExecutor: React.FC = () => {

  const [ spec, setSpec ] = useState<string>('')
  const [ SPEC_REQUEST, SET_SPEC_REQUEST ] = useState(false)
  const [ ABOUT_TEXT_REQUEST, SET_ABOUT_TEXT_REQUEST ] = useState(false)

  const USER_ROLE = useAppSelector(state => state.roleTypeReducer.activeRole)
  const USER_ID = useAppSelector(state => state.roleTypeReducer.roleData.userID)
  const avatarFile = useAppSelector(state => state.avatarReducer.avatarFile)

  const EXECUTOR = useAppSelector(state => state.userContentReducer.USERS_DATA.listExecutors)
    .filter((executor: any) => executor.clientId === USER_ID)
  const CUSTOMER = useAppSelector(state => state.userContentReducer.USERS_DATA.listCustomers)
    .filter((customer: any) => customer.clientId === USER_ID)
  const ABOUT_TEXT = useAppSelector(state => state.aboutTextReducer.aboutText)

  const [ ,setShowRM ] = useContext(ShowRM)  

  function changeAboutText(): void {
    SET_ABOUT_TEXT_REQUEST(true)
    setTimeout(() => { SET_ABOUT_TEXT_REQUEST(false) }, 1300)
  }

  function editEducationCases(): void {
    // ----------------------------------------------------------------
    // dispatch(setShow(true))
    // dispatch(setShowType('EditEducationCC'))
    // ----------------------------------------------------------------
  }

  useEffect(() => {

    console.log(USER_ROLE)
    console.log(CUSTOMER)
    console.log(EXECUTOR)

  }, [ CUSTOMER, EXECUTOR, USER_ROLE ])

  useEffect(() => {

    if ( spec ) {

      SET_SPEC_REQUEST(true)
      setTimeout(() => { SET_SPEC_REQUEST(false) }, 1300)

    }

  }, [ spec ])

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
  const customerWrapperAvatar: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'relative',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#F7FAFC',
    overflow: 'hidden',
  }
  const customerWrapperAvatarLarge: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'relative',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#F7FAFC',
    overflow: 'hidden',
  }
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
  const avatarStyle: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '33px',
    height: '33px',
    cursor: 'pointer',
    marginTop: '3px'
  }

  return <React.Fragment>

    { SPEC_REQUEST && <RequestActionsComponent

      callbackAction={() => {}}
      requestData={{
        type: 'POST',
        urlstring: '/change-user-spec',
        body: {
          clientId: USER_ID,
          spec: spec,
        }
      }}
    
    /> }

    { ( ABOUT_TEXT_REQUEST && ABOUT_TEXT !== '' ) && <RequestActionsComponent

      callbackAction={() => {}}
      requestData={{
        type: 'POST',
        urlstring: '/change-user-about',
        body: {
          clientId: USER_ID,
          text: ABOUT_TEXT,
        }
      }}
    
    /> }

    <h3 
      style={{ 
        marginTop: '18px', 
        marginBottom: '22px',
        lineHeight: '23px', 
      }}
    >
      Кабинет исполнителя
    </h3>
    <div style={mainWrapper}>
      <div style={{ ...customerWrapperContentLine, justifyContent: 'flex-start' }}>
        <span style={customerWrapperAvatar}>
          { avatarFile === 404 && <React.Fragment>
            { USER_ROLE === 'EXECUTOR' && EXECUTOR.length > 0 && <img
              alt={""}
              src={
                EXECUTOR[0].avatar === '1' ? bearAvatar :
                EXECUTOR[0].avatar === '2' ? enotAvatar :
                EXECUTOR[0].avatar === '3' ? foxAvatar :
                EXECUTOR[0].avatar === '4' ? groupAvatar :
                EXECUTOR[0].avatar === '5' ? manAvatar :
                EXECUTOR[0].avatar === '6' ? womanAvatar : bearAvatar
              }
              style={
                EXECUTOR[0].avatar === '1' ? { ...avatarStyle } :
                EXECUTOR[0].avatar === '2' ? { ...avatarStyle } :
                EXECUTOR[0].avatar === '3' ? { ...avatarStyle } :
                EXECUTOR[0].avatar === '4' ? {
                  display: 'block',
                  position: 'relative',
                  width: '43px',
                  height: '43px',
                  cursor: 'pointer',
                  marginTop: '15px'
                } :
                EXECUTOR[0].avatar === '5' ? { 
                  display: 'block',
                  position: 'relative',
                  width: '43px',
                  height: '43px',
                  cursor: 'pointer',
                  marginTop: '10px'
                } :
                EXECUTOR[0].avatar === '6' ? { 
                  display: 'block',
                  position: 'relative',
                  width: '43px',
                  height: '43px',
                  cursor: 'pointer',
                  marginTop: '10px'
                } : { ...avatarStyle }
              }
            /> }
            { USER_ROLE === 'CUSTOMER' && CUSTOMER.length > 0 && <img
              alt={""}
              src={
                CUSTOMER[0].avatar === '1' ? bearAvatar :
                CUSTOMER[0].avatar === '2' ? enotAvatar :
                CUSTOMER[0].avatar === '3' ? foxAvatar :
                CUSTOMER[0].avatar === '4' ? groupAvatar :
                CUSTOMER[0].avatar === '5' ? manAvatar :
                CUSTOMER[0].avatar === '6' ? womanAvatar : bearAvatar
              }
              style={
                CUSTOMER[0].avatar === '1' ? { ...avatarStyle } :
                CUSTOMER[0].avatar === '2' ? { ...avatarStyle } :
                CUSTOMER[0].avatar === '3' ? { ...avatarStyle } :
                CUSTOMER[0].avatar === '4' ? {
                  display: 'block',
                  position: 'relative',
                  width: '43px',
                  height: '43px',
                  cursor: 'pointer',
                  marginTop: '15px'
                } :
                CUSTOMER[0].avatar === '5' ? { 
                  display: 'block',
                  position: 'relative',
                  width: '43px',
                  height: '43px',
                  cursor: 'pointer',
                  marginTop: '10px'
                } :
                CUSTOMER[0].avatar === '6' ? { 
                  display: 'block',
                  position: 'relative',
                  width: '43px',
                  height: '43px',
                  cursor: 'pointer',
                  marginTop: '10px'
                } : { ...avatarStyle }
              }
            /> }
          </React.Fragment> }
          { avatarFile === 200 && <img
              alt={""}
              src={`http://localhost:3000/techDocs/${USER_ID}.avatar.jpg`} 
              style={{ height: '100%', cursor: 'pointer' }}
            /> 
          }
        </span>
        { USER_ROLE === 'EXECUTOR' 
        
          && <h3 style={{ marginLeft: '14px' }}>{ EXECUTOR[0].bio.name !== EXECUTOR[0].bio.surname 
            
            ? EXECUTOR[0].bio.name + ' ' + EXECUTOR[0].bio.surname
            : EXECUTOR[0].bio.name }</h3> 
          
        }
        <img
          alt={""}
          src={semiMenu}
          style={{
            display: 'block',
            position: 'absolute',
            width: '22px',
            left: '100%',
            marginLeft: '-15px',
            top: '0',
          }}
        />
      </div>
      <div style={{ ...customerWrapperContentLine, marginTop: '12px', marginBottom: '12px' }}>
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
      </div>
      <div style={customerWrapperContentLine}>
        <span style={{ color: 'gray' }}>Вид занятости не загружен</span>
      </div>
      <div style={customerWrapperContentLine}>
        <span style={{ color: 'gray', fontSize: '13px', marginTop: '4px' }}>На бирже с 2023 года</span>
      </div>
      <div style={{ ...customerWrapperContentLine, marginTop: '13px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span>0</span>
          <span style={{ color: 'gray', fontSize: '13px', marginTop: '3px' }}>выполнено</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span>0</span>
          <span style={{ color: 'gray', fontSize: '13px', marginTop: '3px' }}>активные</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span>0</span>
          <span style={{ color: 'gray', fontSize: '13px', marginTop: '3px' }}>провалено</span>
        </div>
      </div>
    </div>
    <div style={mainWrapper}>
      <div style={{ ...customerWrapperContentLine, justifyContent: 'flex-start' }}>

        <React.Fragment>
          { EXECUTOR[0].spec && EXECUTOR[0].spec?.map((tag: any, index: number): any => {

            return (
              <span 
                style={{
                  backgroundColor: 'rgb(247, 250, 252)',
                  padding: '11px 13px 14px',
                  borderRadius: '4px',
                  fontSize: '13px',
                  marginTop: '8px',
                }}
              >
                { tag }
              </span>
            )

          }) }
        </React.Fragment>

        <img
          alt={""}
          src={semiMenu}
          style={{
            display: 'block',
            position: 'absolute',
            width: '22px',
            left: '100%',
            marginLeft: '-15px',
            top: '0',
          }}
        />
      </div>
      <div style={{ ...customerWrapperContentLine, justifyContent: 'flex-start' }}>
        <h3 style={{ margin: '18.5px 0px 12px' }}>Расскажите о себе</h3>
      </div>
      <div style={{ ...customerWrapperContentLine, justifyContent: 'flex-start' }}>
        <span style={{ lineHeight: '20px' }}>{ EXECUTOR[0].aboutText }</span>
      </div>
    </div>
    <div style={mainWrapper}>
      <div style={{ ...customerWrapperContentLine, justifyContent: 'flex-start' }}>
        <h3 style={{ margin: '6px 0px 16.5px' }}>Мнения пользователей о вас</h3>
      </div>
      <span
        style={{
          display: 'block',
          position: 'relative',
          width: '100%',
          height: '44px',
          borderRadius: '4px',
          backgroundColor: 'rgb(247, 250, 252)',
          marginTop: '6px'
        }}
      />
      <span
        style={{
          display: 'block',
          position: 'relative',
          width: '100%',
          height: '200px',
          borderRadius: '4px',
          backgroundColor: 'rgb(247, 250, 252)',
          marginTop: '14px'
        }}
      />
      <span
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          position: 'absolute',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'rgb(22, 124, 191)',
          top: '100%',
          left: '100%',
          marginLeft: '-66px',
          marginTop: '-66px',
          boxShadow: 'rgba(163, 163, 163, 0.02) 10px 18px 8px, rgba(163, 163, 163, 0.07) 6px 10px 7px, rgba(163, 163, 163, 0.11) 2px 4px 5px, rgba(163, 163, 163, 0.13) 1px 1px 3px, rgba(163, 163, 163, 0.13) 0px 0px 0px',
          cursor: 'pointer'
        }}
        onClick={() => {
          setShowRM({
            show: true,
            type: 'cabinet'
          })
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          height="24px" 
          viewBox="0 0 448 512"
          style={{ fill: 'white' }}
        >
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
        </svg>
      </span>
    </div>
    <span
      style={{
        display: 'block',
        position: 'relative',
        width: '100%',
        height: '2px',
        backgroundColor: 'gray',
        borderRadius: '2px',
        opacity: '0.2',
        marginTop: '30px',
        marginBottom: '20.5px',
      }}
    />
    <div style={title}>
      <span style={{ marginRight: '15px', cursor: 'pointer' }} onClick={() => {}}>Вернуться назад</span>
    </div>
    <span style={customerWrapperAvatarLarge}>
      { avatarFile === 404 && <React.Fragment>
        { USER_ROLE === 'EXECUTOR' && EXECUTOR.length > 0 && <img
          alt={""}
          src={
            EXECUTOR[0].avatar === '1' ? bearAvatar :
            EXECUTOR[0].avatar === '2' ? enotAvatar :
            EXECUTOR[0].avatar === '3' ? foxAvatar :
            EXECUTOR[0].avatar === '4' ? groupAvatar :
            EXECUTOR[0].avatar === '5' ? manAvatar :
            EXECUTOR[0].avatar === '6' ? womanAvatar : bearAvatar
          }
          style={
            EXECUTOR[0].avatar === '1' ? { ...avatarStyle } :
            EXECUTOR[0].avatar === '2' ? { ...avatarStyle } :
            EXECUTOR[0].avatar === '3' ? { ...avatarStyle } :
            EXECUTOR[0].avatar === '4' ? {
              display: 'block',
              position: 'relative',
              width: '43px',
              height: '43px',
              cursor: 'pointer',
              marginTop: '15px'
            } :
            EXECUTOR[0].avatar === '5' ? { 
              display: 'block',
              position: 'relative',
              width: '43px',
              height: '43px',
              cursor: 'pointer',
              marginTop: '10px'
            } :
            EXECUTOR[0].avatar === '6' ? { 
              display: 'block',
              position: 'relative',
              width: '43px',
              height: '43px',
              cursor: 'pointer',
              marginTop: '10px'
            } : { ...avatarStyle }
          }
        /> }
        { USER_ROLE === 'CUSTOMER' && CUSTOMER.length > 0 && <img
          alt={""}
          src={
            CUSTOMER[0].avatar === '1' ? bearAvatar :
            CUSTOMER[0].avatar === '2' ? enotAvatar :
            CUSTOMER[0].avatar === '3' ? foxAvatar :
            CUSTOMER[0].avatar === '4' ? groupAvatar :
            CUSTOMER[0].avatar === '5' ? manAvatar :
            CUSTOMER[0].avatar === '6' ? womanAvatar : bearAvatar
          }
          style={
            CUSTOMER[0].avatar === '1' ? { ...avatarStyle } :
            CUSTOMER[0].avatar === '2' ? { ...avatarStyle } :
            CUSTOMER[0].avatar === '3' ? { ...avatarStyle } :
            CUSTOMER[0].avatar === '4' ? {
              display: 'block',
              position: 'relative',
              width: '43px',
              height: '43px',
              cursor: 'pointer',
              marginTop: '15px'
            } :
            CUSTOMER[0].avatar === '5' ? { 
              display: 'block',
              position: 'relative',
              width: '43px',
              height: '43px',
              cursor: 'pointer',
              marginTop: '10px'
            } :
            CUSTOMER[0].avatar === '6' ? { 
              display: 'block',
              position: 'relative',
              width: '43px',
              height: '43px',
              cursor: 'pointer',
              marginTop: '10px'
            } : { ...avatarStyle }
          }
        /> }
      </React.Fragment> }
      { avatarFile === 200 && <img
          alt={""}
          src={`http://localhost:3000/techDocs/${USER_ID}.avatar.jpg`} 
          style={{ height: '100%', cursor: 'pointer' }}
        /> 
      }
    </span>
    <span
      style={{
        display: 'block',
        position: 'relative',
        color: '#167CBF',
        marginLeft: '10px',
        marginTop: '12px',
        cursor: 'pointer'
      }}
    >
      Сменить
    </span>
    <div style={title}>
      <span style={{ marginRight: '15px', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => {}}>Вид занятости пользователя</span>
    </div>
    <div style={customerWrapperContentLine}>
      { EXECUTOR.length > 0 && 
        ( EXECUTOR[0].faceType === 'SELF_FACE' || EXECUTOR[0].faceType === 'PHIS_FACE' ) && 

          <React.Fragment>
            <InputComponent
              type={'TEXT_INPUT_OUTLINE'}
              valueType='text'
              required={false}
              widthType={'%'}
              widthValue={100}
              heightValue={'50px'}
              label={"Фамилия"}
              isError={false}
              isDisabled={false}
              labelShrinkLeft={"0px"}
              innerLabel={null}
              store={[ 
                EXECUTOR.length > 0     ?
                EXECUTOR[0].bio.surname : 
                CUSTOMER.length > 0     ?
                CUSTOMER[0].bio.surname : '', () => null ]}
              css={{
                fontSize: '12px',
                position: 'relative',
                boxSizing: 'border-box',
                marginBottom: '0px',
                marginTop: '0px',
                backgroundColor: 'white',
                marginRight: '0px'
              }}
            />
            <InputComponent
              type={'TEXT_INPUT_OUTLINE'}
              valueType='text'
              required={false}
              widthType={'%'}
              widthValue={100}
              heightValue={'50px'}
              label={"Имя"}
              isError={false}
              isDisabled={false}
              labelShrinkLeft={"0px"}
              innerLabel={null}
              store={[ 
                EXECUTOR.length > 0     ?
                EXECUTOR[0].bio.name : 
                CUSTOMER.length > 0     ?
                CUSTOMER[0].bio.name : '', () => null ]}
              css={{
                fontSize: '12px',
                position: 'relative',
                boxSizing: 'border-box',
                marginBottom: '0px',
                marginTop: '0px',
                backgroundColor: 'white',
                marginRight: '0px'
              }}
            />
            <InputComponent
              type={'TEXT_INPUT_OUTLINE'}
              valueType='text'
              required={false}
              widthType={'%'}
              widthValue={100}
              heightValue={'50px'}
              label={"Отчество"}
              isError={false}
              isDisabled={false}
              labelShrinkLeft={"0px"}
              innerLabel={null}
              store={[ 
                EXECUTOR.length > 0     ?
                EXECUTOR[0].bio.secondName : '', () => null ]}
              css={{
                fontSize: '12px',
                position: 'relative',
                boxSizing: 'border-box',
                marginBottom: '0px',
                marginTop: '0px',
                backgroundColor: 'white'
              }}
            />
          </React.Fragment> }
      { EXECUTOR.length > 0 && 
        ( EXECUTOR[0].faceType !== 'SELF_FACE' && EXECUTOR[0].faceType !== 'PHIS_FACE' ) && 

          <React.Fragment>
            <InputComponent
              type={'TEXT_INPUT_OUTLINE'}
              valueType='text'
              required={false}
              widthType={'%'}
              widthValue={100}
              heightValue={'50px'}
              label={"Название организации или ИП"}
              isError={false}
              isDisabled={false}
              labelShrinkLeft={"0px"}
              innerLabel={null}
              store={[ 
                EXECUTOR.length > 0     ?
                EXECUTOR[0].bio.name : 
                CUSTOMER.length > 0     ?
                CUSTOMER[0].bio.name : '', () => null ]}
              css={{
                fontSize: '12px',
                position: 'relative',
                boxSizing: 'border-box',
                marginBottom: '0px',
                marginTop: '0px',
                backgroundColor: 'white',
              }}
            />
          </React.Fragment> }
    </div>
    <span
      style={{
        display: 'block',
        position: 'relative',
        width: '100%',
        height: '2px',
        borderRadius: '2px',
        backgroundColor: '#D9E7F0',
        marginTop: '31px',
        marginBottom: '22px',
      }}
    />
    <div style={title}>
      <span style={{ marginRight: '15px', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => {}}>Специализация пользователя</span>
    </div>
    <div style={{ paddingLeft: '1px', marginBottom: '20px' }}>
      <SelectField 
        placeholder={"Ваша специализация"}
        params={{ width: 100, mb: '0px', height: 50 }}
        data={[
          { value: 'Инженерно-геодезические изыскания', label: 'Геодезические изыскания' },
          { value: 'Инженерно-геологические изыскания', label: 'Геологические изыскания' },
          { value: 'Инженерно-гидрометеорологические изыскания', label: 'Гидрометеорология' },
          { value: 'Инженерно-экологические изыскания', label: 'Экологические изыскания' },
          { value: 'Историко-культурные изыскания', label: 'Исторические изыскания' },
          { value: 'Обследование строительных конструкций', label: 'Обследование конструкций' },
          { value: 'Генеральный план', label: 'Генеральный план' },
          { value: 'Автомобильные дороги', label: 'Автомобильные дороги' },
          { value: 'Архитектурные решения', label: 'Архитектурные решения' },
          { value: 'Конструкции железобетонные', label: 'Конструкции железобетонные' },
          { value: 'Конструкции металлические', label: 'Конструкции металлические' },
          { value: 'Гидротехнические решения ', label: 'Гидротехнические решения' },
          { value: 'Электроснабжение', label: 'Электроснабжение' },
          { value: 'Электрическое освещение', label: 'Электрическое освещение' },
          { value: 'Силовое электрооборудование', label: 'Силовое электрооборудование' },
          { value: 'Водоснабжение и канализация', label: 'Водоснабжение и канализация' },
          { value: 'Отопление, вентиляция, кондиционирование', label: 'Отопление и вентиляция' },
          { value: 'Воздухоснабжение', label: 'Воздухоснабжение' },
          { value: 'Холодоснабжение', label: 'Холодоснабжение' },
          { value: 'Тепломеханические решения', label: 'Тепломеханические решения' },
          { value: 'Сети связи', label: 'Сети связи' },
          { value: 'Пожарная безопасность', label: 'Пожарная безопасность' },
          { value: 'Газоснабжение', label: 'Газоснабжение' },
          { value: 'Технология производства', label: 'Технология производства' },
          { value: 'Автоматизация', label: 'Автоматизация' },
          { value: 'Проект организации строительства / сносу / демонтажу', label: 'Проект строительства и сноса' },
          { value: 'Охрана окружающей среды', label: 'Охрана окружающей среды' },
          { value: 'Безопасная эксплуатация объекта', label: 'Безопасная эксплуатация объекта' },
          { value: 'Энергетическая эффективность', label: 'Энергетическая эффективность' },
          { value: 'Обеспечение доступа инвалидов', label: 'Обеспечение доступа инвалидов' },
          { value: 'Мероприятия по гражданской обороне и предупреждению чрезвычайных ситуаций', label: 'Гражданская оборона' },
          { value: 'Сметная документация', label: 'Сметная документация' },
          { value: 'Иная документация', label: 'Иная документация' }
        ]}
        multy={false}
        action={setSpec}
        actionType={"AUTH_SPEC_TYPE"}
        actionParams={[]}
        showIcon={true}
        icon={null}
        iconStyles={{
          marginTop: '-12px',
          marginLeft: '6px',
          width: '34px',
        }}
      />
    </div>
    <div style={title}>
      <span style={{ marginRight: '15px', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => {}}>Информация о себе</span>
    </div>
    <InputComponent
      type={'TEXT_INPUT_OUTLINE_ABOUT_TEXT'}
      valueType='text'
      required={false}
      widthType={'%'}
      widthValue={100}
      heightValue={'50px'}
      label={"Введите описание"}
      isError={false}
      isDisabled={false}
      labelShrinkLeft={"0px"}
      innerLabel={null}
      store={[ "ABOUT_TEXT", () => null ]}
      css={{
        fontSize: '12px',
        position: 'relative',
        boxSizing: 'border-box',
        marginBottom: '0px',
        marginTop: '4.4px',
        backgroundColor: 'white'
      }}
    />
    <span
      style={{
        display: 'block',
        position: 'relative',
        width: '100%',
        height: '2px',
        borderRadius: '2px',
        backgroundColor: '#D9E7F0',
        marginTop: '30px',
        marginBottom: '21.4px',
      }}
    />
    <div style={title}>
      <span style={{ marginRight: '15px', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => {}}>Проверка квалификации</span>
    </div>
    <div style={{ paddingLeft: '1px', marginBottom: '20px' }}>
      <SelectField 
        placeholder={"Проверка квалификации"}
        params={{ width: 100, mb: '0px', height: 50 }}
        data={[
          { value: '01', label: 'Новые значения...' }
        ]}
        multy={false}
        action={setSpec}
        actionType={"AUTH_SPEC_TYPE"}
        actionParams={[]}
        showIcon={true}
        icon={null}
        iconStyles={{
          marginTop: '-12px',
          marginLeft: '6px',
          width: '34px',
        }}
      />
    </div>
    <div style={mainWrapper}>
      <span
        style={{
          display: 'block',
          position: 'relative',
          width: '100%',
          borderRadius: '4px',
          marginTop: '6px',
          color: '#516674'
        }}
      >
        Название проекта и расширение
      </span>
      <span
        style={{
          display: 'block',
          position: 'relative',
          width: '100%',
          borderRadius: '4px',
          marginTop: '16px',
          marginBottom: '15px',
          color: 'gray',
          opacity: '0.8',
          fontSize: '13px'
        }}
      >
        18 ноября в 20:20
      </span>
      <span
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'relative',
          width: '100%',
          borderRadius: '4px',
          marginTop: '6px',
          color: '#516674'
        }}
      >
        <img
          alt=""
          src={correct}
          style={{ marginRight: '8px' }}
        />
        <span style={{ fontSize: '13px' }}>Ожидает проверки</span>
      </span>
    </div>
    <div style={mainWrapper}>
      <span
        style={{
          display: 'block',
          position: 'relative',
          width: '100%',
          borderRadius: '4px',
          marginTop: '6px',
          color: '#516674'
        }}
      >
        Название проекта и расширение
      </span>
      <span
        style={{
          display: 'block',
          position: 'relative',
          width: '100%',
          borderRadius: '4px',
          marginTop: '16px',
          marginBottom: '15px',
          color: 'gray',
          opacity: '0.8',
          fontSize: '13px'
        }}
      >
        18 ноября в 20:20
      </span>
      <span
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'relative',
          width: '100%',
          borderRadius: '4px',
          marginTop: '6px',
          color: '#516674'
        }}
      >
        <img
          alt=""
          src={correct}
          style={{ marginRight: '8px' }}
        />
        <span style={{ fontSize: '13px' }}>Ожидает проверки</span>
      </span>
    </div>
    <ButtonComponent
      inner={"Обновить информацию"} 
      type='CONTAINED_DEFAULT' 
      action={changeAboutText}
      actionData={null}
      widthType={'%'}
      widthValue={100}
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
        backgroundColor: 'rgb(22, 124, 191)',
        color: 'white',
        width: '56px',
        height: '43px',
      }}
    />
    <span
      style={{
        display: 'block',
        position: 'relative',
        width: '100%',
        height: '2px',
        backgroundColor: 'gray',
        borderRadius: '2px',
        opacity: '0.2',
        marginTop: '30px',
        marginBottom: '20.5px',
      }}
    />
    <div style={title}>
      <span style={{ marginRight: '15px', cursor: 'pointer' }} onClick={() => {}}>Вернуться назад</span>
    </div>
    <div style={mainWrapper}>
      <div style={{ ...customerWrapperContentLine, justifyContent: 'flex-start' }}>
        <h3 style={{ margin: '6px 0px 16.5px' }}>О нет возникла проблема</h3>
      </div>
      <span
        style={{
          display: 'block',
          position: 'relative',
          width: '100%',
          height: '44px',
          borderRadius: '4px',
          backgroundColor: 'rgb(247, 250, 252)',
          marginTop: '6px'
        }}
      />
      <span
        style={{
          display: 'block',
          position: 'relative',
          width: '100%',
          height: '200px',
          borderRadius: '4px',
          backgroundColor: 'rgb(247, 250, 252)',
          marginTop: '14px',
          textAlign: 'center',
          padding: '0 20px',
          boxSizing: 'border-box',
          lineHeight: '22px',
          color: 'gray',
          paddingTop: '60px'
        }}
      >
        Данный раздел доступен только в десктопной версии приложения
      </span>
    </div>
    <span
      style={{
        display: 'block',
        position: 'relative',
        width: '100%',
        height: '2px',
        backgroundColor: 'gray',
        borderRadius: '2px',
        opacity: '0.2',
        marginTop: '30px',
        marginBottom: '20.5px',
      }}
    />
    <div style={title}>
      <span style={{ marginRight: '15px', cursor: 'pointer' }} onClick={() => {}}>Вернуться назад</span>
    </div>
    <div style={title}>
      <span style={{ marginRight: '15px', cursor: 'pointer', fontWeight: 'bold', marginTop: '2px' }} onClick={() => {}}>Ваши выполненные проекты</span>
    </div>
    { ( EXECUTOR[0].portfolio && EXECUTOR[0].portfolio?.length > 0 ) && EXECUTOR[0].portfolio.map(item => {

      return <div style={{ padding: '0px', alignItems: 'flex-start', marginTop: '0px', marginBottom: '20px' }}>
        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{ item.title }</span>
        <img
          alt={"Изображение для проекта"}
          src={`http://localhost:3000/techPortfolio/${USER_ID}.case.jpg`}
          style={{
            display: 'block',
            position: 'relative',
            width: '100%',
            marginBottom: '8px',
            marginTop: '28px',
            borderRadius: '4px'
          }}
        />
        <div style={{ marginTop: '24px', alignItems: 'flex-start' }}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 'bold', marginBottom: '10px' }}>Сроки выполнения</span>
            <span style={{ lineHeight: '22px' }}>{ item.startMonth } { item.startYear } - { item.finishMonth } { item.finishYear }</span>
          </div>
          <div style={{ width: '100%', marginTop: '18px' }}>
            <span style={{ fontWeight: 'bold' }}>Акты и оплата</span>
            <div style={{ marginTop: '10px' }}>
              <span style={{ fontWeight: 'bold', marginRight: '24px', width: '100%' }}>{ item.coast }₽</span>
              <span style={{ width: '100%' }}>Вложение с актом отсутствует</span>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '18px', alignItems: 'flex-start' }}>
          <div style={{ width: '100%' }}>
            <span style={{ fontWeight: 'bold' }}>Параметры объекта</span>
            <div style={{ marginTop: '10px' }}>
              <span style={{ marginRight: '24px', color: '#8E9DA7' }}>Площадь, кв.м</span>
              <span>{ item.param1 }</span>
            </div>
            <div style={{ marginTop: '10px' }}>
              <span style={{ marginRight: '24px', color: '#8E9DA7' }}>Высота объекта, м</span>
              <span>{ item.param2 }</span>
            </div>
          </div>
          <div style={{ width: '100%' }}>
            <div style={{ marginTop: '10px' }}>
              <span style={{ marginRight: '24px', color: '#8E9DA7' }}>Этажность наземная</span>
              <span>{ item.param3 }</span>
            </div>
            <div style={{ marginTop: '10px' }}>
              <span style={{ marginRight: '24px', color: '#8E9DA7' }}>Регион</span>
              <span>{ item.param4 }</span>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '18px' }}>
          <span style={{ fontWeight: 'bold', marginBottom: '0px', marginTop: '0px' }}>Описание проекта</span>
        </div>
        <div style={{ marginTop: '10px' }}>
          <span style={{ marginBottom: '0px', marginTop: '0px', lineHeight: '22px' }}>{ item.text }</span>
        </div>
        <div 
          style={{ 
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginTop: '24px', 
            marginBottom: '0px' 
          }}
        >
          { item.tags.map((spec: string) => 
            
            <span 
              style={{ 
                backgroundColor: 'rgb(217, 231, 240)',
                padding: '10px 14px 13px',
                borderRadius: '6px',
                marginBottom: '10px'

              }}
            >
              { spec }
            </span>
          )}
        </div>
      </div>

    })}
    <span
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'relative',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: 'white',
        margin: '0 auto',
        cursor: 'pointer'
      }}
    >
      <img
        alt={""}
        src={plus}
        style={{
          display: 'block',
          width: '22px'
        }}
      />
    </span>
    <span
      style={{
        display: 'block',
        position: 'relative',
        width: '100%',
        height: '2px',
        backgroundColor: 'gray',
        borderRadius: '2px',
        opacity: '0.2',
        marginTop: '30px',
        marginBottom: '20.5px',
      }}
    />
    <div style={title}>
      <span style={{ marginRight: '15px', cursor: 'pointer' }} onClick={() => {}}>Вернуться назад</span>
    </div>
    <div style={customerWrapperContentLine}>
      <span style={{ marginRight: '15px', cursor: 'pointer', fontWeight: 'bold', marginTop: '2px' }} onClick={() => {}}>Образование</span>
      <span
        onClick={editEducationCases} 
        style={{ 
          color: '#516674', 
          cursor: 'pointer' 
        }}
      >
        {"Редактировать"}
      </span>
    </div>
    { USER_ROLE === 'EXECUTOR' && EXECUTOR[0].educationAndSkills?.length === 0 && 

      <span 
        style={{ 
          lineHeight: '22px', 
          width: '100%',
          marginTop: '0px',
          marginBottom: '14px', 
        }}
      >
        Вы не добавили пока еще ни одного места обучения<br/>
        Добавьте сюда оконченные учебные заведения и пройденные курсы
      </span>
    
    }
    { EXECUTOR[0].educationAndSkills?.filter(item => item.type === 'education')
      .map((item: any, index: number) => {

      return (
        <div
          style={{ 
            ...customerWrapperContentLine,
            marginTop: index === 0 ? '26px' : '14px', 
            flexDirection: 'row', 
            alignItems: 'flex-start', 
            justifyContent: 'space-between',
            backgroundColor: 'white',
            padding: '20px 22px',
            boxSizing: 'border-box'
          }}
        >
          <span style={{ width: '15%', lineHeight: '22px' }}>{ item.finish }</span>
          <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
            <span style={{ fontWeight: 'bold', marginBottom: '16px', lineHeight: '22px' }}>{ item.title }</span>
            <span style={{ lineHeight: '22px' }}>{ item.special }</span>
          </div>
        </div>
      )

    })}
    <div style={{ ...customerWrapperContentLine, marginTop: '23px' }}>
      <span style={{ marginRight: '15px', cursor: 'pointer', fontWeight: 'bold', marginTop: '2px' }} onClick={() => {}}>Опыт работы</span>
      <span
        onClick={editEducationCases} 
        style={{ 
          color: '#516674', 
          cursor: 'pointer' 
        }}
      >
        {"Редактировать"}
      </span>
    </div>
    { USER_ROLE === 'EXECUTOR' && EXECUTOR[0].educationAndSkills?.length === 0 && 

      <span 
        style={{ 
          lineHeight: '22px', 
          width: '100%',
          marginTop: '0px',
          marginBottom: '14px', 
        }}
      >
        Вы не добавили пока еще ни одного места работы
      </span>
    
    }
    { EXECUTOR[0].educationAndSkills?.filter(item => item.type === 'skill')
      .map((item: any, index: number) => {

      return (
        <div
          style={{ 
            ...customerWrapperContentLine,
            marginTop: index === 0 ? '26px' : '14px',  
            flexDirection: 'row', 
            alignItems: 'flex-start', 
            justifyContent: 'space-between',
            backgroundColor: 'white',
            padding: '20px 22px',
            boxSizing: 'border-box'
          }}
        >
          <span style={{ lineHeight: '22px', width: '15%' }}>{ item.sy } - { item.fy }</span>
          <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
            <span style={{ fontWeight: 'bold', marginBottom: '10px' }}>{ item.title }</span>
            <span style={{ fontWeight: 'bold', marginBottom: '16px', color: 'gray' }}>{ item.jobName }</span>
            <span style={{ lineHeight: '22px' }}>{item.jobTasks}</span>
          </div>
        </div>
      )

    })}
    <span
      style={{
        display: 'block',
        position: 'relative',
        width: '100%',
        height: '2px',
        backgroundColor: 'gray',
        borderRadius: '2px',
        opacity: '0.2',
        marginTop: '30px',
        marginBottom: '20.5px',
      }}
    />
    <div style={title}>
      <span style={{ marginRight: '15px', cursor: 'pointer' }} onClick={() => {}}>Вернуться назад</span>
    </div>
  </React.Fragment>

}

export default UserCabinetExecutor