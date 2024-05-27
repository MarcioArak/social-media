import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getFollowing = (req, res) => {
  const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";

  db.query(q, [req.params.followerUserId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res
      .status(200)
      .json(data.map((relationship) => relationship.followerUserId));
  });
};

export const followUser = (req, res) => {
  // Check if logged in with cookies
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    // if there's a token but it is not valid
    // if no error return userInfo
    if (err) return res.status(403), json("Token is not valid");

    const q =
      "INSERT INTO relationships(`followerUserId`, `followedUserId`) VALUES (?)";

    const values = [userInfo.id, req.body.followId];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been followed");
    });
  });
};

export const deleteFollow = (req, res) => {
  // Check if logged in with cookies
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    // if there's a token but it is not valid
    // if no error return userInfo
    if (err) return res.status(403), json("Token is not valid");

    const q =
      "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";

    db.query(q, [userInfo.id, req.query.followId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been unfollowed");
    });
  });
};
