import React from 'react'
import { CSSProperties } from 'styled-components'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { setShow } from '../../../store/slices/right-content-slice'
import Switch from '@mui/material/Switch'
import ButtonComponent from '../comps/button/Button'
import InputComponent from '../comps/input/Input'
import ChatMessagesContainer from './chatMessagesContainer.service'
import { IRightContentContainer } from '../../../models-ts/services/right-content-container-models'
import css from '../styles/services/rightContentContainer.css'
import closeIcon from '../../../img/icons/close.svg'
import defaulrAvatar from '../../../img/stock/avatar.svg'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import clipIcon from '../../../img/icons/clip.svg'

const { ShadowContainer, ShadowContainerInner, ChatFork } = css

const RightContentContainer: React.FC<IRightContentContainer> = (props: IRightContentContainer) => {

  const dispatch = useAppDispatch()

  const { contentType,
    scroll, 
    chatData: { 
      userID, 
      userName, 
      userLastctive 
    }
  } = props

  const backgroundColor = useAppSelector(state => state.theme.bg)
  const greyColor2 = useAppSelector(state => state.theme.grey2)
  const chatBorderColor = useAppSelector(state => state.theme.blue3)
  const chatBackground = useAppSelector(state => state.theme.white)
  const inputBackground = useAppSelector(state => state.theme.white)
  const chatSubmitColor = useAppSelector(state => state.theme.blue2)

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

  function showrightContent(): void {
    dispatch(setShow(false))
  }

  return (
    <React.Fragment>
      <ShadowContainer marginTop={scroll}>
        <ShadowContainerInner>

          { contentType === 'ECC' 
            ? <ChatFork.ChatContainer backgroundColor={backgroundColor} id={userID}>
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
            : <React.Fragment></React.Fragment> }

        </ShadowContainerInner>
      </ShadowContainer>
    </React.Fragment>
  )

}

export default RightContentContainer