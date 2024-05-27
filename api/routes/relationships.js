import express from "express";
import {
  followUser,
  deleteFollow,
  getFollowing,
} from "../controllers/relationship.js";

const router = express.Router();

router.get("/:followerUserId", getFollowing);
router.post("/", followUser);
router.delete("/", deleteFollow);

export default router;
