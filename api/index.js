import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import RelationshipsRoutes from "./routes/relationships.js";
import CredentialRoutes from "./routes/credentials.js";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";

const app = express();

// middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(cors({ origin: process.env.CORS_URL }));
app.use(cookieParser());

// Copied and changed from the multer website
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname); // Use the Date.now() to create a unique name in case of same name upload
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", RelationshipsRoutes);
app.use("/api/credentials", CredentialRoutes);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/build", "index.html"));
// });

app.listen(process.env.PORT, () => {
  console.log("API working");
});

// Modules to add
//
// 1. npm install express mysql nodemon
//    - express is use to route api and client
// 2. npm install cors
//    - Cross-Origin Reasource Sharing is a method that allows you
//      to make requests to the server deployed at a different domain
//      - i.e fron-end and back-end are two different domains
// 3. npm install cookie-parser
//    - When a client (such as a web browser) makes a request to a server,
//      it can include information about any cookies that it has previously received from the server
//      in the form of name-value pairs.
// 4. npm install bcryptjs
//    - encrypt password
// 5. npm install jsonwebtoken
//    - A standardized way to securely send data between two parties
// 6. npm install moment
//    - library for dates (time)
// 6. npm install multer
//    - upload folders and files
