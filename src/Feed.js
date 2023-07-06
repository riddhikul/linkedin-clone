import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  collection,
  onSnapshot,
  serverTimestamp,
  addDoc,
} from 'firebase/firestore';
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
import { selectUser, selectPosts, addPost } from './features/counter/userSlice';

function Feed() {
  const user = useSelector(selectUser);
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostsLoaded, setIsPostsLoaded] = useState(false); // New state variable

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'post'), (snapshot) => {
      const postData = snapshot.docs
        .map((doc) => ({ id: doc.id, data: doc.data() }))
        .reverse();
      dispatch(addPost(postData.reverse()));
      setIsPostsLoaded(true);
      localStorage.setItem('posts', JSON.stringify(postData)); // Store posts in local storage
    });

    // Retrieve posts from local storage on component mount
    const savedPosts = JSON.parse(localStorage.getItem('posts'));
    if (savedPosts && savedPosts.length > 0) {
      dispatch(addPost(savedPosts));
      setIsPostsLoaded(true);
    }

    return () => unsubscribe();
  }, [dispatch]);

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
            <input
              placeholder="Start a post"
              onClick={openModal} // Open the post modal when clicked
              type="text"
              readOnly
            />
          </div>
        </div>
        <div className="feed_inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
          <InputOption
            Icon={SubscriptionsRoundedIcon}
            title="Video"
            color="#7FC15E"
          />
          <InputOption Icon={EventNoteRoundedIcon} title="Event" color="#E7A33E" />
          <InputOption
            Icon={CalendarViewDayRoundedIcon}
            title="Write article"
            color="#E32423"
          />
        </div>
      </div>

      <PostModal isModalOpen={isModalOpen} closeModal={closeModal} />

      {isPostsLoaded && Array.isArray(posts) ? (
  <FlipMove>
    {posts.slice().reverse().map(({ id, data }) => {
      if (!data) {
        return null;
      }
      const { name, description, message, photoUrl } = data;
      if (!name) {
        return null;
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
  </FlipMove>
) : (
  <p>Loading posts...</p>
)}

  

</div>
);
}

export default Feed;  