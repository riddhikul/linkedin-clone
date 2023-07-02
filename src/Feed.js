import React, { useEffect, useState } from 'react'
import { addDoc, collection, onSnapshot,setInput } from "firebase/firestore";
import { auth, db } from "./firebee";
import './Feed.css';
import Post from './Post';
import CreateIcon from '@mui/icons-material/Create';
import InputOption from './InputOption';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import CalendarViewDayRoundedIcon from '@mui/icons-material/CalendarViewDayRounded';
import FlipMove from "react-flip-move";



import 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectUser } from './features/counter/userSlice';
import { Avatar } from '@mui/material';
// Other necessary imports




function Feed() {
    const user = useSelector(selectUser);
    const [input,setInput]=React.useState('');
    const [post, setState] = React.useState([]);

    React.useEffect(() => {
      onSnapshot(collection(db, "Post"), (snapshot) => {
        const postData = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
        }));
        setState(postData);
      });
    }, []);
    

    const sendPost = async (e) => {
        e.preventDefault();
      
        try {
          const docRef = await addDoc(collection(db, "Post"), {
            name: user.displayName,
            description: user.email,
            message: input,
            photoUrl: user.photoUrl || "" ,
            timestamp: serverTimestamp(),
          });
      
          console.log('Post added successfully. Document reference:', docRef);
          
        } catch (error) {
          console.error('Error adding post: ', error);
          
        }
      };
      
      



  return (
    <div className='feed'>
        <div className='feed_inputContainer'>
          <div className='feed_bar'>
          <Avatar className='feed__userPhoto' src={user.photoUrl}>{user.email[0]}</Avatar>

        {/* <img src={auth.currentUser.photoUrl} alt="User" className="feed__userPhoto" /> */}
            <div className='feed__input'>
         
                <CreateIcon/>
                <form>
                
                    <input placeholder="Start a post" value={input} onChange={e => setInput(e.target.value)} type="text"/>
                    <button onClick={sendPost} type='submit'>Send</button>
                </form>

            </div>
            </div>
            <div className="feed_inputOptions">
                <InputOption Icon={ImageIcon} title='Photo' color="#70B5F9"/>
                <InputOption Icon={SubscriptionsRoundedIcon} title='Video' color="#7FC15E"/>
                <InputOption Icon={EventNoteRoundedIcon} title='Event' color="#E7A33E"/>
                <InputOption Icon={CalendarViewDayRoundedIcon} title='Write article' color="#E32423"/>


            </div>
        </div>

        {/* Posts */}
        <FlipMove>
        {post.map(({id, data:{name,description, message, photoUrl }})=>(
        <Post
           key={id}
           name={name}
           description={description}
           message={message}
           photoUrl={photoUrl}
        />))}


</FlipMove>
        
        </div>
  )
}

export default Feed