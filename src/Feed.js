import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { Avatar } from "@mui/material";
import "./Feed.css";
import Post from "./Post";
import InputOption from "./InputOption";
import ImageIcon from "@mui/icons-material/Image";
import SubscriptionsRoundedIcon from "@mui/icons-material/SubscriptionsRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import CalendarViewDayRoundedIcon from "@mui/icons-material/CalendarViewDayRounded";
import FlipMove from "react-flip-move";
import { db } from "./firebee";
import PostModal from "./PostModal";
import { selectUser, selectPosts, addPost } from "./features/counter/userSlice";

function Feed() {
  const user = useSelector(selectUser);
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPostsLoaded, setIsPostsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "post"), orderBy("timestamp", "desc")),
      (snapshot) => {
        const postData = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        dispatch(addPost(postData));
        setIsPostsLoaded(true);
        localStorage.setItem("posts", JSON.stringify(postData));
      }
    );

    const savedPosts = JSON.parse(localStorage.getItem("posts"));
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedVideo(file);
    }
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
              onClick={openModal}
              type="text"
              readOnly
            />
          </div>
        </div>
        <div className="feed_inputOptions">
          <label htmlFor="image-upload">
            <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <label htmlFor="video-upload">
            <InputOption
              Icon={SubscriptionsRoundedIcon}
              title="Video"
              color="#7FC15E"
            />
          </label>
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            style={{ display: "none" }}
          />
          <InputOption
            Icon={EventNoteRoundedIcon}
            title="Event"
            color="#E7A33E"
          />
          <InputOption
            Icon={CalendarViewDayRoundedIcon}
            title="Write article"
            color="#E32423"
          />
        </div>
      </div>

      <PostModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedImage={selectedImage}
        selectedVideo={selectedVideo}
      />

      {isPostsLoaded && Array.isArray(posts) ? (
        <FlipMove>
          {posts
            .slice()
            .sort((a, b) => b.data.timestamp - a.data.timestamp)
            .map(({ id, data }) => {
              if (!data || !data.name) {
                return null;
              }
              const { name, description, message, photoUrl, timestamp } = data;
              console.log({ name, description, message, photoUrl, timestamp });
              return (
                <Post
                  key={id}
                  name={name}
                  description={description}
                  message={message}
                  photoUrl={photoUrl}
                  timestamp={timestamp}
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
