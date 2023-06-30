import React, { useEffect, useState } from 'react'
import { addDoc, collection, onSnapshot,setInput } from "firebase/firestore";
import { db } from "./firebee";
import './Feed.css';
import Post from './Post';
import CreateIcon from '@mui/icons-material/Create';
import InputOption from './InputOption';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import CalendarViewDayRoundedIcon from '@mui/icons-material/CalendarViewDayRounded';



import 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
// Other necessary imports




function Feed() {
    const [input,setInput]=React.useState('');
    const [post, setState] = React.useState([]);

    React.useEffect(() => {
      onSnapshot(collection(db, "Post"), (snapshot) => {
        setState(snapshot.docs);
        // console.log(snapshot.docs)
        snapshot.docs.forEach((doc) => {
          console.log(doc.data());
        });
      });
    }, []);

    const sendPost = async (e) => {
        e.preventDefault();
      
        try {
          const docRef = await addDoc(collection(db, "Post"), {
            name: 'Riddhi Kulkarni',
            description: 'Test',
            message: input,
            photoUrl: '',
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
            <div className='feed__input'>
                <CreateIcon/>
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type="text"/>
                    <button onClick={sendPost} type='submit'>Send</button>
                </form>

            </div>
            <div className="feed_inputOptions">
                <InputOption Icon={ImageIcon} title='Photo' color="#70B5F9"/>
                <InputOption Icon={SubscriptionsRoundedIcon} title='Video' color="#E7A33E"/>
                <InputOption Icon={EventNoteRoundedIcon} title='Event' color="#C0CBCD"/>
                <InputOption Icon={CalendarViewDayRoundedIcon} title='Write article' color="#7FC15E"/>


            </div>
        </div>

        {/* Posts */}
        {post.map(({id, data:{name,description, message, photoUrl }})=>(
        <Post
           key={id}
           name={name}
           description={description}
           message={message}
           photoUrl={photoUrl}
        />))}



        
        </div>
  )
}

export default Feed