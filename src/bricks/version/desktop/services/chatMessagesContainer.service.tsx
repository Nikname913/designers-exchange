import React from 'react'
import { useAppSelector } from '../../../store/hooks'
import { IChatMessageContainer } from '../../../models-ts/services/chat-message-container.models'
import css from '../styles/services/chatMessagesContainer.css'

const { GetMessageContainer, 
  SendMessageContainer,
  DateTitle,
  Message,
  MessageTime } = css

const ChatMessagesContainer: React.FC<IChatMessageContainer> = (props: IChatMessageContainer) => {

  const { data } = props

  const messageBackground = useAppSelector(state => state.theme.bg)
  const timeColor = useAppSelector(state => state.theme.grey2)

  return (
    <React.Fragment>
      { data.map(( item: { date: string, messages: Array<any> }, index: number ): React.ReactNode | React.ReactFragment => {

        return (
          <React.Fragment key={index}>
            <DateTitle>{ item.date }</DateTitle>
            <React.Fragment>{ item.messages.map(
              ( mess: { type: string, content: Array<{ text: string, time: string }> } ): React.ReactNode | React.ReactFragment => {

                return (
                  <React.Fragment>
                    { mess.type === 'me' 
                      ? <React.Fragment>

                        { mess.content.map(( oneMess: { text: string, time: string }, oneIndex: number ): React.ReactNode => {

                          return (
                            <SendMessageContainer>
                              <Message backgroundColor={messageBackground}>
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

                        { mess.content.map(( oneMess: { text: string, time: string }, oneIndex: number ): React.ReactNode => {

                          return (
                            <GetMessageContainer>
                              <Message backgroundColor={messageBackground}>
                                { oneMess.text }
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
                  </React.Fragment>
                )

            })}</React.Fragment>
          </React.Fragment>
        )    

      })}
    </React.Fragment>
  )

}

export default ChatMessagesContainer