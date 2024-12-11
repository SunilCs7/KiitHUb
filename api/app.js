const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
// For handling the files upload(using Multer middleware)
const multer = require("multer");
// For getting the path of the files in api(server side folder:public>images)
const path = require("path");

// Route imports
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationsRoute = require("./routes/conversations");
const messagesRoute = require("./routes/messages");

const router = express.Router();

dotenv.config();

// Connecting the database
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDatabase();

// Using the path to access/get the images link
app.use("/images", express.static(path.join(__dirname, "public/images")));


// Middlewares
app.use(express.json()); //Helpful while making post requests
app.use(helmet());
app.use(morgan("common"));


// Handling the file upload(images, videos)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  try {
    return res.status(200).json("File Uploaded Successfully");
  } catch (err) {
    // console.log(err);
    return res.status(500).json({ error: "File upload failed" });
  }
});

// Use routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationsRoute);
app.use("/api/messages", messagesRoute);


// Start server
app.listen(8800, () => {
  console.log("Backend server is running!");
});
