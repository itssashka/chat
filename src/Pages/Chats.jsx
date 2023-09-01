import React from 'react'
import ChatsList from '../components/ChatsList/ChatsList'
import Chat from '../components/Chat/Chat'

const Chats = () => {
  return (
    <div className='chats'>
        <ChatsList/>
        <Chat/>
    </div>
  )
}

export default Chats