import React, { useState } from 'react';
import styled from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Avatar, TextareaAutosize } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from './features/counter/userSlice';
import ImageIcon from '@mui/icons-material/Image';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

const PostModal = (props) => {
  const user = useSelector(selectUser);
  const [editorText, setEditorText] = useState('');
  const [shareImage, setShareImage] = useState('');

  const { isModalOpen, closeModal } = props;

  const isPostButtonDisabled = editorText.trim().length === 0;

  const reset = (e) => {
    setEditorText('');
    props.handleClick(e);
  };

  const handlePost = (e) => {
    e.preventDefault();
    // Logic for posting the content
    setEditorText('');
    closeModal();
  };

  return (
    <Container style={{ display: isModalOpen ? 'block' : 'none' }}>
      <Content>
        <HeaderPostModal>
          <h2>Create a Post</h2>
          <button onClick={closeModal}>
            <CloseRoundedIcon />
          </button>
        </HeaderPostModal>
        <SharedContent>
          <UserInfo>
            <Avatar className="sidebar_avatar" src={user?.photoUrl}>
              {user?.email[0]}
            </Avatar>
            <span>{user?.displayName}</span>
          </UserInfo>
          <Editor>
            <TextareaAutosize
              value={editorText}
              onChange={(e) => setEditorText(e.target.value)}
              placeholder="What do you want to talk about?"
              autoFocus={true}
            ></TextareaAutosize>
          </Editor>
        </SharedContent>
        <SharedCreation>
          <AttachAssets>
            <div>
              <ImageIcon />
            </div>
            <div>
              <VideocamRoundedIcon />
            </div>
          </AttachAssets>
          <ShareComment>
            <div>
              <ChatBubbleOutlineOutlinedIcon />
            </div>
          </ShareComment>
          <PostButton
            disabled={isPostButtonDisabled}
            onClick={handlePost}
          >
            Post
          </PostButton>
        </SharedCreation>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const HeaderPostModal = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    border-radius: 50%;
    img,
    svg {
      pointer-events: none;
    }
  }
  h2 {
    font-size: 20px;
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border-radius: 50%;
    img {
      box-shadow: none;
      background-color: transparent;
    }
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  > div {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  div {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    svg {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? 'rgba(0, 0, 0, 0.8)' : '#0a66c2')};
  color: ${(props) => (props.disabled ? 'rgba(1, 1, 1, 0.2)' : 'white')};
  &:hover {
    background: ${(props) => (props.disabled ? 'rgba(0, 0, 0, 0.08)' : '#004182')};
  }
`;

export default PostModal;
