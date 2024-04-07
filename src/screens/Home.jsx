import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Feed from '../components/feed/Feed'
import './Home.css'

const Home = () => {
    return (
        <div className='home'>
            <Sidebar />
            <Feed />
        </div>
    )
}

export default Home
