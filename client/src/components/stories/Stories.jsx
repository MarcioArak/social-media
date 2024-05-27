import React, { useContext } from "react";
import "./stories.scss";
import defaultCover from "./../../assets/pictures/people1.jpg";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const { isPending, data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      makeRequest.get("/users/find/" + currentUser.id).then((res) => {
        return res.data;
      }),
  });

  // TEMPORARY DATA
  const stories = [
    {
      id: 1,
      name: "Marcio Arakaki",
      img: defaultCover,
    },
    {
      id: 2,
      name: "Marcio Arakaki",
      img: defaultCover,
    },
    {
      id: 3,
      name: "John Doe",
      img: defaultCover,
    },
    {
      id: 4,
      name: "John Doe",
      img: defaultCover,
    },
    {
      id: 5,
      name: "John Doe",
      img: defaultCover,
    },
    {
      id: 6,
      name: "John Doe",
      img: defaultCover,
    },
    {
      id: 7,
      name: "John Doe",
      img: defaultCover,
    },
    {
      id: 8,
      name: "John Doe",
      img: defaultCover,
    },
    {
      id: 9,
      name: "John Doe",
      img: defaultCover,
    },
  ];

  return (
    <div className="stories">
      <div className="userStory">
        {isPending ? (
          "Loading.."
        ) : (
          <img
            src={process.env.PUBLIC_URL + "/upload/" + data.profilePic}
            alt=""
          />
        )}
        <span>Add Story</span>
        <button>+</button>
      </div>
      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
