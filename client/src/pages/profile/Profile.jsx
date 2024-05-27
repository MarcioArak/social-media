import "./profile.scss";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import defaultCover from "./../../assets/pictures/meso-social-title.png";
import WallPost from "../../components/WallPosts/WallPosts";
import { useQueries, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const userId = useLocation().pathname.split("/")[3];

  const [userQuery, followQuery] = useQueries({
    queries: [
      {
        queryKey: ["users", userId],
        queryFn: () =>
          makeRequest.get("/users/find/" + userId).then((res) => {
            return res.data;
          }),
      },
      {
        queryKey: ["relationships"],
        queryFn: () =>
          makeRequest.get("/relationships/" + userId).then((res) => {
            return res.data;
          }),
      },
    ],
  });

  useEffect(() => {
    document.title = `Profile | ${
      userQuery.isPending ? "" : userQuery.data.name
    }`;
  });

  const queryClient = useQueryClient();

  // Mutations
  // Copied and updated from the website the tanstack mutation
  const mutation = useMutation({
    mutationFn: (following) => {
      if (following)
        return makeRequest.delete("/relationships?followId=" + userId);
      return makeRequest.post("/relationships", { followId: userId });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["relationships"] });
    },
  });

  const handleFollow = () => {
    mutation.mutate(followQuery.data.includes(currentUser.id));
  };

  return (
    <div className="profile">
      {userQuery.error ? (
        "Something went wrong"
      ) : userQuery.isPending ? (
        "Loading"
      ) : (
        <>
          <div className="images">
            {userQuery.data.coverPic ? (
              <img
                src={
                  process.env.PUBLIC_URL + "/upload/" + userQuery.data.coverPic
                }
                alt=""
                className="cover"
              />
            ) : (
              <img src={defaultCover} alt="" className="cover" />
            )}
            <img
              src={
                process.env.PUBLIC_URL + "/upload/" + userQuery.data.profilePic
              }
              alt=""
              className="profilePic"
            />
          </div>
          <div className="profileContainer">
            <div className="profileInfo">
              <div className="left">
                <a href="http://facebook.com" style={{ color: "inherit" }}>
                  <FacebookOutlinedIcon fontSize="large" />
                </a>
                <a href="http://twitter.com" style={{ color: "inherit" }}>
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="http://instagram.com" style={{ color: "inherit" }}>
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="http://linkedin.com" style={{ color: "inherit" }}>
                  <LinkedInIcon fontSize="large" />
                </a>
                <a href="http://pinterest.com" style={{ color: "inherit" }}>
                  <PinterestIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span>{userQuery.data.name}</span>
                <div className="info">
                  <div className="item">
                    <LocationOnIcon />
                    <span>{userQuery.data.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{userQuery.data.website}</span>
                  </div>
                </div>
                <div className="buttons">
                  {currentUser.id === userQuery.data.id ? (
                    <button onClick={() => setOpenUpdate(true)}>update</button>
                  ) : followQuery.isPending ? (
                    "loading"
                  ) : followQuery.data.includes(currentUser.id) ? (
                    <button className="unfollow" onClick={handleFollow}>
                      Unfollow
                    </button>
                  ) : (
                    <button className="follow" onClick={handleFollow}>
                      Follow
                    </button>
                  )}
                </div>
              </div>
              <div className="right">
                <MailOutlineIcon />
                <MoreVertIcon />
              </div>
            </div>
            <WallPost userId={userId} />
          </div>
        </>
      )}
      {openUpdate && (
        <Update setOpenUpdate={setOpenUpdate} user={userQuery.data} />
      )}
    </div>
  );
};

export default Profile;
