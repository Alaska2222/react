import React from 'react'
import {ChatSideBar} from '../components/chatbot/ChatSideBar'
import {Chat} from '../components/chatbot/Chat'
import { AnimatedPage } from '../components/AnimatedPage';

const ChatBot = () => {
  
    return (
        <AnimatedPage>
        <div className='wrapper-chat'>
            <ChatSideBar />
          <div className="chat-block">
          <Chat />
          </div>
        </div>
        </AnimatedPage>
      )
    
}

export default ChatBot