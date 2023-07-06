import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from './features/counter/userSlice';
import { Avatar, Button, Dialog, DialogContent, DialogTitle, IconButton, Input } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { addPost } from './features/counter/userSlice';
import './PostModal.css';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebee';

function PostModal({ isModalOpen, closeModal }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendPost = (e) => {
    e.preventDefault();

    console.log(`hello`)
      const docRef =  addDoc(collection(db, 'post'), {
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
        },}
  };

  return (
    <Dialog open={isModalOpen} onClose={closeModal}>
      <DialogTitle>Create a post</DialogTitle>
      <IconButton className="postModal__close" onClick={closeModal}>
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <div className="postModal__header">
          <Avatar src={user.photoUrl}>{user.email[0]}</Avatar>
          <h3>{user.displayName}</h3>
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
