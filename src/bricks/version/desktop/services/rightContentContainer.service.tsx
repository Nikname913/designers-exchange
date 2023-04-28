import React, { ReactElement, useState, useEffect } from 'react'
import { CSSProperties } from 'styled-components'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { setShow, setShowType } from '../../../store/slices/right-content-slice'
import { setShow as setShowFOS, 
  setShowType as setShowTypeFOS } from '../../../store/slices/fos-slice'
import DocumentLine from '../views/localViews/DocumentLine'
import Switch from '@mui/material/Switch'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import ButtonComponent from '../comps/button/Button'
import InputComponent from '../comps/input/Input'
import SelectField from '../comps/select/SelectField'
import ChatMessagesContainer from './chatMessagesContainer.service'
import CommunicationTable from '../views/localViews/CommunicationTable'
import ChapterController from '../views/localViews/СhapterController'
import { IRightContentContainer } from '../../../models-ts/services/right-content-container-models'
import css from '../styles/services/rightContentContainer.css'

import closeIcon from '../../../img/icons/close.svg'
import defaulrAvatar from '../../../img/stock/avatar.svg'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import clipIcon from '../../../img/icons/clip.svg'
import tillIcon from '../../../img/icons/till.svg'
import linesIcon from '../../../img/icons/lines.svg'
import arraySortIcon from '../../../img/icons/sortArray.svg'
import document from '../../../img/icons/chatActions/blankRound.svg'
import semiMenu from '../../../img/icons/semiMenu.svg'
import correctIcon from '../../../img/icons/correct.svg'
import docCorrect from '../../../img/icons/docCorrect.svg'
import docWait from '../../../img/icons/docTime.svg'
import doc from '../../../img/icons/files/withActionTwo/doc.svg'
import correct from '../../../img/icons/correct.svg'
import wait from '../../../img/icons/wait.svg'
import plus from '../../../img/icons/plus.svg'
import infoGrey from '../../../img/icons/infoGrey.svg'

const { ShadowContainer, ShadowContainerInner, ChatFork, MasterDocFork, EditProfileFork } = css

const RightContentContainer: React.FC<IRightContentContainer> = (props: IRightContentContainer) => {

  const dispatch = useAppDispatch()
  const [ docviewFormat, setDocviewFormat ] = useState<'lines' | 'tiles'>('tiles')
  const localText = 'Nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et. Posuere fringilla erat consectetur mi commodo congue erat sed pellentesque. Adipiscing in eget lacinia amet dui eu sit facilisi. Neque id tortor ut egestas nunc in blandit. Sed elit nulla nibh dolor massa facilisis in urna. Ac morbi lobortis nulla justo. Nisl leo a lobortis et. Fusce habitasse id blandit non felis tortor eget turpis. Diam eleifend varius luctus leo. Suspendisse ornare enim egestas in velit feugiat purus vulputate. Egestas odio vitae cras in. Auctor consectetur feugiat molestie adipiscing non tortor parturient et. Sed leo orci vitae adipiscing. Sit posuere massa vel vestibulum sollicitudin'

  const { contentType,
    scroll, 
    chatData: { 
      userID, 
      userName, 
      userLastctive 
    }
  } = props

  const backgroundColor = useAppSelector(state => state.theme.bg)
  const greyColor = useAppSelector(state => state.theme.grey)
  const greyColor2 = useAppSelector(state => state.theme.grey2)
  const greyColor3 = useAppSelector(state => state.theme.grey3)
  const chatBorderColor = useAppSelector(state => state.theme.blue3)
  const chatBackground = useAppSelector(state => state.theme.white)
  const inputBackground = useAppSelector(state => state.theme.white)
  const chatSubmitColor = useAppSelector(state => state.theme.blue2)
  const blankCorrectColor = useAppSelector(state => state.theme.blue4)

  const USER_ROLE = useAppSelector(state => state.roleTypeReducer.activeRole)
  const USER_ID = useAppSelector(state => state.roleTypeReducer.roleData.userID)
  const EXECUTOR = useAppSelector(state => state.userContentReducer.USERS_DATA.listExecutors)
    .filter((executor: any) => executor.clientId === USER_ID)
  const CUSTOMER = useAppSelector(state => state.userContentReducer.USERS_DATA.listCustomers)
    .filter((customer: any) => customer.clientId === USER_ID)

  const avatarCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '50px',
    height: '50px',
  }
  const nameSpanCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    fontWeight: 'bold',
    marginBottom: '4px'
  }
  const lastActiveSpanCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    color: greyColor2,
    fontSize: '13px'
  }
  const divCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  }
  const bottomDivCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position:'relative',
    width: '100%',
    height: 'auto',
    paddingLeft: '20px',
    paddingRight: '20px',
    boxSizing: 'border-box'
  }
  const bottomDivInnerCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position:'relative',
    width: '100%',
    height: 'auto',
    borderTop: '1px solid #D9E7F0',
    boxSizing: 'border-box',
    paddingTop: '20px',
    paddingBottom: '22px',
  }
  const clipDivCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'relative',
    width: '50px',
    height: '50px',
    marginRight: '6px'
  }
  const fileSorterCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative'
  }
  const semiIconsCSS: CSSProperties = {
    display: 'block',
    position: 'absolute',
    top: '0%',
    left: '100%',
    marginTop: '0px',
    cursor: 'pointer',
  }
  const blankButtonCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    backgroundColor: blankCorrectColor,
    height: '38px',
    width: '164px',
    borderRadius: '4px',
    paddingBottom: '2px',
    paddingLeft: '16px',
    cursor: 'pointer',
  }
  const doctileCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    position: 'relative',
    width: '16.666%',
    marginBottom: '13px'
  }
  const whiteContainerCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    width: '100%',
    height: 'auto',
    minHeight: '40px',
    padding: '26px 34px',
    borderRadius: '8px',
    backgroundColor: 'white',
    marginTop: '20px'
  }
  const avatarContainerCSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  }

  function showrightContent(): void {
    dispatch(setShow(false))
  }
  function showNewAgreement(): void {
    dispatch(setShowType('AgreementNewCC'))
  }
  function changeAvatar(): void {
    dispatch(setShowFOS(true))
    dispatch(setShowTypeFOS('changeAvatar'))
  }

  !false && console.log(EXECUTOR)
  !false && console.log(CUSTOMER)
  
  useEffect(() => {

    false && console.log(USER_ROLE)
    false && console.log(USER_ID)
    !false && console.log(EXECUTOR)
    !false && console.log(CUSTOMER)

  }, [ CUSTOMER, EXECUTOR, USER_ID, USER_ROLE ])

  return (
    <React.Fragment>
      <ShadowContainer marginTop={scroll}>
        <ShadowContainerInner>

          { contentType === 'ECC' 

          /* ---------------------------------------- */
          /* базовое окно с чатом
          /* ---------------------------------------- */

            ? <ChatFork.ChatContainer style={{ paddingTop: '40px' }} backgroundColor={backgroundColor} id={userID}>
                <ChatFork.CloseIconContainer>
                  <ChatFork.CloseIcon onClick={showrightContent}>
                    <img
                      alt={""} 
                      src={closeIcon}  
                    />
                  </ChatFork.CloseIcon>
                </ChatFork.CloseIconContainer>
                <ChatFork.ChatHeader>
                  <div style={divCSS}>
                    <ChatFork.ChatHeaderAvatar>
                      <img
                        alt={""}
                        src={defaulrAvatar}
                        style={avatarCSS}
                      />
                    </ChatFork.ChatHeaderAvatar>
                    <ChatFork.ChatHeaderName>
                      <span style={nameSpanCSS}>{ userName }</span>
                      <span style={lastActiveSpanCSS}>{ userLastctive }</span>
                    </ChatFork.ChatHeaderName>
                  </div>
                  <div style={divCSS}>
                    <ChatFork.ChatHeaderEnableDocs>
                      <span style={{ ...lastActiveSpanCSS, fontSize: '15px' }}>Документы</span>
                      <Switch color={"primary"} defaultChecked />
                    </ChatFork.ChatHeaderEnableDocs>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE_SEARCH'}
                      valueType='text'
                      required={false}
                      widthType={'px'}
                      widthValue={300}
                      heightValue={'56px'}
                      label={"Поиск по сообщениям"}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      css={{
                        fontSize: '12px',
                        position: 'relative',
                        boxSizing: 'border-box',
                        marginBottom: '8px',
                        backgroundColor: 'white'
                      }}
                    />
                  </div>
                </ChatFork.ChatHeader>
                <ChatFork.ChatBody
                  border={`1px solid ${chatBorderColor}`}
                  backgroundColor={chatBackground}
                >
                  <ChatFork.ChatBodyInner
                    border={`1px solid transparent`}
                    backgroundColor={chatBackground}
                  >
                    <ChatMessagesContainer
                      data={[
                        { 
                          date: '05.01.2022', 
                          messages: [
                            { 
                              type: 'me', 
                              content: [
                                { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', time: '20:05' },
                                { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', time: '20:05' }
                              ]
                            },
                            { 
                              type: 'you', 
                              content: [
                                { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', time: '20:06' },
                              ]
                            },
                            { 
                              type: 'me', 
                              content: [
                                { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', time: '20:08' },
                              ]
                            },
                            { 
                              type: 'you', 
                              content: [
                                { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', time: '20:10' },
                                { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', time: '20:10' },
                                { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', time: '20:10' },
                              ]
                            },
                            { 
                              type: 'me', 
                              content: [
                                { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', time: '20:08' },
                              ]
                            },
                            { 
                              type: 'you', 
                              content: [
                                { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', time: '20:10' },
                                { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', time: '20:10' },
                                { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', time: '20:10' },
                              ]
                            }
                          ]
                        }
                      ]}
                    />
                  </ChatFork.ChatBodyInner>
                  <div style={bottomDivCSS}>
                    <div style={bottomDivInnerCSS}>
                      <div style={clipDivCSS}>
                        <img
                          alt={""}
                          src={clipIcon}
                        />
                      </div>
                      <InputComponent
                        type={'TEXT_INPUT_OUTLINE'}
                        valueType='text'
                        required={false}
                        widthType={'%'}
                        widthValue={100}
                        heightValue={'50px'}
                        label={"Lorem ipsum dolor sit amet consectetur adipisicing elit"}
                        isError={false}
                        isDisabled={true}
                        labelShrinkLeft={"0px"}
                        innerLabel={null}
                        css={{
                          fontSize: '12px',
                          position: 'relative',
                          boxSizing: 'border-box',
                          marginTop: '0px',
                          backgroundColor: inputBackground,
                          marginRight: '12px'
                        }}
                      />
                      <ButtonComponent
                        inner={""} 
                        type='ICON_BUTTON_CHAT_SUBMIT' 
                        action={() => console.log('this is button')}
                        actionData={null}
                        widthType={'px'}
                        widthValue={56}
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
                          backgroundColor: chatSubmitColor,
                          width: '56px',
                          height: '56px',
                        }}
                      />
                    </div>
                  </div>
                </ChatFork.ChatBody>
              </ChatFork.ChatContainer>
            : contentType === 'MDCC'

            /* ---------------------------------------- */
            /* окно раздела мастер документы
            /* ---------------------------------------- */

            ? <React.Fragment>
                <MasterDocFork.ChatContainer style={{ paddingTop: '40px', height: 'auto', minHeight: '100vh' }} backgroundColor={backgroundColor}>
                  <MasterDocFork.CloseIconContainer>
                    <MasterDocFork.CloseIcon onClick={showrightContent}>
                      <img
                        alt={""} 
                        src={closeIcon}  
                      />
                    </MasterDocFork.CloseIcon>
                  </MasterDocFork.CloseIconContainer>
                  <MasterDocFork.ContentLine>
                    <h3 style={{ fontSize: '28px', margin: 0, marginBottom: '38px' }}>Мастер документы</h3>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine>
                    <img
                      alt={""}
                      src={correctIcon}
                      style={{ width: '24px', marginRight: '10px' }}
                    />
                    <span style={{ fontWeight: 'bold', display: 'block' }}>Договор подписан</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '40px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <div style={{ display: 'block', position: 'relative', width: '120px' }}>
                        <img
                          alt={""}
                          src={document}
                          style={{ width: '120px' }}
                        />
                        <img
                          alt={""}
                          src={semiMenu}
                          style={semiIconsCSS}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', marginLeft: '32px' }}>
                        <span style={{ color: greyColor, marginBottom: '5px' }}>Договор основной</span>
                        <span style={{ color: greyColor, marginBottom: '5px', fontSize: '12px' }}>Исполнитель</span>
                        <span style={{ color: greyColor, marginBottom: '15px', fontSize: '12px' }}>29.02.2023</span>
                        <div style={blankButtonCSS}>
                          <span>Договор подписан</span>
                          <img
                            alt={""}
                            src={docCorrect}
                            style={{ marginLeft: '6px', marginTop: '2px', width: '16px' }}
                          />
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '80px' }}>
                      <div style={{ display: 'block', position: 'relative', width: '120px' }}>
                        <img
                          alt={""}
                          src={document}
                          style={{ width: '120px' }}
                        />
                        <img
                          alt={""}
                          src={semiMenu}
                          style={semiIconsCSS}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', marginLeft: '32px' }}>
                        <span style={{ color: greyColor, marginBottom: '5px' }}>Договор основной</span>
                        <span style={{ color: greyColor, marginBottom: '5px', fontSize: '12px' }}>Заказчик</span>
                        <span style={{ color: greyColor, marginBottom: '15px', fontSize: '12px' }}>29.02.2023</span>
                        <div style={{ ...blankButtonCSS, backgroundColor: greyColor3 }}>
                          <span>Ждет подписания</span>
                          <img
                            alt={""}
                            src={docWait}
                            style={{ marginLeft: '6px', marginTop: '2px', width: '16px' }}
                          />
                        </div>
                      </div>
                    </div>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.Delimiter background={chatBorderColor} style={{ marginTop: '50px' }}/>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginTop: '40px', marginBottom: '30px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block' }}>Акты</span>
                    <ButtonComponent
                      inner={"Загрузить акт"} 
                      type='CONTAINED_DEFAULT' 
                      action={() => console.log('this is button')}
                      actionData={null}
                      widthType={'px'}
                      widthValue={160}
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
                        backgroundColor: chatSubmitColor,
                        width: '56px',
                        height: '43px',
                      }}
                    />
                  </MasterDocFork.ContentLine>

                  { Array(2)
                    .fill({ 
                      status: 'GREEN', 
                      data: { 
                        name: 'Акт_выполненных работ.pdf', 
                        date: '29.02.2023', 
                        statusName: 'Подписан' 
                      }
                    }).map((item, index) => {

                    return (
                      <MasterDocFork.ContentLine key={index}>
                        <DocumentLine
                          status={item.status}
                          data={item.data}
                        />
                      </MasterDocFork.ContentLine>
                    )

                  })}

                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginTop: '40px', marginBottom: '20px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block' }}>Мастер документы</span>
                    <div>
                      <img
                        alt={""}
                        src={tillIcon}
                        style={{ 
                          width: '24px', 
                          marginRight: '16px', 
                          cursor: 'pointer',
                          opacity: docviewFormat === 'tiles' ? '1' : '0.5' 
                        }}
                        onClick={() => setDocviewFormat('tiles')}
                      />
                      <img
                        alt={""}
                        src={linesIcon}
                        style={{ 
                          width: '24px', 
                          cursor: 'pointer',
                          opacity: docviewFormat === 'lines' ? '1' : '0.5' 
                        }}
                        onClick={() => setDocviewFormat('lines')}
                      />
                    </div>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.Delimiter background={chatBorderColor} style={{ marginTop: '0px', marginBottom: '36px' }}/>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px', alignItems: 'flex-end' }}>
                    <span>Файлы в заказе</span>
                    <div style={fileSorterCSS}>
                      <SelectField 
                        placeholder={"Сортировать по дате"}
                        params={{ width: 280, mb: '0px', height: 50 }}
                        data={[
                          { value: '1', label: 'Вчера' },
                          { value: '2', label: 'Позавчера' },
                          { value: '3', label: 'Последний месяц' },
                        ]}
                        multy={false}
                        action={() => {}}
                        actionType={""}
                        actionParams={[]}
                        showIcon={true}
                        icon={null}
                        iconStyles={{
                          marginTop: '-12px',
                          marginLeft: '6px',
                          width: '34px',
                        }}
                      />
                      <img
                        alt={""}
                        src={arraySortIcon}
                        style={{ marginLeft: '20px', marginRight: '16px' }}
                      />
                    </div>
                  </MasterDocFork.ContentLine>
                  { docviewFormat === 'lines' && <React.Fragment>
                    { Array(2)
                      .fill({ 
                        status: 'GREEN', 
                        data: { 
                          name: 'Акт_выполненных работ.pdf', 
                          date: '29.02.2023', 
                          statusName: 'Подписан',
                          size: 220
                        }
                      }).map((item, index) => {

                      return (
                        <MasterDocFork.ContentLine key={index}>
                          <DocumentLine
                            status={item.status}
                            data={item.data}
                          />
                        </MasterDocFork.ContentLine>
                      )

                    })}
                    { Array(1)
                      .fill({ 
                        status: 'WHITE', 
                        data: { 
                          name: 'Акт_выполненных работ.pdf', 
                          date: '29.02.2023', 
                          statusName: 'Ожидает',
                          size: 220
                        }
                      }).map((item, index) => {

                      return (
                        <MasterDocFork.ContentLine key={index}>
                          <DocumentLine
                            status={item.status}
                            data={item.data}
                          />
                        </MasterDocFork.ContentLine>
                      )

                    })}
                    <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px', marginTop: '30px', alignItems: 'flex-end' }}>
                      <span>Раздел Пожарная безопасность</span>
                    </MasterDocFork.ContentLine>
                    { Array(2)
                      .fill({ 
                        status: 'GREEN', 
                        data: { 
                          name: 'Акт_выполненных работ.pdf', 
                          date: '29.02.2023', 
                          statusName: 'Подписан',
                          size: 220
                        }
                      }).map((item, index) => {

                      return (
                        <MasterDocFork.ContentLine key={index}>
                          <DocumentLine
                            status={item.status}
                            data={item.data}
                          />
                        </MasterDocFork.ContentLine>
                      )

                    })}
                    { Array(1)
                      .fill({ 
                        status: 'WHITE', 
                        data: { 
                          name: 'Акт_выполненных работ.pdf', 
                          date: '29.02.2023', 
                          statusName: 'Ожидает',
                          size: 220
                        }
                      }).map((item, index) => {

                      return (
                        <MasterDocFork.ContentLine key={index}>
                          <DocumentLine
                            status={item.status}
                            data={item.data}
                          />
                        </MasterDocFork.ContentLine>
                      )

                    })}
                  </React.Fragment> }
                  { docviewFormat === 'tiles' && <MasterDocFork.ContentLine style={{ flexWrap: 'wrap' }}>
                    { Array(2)
                      .fill({ 
                        status: 'GREEN', 
                        data: { 
                          name: 'Акт_выполненных работ.pdf', 
                          date: '29.02.2023', 
                          statusName: 'Подписан',
                          size: 220
                        }
                      }).map((item, index) => {

                        return (
                          <div style={doctileCSS} key={index}>
                            <div style={{ position: 'relative' }}>
                              <img
                                alt={""}
                                src={doc}
                              />

                              { item.status === 'GREEN' && 
                                <span 
                                  style={{ 
                                    width: '24px',  
                                    display: 'block', 
                                    position: 'absolute',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    top: '100%',
                                    left: '100%',
                                    marginTop: '-30px',
                                    marginLeft: '-28px' 
                                  }}
                                >
                                  <img 
                                    alt={""} 
                                    src={correct}
                                    style={{
                                      backgroundColor: 'white',
                                      display: 'block',
                                      width: '24px',
                                    }} 
                                  /> 
                                </span>
                              }
                              { item.status === 'WHITE' && 
                                <span 
                                  style={{ 
                                    width: '24px',  
                                    display: 'block', 
                                    position: 'absolute',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    top: '100%',
                                    left: '100%',
                                    marginTop: '-30px',
                                    marginLeft: '-28px' 
                                  }}
                                >
                                  <img 
                                    alt={""} 
                                    src={wait}
                                    style={{
                                      backgroundColor: 'white',
                                      display: 'block',
                                      width: '24px',
                                    }} 
                                  /> 
                                </span>
                              }
                            
                            </div>
                            <div
                              style={{
                                display: 'block',
                                position: 'relative',
                                width: '100%',
                                height: '26px',
                                overflow: 'hidden',
                                marginTop: '-8px'
                              }}
                            >
                              <span style={{ color: greyColor, display: 'block', width: '100%', lineHeight: '26px', fontSize: '12px' }}>{ item.data.name }</span>
                            </div>
                            <span style={{ color: greyColor2, marginBottom: '4.4px', fontSize: '12px' }}>{ item.data.date }</span>
                            <span style={{ color: greyColor2, fontSize: '12px' }}>{ item.data.size } Mb</span>
                          </div>
                        )

                    })}
                    { Array(8)
                      .fill({ 
                        status: 'WHITE', 
                        data: { 
                          name: 'Акт_выполненных работ.pdf', 
                          date: '29.02.2023', 
                          statusName: 'Ожидает',
                          size: 220
                        }
                      }).map((item, index) => {

                        return (
                          <div style={doctileCSS} key={index}>
                            <div style={{ position: 'relative' }}>
                              <img
                                alt={""}
                                src={doc}
                              />

                              { item.status === 'GREEN' && 
                                <span 
                                  style={{ 
                                    width: '24px',  
                                    display: 'block', 
                                    position: 'absolute',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    top: '100%',
                                    left: '100%',
                                    marginTop: '-30px',
                                    marginLeft: '-28px' 
                                  }}
                                >
                                  <img 
                                    alt={""} 
                                    src={correct}
                                    style={{
                                      backgroundColor: 'white',
                                      display: 'block',
                                      width: '24px',
                                    }} 
                                  /> 
                                </span>
                              }
                              { item.status === 'WHITE' && 
                                <span 
                                  style={{ 
                                    width: '24px',  
                                    display: 'block', 
                                    position: 'absolute',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    top: '100%',
                                    left: '100%',
                                    marginTop: '-30px',
                                    marginLeft: '-28px' 
                                  }}
                                >
                                  <img 
                                    alt={""} 
                                    src={wait}
                                    style={{
                                      backgroundColor: 'white',
                                      display: 'block',
                                      width: '24px',
                                    }} 
                                  /> 
                                </span>
                              }

                            </div>
                            <div
                              style={{
                                display: 'block',
                                position: 'relative',
                                width: '100%',
                                height: '26px',
                                overflow: 'hidden',
                                marginTop: '-8px'
                              }}
                            >
                              <span style={{ color: greyColor, display: 'block', width: '100%', lineHeight: '26px', fontSize: '12px' }}>{ item.data.name }</span>
                            </div>
                            <span style={{ color: greyColor2, marginBottom: '4.4px', fontSize: '12px' }}>{ item.data.date }</span>
                            <span style={{ color: greyColor2, fontSize: '12px' }}>{ item.data.size } Mb</span>
                          </div>
                        )

                    })}
                    <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginBottom: '33px', marginTop: '30px', alignItems: 'flex-end' }}>
                      <span>Раздел Пожарная безопасность</span>
                    </MasterDocFork.ContentLine>
                    { Array(2)
                      .fill({ 
                        status: 'GREEN', 
                        data: { 
                          name: 'Акт_выполненных работ.pdf', 
                          date: '29.02.2023', 
                          statusName: 'Подписан',
                          size: 220
                        }
                      }).map((item, index) => {

                        return (
                          <div style={doctileCSS} key={index}>
                            <div style={{ position: 'relative' }}>
                              <img
                                alt={""}
                                src={doc}
                              />

                              { item.status === 'GREEN' && 
                                <span 
                                  style={{ 
                                    width: '24px',  
                                    display: 'block', 
                                    position: 'absolute',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    top: '100%',
                                    left: '100%',
                                    marginTop: '-30px',
                                    marginLeft: '-28px' 
                                  }}
                                >
                                  <img 
                                    alt={""} 
                                    src={correct}
                                    style={{
                                      backgroundColor: 'white',
                                      display: 'block',
                                      width: '24px',
                                    }} 
                                  /> 
                                </span>
                              }
                              { item.status === 'WHITE' && 
                                <span 
                                  style={{ 
                                    width: '24px',  
                                    display: 'block', 
                                    position: 'absolute',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    top: '100%',
                                    left: '100%',
                                    marginTop: '-30px',
                                    marginLeft: '-28px' 
                                  }}
                                >
                                  <img 
                                    alt={""} 
                                    src={wait}
                                    style={{
                                      backgroundColor: 'white',
                                      display: 'block',
                                      width: '24px',
                                    }} 
                                  /> 
                                </span>
                              }

                            </div>
                            <div
                              style={{
                                display: 'block',
                                position: 'relative',
                                width: '100%',
                                height: '26px',
                                overflow: 'hidden',
                                marginTop: '-8px'
                              }}
                            >
                              <span style={{ color: greyColor, display: 'block', width: '100%', lineHeight: '26px', fontSize: '12px' }}>{ item.data.name }</span>
                            </div>
                            <span style={{ color: greyColor2, marginBottom: '4.4px', fontSize: '12px' }}>{ item.data.date }</span>
                            <span style={{ color: greyColor2, fontSize: '12px' }}>{ item.data.size } Mb</span>
                          </div>
                        )

                    })}
                    { Array(1)
                      .fill({ 
                        status: 'WHITE', 
                        data: { 
                          name: 'Акт_выполненных работ.pdf', 
                          date: '29.02.2023', 
                          statusName: 'Ожидает',
                          size: 220
                        }
                      }).map((item, index) => {

                        return (
                          <div style={doctileCSS} key={index}>
                            <div style={{ position: 'relative' }}>
                              <img
                                alt={""}
                                src={doc}
                              />

                              { item.status === 'GREEN' && 
                                <span 
                                  style={{ 
                                    width: '24px',  
                                    display: 'block', 
                                    position: 'absolute',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    top: '100%',
                                    left: '100%',
                                    marginTop: '-30px',
                                    marginLeft: '-28px' 
                                  }}
                                >
                                  <img 
                                    alt={""} 
                                    src={correct}
                                    style={{
                                      backgroundColor: 'white',
                                      display: 'block',
                                      width: '24px',
                                    }} 
                                  /> 
                                </span>
                              }
                              { item.status === 'WHITE' && 
                                <span 
                                  style={{ 
                                    width: '24px',  
                                    display: 'block', 
                                    position: 'absolute',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    top: '100%',
                                    left: '100%',
                                    marginTop: '-30px',
                                    marginLeft: '-28px' 
                                  }}
                                >
                                  <img 
                                    alt={""} 
                                    src={wait}
                                    style={{
                                      backgroundColor: 'white',
                                      display: 'block',
                                      width: '24px',
                                    }} 
                                  /> 
                                </span>
                              }

                            </div>
                            <div
                              style={{
                                display: 'block',
                                position: 'relative',
                                width: '100%',
                                height: '26px',
                                overflow: 'hidden',
                                marginTop: '-8px'
                              }}
                            >
                              <span style={{ color: greyColor, display: 'block', width: '100%', lineHeight: '26px', fontSize: '12px' }}>{ item.data.name }</span>
                            </div>
                            <span style={{ color: greyColor2, marginBottom: '4.4px', fontSize: '12px' }}>{ item.data.date }</span>
                            <span style={{ color: greyColor2, fontSize: '12px' }}>{ item.data.size } Mb</span>
                          </div>
                        )

                    })}
                  </MasterDocFork.ContentLine> }
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginTop: '40px', marginBottom: '100px' }}>
                    
                    { docviewFormat === 'lines' && <div/> }
                    
                    <ButtonComponent
                      inner={"Скачать архивом"} 
                      type='CONTAINED_DEFAULT' 
                      action={() => console.log('this is button')}
                      actionData={null}
                      widthType={'px'}
                      widthValue={160}
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
                        backgroundColor: chatBorderColor,
                        color: greyColor,
                        width: '56px',
                        height: '43px',
                      }}
                    />
                  </MasterDocFork.ContentLine>

                </MasterDocFork.ChatContainer>
            </React.Fragment>
            : contentType === 'ChapterCC'

            /* ---------------------------------------- */
            /* базовое окно для раздела
            /* ---------------------------------------- */

            ? <React.Fragment>
                <MasterDocFork.ChatContainer style={{ paddingTop: '40px', height: 'auto', minHeight: '100vh' }} backgroundColor={backgroundColor}>
                  <MasterDocFork.CloseIconContainer>
                    <MasterDocFork.CloseIcon onClick={showrightContent}>
                      <img
                        alt={""} 
                        src={closeIcon}  
                      />
                    </MasterDocFork.CloseIcon>
                  </MasterDocFork.CloseIconContainer>
                  <MasterDocFork.ContentLine>
                    <h3 style={{ fontSize: '28px', margin: 0, marginBottom: '38px' }}>Пожарная безопасность</h3>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine>
                    <span style={{ lineHeight: '22px' }}>{"Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et. Posuere fringilla erat consectetur mi commodo congue erat sed pellentesque. Adipiscing in eget lacinia amet dui eu sit facilisi. Neque id tortor ut egestas nunc in blandit. Sed elit nulla nibh dolor massa facilisis in urna. Ac morbi lobortis nulla justo. Nisl leo a lobortis et. Fusce habitasse id blandit non felis tortor eget turpis. Diam eleifend varius luctus leo. Suspendisse ornare enim egestas in velit feugiat purus vulputate. Egestas odio vitae cras in. Auctor consectetur feugiat molestie adipiscing non tortor parturient et. Sed leo orci vitae adipiscing. Sit posuere massa vel vestibulum sollicitudin."}</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '30px' }}>
                    <ButtonComponent
                      inner={"Сдать раздел на проверку"} 
                      type='CONTAINED_DEFAULT' 
                      action={() => console.log('this is button')}
                      actionData={null}
                      widthType={'px'}
                      widthValue={238}
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
                        backgroundColor: chatSubmitColor,
                        width: '56px',
                        height: '43px',
                      }}
                    />
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '44px', alignItems: 'flex-start' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', marginRight: '80px' }}>Ответственный</span>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        position: 'relative'
                      }}
                    >
                      <img
                        alt={""}
                        src={defaulrAvatar}
                        style={{
                          display: 'block',
                          position: 'relative',
                          width: '56px',
                          marginRight: '20px'
                        }}
                      />
                      <div 
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start',
                          position: 'relative',
                          marginTop: '-6px'
                        }}
                      >
                        <span style={{ fontSize: '16px', width: '140px', marginBottom: '6px', lineHeight: '22px', fontWeight: 'bold' }}>Петров Иван Владимирович</span>
                        <span style={{ fontSize: '14px' }}>Самозанятый</span>
                      </div>
                    </div>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '44px', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div 
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                      }}
                    >
                      <span style={{ fontWeight: 'bold', display: 'block', marginRight: '15px' }}>Мастер документы</span>
                      <img
                        alt={""}
                        src={infoGrey}
                      />
                      <span style={{ fontWeight: 'bold', display: 'block', marginLeft: '30px', opacity: 0.5 }}>Вложения</span>
                    </div>
                    <ButtonComponent
                      inner={"Скачать архивом"} 
                      type='CONTAINED_DEFAULT' 
                      action={() => console.log('this is button')}
                      actionData={null}
                      widthType={'px'}
                      widthValue={160}
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
                        backgroundColor: chatBorderColor,
                        color: greyColor,
                        width: '56px',
                        height: '43px',
                      }}
                    />
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine>
                    <div style={whiteContainerCSS}>
                      { Array(4).fill(0).map((item, index) => {

                        return (
                          <div 
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              justifyContent: 'flex-start',
                              position: 'relative',
                              marginRight: '16px',
                              cursor: 'pointer',
                            }}
                          >
                            <img
                              alt={""}
                              src={doc}
                            />
                            <span style={{ fontSize: '12px', color: greyColor, marginTop: '6px' }}>{"План_Склада"}</span>
                            <span style={{ fontSize: '12px', color: greyColor2, marginTop: '4px' }}>{"140 Kb"}</span>
                          </div>
                        )

                      })}
                    </div>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.Delimiter background={chatBorderColor} style={{ marginTop: '40px', marginBottom: '40px' }}/>
                  { Array(3).fill(0).map((item, index): ReactElement => {

                    return (
                      <MasterDocFork.ContentLine style={{ marginBottom: '8px' }}>
                        <CommunicationTable
                            status={"wait"}
                            oneButtonParams={{
                              isset: true,
                              color: 'white',
                              background: 'blue2',
                              inner: 'В мастер-документы',
                              width: 220,
                            }}
                            twoButtonParams={{
                              isset: true,
                              color: 'grey',
                              background: 'white',
                              inner: 'Отказать',
                              width: 120,
                            }}
                            image={"pdf"}
                            mb={"12px"}
                          />
                      </MasterDocFork.ContentLine>
                    )

                  })}
                  <MasterDocFork.ContentLine style={{ marginTop: '40px', marginBottom: '20px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', marginRight: '80px' }}>Общение</span>
                  </MasterDocFork.ContentLine>
                  <ChatFork.ChatHeader>
                    <div style={divCSS}>
                      <ChatFork.ChatHeaderAvatar style={avatarContainerCSS}>
                        <img
                          alt={""}
                          src={defaulrAvatar}
                          style={avatarCSS}
                        />
                        <img
                          alt={""}
                          src={defaulrAvatar}
                          style={{ ...avatarCSS, marginLeft: '-14px' }}
                        />
                        <img
                          alt={""}
                          src={defaulrAvatar}
                          style={{ ...avatarCSS, marginLeft: '-14px' }}
                        />
                      </ChatFork.ChatHeaderAvatar>
                    </div>
                    <div style={divCSS}>
                      <ChatFork.ChatHeaderEnableDocs>
                        <span style={{ ...lastActiveSpanCSS, fontSize: '15px' }}>Документы</span>
                        <Switch color={"primary"} defaultChecked />
                      </ChatFork.ChatHeaderEnableDocs>
                      <InputComponent
                        type={'TEXT_INPUT_OUTLINE_SEARCH'}
                        valueType='text'
                        required={false}
                        widthType={'px'}
                        widthValue={300}
                        heightValue={'56px'}
                        label={"Поиск по сообщениям"}
                        isError={false}
                        isDisabled={false}
                        labelShrinkLeft={"0px"}
                        innerLabel={null}
                        css={{
                          fontSize: '12px',
                          position: 'relative',
                          boxSizing: 'border-box',
                          marginBottom: '8px',
                          backgroundColor: 'white'
                        }}
                      />
                    </div>
                  </ChatFork.ChatHeader>
                  <ChatFork.ChatBody
                    border={`1px solid ${chatBorderColor}`}
                    backgroundColor={chatBackground}
                    style={{ marginTop: '12px', height: 'auto' }}
                  >
                    <ChatFork.ChatBodyInner
                      border={`1px solid transparent`}
                      backgroundColor={chatBackground}
                    >
                      <ChatMessagesContainer
                        data={[
                          { 
                            date: '05.01.2022', 
                            messages: [
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:05',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:05',
                                    likes: 0  }
                                ]
                              },
                              { 
                                type: 'you', 
                                content: [
                                  { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', 
                                    time: '20:06',
                                    name: 'Виолетта',
                                    likes: 0,
                                    files: {
                                      id: 'undefined',
                                      ext: 'doc',
                                      name: 'План_Склада.doc'
                                    }},
                                ]
                              },
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:08',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'you', 
                                content: [
                                  { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:08',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'you', 
                                content: [
                                  { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'action', 
                                content: [
                                  { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:08',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:08',
                                    likes: 0 },
                                ]
                              },
                            ]
                          }
                        ]}
                      />
                    </ChatFork.ChatBodyInner>
                    <div style={bottomDivCSS}>
                      <div style={bottomDivInnerCSS}>
                        <div style={clipDivCSS}>
                          <img
                            alt={""}
                            src={clipIcon}
                          />
                        </div>
                        <InputComponent
                          type={'TEXT_INPUT_OUTLINE'}
                          valueType='text'
                          required={false}
                          widthType={'%'}
                          widthValue={100}
                          heightValue={'50px'}
                          label={"Lorem ipsum dolor sit amet consectetur adipisicing elit"}
                          isError={false}
                          isDisabled={true}
                          labelShrinkLeft={"0px"}
                          innerLabel={null}
                          css={{
                            fontSize: '12px',
                            position: 'relative',
                            boxSizing: 'border-box',
                            marginTop: '0px',
                            backgroundColor: inputBackground,
                            marginRight: '12px'
                          }}
                        />
                        <ButtonComponent
                          inner={""} 
                          type='ICON_BUTTON_CHAT_SUBMIT' 
                          action={() => console.log('this is button')}
                          actionData={null}
                          widthType={'px'}
                          widthValue={56}
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
                            backgroundColor: chatSubmitColor,
                            width: '56px',
                            height: '56px',
                          }}
                        />
                      </div>
                    </div>
                  </ChatFork.ChatBody>
                </MasterDocFork.ChatContainer>
            </React.Fragment>
            : contentType === 'ExpertCC'

            /* ---------------------------------------- */
            /* базовое окно под раздел экспертизы
            /* ---------------------------------------- */

            ? <React.Fragment>
                <MasterDocFork.ChatContainer style={{ paddingTop: '40px', height: 'auto', minHeight: '100vh' }} backgroundColor={backgroundColor}>
                  <MasterDocFork.CloseIconContainer>
                    <MasterDocFork.CloseIcon onClick={showrightContent}>
                      <img
                        alt={""} 
                        src={closeIcon}  
                      />
                    </MasterDocFork.CloseIcon>
                  </MasterDocFork.CloseIconContainer>
                  <MasterDocFork.ContentLine>
                    <h3 style={{ fontSize: '28px', margin: 0, marginBottom: '30px' }}>Экспертиза</h3>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between' }}>
                    <div 
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                      }}
                    >
                      <span style={{ fontWeight: 'bold', display: 'block', marginRight: '80px' }}>Негосударственная</span>
                      <span style={{ fontWeight: 'bold', display: 'block', marginRight: '80px' }}>до 05.03.2023</span>
                    </div>
                    <ButtonComponent
                      inner={"Сдать работы"} 
                      type='CONTAINED_DEFAULT' 
                      action={() => console.log('this is button')}
                      actionData={null}
                      widthType={'px'}
                      widthValue={228}
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
                        backgroundColor: chatSubmitColor,
                        width: '56px',
                        height: '43px',
                      }}
                    />
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.Delimiter background={chatBorderColor} style={{ marginTop: '50px', marginBottom: '50px' }}/>
                  <MasterDocFork.ContentLine>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={100}
                      heightValue={'50px'}
                      label={"Комментарий по экспертизе"}
                      isError={false}
                      isDisabled={true}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      css={{
                        fontSize: '12px',
                        position: 'relative',
                        boxSizing: 'border-box',
                        marginTop: '0px',
                        backgroundColor: inputBackground,
                      }}
                    />
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '44px', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div 
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                      }}
                    >
                      <span style={{ fontWeight: 'bold', display: 'block', marginRight: '15px' }}>Мастер документы</span>
                      <img
                        alt={""}
                        src={infoGrey}
                      />
                      <span style={{ fontWeight: 'bold', display: 'block', marginLeft: '30px', opacity: 0.5 }}>Вложения</span>
                    </div>
                    <ButtonComponent
                      inner={"Скачать архивом"} 
                      type='CONTAINED_DEFAULT' 
                      action={() => console.log('this is button')}
                      actionData={null}
                      widthType={'px'}
                      widthValue={160}
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
                        backgroundColor: chatBorderColor,
                        color: greyColor,
                        width: '56px',
                        height: '43px',
                      }}
                    />
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine>
                    <div style={whiteContainerCSS}>
                      { Array(4).fill(0).map((item, index) => {

                        return (
                          <div 
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              justifyContent: 'flex-start',
                              position: 'relative',
                              marginRight: '16px',
                              cursor: 'pointer',
                            }}
                          >
                            <img
                              alt={""}
                              src={doc}
                            />
                            <span style={{ fontSize: '12px', color: greyColor, marginTop: '6px' }}>{"План_Склада"}</span>
                            <span style={{ fontSize: '12px', color: greyColor2, marginTop: '4px' }}>{"140 Kb"}</span>
                          </div>
                        )

                      })}
                    </div>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '44px', alignItems: 'flex-start' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', marginRight: '80px' }}>Ответственный</span>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        position: 'relative'
                      }}
                    >
                      <img
                        alt={""}
                        src={defaulrAvatar}
                        style={{
                          display: 'block',
                          position: 'relative',
                          width: '56px',
                          marginRight: '20px'
                        }}
                      />
                      <div 
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start',
                          position: 'relative',
                          marginTop: '-6px'
                        }}
                      >
                        <span style={{ fontSize: '16px', width: '140px', marginBottom: '6px', lineHeight: '22px', fontWeight: 'bold' }}>Петров Иван Владимирович</span>
                        <span style={{ fontSize: '14px' }}>Самозанятый</span>
                      </div>
                    </div>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.Delimiter background={chatBorderColor} style={{ marginTop: '40px', marginBottom: '46px' }}/>
                  { Array(3).fill(0).map((item, index): ReactElement => {

                    return (
                      <MasterDocFork.ContentLine style={{ marginBottom: '8px' }}>
                        <CommunicationTable
                            status={"wait"}
                            oneButtonParams={{
                              isset: true,
                              color: 'white',
                              background: 'blue2',
                              inner: 'В мастер-документы',
                              width: 220,
                            }}
                            twoButtonParams={{
                              isset: true,
                              color: 'grey',
                              background: 'white',
                              inner: 'Отказать',
                              width: 120,
                            }}
                            image={"pdf"}
                            mb={"12px"}
                          />
                      </MasterDocFork.ContentLine>
                    )

                  })}
                  <MasterDocFork.ContentLine style={{ marginTop: '10px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', marginRight: '80px' }}>Общение</span>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE_SEARCH'}
                      valueType='text'
                      required={false}
                      widthType={'px'}
                      widthValue={300}
                      heightValue={'56px'}
                      label={"Поиск по сообщениям"}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      css={{
                        fontSize: '12px',
                        position: 'relative',
                        boxSizing: 'border-box',
                        marginBottom: '8px',
                        backgroundColor: 'white'
                      }}
                    />
                  </MasterDocFork.ContentLine>
                  <ChatFork.ChatBody
                    border={`1px solid ${chatBorderColor}`}
                    backgroundColor={chatBackground}
                    style={{ marginTop: '18px', height: 'auto' }}
                  >
                    <ChatFork.ChatBodyInner
                      border={`1px solid transparent`}
                      backgroundColor={chatBackground}
                    >
                      <ChatMessagesContainer
                        data={[
                          { 
                            date: '05.01.2022', 
                            messages: [
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:05',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:05',
                                    likes: 0  }
                                ]
                              },
                              { 
                                type: 'you', 
                                content: [
                                  { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', 
                                    time: '20:06',
                                    name: 'Виолетта',
                                    likes: 0,
                                    files: {
                                      id: 'undefined',
                                      ext: 'doc',
                                      name: 'План_Склада.doc'
                                    }},
                                ]
                              },
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:08',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'you', 
                                content: [
                                  { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:08',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'you', 
                                content: [
                                  { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'action', 
                                content: [
                                  { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:08',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:08',
                                    likes: 0 },
                                ]
                              },
                            ]
                          }
                        ]}
                      />
                    </ChatFork.ChatBodyInner>
                    <div style={bottomDivCSS}>
                      <div style={bottomDivInnerCSS}>
                        <div style={clipDivCSS}>
                          <img
                            alt={""}
                            src={clipIcon}
                          />
                        </div>
                        <InputComponent
                          type={'TEXT_INPUT_OUTLINE'}
                          valueType='text'
                          required={false}
                          widthType={'%'}
                          widthValue={100}
                          heightValue={'50px'}
                          label={"Lorem ipsum dolor sit amet consectetur adipisicing elit"}
                          isError={false}
                          isDisabled={true}
                          labelShrinkLeft={"0px"}
                          innerLabel={null}
                          css={{
                            fontSize: '12px',
                            position: 'relative',
                            boxSizing: 'border-box',
                            marginTop: '0px',
                            backgroundColor: inputBackground,
                            marginRight: '12px'
                          }}
                        />
                        <ButtonComponent
                          inner={""} 
                          type='ICON_BUTTON_CHAT_SUBMIT' 
                          action={() => console.log('this is button')}
                          actionData={null}
                          widthType={'px'}
                          widthValue={56}
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
                            backgroundColor: chatSubmitColor,
                            width: '56px',
                            height: '56px',
                          }}
                        />
                      </div>
                    </div>
                  </ChatFork.ChatBody>
                </MasterDocFork.ChatContainer>
            </React.Fragment> 
            : contentType === 'AgreementCC'

            /* ---------------------------------------- */
            /* базовое окно для доп соглашения
            /* ---------------------------------------- */

            ? <React.Fragment>
                <MasterDocFork.ChatContainer style={{ paddingTop: '40px', height: 'auto', minHeight: '100vh' }} backgroundColor={backgroundColor}>
                  <MasterDocFork.CloseIconContainer>
                    <MasterDocFork.CloseIcon onClick={showrightContent}>
                      <img
                        alt={""} 
                        src={closeIcon}  
                      />
                    </MasterDocFork.CloseIcon>
                  </MasterDocFork.CloseIconContainer>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '28px', margin: 0, marginBottom: 0 }}>Дополнительное соглашение</h3>
                    <ButtonComponent
                      inner={"Редактировать"} 
                      type='CONTAINED_DEFAULT' 
                      action={() => console.log('this is button')}
                      actionData={null}
                      widthType={'px'}
                      widthValue={160}
                      children={""}
                      childrenCss={undefined}
                      iconSrc={null}
                      iconCss={undefined}
                      muiIconSize={30}
                      MuiIconChildren={ArrowUpwardIcon}
                      css={{
                        position: 'absolute',
                        boxSizing: 'border-box',
                        padding: '4px',
                        backgroundColor: chatBorderColor,
                        color: greyColor,
                        width: '56px',
                        height: '43px',
                      }}
                    />
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '44px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', fontSize: '18px' }}>Изменить стоимость и сроки</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginTop: '34px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '200px', lineHeight: '22px' }}>Текущая стоимость заказа</span>
                    <span style={{ fontWeight: '700', display: 'block', fontSize: '18px' }}>200 000</span>
                    <div 
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        position: 'relative',
                        width: '55%'
                      }}
                    >
                      <InputComponent
                        type={'TEXT_INPUT_OUTLINE'}
                        valueType='text'
                        required={false}
                        widthType={'%'}
                        widthValue={50}
                        heightValue={'56px'}
                        label={"Изменить на"}
                        isError={false}
                        isDisabled={false}
                        labelShrinkLeft={"0px"}
                        innerLabel={null}
                        css={{
                          fontSize: '12px',
                          position: 'relative',
                          boxSizing: 'border-box',
                          backgroundColor: 'white',
                          marginLeft: '20px'
                        }}
                      />
                      <InputComponent
                        type={'TEXT_INPUT_OUTLINE_DATE'}
                        valueType='text'
                        required={false}
                        widthType={'%'}
                        widthValue={50}
                        heightValue={'56px'}
                        label={"Дата окончания"}
                        isError={false}
                        isDisabled={false}
                        labelShrinkLeft={"0px"}
                        innerLabel={null}
                        css={{
                          fontSize: '12px',
                          position: 'relative',
                          boxSizing: 'border-box',
                          backgroundColor: inputBackground,
                          marginLeft: '20px'
                        }}
                      />
                    </div>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginTop: '34px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '200px', lineHeight: '22px' }}>Текущая стоимость аванса</span>
                    <span style={{ fontWeight: '700', display: 'block', fontSize: '18px' }}>50 000</span>
                    <div 
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        position: 'relative',
                        width: '55%'
                      }}
                    >
                      <InputComponent
                        type={'TEXT_INPUT_OUTLINE'}
                        valueType='text'
                        required={false}
                        widthType={'%'}
                        widthValue={50}
                        heightValue={'56px'}
                        label={"Изменить на"}
                        isError={false}
                        isDisabled={false}
                        labelShrinkLeft={"0px"}
                        innerLabel={null}
                        css={{
                          fontSize: '12px',
                          position: 'relative',
                          boxSizing: 'border-box',
                          backgroundColor: 'white',
                          marginLeft: '20px'
                        }}
                      />
                      <InputComponent
                        type={'TEXT_INPUT_OUTLINE'}
                        valueType='text'
                        required={false}
                        widthType={'%'}
                        widthValue={50}
                        heightValue={'56px'}
                        label={"Срок принятия решения"}
                        isError={false}
                        isDisabled={false}
                        labelShrinkLeft={"0px"}
                        innerLabel={null}
                        css={{
                          fontSize: '12px',
                          position: 'relative',
                          boxSizing: 'border-box',
                          backgroundColor: inputBackground,
                          marginLeft: '20px'
                        }}
                      />
                    </div>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginTop: '34px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '200px', lineHeight: '22px' }}>Текущая стоимость экспертизы</span>
                    <span style={{ fontWeight: '700', display: 'block', fontSize: '18px' }}>200 000</span>
                    <div 
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        position: 'relative',
                        width: '55%'
                      }}
                    >
                      <InputComponent
                        type={'TEXT_INPUT_OUTLINE'}
                        valueType='text'
                        required={false}
                        widthType={'%'}
                        widthValue={50}
                        heightValue={'56px'}
                        label={"Изменить на"}
                        isError={false}
                        isDisabled={false}
                        labelShrinkLeft={"0px"}
                        innerLabel={null}
                        css={{
                          fontSize: '12px',
                          position: 'relative',
                          boxSizing: 'border-box',
                          backgroundColor: 'white',
                          marginLeft: '20px'
                        }}
                      />
                      <InputComponent
                        type={'TEXT_INPUT_OUTLINE_DATE'}
                        valueType='text'
                        required={false}
                        widthType={'%'}
                        widthValue={50}
                        heightValue={'56px'}
                        label={"Дата экспертизы"}
                        isError={false}
                        isDisabled={false}
                        labelShrinkLeft={"0px"}
                        innerLabel={null}
                        css={{
                          fontSize: '12px',
                          position: 'relative',
                          boxSizing: 'border-box',
                          backgroundColor: inputBackground,
                          marginLeft: '20px'
                        }}
                      />
                    </div>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.Delimiter background={chatBorderColor} style={{ marginTop: '40px', marginBottom: '0px' }}/>
                  <MasterDocFork.ContentLine style={{ marginTop: '44px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', fontSize: '18px' }}>Добавить или удалить раздел</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '44px' }}>
                    <ChapterController 
                      isBottomButton={false}
                      marginBott={"0px"}
                    />
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '90px', marginBottom: '20px' }}>
                    <span
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        position: 'relative',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        padding: '3px',
                        backgroundColor: chatBorderColor,
                        cursor: 'pointer',
                        marginRight: '10px',
                      }}
                    >
                      <img
                        alt={""}
                        src={plus}
                      />
                    </span>
                    <span style={{ display: 'block', marginRight: '80px' }}>Добавить раздел</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.Delimiter background={chatBorderColor} style={{ marginTop: '40px', marginBottom: '0px' }}/>
                  <MasterDocFork.ContentLine style={{ marginTop: '44px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', fontSize: '18px' }}>Описание задачи</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '20px' }}>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={100}
                      heightValue={'50px'}
                      label={"Lorem ipsum dolor sit amet consectetur adipisicing elit"}
                      isError={false}
                      isDisabled={true}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      css={{
                        fontSize: '12px',
                        position: 'relative',
                        boxSizing: 'border-box',
                        marginTop: '0px',
                        backgroundColor: inputBackground,
                      }}
                    />
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-around', marginTop: '60px', marginBottom: '60px' }}>
                    <ButtonComponent
                      inner={"Предложить изменения"} 
                      type='CONTAINED_DEFAULT' 
                      action={showNewAgreement}
                      actionData={null}
                      widthType={'px'}
                      widthValue={228}
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
                        backgroundColor: chatSubmitColor,
                        width: '56px',
                        height: '43px',
                      }}
                    />
                  </MasterDocFork.ContentLine>
                </MasterDocFork.ChatContainer>
            </React.Fragment>
            : contentType === 'AgreementNewCC'

            /* ---------------------------------------- */
            /* базовое окно для доп соглашения - new
            /* ---------------------------------------- */

            ? <React.Fragment>
                <MasterDocFork.ChatContainer style={{ paddingTop: '40px', height: 'auto', minHeight: '100vh' }} backgroundColor={backgroundColor}>
                  <MasterDocFork.CloseIconContainer>
                    <MasterDocFork.CloseIcon onClick={showrightContent}>
                      <img
                        alt={""} 
                        src={closeIcon}  
                      />
                    </MasterDocFork.CloseIcon>
                  </MasterDocFork.CloseIconContainer>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '28px', margin: 0, marginBottom: 0 }}>Дополнительное соглашение</h3>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '30px' }}>
                    <span style={{ display: 'block', marginRight: '80px' }}>Исполнитель предлагает внести следующие изменения</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '44px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', fontSize: '18px' }}>Изменить стоимость и сроки</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginTop: '34px', boxSizing: 'border-box', paddingRight: '40px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '30%', lineHeight: '22px' }}>Текущая стоимость заказа</span>
                    <div style={{ width: '15%' }}>
                      <span style={{ fontWeight: '700', display: 'block', fontSize: '18px', textAlign: 'left' }}>200 000</span>
                      <span style={{ fontSize: '12px', marginTop: '5px', display: 'block' }}>{"до 10.03.2023"}</span>
                    </div>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '35%', lineHeight: '22px' }}>Новая стоимость заказа</span>
                    <div style={{ width: '10%' }}>
                      <span style={{ fontWeight: '700', display: 'block', fontSize: '18px', color: chatSubmitColor }}>230 000</span>
                      <span style={{ fontSize: '12px', marginTop: '5px', display: 'block' }}>{"до 10.03.2023"}</span>
                    </div>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginTop: '34px', boxSizing: 'border-box', paddingRight: '40px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '30%', lineHeight: '22px' }}>Текущая стоимость аванса</span>
                    <div style={{ width: '15%' }}>
                      <span style={{ fontWeight: '700', display: 'block', fontSize: '18px', textAlign: 'left' }}>50 000</span>
                      <span style={{ fontSize: '12px', marginTop: '5px', display: 'block' }}>{"до 10.03.2023"}</span>
                    </div>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '35%', lineHeight: '22px' }}>Новая стоимость аванса</span>
                    <div style={{ width: '10%' }}>
                      <span style={{ fontWeight: '700', display: 'block', fontSize: '18px', color: chatSubmitColor }}>60 000</span>
                      <span style={{ fontSize: '12px', marginTop: '5px', display: 'block' }}>{"до 10.03.2023"}</span>
                    </div>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginTop: '34px', boxSizing: 'border-box', paddingRight: '40px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '30%', lineHeight: '22px' }}>Текущая стоимость экспертизы</span>
                    <div style={{ width: '15%' }}>
                      <span style={{ fontWeight: '700', display: 'block', fontSize: '18px', textAlign: 'left' }}>200 000</span>
                      <span style={{ fontSize: '12px', marginTop: '5px', display: 'block' }}>{"до 10.03.2023"}</span>
                    </div>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '35%', lineHeight: '22px' }}>Новая стоимость экспертизы</span>
                    <div style={{ width: '10%' }}>
                      <span style={{ fontWeight: '700', display: 'block', fontSize: '18px', color: chatSubmitColor }}>220 000</span>
                      <span style={{ fontSize: '12px', marginTop: '5px', display: 'block' }}>{"до 10.03.2023"}</span>
                    </div>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.Delimiter background={chatBorderColor} style={{ marginTop: '40px', marginBottom: '0px' }}/>
                  <MasterDocFork.ContentLine style={{ marginTop: '44px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', fontSize: '18px' }}>Добавить или удалить раздел</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '30px' }}>
                    <span style={{ display: 'block', marginRight: '80px' }}>{"Раздел удален"}</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '10px' }}>
                    <span style={{ display: 'block', marginRight: '80px', fontWeight: 'bold', color: chatSubmitColor }}>{"Пожарная безопасность"}</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '34px' }}>
                    <ChapterController 
                      isBottomButton={false}
                      marginBott={"0px"}
                    />
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '110px' }}>
                    <span style={{ display: 'block', marginRight: '80px' }}>{"Раздел добавлен"}</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '10px' }}>
                    <span style={{ display: 'block', marginRight: '80px', fontWeight: 'bold', color: chatSubmitColor }}>{"Вентиляция"}</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '34px' }}>
                    <ChapterController 
                      isBottomButton={false}
                      marginBott={"0px"}
                    />
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '100px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', fontSize: '18px' }}>Вентиляция</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '30px' }}>
                    <span style={{ lineHeight: '22px' }}>{ localText }</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '30px', marginBottom: '24px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block' }}>Вложения</span>
                  </MasterDocFork.ContentLine>
                  { Array(2)
                    .fill({ 
                      status: 'WHITE', 
                      data: { 
                        name: 'Акт_выполненных работ.pdf', 
                        date: '29.02.2023', 
                        statusName: 'Предложен' 
                      }
                    }).map((item, index) => {

                    return (
                      <MasterDocFork.ContentLine key={index}>
                        <DocumentLine
                          status={item.status}
                          data={item.data}
                        />
                      </MasterDocFork.ContentLine>
                    )

                  })}
                  <MasterDocFork.Delimiter background={chatBorderColor} style={{ marginTop: '34px', marginBottom: '35px' }}/>
                  <MasterDocFork.ContentLine>
                    <span style={{ fontWeight: 'bold', display: 'block', fontSize: '18px' }}>Описание задачи</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '30px', marginBottom: '14px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block' }}>Прежнее описание</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine>
                    <span style={{ lineHeight: '22px' }}>{ localText }</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '30px', marginBottom: '14px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block' }}>Предлагаемое описание</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine>
                    <span style={{ lineHeight: '22px', color: chatSubmitColor }}>{ localText }</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-around', marginTop: '60px', marginBottom: '60px' }}>
                    <ButtonComponent
                      inner={"Принять изменения"} 
                      type='CONTAINED_DEFAULT' 
                      action={() => console.log('this is button')}
                      actionData={null}
                      widthType={'px'}
                      widthValue={228}
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
                        backgroundColor: chatSubmitColor,
                        width: '56px',
                        height: '43px',
                      }}
                    />
                  </MasterDocFork.ContentLine>
                </MasterDocFork.ChatContainer>
            </React.Fragment>
            : contentType === 'LawyerCC' 
            
            /* ---------------------------------------- */
            /* базовое окно для помощи юриста
            /* ---------------------------------------- */

            ? <React.Fragment>
                <MasterDocFork.ChatContainer style={{ paddingTop: '40px', height: 'auto', minHeight: '100vh' }} backgroundColor={backgroundColor}>
                  <MasterDocFork.CloseIconContainer>
                    <MasterDocFork.CloseIcon onClick={showrightContent}>
                      <img
                        alt={""} 
                        src={closeIcon}  
                      />
                    </MasterDocFork.CloseIcon>
                  </MasterDocFork.CloseIconContainer>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginBottom: '22px' }}>
                    <h3 style={{ fontSize: '28px', margin: 0, marginBottom: 0 }}>Консультация юриста</h3>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginBottom: '30px' }}>
                    <span style={{ lineHeight: '22px' }}>{"Чтобы открыть спор или получить консультацию юриста, заполните форму ниже"}</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine>
                    <SelectField 
                      placeholder={"Получить консультацию"}
                      params={{ width: 420, mb: '0px', height: 50 }}
                      data={[
                        { value: '1', label: 'Получить консультацию' },
                        { value: '2', label: 'Открыть спор' },
                      ]}
                      multy={false}
                      action={() => {}}
                      actionType={""}
                      actionParams={[]}
                      showIcon={true}
                      icon={null}
                      iconStyles={{
                        marginTop: '-12px',
                        marginLeft: '6px',
                        width: '34px',
                      }}
                    />
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '20px' }}>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={100}
                      heightValue={'50px'}
                      label={"Lorem ipsum dolor sit amet consectetur adipisicing elit"}
                      isError={false}
                      isDisabled={true}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      css={{
                        fontSize: '12px',
                        position: 'relative',
                        boxSizing: 'border-box',
                        marginTop: '0px',
                        backgroundColor: inputBackground,
                      }}
                    />
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-around', marginTop: '50px', marginBottom: '60px' }}>
                    <ButtonComponent
                      inner={"Отправить данные"} 
                      type='CONTAINED_DEFAULT' 
                      action={showNewAgreement}
                      actionData={null}
                      widthType={'px'}
                      widthValue={228}
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
                        backgroundColor: chatSubmitColor,
                        width: '56px',
                        height: '43px',
                      }}
                    />
                  </MasterDocFork.ContentLine>
                </MasterDocFork.ChatContainer>
            </React.Fragment>
            : contentType === 'ArguementCC'

            /* ---------------------------------------- */
            /* базовое окно для открытого спора
            /* ---------------------------------------- */

            ? <React.Fragment>
                <MasterDocFork.ChatContainer style={{ paddingTop: '40px', height: 'auto', minHeight: '100vh' }} backgroundColor={backgroundColor}>
                  <MasterDocFork.CloseIconContainer>
                    <MasterDocFork.CloseIcon onClick={showrightContent}>
                      <img
                        alt={""} 
                        src={closeIcon}  
                      />
                    </MasterDocFork.CloseIcon>
                  </MasterDocFork.CloseIconContainer>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginBottom: '0px' }}>
                    <h3 style={{ fontSize: '28px', margin: 0, marginBottom: 0 }}>Карточка спора</h3>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <span style={{ fontWeight: 'bold', display: 'block', marginRight: '30px' }}>Юрист</span>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          position: 'relative'
                        }}
                      >
                        <img
                          alt={""}
                          src={defaulrAvatar}
                          style={{
                            display: 'block',
                            position: 'relative',
                            width: '56px',
                            marginRight: '20px'
                          }}
                        />
                        <div 
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            position: 'relative',
                            marginTop: '0px'
                          }}
                        >
                          <span style={{ fontSize: '16px', width: '200px', marginBottom: '0px', lineHeight: '22px', fontWeight: '500' }}>Петров Иван Владимирович</span>
                        </div>
                      </div>
                    </div>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '44px', marginBottom: '24px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', fontSize: '18px' }}>Претензия</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginBottom: '0px' }}>
                    <span style={{ lineHeight: '22px' }}>{ localText }</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginTop: '40px', marginBottom: '0px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '50%' }}>Общая сумма заказа</span>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '50%', marginLeft: '20px' }}>Заморожено</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginTop: '10px', marginBottom: '40px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '50%', fontSize: '20px' }}>{"200 000"}₽</span>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '50%', fontSize: '20px', marginLeft: '20px' }}>{"30 000"}₽</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine>
                    <MasterDocFork.WhiteContainer width={"50%"}>
                      <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '20px' }}>Истец</span>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          position: 'relative'
                        }}
                      >
                        <img
                          alt={""}
                          src={defaulrAvatar}
                          style={{
                            display: 'block',
                            position: 'relative',
                            width: '56px',
                            marginRight: '20px'
                          }}
                        />
                        <div 
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            position: 'relative',
                            marginTop: '-6px'
                          }}
                        >
                          <span style={{ fontSize: '16px', width: '200px', marginBottom: '6px', lineHeight: '22px', fontWeight: '500' }}>Петров Иван Владимирович</span>
                          <span style={{ fontSize: '14px', color: greyColor2 }}>ООО Технические Системы</span>
                        </div>
                      </div>
                    </MasterDocFork.WhiteContainer>
                    <span style={{ width: '20px' }}/>
                    <MasterDocFork.WhiteContainer width={"50%"}>
                      <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '20px' }}>Ответчик</span>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          position: 'relative'
                        }}
                      >
                        <img
                          alt={""}
                          src={defaulrAvatar}
                          style={{
                            display: 'block',
                            position: 'relative',
                            width: '56px',
                            marginRight: '20px'
                          }}
                        />
                        <div 
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            position: 'relative',
                            marginTop: '-6px'
                          }}
                        >
                          <span style={{ fontSize: '16px', width: '200px', marginBottom: '6px', lineHeight: '22px', fontWeight: '500' }}>Захарова Виолетта Владимировна</span>
                          <span style={{ fontSize: '14px', color: greyColor2 }}>Самозанятый</span>
                        </div>
                      </div>
                    </MasterDocFork.WhiteContainer>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.Delimiter background={chatBorderColor} style={{ marginTop: '60px', marginBottom: '0px' }}/>
                  <MasterDocFork.ContentLine style={{ marginTop: '38px', marginBottom: '24px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', fontSize: '18px' }}>Решение</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine>
                    <MasterDocFork.WhiteContainer width={"50%"} style={{ height: '150px' }}>
                      <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '20px' }}>В чью пользу</span>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          position: 'relative'
                        }}
                      >
                        <img
                          alt={""}
                          src={defaulrAvatar}
                          style={{
                            display: 'block',
                            position: 'relative',
                            width: '56px',
                            marginRight: '20px'
                          }}
                        />
                        <div 
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            position: 'relative',
                            marginTop: '-6px'
                          }}
                        >
                          <span style={{ fontSize: '16px', width: '200px', marginBottom: '6px', lineHeight: '22px', fontWeight: '500' }}>Петров Иван Владимирович</span>
                          <span style={{ fontSize: '14px', color: greyColor2 }}>ООО Технические Системы</span>
                        </div>
                      </div>
                    </MasterDocFork.WhiteContainer>
                    <span style={{ width: '20px' }}/>
                    <MasterDocFork.WhiteContainer width={"50%"} style={{ height: '150px' }}>
                      <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '20px' }}>Распределение средств</span>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          position: 'relative',
                          width: '100%'
                        }}
                      >
                        <span style={{ fontWeight: 'bold', display: 'block', width: '50%', fontSize: '20px' }}>{"200 000"}₽</span>
                        <span style={{ fontWeight: 'bold', display: 'block', width: '50%', fontSize: '20px' }}>{"50 000"}₽</span>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          position: 'relative',
                          width: '100%',
                          marginTop: '5px'
                        }}
                      >
                        <span style={{ display: 'block', width: '50%' }}>Истец</span>
                        <span style={{ display: 'block', width: '50%' }}>Ответчик</span>
                      </div>
                    </MasterDocFork.WhiteContainer>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '30px', marginBottom: '10px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '50%' }}>Комментарий</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginBottom: '30px' }}>
                    <span style={{ lineHeight: '22px' }}>{ localText }</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginBottom: '48px' }}>
                    <ButtonComponent
                      inner={"Согласен"} 
                      type='CONTAINED_DEFAULT' 
                      action={() => {}}
                      actionData={null}
                      widthType={'px'}
                      widthValue={150}
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
                        backgroundColor: chatSubmitColor,
                        width: '56px',
                        height: '43px',
                      }}
                    />
                    <ButtonComponent
                      inner={"Не согласен"} 
                      type='CONTAINED_DEFAULT' 
                      action={() => {}}
                      actionData={null}
                      widthType={'px'}
                      widthValue={160}
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
                        backgroundColor: inputBackground,
                        color: greyColor,
                        width: '56px',
                        height: '43px',
                        marginLeft: '20px'
                      }}
                    />
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.Delimiter background={chatBorderColor} style={{ marginTop: '0px', marginBottom: '46px' }}/>
                  <MasterDocFork.ContentLine style={{ marginTop: '0px', marginBottom: '20px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', marginRight: '80px' }}>Общение</span>
                  </MasterDocFork.ContentLine>
                  <ChatFork.ChatHeader>
                    <div style={divCSS}>
                      <ChatFork.ChatHeaderAvatar style={avatarContainerCSS}>
                        <img
                          alt={""}
                          src={defaulrAvatar}
                          style={avatarCSS}
                        />
                        <img
                          alt={""}
                          src={defaulrAvatar}
                          style={{ ...avatarCSS, marginLeft: '-14px' }}
                        />
                        <img
                          alt={""}
                          src={defaulrAvatar}
                          style={{ ...avatarCSS, marginLeft: '-14px' }}
                        />
                      </ChatFork.ChatHeaderAvatar>
                    </div>
                    <div style={divCSS}>
                      <ChatFork.ChatHeaderEnableDocs>
                        <span style={{ ...lastActiveSpanCSS, fontSize: '15px' }}>Документы</span>
                        <Switch color={"primary"} defaultChecked />
                      </ChatFork.ChatHeaderEnableDocs>
                      <InputComponent
                        type={'TEXT_INPUT_OUTLINE_SEARCH'}
                        valueType='text'
                        required={false}
                        widthType={'px'}
                        widthValue={300}
                        heightValue={'56px'}
                        label={"Поиск по сообщениям"}
                        isError={false}
                        isDisabled={false}
                        labelShrinkLeft={"0px"}
                        innerLabel={null}
                        css={{
                          fontSize: '12px',
                          position: 'relative',
                          boxSizing: 'border-box',
                          marginBottom: '8px',
                          backgroundColor: 'white'
                        }}
                      />
                    </div>
                  </ChatFork.ChatHeader>
                  <ChatFork.ChatBody
                    border={`1px solid ${chatBorderColor}`}
                    backgroundColor={chatBackground}
                    style={{ marginTop: '12px', height: 'auto' }}
                  >
                    <ChatFork.ChatBodyInner
                      border={`1px solid transparent`}
                      backgroundColor={chatBackground}
                    >
                      <ChatMessagesContainer
                        data={[
                          { 
                            date: '05.01.2022', 
                            messages: [
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:05',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:05',
                                    likes: 0  }
                                ]
                              },
                              { 
                                type: 'you', 
                                content: [
                                  { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', 
                                    time: '20:06',
                                    name: 'Виолетта',
                                    likes: 0,
                                    files: {
                                      id: 'undefined',
                                      ext: 'doc',
                                      name: 'План_Склада.doc'
                                    }},
                                ]
                              },
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:08',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'you', 
                                content: [
                                  { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:08',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'you', 
                                content: [
                                  { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'action', 
                                content: [
                                  { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:08',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:08',
                                    likes: 0 },
                                ]
                              },
                            ]
                          }
                        ]}
                      />
                    </ChatFork.ChatBodyInner>
                    <div style={bottomDivCSS}>
                      <div style={bottomDivInnerCSS}>
                        <div style={clipDivCSS}>
                          <img
                            alt={""}
                            src={clipIcon}
                          />
                        </div>
                        <InputComponent
                          type={'TEXT_INPUT_OUTLINE'}
                          valueType='text'
                          required={false}
                          widthType={'%'}
                          widthValue={100}
                          heightValue={'50px'}
                          label={"Lorem ipsum dolor sit amet consectetur adipisicing elit"}
                          isError={false}
                          isDisabled={true}
                          labelShrinkLeft={"0px"}
                          innerLabel={null}
                          css={{
                            fontSize: '12px',
                            position: 'relative',
                            boxSizing: 'border-box',
                            marginTop: '0px',
                            backgroundColor: inputBackground,
                            marginRight: '12px'
                          }}
                        />
                        <ButtonComponent
                          inner={""} 
                          type='ICON_BUTTON_CHAT_SUBMIT' 
                          action={() => console.log('this is button')}
                          actionData={null}
                          widthType={'px'}
                          widthValue={56}
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
                            backgroundColor: chatSubmitColor,
                            width: '56px',
                            height: '56px',
                          }}
                        />
                      </div>
                    </div>
                  </ChatFork.ChatBody>
                </MasterDocFork.ChatContainer>
            </React.Fragment> 
            : contentType === 'EditProfileCC'

            /* ---------------------------------------- */
            /* базовое окно для редактирования профиля
            /* ---------------------------------------- */

            ? <React.Fragment>
                <EditProfileFork.Container backgroundColor={backgroundColor} style={{ paddingBottom: '28px' }}>
                  <EditProfileFork.CloseIconContainer>
                    <EditProfileFork.CloseIcon onClick={showrightContent}>
                      <img
                        alt={""} 
                        src={closeIcon}  
                      />
                    </EditProfileFork.CloseIcon>
                  </EditProfileFork.CloseIconContainer>
                  <EditProfileFork.ContentLine>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '60px' }}>
                      <img
                        alt={""}
                        src={defaulrAvatar}
                        style={{ width: '150px' }}
                      />
                      <span 
                        style={{ color: chatSubmitColor, marginTop: '16px', cursor: 'pointer' }}
                        onClick={changeAvatar}
                      >Сменить</span>
                    </div>
                    <div>
                      <EditProfileFork.ContentLine>
                        <span style={{ fontWeight: 'bold', marginLeft: '20px' }}>Самозанятой гражданин</span>
                      </EditProfileFork.ContentLine>
                      <EditProfileFork.ContentLine style={{ marginTop: '20px' }}>
                        <InputComponent
                          type={'TEXT_INPUT_OUTLINE'}
                          valueType='text'
                          required={false}
                          widthType={'%'}
                          widthValue={33}
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
                            marginRight: '20px'
                          }}
                        />
                        <InputComponent
                          type={'TEXT_INPUT_OUTLINE'}
                          valueType='text'
                          required={false}
                          widthType={'%'}
                          widthValue={33}
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
                            marginRight: '20px'
                          }}
                        />
                        <InputComponent
                          type={'TEXT_INPUT_OUTLINE'}
                          valueType='text'
                          required={false}
                          widthType={'%'}
                          widthValue={33}
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
                      </EditProfileFork.ContentLine>
                    </div>
                  </EditProfileFork.ContentLine>
                  <EditProfileFork.Delimiter style={{ marginTop: '50px', marginBottom: '44px' }} />
                  <EditProfileFork.ContentLine>
                    <span style={{ fontWeight: 'bold', marginLeft: '0px' }}>Специализация</span>
                  </EditProfileFork.ContentLine>
                  <EditProfileFork.ContentLine style={{ marginTop: '16px' }}>
                    <SelectField 
                      placeholder={"Выберите специализацию [ список временно сокращен ]"}
                      params={{ width: 1400, mb: '0px', height: 50 }}
                      data={[
                        { value: 1, label: 'Геодезические изыскания' },
                        { value: 2, label: 'Геологические изыскания' },
                        { value: 3, label: 'Гидрометеорология' },
                        { value: 4, label: 'Экологические изыскания' },
                        { value: 5, label: 'Исторические изыскания' },
                        { value: 6, label: 'Обследование констукций' },
                      ]}
                      multy={true}
                      action={() => {}}
                      actionType={""}
                      actionParams={[]}
                      showIcon={true}
                      icon={null}
                      iconStyles={{
                        marginTop: '-12px',
                        marginLeft: '6px',
                        width: '34px',
                      }}
                    />
                  </EditProfileFork.ContentLine>
                  <EditProfileFork.ContentLine style={{ marginTop: '30px' }}>
                    <span style={{ fontWeight: 'bold', marginLeft: '0px' }}>Мои навыки</span>
                  </EditProfileFork.ContentLine>
                  <EditProfileFork.ContentLine style={{ marginTop: '14px' }}>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="female" control={<Radio />} label="2D" />
                      <FormControlLabel value="male" control={<Radio />} label="3D" />
                      <FormControlLabel value="other" control={<Radio />} label="BIM" />
                    </RadioGroup>
                  </EditProfileFork.ContentLine>
                  <EditProfileFork.ContentLine style={{ marginTop: '16px' }}>
                    <span style={{ fontWeight: 'bold', marginLeft: '0px' }}>Информация о себе</span>
                  </EditProfileFork.ContentLine>
                  <EditProfileFork.ContentLine style={{ marginTop: '16px' }}>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={100}
                      heightValue={'50px'}
                      label={"Введите описание"}
                      isError={false}
                      isDisabled={true}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ "", () => null ]}
                      css={{
                        fontSize: '12px',
                        position: 'relative',
                        boxSizing: 'border-box',
                        marginBottom: '0px',
                        marginTop: '0px',
                        backgroundColor: 'white'
                      }}
                    />
                  </EditProfileFork.ContentLine>
                  <EditProfileFork.Delimiter style={{ marginTop: '50px', marginBottom: '44px' }} />
                  <EditProfileFork.ContentLine style={{ marginTop: '0px' }}>
                    <span style={{ fontWeight: 'bold', marginLeft: '0px' }}>Пройти проверку квалификации</span>
                  </EditProfileFork.ContentLine>
                  <EditProfileFork.ContentLine style={{ marginTop: '16px', marginBottom: '34px' }}>
                    <SelectField 
                      placeholder={"Выберите из списка"}
                      params={{ width: 420, mb: '0px', height: 50 }}
                      data={[
                        { value: '1', label: '[ options download ]' },
                      ]}
                      multy={true}
                      action={() => {}}
                      actionType={""}
                      actionParams={[]}
                      showIcon={true}
                      icon={null}
                      iconStyles={{
                        marginTop: '-12px',
                        marginLeft: '6px',
                        width: '34px',
                      }}
                    />
                  </EditProfileFork.ContentLine>
                  { Array(2)
                    .fill({ 
                      status: 'WHITE', 
                      data: { 
                        name: 'Акт_выполненных работ.pdf', 
                        date: '29.02.2023', 
                        statusName: 'Подписан' 
                      }
                    }).map((item, index) => {

                    return (
                      <MasterDocFork.ContentLine key={index}>
                        <DocumentLine
                          status={item.status}
                          data={item.data}
                        />
                      </MasterDocFork.ContentLine>
                    )

                  })}
                </EditProfileFork.Container>
            </React.Fragment>: <React.Fragment></React.Fragment> }

        </ShadowContainerInner>
      </ShadowContainer>
    </React.Fragment>
  )

}

export default RightContentContainer