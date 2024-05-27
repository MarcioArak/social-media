import React from "react";
import "./post.scss";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import Comments from "../comments/Comments";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import moment from "moment";
import { useQueries, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Dropdown from "react-bootstrap/Dropdown";

const Post = ({ post }) => {
  const { currentUser } = useContext(AuthContext);
  const [commentOpen, setCommentOpen] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [desc, setDesc] = useState(post.desc);

  const [likeQuery, commentQuery] = useQueries({
    queries: [
      {
        queryKey: ["likes", post.id],
        queryFn: () =>
          makeRequest.get("/likes?postId=" + post.id).then((res) => {
            return res.data;
          }),
      },

      {
        queryKey: ["comments", post.id],
        queryFn: () =>
          makeRequest.get("/comments?postId=" + post.id).then((res) => {
            return res.data;
          }),
      },
    ],
  });

  const queryClient = useQueryClient();

  // Mutations
  // Copied and updated from the website the tanstack mutation
  const mutation = useMutation({
    mutationFn: (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["likes"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const editMutation = useMutation({
    mutationFn: (edit) => {
      return makeRequest.put("/posts/", edit);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleLike = () => {
    mutation.mutate(likeQuery.data.includes(currentUser.id));
  };

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  const handleEdit = () => {
    editMutation.mutate({
      desc: desc,
      postId: post.id,
    });
    setEditPost(false);
  };

  const handleShowEdit = () => {
    setEditPost((edit) => !edit);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src={process.env.PUBLIC_URL + "/upload/" + post.profilePic}
              alt=""
            />
            <div className="details">
              <a
                href={`/meso-social/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </a>
              <span className="time">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <Dropdown>
            <Dropdown.Toggle className="editButton">
              <MoreHorizIcon />
            </Dropdown.Toggle>
            {currentUser.id === post.userId && (
              <Dropdown.Menu align="end" className="dropdownMenu">
                <Dropdown.Item
                  className="item"
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={handleShowEdit}
                >
                  <EditSharpIcon />
                  Edit post
                </Dropdown.Item>
                <Dropdown.Item
                  className="item"
                  style={{
                    textDecoration: "none",
                    color: "red",
                  }}
                  onClick={handleDelete}
                >
                  <DeleteOutlineSharpIcon />
                  Delete post
                </Dropdown.Item>
              </Dropdown.Menu>
            )}
          </Dropdown>
        </div>
        <div className="content">
          {editPost ? (
            <div className="editPost">
              <textarea
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <button onClick={handleEdit}>Edit</button>
            </div>
          ) : (
            <p>{desc}</p>
          )}
          {/*get the destination where img is stored --NOTE 1-- */}
          <img src={process.env.PUBLIC_URL + "/upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item" onClick={handleLike}>
            {likeQuery.isPending ? (
              "Loading"
            ) : (
              <>
                {likeQuery.data.includes(currentUser.id) ? (
                  <FavoriteOutlinedIcon style={{ color: "red" }} />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
                {`${likeQuery.data.length} Likes`}
              </>
            )}
          </div>

          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {commentQuery.isPending
              ? "Comments"
              : `${commentQuery.data.length} Comments`}
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;

// NOTES
// Line 42
// process.env.PUBLIC_URL is used to access public file
