var express = require("express");
var http = require("http");
var cors = require("cors");
// var path = require("path");
var dotenv = require("dotenv");
var { connect } = require("mongoose");

const router = require("./router");

dotenv.config();

var app = express();

connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.log("Error in database connection", err.message);
  });

app.use(express.urlencoded({ extended: false }));

app.use(express.json({ limit: "100mb" }));

const corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token", "authorization"],
};
app.use(cors(corsOption));

app.use("/api", router);

// app.use("/assets", express.static(path.join(__dirname, "..", "app", "assets")));

/* create server */
const server = http.createServer(app);

const port = process.env.PORT || 8010;
server.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
