const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

app.listen(port, console.log(`Connected to the port ${port}`));