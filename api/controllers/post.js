import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const userId = req.query.userId;

  // Check if logged in with cookies
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    // if there's a token but it is not valid
    // If no error return userInfo
    if (err) return res.status(403), json("Token is not valid");

    const q =
      userId !== "undefined"
        ? `SELECT p.*, u.name, u.profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
    WHERE  p.userId = ? ORDER BY p.createdAt DESC`
        : `SELECT p.*, u.name, u.profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
    LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ?
    GROUP BY p.id ORDER BY p.createdAt DESC`;

    const values =
      userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const addPost = (req, res) => {
  // Check if logged in with cookies
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    // if there's a token but it is not valid
    // if no error return userInfo
    if (err) return res.status(403), json("Token is not valid");

    const q =
      "INSERT INTO posts(`desc`, `img`, `createdAt`, `userId`) VALUES (?)";

    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created");
    });
  });
};

export const editPost = (req, res) => {
  const q = "UPDATE posts SET `desc` = ? WHERE id = ?;";

  db.query(q, [req.body.desc, req.body.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Post has been created");
  });
};

export const deletePost = (req, res) => {
  // Check if logged in with cookies
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    // if there's a token but it is not valid
    // if no error return userInfo
    if (err) return res.status(403), json("Token is not valid");

    const q = "DELETE FROM posts WHERE `id` = ? AND `userId` = ?";

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0)
        return res.status(200).json("Post has been deleted");
      return res.status(403).json("You can only delete your post");
    });
  });
};

// Question marks '?' in SQL mean that the value will be filled in later with prepared statements
// SELECT list is not in GROUP BY clause and contains nonaggregated column 'social.p.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by	0.000 sec
