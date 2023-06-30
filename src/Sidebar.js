import { Avatar } from '@mui/material';
import React from 'react'
import './Sidebar.css';

function Sidebar() {

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
            <img src="./images/INSPIRE.png" alt=''/>
            <Avatar className='sidebar_avatar' src="./images/Mepic.jpeg"/>
            <h2>Riddhi Kulkarni</h2>
            <h4>riddhikul26@gmail.com</h4>


        </div>

        <div className="sidebar__stats">
           <div className='sidebar_stat'>
            <p>Who viewed you</p>
            <p className="sidebar_statNumber">2,566</p>
           </div>
           <div className='sidebar_stat'>
            <p>Views on post </p>
            <p className="sidebar_statNumber">3,000</p>
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