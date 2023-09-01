import React from 'react'

const ChatConsole = ({children}) => {
  return (
    <pre className='chat-console'>
        <div className='chat-console__header'>
            <div className='chat-console__btn_copy'>Copy</div>
        </div>
        {children}
    </pre>
  )
}

export default ChatConsole