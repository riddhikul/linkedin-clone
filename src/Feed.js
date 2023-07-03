import React, { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectUser } from './features/counter/userSlice';
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
  const [input, setInput] = useState('');
  const [post, setPost] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Post'), (snapshot) => {
      const postData = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setPost(postData.reverse()); // Reverse the array to display newest posts on top
    });

    return () => unsubscribe();
  }, []);

  const sendPost = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'Post'), {
        name: user.displayName,
        description: user.email,
        message: input,
        photoUrl: user.photoUrl || '',
        timestamp: serverTimestamp(),
      });

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

      setPost([newPost, ...post]); // Add the new post at the beginning of the array

      setInput('');
    } catch (error) {
      console.error('Error adding post:', error);
    }
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
              <button onClick={sendPost} type="submit">
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

      <FlipMove>
        {post.map(({ id, data: { name, description, message, photoUrl } }) => (
          <Post
            key={id}
            name={name}
            description={description}
            message={message}
            photoUrl={photoUrl}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
