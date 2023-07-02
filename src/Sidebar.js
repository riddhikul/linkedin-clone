import { Avatar } from '@mui/material';
import React from 'react'
import './Sidebar.css';
import { useSelector } from 'react-redux';
import { selectUser } from './features/counter/userSlice';

function Sidebar() {
  //getting user info from redux store 
  const user = useSelector(selectUser);

// creating a function
const recentItem=(topic)=>(
  <div className='sidebar_recentItem'>
    <span className='sidebar_hash'>#</span>
    <p>{topic}</p>
  </div>
);



  return (
    <div className="sidebar">
        
        <div className='sidebar__top'>
            <img src="./images/banner_default.jpg" alt=''/>
            <Avatar className='sidebar_avatar' src={user.photoUrl}>{user.email[0]}</Avatar>
            
            <h2>{user.displayName}</h2>
            <h4>{user.email}</h4>


        </div>

        <div className="sidebar__stats">
           <div className='sidebar_stat'>
            <p>Who viewed you</p>
            <p className="sidebar_statNumber">1000</p>
           </div>
           <div className='sidebar_stat'>
            <p>Impressions of your post </p>
            <p className="sidebar_statNumber">5,466</p>
           </div>


        </div>

        <div className='sidebar_bottom'>
            <p>Recent</p>
            {recentItem('reactjs')}
            {recentItem('programming')}
            {recentItem('design')}
            {recentItem('softwareengineering')}
        </div>

    </div>
  )
}

export default Sidebar