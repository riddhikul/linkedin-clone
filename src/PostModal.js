import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, addPost } from './features/counter/userSlice';
import { Avatar, Button, Dialog, DialogContent, DialogTitle, IconButton, Input } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebee';
import './PostModal.css';

function PostModal({ isModalOpen, closeModal }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendPost = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'post'), {
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

      dispatch(addPost(newPost));
      setInput('');
      closeModal();
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <Dialog open={isModalOpen} onClose={closeModal}>
      <DialogTitle>Create a post</DialogTitle>
      <IconButton className="postModal__close" onClick={closeModal}>
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <div className="postModal__header">
          {user && (
            <>
              <Avatar src={user.photoUrl}>{user.email[0]}</Avatar>
              <h3>{user.displayName}</h3>
            </>
          )}
        </div>
        <div className="postModal__body">
          <Input
            placeholder="What do you want to talk about?"
            className="postModal__input"
            autoFocus
            type="text"
            value={input}
            onChange={handleInputChange}
          />
        </div>
        <div className="postModal__footer">
          <Button className="postModal__send" onClick={handleSendPost}>
            Send
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PostModal;
