import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const checkPassword = (req, res) => {
  // Check if logged in with cookies
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    // if there's a token but it is not valid
    // if no error return userInfo
    if (err) return res.status(403), json("Token is not valid");

    const q = "SELECT * FROM users WHERE id=?";

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      const { password, ...info } = data[0];

      const checkPassword = bcrypt.compareSync(req.query.userPass, password);

      if (!checkPassword) return res.status(400).json("password required");

      return res.json("Passwork matches");
    });
  });
};

export const updateLogin = (req, res) => {
  // Check if logged in with cookies
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    // if there's a token but it is not valid
    // if no error return userInfo
    if (err) return res.status(403), json("Token is not valid");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      req.body.password === ""
        ? "UPDATE users SET `username` = ? WHERE id = ?"
        : "UPDATE users SET `username` = ?, `password` = ? WHERE id = ?";

    const values =
      req.body.password === ""
        ? [req.body.username, userInfo.id]
        : [req.body.username, hashedPassword, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Updated!");
      return res.status(403).json("You can update only your profile");
    });
  });
};
