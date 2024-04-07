import { createContext, useState } from "react";
import runChat from "../config/gemini";
import axios from 'axios';

export const Context = createContext();

const ContextProvider = (props) => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState({});
    const [input, setInput] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [resultData, setResultData] = useState('');
    const [recentPrompt, setRecentPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 75 * index)
    }

    const onSent = async (prompt) => {
        if (prompt == 'accesschat') {
            setResultData('');
            setLoading(true);
            setShowResult(true);
            setRecentPrompt(input);
            let result = await runChat(input);
            let resultArray = result.split("**");
            let newResult = "";

            for (let i = 0; i < resultArray.length; i++) {
                if (i == 0 || i % 2 != 1) {
                    newResult += resultArray[i];
                } else {
                    newResult += "<h2>" + resultArray[i] + "</h2>";
                }
            }
            let newResult2 = newResult.split("*").join("");
            let mainResult = newResult2.split(" ");
            for (let i = 0; i < mainResult.length; i++) {
                const nextWord = mainResult[i];
                delayPara(i, nextWord + " ");
            }
            setInput('');
            setLoading(false);
        }
        else if(prompt == 'createchat') {
            setResultData('');
            setLoading(true);
            setShowResult(true);
            setRecentPrompt(input);
            let result = await runChat(input);
            let resultArray = result.split("**");
            let newResult = "";

            for (let i = 0; i < resultArray.length; i++) {
                if (i == 0 || i % 2 != 1) {
                    newResult += resultArray[i];
                } else {
                    newResult += "<h2>" + resultArray[i] + "</h2>";
                }
            }
            let newResult2 = newResult.split("*").join("");
            let mainResult = newResult2.split(" ");
            for (let i = 0; i < mainResult.length; i++) {
                const nextWord = mainResult[i];
                delayPara(i, nextWord + " ");
            }
            try {
                const res = await axios.post(`https://chatily-ai-backend.onrender.com/api/chat/create`, { content: input });
                setInput('');
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
    }


    const contextValue = {
        sidebarOpen,
        setSidebarOpen,
        user,
        setUser,
        input,
        setInput,
        onSent,
        showResult,
        setShowResult,
        resultData,
        setResultData,
        recentPrompt,
        setRecentPrompt,
        loading,
        setLoading,
        newChat,
        isAuth,
        setIsAuth
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )

}

export default ContextProvider;