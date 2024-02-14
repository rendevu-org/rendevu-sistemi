require("dotenv").config();
require("express-async-errors");

const https = require("https");
const fs = require("fs");
const express = require("express");
const app = express();

// mongoDB connection
const connectDB = require("./DB/connect");