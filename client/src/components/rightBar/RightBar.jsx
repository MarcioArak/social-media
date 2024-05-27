import "./rightBar.scss";
import Profile2 from "./../../assets/pictures/people.jpg";

const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions for you</span>
          <div className="user">
            <div className="userInfo">
              <img src={Profile2} alt="" />
              <span>Jane Doe</span>
            </div>
            <div className="buttons">
              <button className="follow">follow</button>
              <button className="dismiss">dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Profile2} alt="" />
              <span>Jane Doe</span>
            </div>
            <div className="buttons">
              <button className="follow">follow</button>
              <button className="dismiss">dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Last Activities</span>
          <div className="user">
            <div className="userInfo">
              <img src={Profile2} alt="" />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Profile2} alt="" />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Profile2} alt="" />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img src={Profile2} alt="" />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Profile2} alt="" />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Profile2} alt="" />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
