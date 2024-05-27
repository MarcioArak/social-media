import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Dropdown from "react-bootstrap/Dropdown";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { logout, currentUser } = useContext(AuthContext);

  const { isPending, data } = useQuery({
    queryKey: ["users" + currentUser.id],
    queryFn: () =>
      makeRequest.get("/users/find/" + currentUser.id).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="navbar">
      <div className="left">
        <div className="item">
          <Link to="/meso-social" style={{ textDecoration: "none" }}>
            <span>MeSo-Social</span>
          </Link>
        </div>
        <div className="item">
          <HomeOutlinedIcon />
        </div>
        <div className="item">
          {!darkMode ? (
            <DarkModeOutlinedIcon onClick={toggle} />
          ) : (
            <WbSunnyOutlinedIcon onClick={toggle} />
          )}
        </div>
        <div className="item">
          <GridViewOutlinedIcon />
        </div>
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <div className="item">
          <Dropdown>
            <Dropdown.Toggle className="profileButton">
              <PersonOutlineOutlinedIcon />
            </Dropdown.Toggle>
            <Dropdown.Menu align="start" className="dropdownMenu">
              <Dropdown.Item
                className="item"
                style={{ textDecoration: "none", color: "inherit" }}
                href={`/meso-social/profile/${currentUser.id}`}
              >
                <PersonOutlineOutlinedIcon />
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                className="item"
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={logout}
              >
                <ExitToAppIcon />
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="item">
          <EmailOutlinedIcon />
        </div>
        <div className="item">
          <NotificationsNoneOutlinedIcon />
        </div>
        <div className="user">
          {isPending ? (
            "Loading.."
          ) : (
            <>
              <img
                src={process.env.PUBLIC_URL + "/upload/" + data.profilePic}
                alt=""
              />
              <span>{data.name}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
