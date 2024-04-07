import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import Home from './screens/Home';
import Register from './screens/auth/Register';
import Login from './screens/auth/Login';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from './context/context';

axios.defaults.withCredentials = true;

const App = () => {
  const { isAuth, setIsAuth, setUser } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserValid = async () => {
      try {
        const res = await axios.get(`https://chatily-ai-backend.onrender.com/api/user/`);
        setUser(res?.data?.user);
        setIsAuth(true);
      } catch (err) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };
    checkUserValid();
  }, [setIsAuth, setUser]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ fontSize: '30px' }}>Loading...</div>
      </div>
    );
  }


  return (
    <div className='app'>
      <Routes>
        {/* <Route path='/login' element={!isAuth ? <Login /> : <Navigate to='/' />} />
        <Route path='/register' element={!isAuth ? <Register /> : <Navigate to='/' />} />
        <Route path='/' element={isAuth ? <Home /> : <Navigate to="/login" />} /> */}
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
