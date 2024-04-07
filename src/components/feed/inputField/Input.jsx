import React, { useContext, useState } from 'react'
import { FaArrowUp } from "react-icons/fa";
import './Input.css'
import { Context } from '../../../context/context';

const Input = () => {

    const { setInput, onSent, input } = useContext(Context);

    return (
        <div className='input'>
            <input type='text' className='input-area' value={input} onChange={(e) => setInput(e.target.value)} placeholder='Message Gemini...' />
            <div className='send-input' onClick={() => onSent('createchat')}>
                <FaArrowUp size={18} />
            </div>
        </div>
    )
}

export default Input
