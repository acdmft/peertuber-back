const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require('dotenv').config();
const port = process.env.PORT || 5000;
// CORS 
const cors = require("cors");
const allowed_url = process.env.ALLOWED_URL;

//mongoDB
const MONGO_URI = process.env.MONGO_URI;
const mongoose = require("mongoose");
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
}).then(()=> {
  console.log("Connected to MongoDB");
});
app.get('/test', async (_req, res)=>{
  return res.status(200).json({message: "Hello From /test"});
});
// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: allowed_url,
    credentials: true,
  })
);


// ROUTERS 
const videosRouter = require("./routers/videosRouter");
const loginRouter = require("./routers/loginRouter");
const signupRouter = require("./routers/signupRouter");
const likesRouter = require("./routers/likesRouter");
const scheduledRouter = require("./routers/scheduledRouter");
const playlistRouter = require("./routers/playlistRouter");
const reportRouter = require("./routers/reportRouter");
const contactRouter = require("./routers/contactRouter");
const profileRouter = require("./routers/profileRouter");


// ROUTES 
app.use("/videos", videosRouter);
app.use("/login", loginRouter); // LOGIN (POST)
app.use("/signup", signupRouter); // NEW ACCOUNT (POST)
app.use("/like", likesRouter); // ADD LIKE TO THE VIDEO / GET LIKED VIDEOS
app.use("/sched", scheduledRouter); // ADD VIDEO TO WATCH LATER / GET WL VIDEOS
app.use("/playlists", playlistRouter); // GET PLAYLISTS , ADD VIDEO IN PLAYLIST
app.use("/report", reportRouter); // POST VIDEO REPORT
app.use("/msg", contactRouter); // POST MESSAGE FROM CONTACT FORM
app.use("/profile", profileRouter); // GET USER PROFILE
// LOGOUT 
app.get("/logout", (_req, res) => {
  res.clearCookie("jwt");
  res.json("You are logged out");
}); 

app.listen(port, console.log(`Connected to the port ${port}`));