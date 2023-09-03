import React, { useState } from 'react'
import ChatsList from '../components/ChatsList/ChatsList'
import Chat from '../components/Chat/Chat'
import Header from '../components/Header/Header'

const Chats = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openMenu = (e) => {
      e.preventDefault();
      setIsMenuOpen(!isMenuOpen)
    };

  return (
    <div className='chats'>
        <Header openMenu={openMenu}/> 
        <div className="chats__container">
          <ChatsList setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen}/>
          <Chat/>
        </div> 
        
    </div>
  )
}

export default Chats