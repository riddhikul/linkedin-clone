import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { selectUser, selectPosts, addPost } from './features/counter/userSlice';
import { Avatar } from '@mui/material';
import './Feed.css';
import Post from './Post';
import InputOption from './InputOption';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import CalendarViewDayRoundedIcon from '@mui/icons-material/CalendarViewDayRounded';
import FlipMove from 'react-flip-move';
import { db } from './firebee';
import PostModal from './PostModal';



  function Feed() {
    const user = useSelector(selectUser);
    const posts = useSelector(selectPosts);
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, 'post'), (snapshot) => {
        const postData = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        dispatch(addPost(postData.reverse())); // Dispatch the addPost action with the posts in reverse order
      });
  
      return () => unsubscribe();
    }, [dispatch]);

  const sendPost = async (e) => {
    e.preventDefault();

    console.log(`hello`)
      const docRef =  await addDoc(collection(db, 'post'), {
        name: user.displayName,
        description: user.email,
        message: input,
        photoUrl: user.photoUrl || '',
        timestamp: serverTimestamp(),
      });
      console.log(docRef)

      const newPost = {
        id: docRef.id,
        data: {
          name: user.displayName,
          description: user.email,
          message: input,
          photoUrl: user.photoUrl || '',
          timestamp: new Date().getTime(),
        },
      };

      dispatch(addPost(newPost)); // Dispatch the addPost action with the new post
      setInput('');
    
      console.error('Error adding post:');
    
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="feed">
      <div className="feed_inputContainer">
        <div className="feed_bar">
          <Avatar className="feed__userPhoto" src={user.photoUrl}>
            {user.email[0]}
          </Avatar>
          <div className="feed__input">
            <form>
              <input
                placeholder="Start a post"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                onClick={openModal} // Open the post modal when clicked
              />
              <button onClick={(e)=> sendPost(e)}  type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
        <div className="feed_inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
          <InputOption Icon={SubscriptionsRoundedIcon} title="Video" color="#7FC15E" />
          <InputOption Icon={EventNoteRoundedIcon} title="Event" color="#E7A33E" />
          <InputOption Icon={CalendarViewDayRoundedIcon} title="Write article" color="#E32423" />
        </div>
      </div>

      <PostModal isModalOpen={isModalOpen} closeModal={closeModal} />

      {/* <FlipMove> */}
  {posts.map(({ id, data }) => {
    if (!data) {
      return null; // Skip rendering if data is undefined
    }
    const { name, description, message, photoUrl } = data;
    if (!name) {
      return null; // Skip rendering if 'name' is undefined
    }
    return (
      <Post
        key={id}
        name={name}
        description={description}
        message={message}
        photoUrl={photoUrl}
      />
    );
  })}
{/* </FlipMove> */}
    </div>
  );
}

export default Feed;
