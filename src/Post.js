import React, { forwardRef, useEffect } from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
import InputOption from "./InputOption";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import moment from "moment";

const Post = forwardRef(
  ({ name, description, message, photoUrl, timestamp }, ref) => {
    useEffect(() => {
      console.log(name, timestamp);
    }, []);
    return (
      <div ref={ref} className="post">
        <div className="post_header">
          <Avatar src={photoUrl}>{name && name[0]}</Avatar>

          <div className="post_info">
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
        </div>

        <div className="post_body">
          <p>{message}</p>
        </div>

        <div style={{ fontSize: "0.9rem", opacity: 0.7, marginTop: "1rem" }}>
          {timestamp
            ? moment(new Date(timestamp.seconds * 1000)).fromNow()
            : "..."}
        </div>

        <div className="post_button">
          <InputOption
            Icon={ThumbUpAltOutlinedIcon}
            title="Like"
            color="gray"
          />
          <InputOption Icon={ChatOutlinedIcon} title="Comment" color="gray" />
          <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" />
          <InputOption Icon={SendOutlinedIcon} title="Send" color="gray" />
        </div>
      </div>
    );
  }
);

export default Post;
