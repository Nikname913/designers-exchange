import React from "react"

const SocketChat: React.FC = () => {

  return <React.Fragment>
    <section 
      style={{
        display: 'block',
        position: 'absolute',
        top: '50vh',
        left: '50%',
        zIndex: 10,
        marginLeft: '-400px',
        marginTop: '-300px',
        width: '800px',
        height: '600px',
        borderRadius: '10px',
        boxShadow: '10px 18px 8px rgba(163,163,163,0.02), 6px 10px 7px rgba(163,163,163,0.07), 2px 4px 5px rgba(163,163,163,0.11), 1px 1px 3px rgba(163,163,163,0.13), 0px 0px 0px rgba(163,163,163,0.13)'
      }}
    >
      <ul className="pages">
        <li style={{ borderRadius: '10px' }} className="chat_page">
          <div className="chat_area">
            <ul className="messages"></ul>
          </div>
          <input
            type="text"
            placeholder="Напишите ваше сообщение..."
            className="message_input"
          />
        </li>
        <li style={{ borderRadius: '10px' }} className="login_page">
          <div className="form">
            <h3 className="title">ОПРЕДЕЛЕНИЕ ПОЛЬЗОВАТЕЛЯ СИСТЕМЫ</h3>
            <input 
              type="text" 
              maxLength={30} 
              className="username_input"
              placeholder="Введите ваше обозначение" 
            />
          </div>
        </li>
      </ul>
    </section>
  </React.Fragment>

}

export default SocketChat