import React, { useState } from 'react';
import { Messege } from './Messege';
import { AiOutlineSend } from 'react-icons/ai';

export const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };
  const token = window.localStorage.getItem('token')
  const decodedToken = atob(token);
  const [username] = decodedToken.split(':');
  const handleSendMessage = () => {
    if (inputText.trim() !== '' && localStorage.getItem('token') !== null) {
      const newMessage = {
        text: inputText,
        name: username,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };
  
  return (
    <div className="chat">
      <div className="chat-info">
        {messages.map((message, index) => (
          <Messege
            key={index}
            class={index % 2 === 0 ? 'message-blue' : 'message-grey'}
            text={message.text}
            user={username}
          />
        ))}
      </div>
      <div className="input-field">
        <input
          type="text"
          placeholder="Type something..."
          value={inputText}
          onChange={handleInputChange}
        />
        <AiOutlineSend
          size={55}
          className="send-icon"
          color="rgba(41, 124, 219, 0.875)"
          onMouseOver={({ target }) => (target.style.color = '#555')}
          onMouseOut={({ target }) =>
            (target.style.color = 'rgba(41, 124, 219, 0.875)')
          }
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};
