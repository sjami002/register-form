const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
// Step 1
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

// Step 2 db
const uri = process.env.ATLAS_URI;
mongoose.connect(
  uri || process.env.MONGODB_URI,
  { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const formsRouter = require("./routes/forms");
const usersRouter = require("./routes/users");

app.use("/forms", formsRouter);
app.use("/users", usersRouter);

// Step 3
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "client", "build", "index.html")); //relative path
  });
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
