import React, { useEffect, useState } from 'react';
import socketIO from "socket.io-client";
import ReactScrollToBottom from "react-scroll-to-bottom";

import "./Chat.css";
import Message from "../Message/Message.js";
import sendImg from "../../image/send.png";
import AddImg from "../../image/plus-icon.png";
import closeImg from "../../image/close.png";
import File from '../File/File.js';



const ENDPOINT = "https://chat-app-6v8k.onrender.com"

let socket, selectedFile = null, fileName = null;

const Chat = ({user, setUser}) => {

  const [id, setid] = useState("")
  const [msg, setmsg] = useState([])
  
  console.log(msg)

  const send = () => {
    const message = document.getElementById('ChatInput').value;
    socket.emit('message', { message, id })
    document.getElementById('ChatInput').value = "";
  }

  const selectFile = () => {
    const file = document.createElement("input");
    const sendFileBtn = document.getElementById("sendFileBtn");
    const addBtn = document.getElementById("addBtn");
    file.type = "file";
    file.addEventListener('change', function () {
      fileName = this.files[0].name
      selectedFile = this.files[0]
      sendFileBtn.style.display = "block";
      addBtn.style.display = "none";
      sendFileBtn.style.backgroundColor = "green";
    });
    file.click();
    
    file.remove()
  }

  const sendFile = () => {
    const sendFileBtn = document.getElementById("sendFileBtn");
    const addBtn = document.getElementById("addBtn");
    socket.emit("uploadDocument", { documentData:{selectedFile,fileName}, id });
    selectedFile = null
    sendFileBtn.style.display = "none";
    addBtn.style.display = "block";
    sendFileBtn.style.backgroundColor = "red";
  }

  useEffect(() => {

    socket = socketIO(ENDPOINT, { transports: ['websocket'] });

    socket.on('connect', () => {
      console.log("Connected");
      setid(socket.id)
    })

    console.log(socket)
    socket.emit('joined', { user })

    socket.on('welcome', (data) => {
      setmsg(prevMsg => [...prevMsg, data])
      console.log(data.user, data.message)
    })

    socket.on('userJoined', (data) => {
      setmsg(prevMsg => [...prevMsg, data])
      console.log(data.user, data.message)
    })

    socket.on('leave', (data) => {
      setmsg(prevMsg => [...prevMsg, data])
      console.log(data.user, data.message)
    })

    return () => {
      socket.emit('disconnected')
      socket.off();
    }
  },[])

  useEffect(() => {
    socket.on('sendMessage', (data) => {
      setmsg(prevMsg => [...prevMsg, data])
      console.log(data.user, data.message, data.id)
    })
    socket.on('sendDocument', (data) => {
      setmsg(prevMsg => [...prevMsg, data])
      console.log(data)
    })
    return () => {
      socket.off()
    }
  }, [msg])

  return (
    <div className='ChatPage'>
      <div className="ChatContainer">
        <div className="ChatHeader">
          <h2>Edu Chat</h2>
          <img src={closeImg} alt="close" onClick={()=>{setUser(null)}} />
        </div>
        <ReactScrollToBottom className="ChatBox">
          {msg.map((item, i) => 
            item.message ?
            <Message user={item.id === id ? '' : item.user} message={item.message} key={i} classs={item.id === id ? 'left' : 'right'} /> :
            item.documentData ?
            <File user={item.id === id ? '' : item.user} documentData={item.documentData} key={i} classs={item.id === id ? 'left' : 'right'} /> :
            null
          )
          }
        </ReactScrollToBottom>
        <div className="InputBox">
          <input placeholder='Enter Your Message' type="text" id="ChatInput" onKeyDown={(e) => e.key === 'Enter' ? send() : ""} />
          <button className="SendBtn" id='addBtn' onClick={(selectFile)}><img src={AddImg} alt="send" /></button>
          <button className="SendBtn" id='sendFileBtn' onClick={sendFile}>Send</button>
          <button className="SendBtn" onClick={send}><img src={sendImg} alt="send" /></button>
        </div>
      </div>
    </div>
  )
}

export default Chat

