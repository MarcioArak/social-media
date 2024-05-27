import React from "react";
import "./wallPosts.scss";
import Post from "../Post/Post";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const WallPost = ({ userId }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      makeRequest.get("/posts?userId=" + userId).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isPending
        ? "loading"
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default WallPost;
