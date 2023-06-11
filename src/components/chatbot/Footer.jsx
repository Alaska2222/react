import React from 'react'
import {BsFillChatRightTextFill} from "react-icons/bs"
import {useNavigate } from "react-router-dom";


export const Footer = () => {
    const navigate = useNavigate();
    const handleChatStart = () => {
        navigate("/chat")
      }
  return (
    <footer>
    <div className="footer-block">
        <BsFillChatRightTextFill size={40} onClick={handleChatStart}
        onMouseOver={({target})=>target.style.color="rgba(10, 110, 198, 0.875)"}
        onMouseOut={({target})=>target.style.color="rgba(85, 85, 85)"}>
        </BsFillChatRightTextFill>
        <h2>To start a conversation in chat, click on this icon</h2> 
    </div>
</footer>
  )
}
