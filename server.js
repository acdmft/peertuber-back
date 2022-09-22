const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require('dotenv').config();
const port = process.env.PORT || 5000;
// CORS 
const cors = require("cors");
const allowed_url = process.env.ALLOWED_URL;
// GRAPHQL 
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

//mongoDB
const MONGO_URI = process.env.MONGO_URI;
const mongoose = require("mongoose");
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
}).then(()=> {
  console.log("Connected to MongoDB");
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

app.use("/data", graphqlHTTP({
  schema,
  graphiql: true
}));

// ROUTERS 
const loginRouter = require("./routers/loginRouter");
const signupRouter = require("./routers/signupRouter");
const likesRouter = require("./routers/likesRouter");
const scheduledRouter = require("./routers/scheduledRouter");
const playlistRouter = require("./routers/playlistRouter");
const reportRouter = require("./routers/reportRouter");
const contactRouter = require("./routers/contactRouter");

// ROUTES 
app.get("/", async (req, res) => {
  res.status(200).json({message: "Home page"});
});

app.use("/login", loginRouter); // LOGIN (POST)
app.use("/signup", signupRouter); // NEW ACCOUNT (POST)
app.use("/like", likesRouter); // ADD LIKE TO THE VIDEO / GET LIKED VIDEOS
app.use("/sched", scheduledRouter); // ADD VIDEO TO WATCH LATER / GET WL VIDEOS
app.use("/playlists", playlistRouter); // GET PLAYLISTS , ADD VIDEO IN PLAYLIST
app.use("/report", reportRouter); // POST VIDEO REPORT
app.use("/msg", contactRouter); // POST MESSAGE FROM CONTACT FORM
// LOGOUT 
app.get("/logout", (_req, res) => {
  res.clearCookie("jwt");
  res.json("You are logged out");
}); 

app.listen(port, console.log(`Connected to the port ${port}`));