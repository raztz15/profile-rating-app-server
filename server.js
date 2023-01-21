// checking if we're in ptoduction environment before loading variables from .env file
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");

const app = express();

// connnectiong to the route index
const indexRouter = require("./routes/index");

app.use("/", indexRouter);

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

// server config to port 8080
app.listen(process.env.PORT || 8080);
