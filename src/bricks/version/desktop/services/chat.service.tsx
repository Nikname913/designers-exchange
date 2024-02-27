import React, { ReactElement } from "react"
import css from "../styles/services/chatMessagesPolling.css"

const { ChatContainer } = css

const PollingChat: React.FC = (): ReactElement => {
  return (
    <React.Fragment>
      <ChatContainer></ChatContainer>
    </React.Fragment>
  )
}

export default PollingChat