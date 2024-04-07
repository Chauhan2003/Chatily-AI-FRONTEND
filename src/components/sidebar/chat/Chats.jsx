import React, { useContext, useEffect, useState } from 'react';
import './Chats.css';
import { Context } from '../../../context/context';
import axios from 'axios';
import { MdDelete } from "react-icons/md";

axios.defaults.withCredentials = true;

const Chats = () => {
    const { sidebarOpen, setInput, onSent, input } = useContext(Context);
    const [chats, setChats] = useState([]);
    const [mess, setMess] = useState('');
    const [shouldFetchData, setShouldFetchData] = useState(true);

    useEffect(() => {
        const fetchAllMessage = async () => {
            try {
                const res = await axios.get(`https://chatily-ai-backend.onrender.com/api/chat/getall`);
                setChats(res.data.chats);
                // Set shouldFetchData to false after fetching data once
                setShouldFetchData(false);
            } catch (err) {
                console.log(err);
            }
        };
        if (shouldFetchData) {
            fetchAllMessage();
        }
    }, [shouldFetchData, sidebarOpen]);

    const handleDelete = async (chatId) => {
        try {
            await axios.delete(`https://chatily-ai-backend.onrender.com/api/chat/delete/${chatId}`);
            setShouldFetchData(true);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAccessChat = async (chatId) => {
        try {
            const res = await axios.get(`https://chatily-ai-backend.onrender.com/api/chat/accesschat/${chatId}`);
            const chatContent = res?.data?.chat?.content;
            setMess(chatContent);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (mess !== '') {
            setInput(mess);
            onSent('accesschat');
        }
    }, [mess, onSent]);


    return (
        <div className='chats'>
            <p>Recent messages</p>
            {
                chats.map((chat) => (
                    <div className='chat' key={chat._id}>
                        <div className='chat-content' onClick={() => handleAccessChat(chat._id)}>
                            {
                                chat.content.length < 20 ? chat.content : chat.content.slice(0, 22) + '...'
                            }
                        </div>
                        <div onClick={() => handleDelete(chat._id)} className='delete-mess'>
                            <MdDelete size={20} color='white' />
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Chats;
