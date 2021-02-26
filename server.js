"use strict";

//require the express module
const express = require("express");

const routes = require("./routes");

//require the cors module
const cors = require("cors");

//creates an instance of an express server
const app = express();

//enable cross origin resource sharing to this file
//API can be used from web-apps on other domains
app.use(cors());

//allow POST and PUT requests to use JSON bodies
app.use(express.json());

app.use("/", routes);

//define a port
const port = 3000;

//run the server
app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
