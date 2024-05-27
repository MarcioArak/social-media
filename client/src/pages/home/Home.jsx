import Stories from "../../components/stories/Stories";
import Share from "../../components/share/Share";
import WallPosts from "../../components/WallPosts/WallPosts";
import "./home.scss";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "MeSo-Social";
  });

  return (
    <div className="home">
      <Stories />
      <Share />
      <WallPosts />
    </div>
  );
};

export default Home;
