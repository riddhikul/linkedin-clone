import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './header.css';
import HeaderOption from './HeaderOption';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import TextsmsRoundedIcon from '@mui/icons-material/TextsmsRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from './features/counter/userSlice';
import { auth } from './firebee';





function Header() {
  //const user = useSelector(selectUser);
  const dispatch=useDispatch();

  const logoutOfApp=()=>{
    dispatch(logout())
    auth.signOut();
  }
  return (
    // class header begins 
    <div className='header'>
      {/* <h1>This is a header</h1> */}
      <div className="header__left">
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#0076b2" d="M116 3H12a8.91 8.91 0 0 0-9 8.8v104.42a8.91 8.91 0 0 0 9 8.78h104a8.93 8.93 0 0 0 9-8.81V11.77A8.93 8.93 0 0 0 116 3z"/><path fill="#fff" d="M21.06 48.73h18.11V107H21.06zm9.06-29a10.5 10.5 0 1 1-10.5 10.49a10.5 10.5 0 0 1 10.5-10.49m20.41 29h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75v32H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53z"/></svg> */}
        <img src="https://api.iconify.design/devicon/linkedin.svg"  alt=""/>
         


        <div className="header__search">
          <SearchIcon/>
          <input placeholder="Search" type='text'/>



        </div>
        </div>
        <div className='header__right'>
          <HeaderOption Icon={HomeRoundedIcon} title='Home' />
          <HeaderOption Icon={SupervisorAccountRoundedIcon}  title='My Network'/>
          <HeaderOption Icon={BusinessCenterRoundedIcon}  title='Jobs'/>
          <HeaderOption Icon={TextsmsRoundedIcon}  title='Messaging'/>
          <HeaderOption Icon={NotificationsRoundedIcon}  title='Notifications'/>
          {/* <HeaderOption avatar={Mypic} title="Me"/> */}
          <HeaderOption avatar title="Me" onClick={logoutOfApp}/>


          




        </div>
      


    </div> //header class ends 
  );
}

export default Header;
