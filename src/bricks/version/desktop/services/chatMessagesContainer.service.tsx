import React, { useState } from 'react'
import { useAppSelector } from '../../../store/hooks'
import { IChatMessageContainer } from '../../../models-ts/services/chat-message-container-models'
import CommunicationTable from '../views/localViews/CommunicationTable'
import css from '../styles/services/chatMessagesContainer.css'
import { CSSProperties } from 'styled-components'

import defaultAvatar from '../../../img/stock/avatar.svg'
import semiMenu from '../../../img/icons/semiMenu.svg'
import like from '../../../img/icons/like.svg'
import pdf from '../../../img/icons/files/base/pdf.svg'
import doc from '../../../img/icons/files/base/doc.svg'
import xls from '../../../img/icons/files/base/xls.svg'

const { GetMessageContainer, 
  SendMessageContainer,
  DateTitle,
  Message,
  MessageTime,
  MessageFileLine,
  MessageFileLineFileIcon,
  MessageFileLineFileText } = css

const ChatMessagesContainer: React.FC<IChatMessageContainer> = (props: IChatMessageContainer) => {

  const { data } = props
  const [ showLikes, setShowLikes ] = useState<boolean>(false)

  const messageBackground = useAppSelector(state => state.theme.bg)
  const messageMeBackground = useAppSelector(state => state.theme.blue3)
  const timeColor = useAppSelector(state => state.theme.grey2)
  const sizeColor = useAppSelector(state => state.theme.grey)

  const userContainerCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    width: '100%',
    marginBottom: '12px'
  }
  const userNameCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    fontWeight: 'bold',
  }
  const userAvatarCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    width: '30px',
    height: '30px',
    marginRight: '15px'
  }
  const avatarCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '30px',
  }
  const likeContainerCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
    width: '24px',
    height: '24px',
    left: '100%',
    top: '100%',
    marginTop: '-24px',
    marginLeft: '-16px',
    cursor: 'pointer',
  }
  const likeCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '24px',
  }
  const fileIconCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '50px'
  }
  const semiMenuCSS: CSSProperties = {
    display: 'block',
    position: 'absolute',
    left: '100%',
    height: '18px',
    marginTop: '-20px',
    marginLeft: '-14px',
    cursor: 'pointer'
  }

  return (
    <React.Fragment>
      { data.map(( item: { date: string, messages: Array<any> } | null, index: number ): React.ReactNode | React.ReactFragment => {

        return (
          item ? <React.Fragment key={index}>
            <DateTitle>{ item.date }</DateTitle>
            <React.Fragment>{ item.messages.map(
              ( mess: { 
                type: string, 
                content: Array<{ text: string, time: string }>,
                name?: string,
                files?: any,
                likes?: number 
              } ): React.ReactNode | React.ReactFragment => {

                return (
                  <React.Fragment>
                    { mess.type === 'me' 
                      ? <React.Fragment>

                        { mess.content.map(( oneMess: { text: string, time: string }, oneIndex: number ): React.ReactNode => {

                          return (
                            <SendMessageContainer>
                              <Message backgroundColor={messageMeBackground}>
                                { oneMess.text }
                                <MessageTime 
                                  color={timeColor}
                                  marginLeft={"-44px"}
                                  left={"0%"}
                                >
                                  { oneMess.time }
                                </MessageTime>
                              </Message>
                            </SendMessageContainer>
                          )

                        }) }

                      </React.Fragment> 
                      : <React.Fragment>

                        { mess.content.map(( oneMess: 
                        { text: string, 
                          time: string, 
                          name?: string,
                          files?: any,
                          likes?: number }, oneIndex: number ): React.ReactNode => {

                          return (
                            <GetMessageContainer>
                              <Message
                                onMouseOver={() => setShowLikes(true)} 
                                backgroundColor={messageBackground}
                              >
                                { oneMess.name && 
                                  <div style={userContainerCSS}>
                                    <div style={userAvatarCSS}>
                                      <img
                                        alt={""}
                                        src={defaultAvatar}
                                        style={avatarCSS}
                                      />
                                    </div>
                                    <span style={userNameCSS}>{ oneMess.name }</span>
                                  </div> 
                                }
                                { oneMess.text }
                                { oneMess.likes === 0 && <React.Fragment>
                                  {( showLikes || !showLikes ) && <div style={ oneMess.likes === 0 ? { ...likeContainerCSS, opacity: 0.5 } : { ...likeContainerCSS }}>
                                    <img
                                      alt={""}
                                      src={like}
                                      style={likeCSS}
                                    />
                                  </div> }
                                </React.Fragment> }
                                { oneMess.files && <MessageFileLine>

                                  <MessageFileLineFileIcon>
                                    { oneMess.files.ext === 'doc' && <img alt={""} src={doc} style={fileIconCSS} /> }
                                    { oneMess.files.ext === 'xls' && <img alt={""} src={xls} style={fileIconCSS} /> }
                                    { oneMess.files.ext === 'pdf' && <img alt={""} src={pdf} style={fileIconCSS} /> }
                                  </MessageFileLineFileIcon>
                                  <MessageFileLineFileText>
                                    <span style={{ fontWeight: 'bold' }}>{ oneMess.files.name }</span>
                                    <span style={{ fontSize: '12px', color: sizeColor }}>{"250 Mb"}</span>
                                  </MessageFileLineFileText>
                                  <img
                                    alt={""}
                                    src={semiMenu}
                                    style={semiMenuCSS}
                                  />

                                </MessageFileLine> }
                                <MessageTime 
                                  color={timeColor}
                                  marginLeft={"14px"}
                                  left={"100%"}
                                >
                                  { oneMess.time }
                                </MessageTime>
                              </Message>
                            </GetMessageContainer>
                          )

                        }) }

                      </React.Fragment> 
                    }

                    { mess.type === 'action' && <React.Fragment>
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
                    </React.Fragment> } 

                  </React.Fragment>
                
                )

            })}</React.Fragment>
          </React.Fragment> : <SendMessageContainer>

            <span 
              style={{ 
                color: timeColor,
                width: '100%',
                textAlign: 'center',
                marginTop: '38.6px' 
              }}
            >
              В этом диалоге пока нет сообщений
            </span>

          </SendMessageContainer>
        )    

      })}
    </React.Fragment>
  )

}

export default ChatMessagesContainer