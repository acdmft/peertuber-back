const express = require("express");
const app = express();
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

// MIDDLEWARES
app.use(express.json());
app.use(
  cors({
    origin: allowed_url,
    credentials: true,
  })
);

// ROUTERS 
const loginRouter = require("./routers/loginRouter");
const signupRouter = require("./routers/signupRouter");

// ROUTES 
app.get("/", async (_req, res) =>{
  res.status(200).json({message: "Home page"})
});
app.use("/login", loginRouter); // LOGIN (POST)
app.use("/signup", signupRouter); // NEW ACCOUNT (POST)
// LOGOUT 
app.get("/logout", (_req, res) => {
  res.clearCookie("jwt");
  res.json("You are logged out");
}); 

app.listen(port, console.log(`Connected to the port ${port}`));