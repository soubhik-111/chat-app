import React, { useState } from 'react'
import "./Join.css"
import logo from '../../image/logo.png'

const Join = ({setUser}) => {

    const [name, setname] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        setUser(name)
    }
    return (
        <div className='JoinPage'>
            <form onSubmit={handleSubmit} className="JoinContainer">
                <img src={logo} alt="logo" className='JoinLogo' />
                <h1>Edu Chat</h1>
                <input type="text" onChange={(e) => { setname(e.target.value) }} id="JoinInput" placeholder='Enter Your Name' />
                <button id='JoinBtn' >Log In</button>
            </form>
        </div>
    )
}

export default Join;