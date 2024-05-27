import "./leftBar.scss";
import Friends from "./../../assets/icons/1.png";
import Groups from "./../../assets/icons/2.png";
import Market from "./../../assets/icons/3.png";
import Watch from "./../../assets/icons/4.png";
import Memories from "./../../assets/icons/5.png";
import Events from "./../../assets/icons/6.png";
import Gaming from "./../../assets/icons/7.png";
import Gallery from "./../../assets/icons/8.png";
import Videos from "./../../assets/icons/9.png";
import Messages from "./../../assets/icons/10.png";
import Tutorials from "./../../assets/icons/11.png";
import Courses from "./../../assets/icons/12.png";
import Fund from "./../../assets/icons/13.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);

  const { isPending, data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      makeRequest.get("/users/find/" + currentUser.id).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="leftBar">
      <div className="container">
        {/* Container for main menu */}
        <div className="menu">
          {isPending ? (
            "Loading.."
          ) : (
            <a
              href={`/meso-social/profile/${data.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="user">
                <img
                  src={process.env.PUBLIC_URL + "/upload/" + data.profilePic}
                  alt=""
                />
                <span>{data.name}</span>
              </div>
            </a>
          )}
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt="" />
            <span>Market</span>
          </div>
          <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        {/* Container for shortcuts menu*/}
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Events} alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        {/* Container for others menu */}
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Tutorials} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="" />
            <span>Courses</span>
          </div>
          <div className="item">
            <img src={Fund} alt="" />
            <span>Fund</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
