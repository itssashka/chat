import React, { useEffect, useRef, useState } from 'react'
import SendBtn from '../UI/SendBtn';
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentChat, getCurrentMessage, getIsBotPrint, getMessages, sendMessageAsync, stopGenerating } from '../../store/chatSlice';
import hljs from 'highlight.js';
import StopGenerateBtn from '../UI/StopGenerateBtn';
import MyTextArea from '../UI/MyTextArea';

const Chat = () => {
    const [text, setText] = useState('');
    const messages = useSelector(getMessages);
    const currentMessage = useSelector(getCurrentMessage);
    const isBotPrint = useSelector(getIsBotPrint);
    const dispatch = useDispatch();
    const chatRef = useRef();
    const currentChat = useSelector(getCurrentChat);

    // useEffect(()=>{
    //     chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
    // },[messages, currentMessage])

    const sendMessage = (e) => {        
        e.preventDefault();
        setText('')
        dispatch(sendMessageAsync({content: text, role: 'user'}));
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(e);
        }
    }   

    const stop = () =>{
        stopGenerating();
    }

  return (
    <div className='chat'>
        <div className="chat__messages" ref={chatRef}>            
            {messages.map((message, idx) => <ChatMessage key={idx} message={message.content} role={message.role}/>)}
            {currentMessage && <ChatMessage message={currentMessage} role={'assistant'}/>}
        </div>
        <form action="#" className="chat__form" onSubmit={sendMessage}>
            {isBotPrint && <StopGenerateBtn onClick={stop}/>}
            <MyTextArea value={text} onChange={(e) => setText(e.target.value)} disabled={isBotPrint} onKeyPress={handleKeyPress}/>
            <SendBtn disabled={isBotPrint}/>            
        </form>       
    </div>
  )
}

export default Chat