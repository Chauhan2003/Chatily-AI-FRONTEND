import React, { useContext, useState } from 'react'
import Logo from '../../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'
import { Context } from '../../context/context'
import { toast } from 'react-toastify'

const Login = () => {

  const { setUser, setIsAuth } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password
    };

    try {
      const res = await axios.post(`https://chatily-ai-backend.onrender.com/api/user/login`, data);
      setUser(res?.data?.user);
      setIsAuth(true);
      toast.success(res.data.message);
      navigate('/');
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  return (
    <div className='login'>
      <div className="login-card">
        {/* form */}
        <form className='form' onSubmit={loginUser}>
          <div className='input-field'>
            <label>Email:</label>
            <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className='input-field'>
            <label>Password:</label>
            <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type='submit'>Login</button>
        </form>
        <p>Don't have an account? <Link className='link' to='/register'>Register</Link></p>
      </div>
      <div className='login-logo'>
        <img src={Logo} alt="" />
        <p>Chatily - AI</p>
      </div>
    </div>
  )
}

export default Login
