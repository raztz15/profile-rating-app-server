// checking if we're in ptoduction environment before loading variables from .env file
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require('cors')

const app = express();

// this works and body-parser doesn't ===> need to check this!!!!
app.use(express.json());
app.use(cors())
app.use(
  express.urlencoded({
    limit: "10mb",
    extended: true,
  })
);

// connnectiong to the route index
const profilesRouter = require("./routes/profilesRoute");
const userRouter = require("./routes/UserRoute");

app.use("/all-profiles", profilesRouter);
app.use("/", userRouter);

// urlEncoded ---> because we're sending the values by url to our server
// limit ---> increasing the limit size of the server can accept
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

// server config to port 8080
app.listen(process.env.PORT || 8080);
