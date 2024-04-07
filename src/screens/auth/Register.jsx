import React, { useState } from 'react'
import Logo from '../../assets/logo.svg'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Register = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilephoto, setProfilePhoto] = useState('');

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', profilephoto);
    data.append('upload_preset', "Gemini");
    const cloudName = "dawqwxx0p";
    const resourceType = "image";
    const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    try {
      const cloudinaryResponse = await fetch(api, {
        method: 'POST',
        body: data
      });
      const cloudinaryData = await cloudinaryResponse.json();
      const { secure_url } = cloudinaryData;
      const photoURL = secure_url;

      console.log(photoURL);

      const reqData = {
        username: username,
        email: email,
        password: password,
        profilephoto: photoURL
      };

      const res = await axios.post(`https://chatily-ai-backend.onrender.com/api/user/register`, reqData);
      console.log(res.data.message);
      toast.success(res.data.message);
      navigate('/login');
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  return (
    <div className='register'>
      <div className="register-card">
        {/* profilephoto */}
        <label htmlFor="profile-photo-input" className='profile-photo'>
          <img src={profilephoto ? URL.createObjectURL(profilephoto) : 'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg'} alt="" />
          <input
            id="profile-photo-input"
            type="file"
            accept="image/*"
            style={{
              display: 'none'
            }}
            onChange={(e) => setProfilePhoto(e.target.files[0])}
          />
        </label>


        {/* form */}
        <form className='form' onSubmit={registerUser}>
          <div className='input-field'>
            <label>Username:</label>
            <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className='input-field'>
            <label>Email:</label>
            <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className='input-field'>
            <label>Password:</label>
            <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type='submit'>Register</button>
        </form>
        <p>Have an account? <Link className='link' to='/login'>Login</Link></p>
      </div>
      <div className='register-logo'>
        <img src={Logo} alt="" />
        <p>Chatily - AI</p>
      </div>
    </div>
  )
}

export default Register
