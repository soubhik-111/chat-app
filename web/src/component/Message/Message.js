import React from 'react';
import "./Message.css";
import copyIcon from "../../image/copy-icon.png"

const Message = ({ user, message, classs }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(message)
  }
  if (user) {
    return (
      <div className={`MessageBox ${classs}`}>
        <div className='MessageHeader'>
          <p>{user}</p>
          <img src={copyIcon} alt="copy" className='MessageCopyIcon' onClick={handleCopy} />
        </div>
        <div className='Message'>{message}</div>
      </div>
    )
  }

  return (
    <div className={`MessageBox ${classs}`}>
      <div className='MessageHeader'>
        <p>You</p>
        <img src={copyIcon} alt="copy" style={{ filter: "invert(0)" }} className='MessageCopyIcon' onClick={handleCopy} />
      </div>
      <div className='Message'>{message}</div>
    </div>
  )

}

export default Message
