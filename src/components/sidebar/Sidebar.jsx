import React, { useContext } from 'react'
import Logo from '../../assets/logo.svg'
import { IoIosCreate } from "react-icons/io";
import './Sidebar.css'
import Chats from './chat/Chats';
import axios from 'axios';
import { Context } from '../../context/context';
import { MdOutlineLogout } from "react-icons/md";
import { toast } from 'react-toastify'

axios.defaults.withCredentials = true;

const Sidebar = () => {

    const { sidebarOpen, user, newChat, isAuth, setUser, setIsAuth } = useContext(Context);

    const handleLogout = async () => {
        try {
            const res = await axios.get(`https://chatily-ai-backend.onrender.com/api/user/logout`);
            setUser({});
            toast.success(res.data.message);
            setIsAuth(false);
        } catch (err) {
            toast.error(err.response.data.message)
        }
    }

    return (
        <>
            {
                sidebarOpen ? (
                    <div className='sidebar'>
                        <div className='chat-data'>
                            <div className='newChat' onClick={() => newChat()}>
                                <div className="newChat-info">
                                    <img src={Logo} />
                                    <p>New chat</p>
                                </div>
                                <div className='newChat-icon'>
                                    <IoIosCreate size={23} color="white" />
                                </div>
                            </div>
                            <Chats />
                        </div>
                        {
                            isAuth ? (
                                <div className='account'>
                                    <div className='account-info'>
                                        <img src={user?.profilephoto} alt="" />
                                        <h4>{user?.username}</h4>
                                    </div>
                                    <div className='logout' onClick={handleLogout}>
                                        <MdOutlineLogout size={20} color='white' />
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                ) : null
            }
        </>
    )
}

export default Sidebar
