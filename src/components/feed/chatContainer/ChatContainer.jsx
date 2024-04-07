import React, { useContext } from 'react'
import './ChatContainer.css'
import Logo from '../../../assets/logo.svg'
import { Context } from '../../../context/context'

const ChatContainer = () => {
    const { resultData, user, recentPrompt, loading } = useContext(Context);
    return (
        <div className='chat-container'>
            <div className='container-title'>
                <img src={user.profilephoto} alt="" />
                <p>{recentPrompt}</p>
            </div>
            <div className="container-data">
                <img src={Logo} alt="" />
                {
                    loading
                        ? <div className='loader'>
                            <hr />
                            <hr />
                            <hr />
                        </div>
                        :
                        <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                }
            </div>
        </div>
    )
}

export default ChatContainer
