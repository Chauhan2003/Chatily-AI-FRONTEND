import React, { useContext } from 'react'
import './Feed.css'
import Logo from '../../assets/logo.svg'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosCreate } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Input from './inputField/Input';
import { Context } from '../../context/context';
import ChatContainer from './chatContainer/ChatContainer';

const Feed = () => {

    const { sidebarOpen, setSidebarOpen, showResult, newChat } = useContext(Context);

    const handleOpenSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <div className='feed'>
            {
                !sidebarOpen ? (
                    <div className='new-chat' onClick={() => newChat()}>
                        <IoIosCreate size={23} color="white" />
                    </div>
                ) : null
            }
            {
                !showResult ? (
                    <div className='prev-content'>
                        <div className='logo'>
                            <img className='logo-img' src={Logo} alt="logo.svg" />
                            <div className='context'>
                                How can I help you today?
                            </div>
                        </div>
                    </div>
                ) : <ChatContainer />
            }
            <div className='bottom-area'>
                <Input />
                <p>Gemini can make mistakes. Consider checking important information.</p>
            </div>
            <div className='sidebar-opener' onClick={handleOpenSidebar}>
                {
                    !sidebarOpen ? (
                        <IoIosArrowForward className='open' size={25} color='gray' />
                    ) : (
                        <IoIosArrowBack className='close' size={25} color='gray' />
                    )
                }
            </div>
        </div>
    )
}

export default Feed
