const express = require("express");
const user = require("./routes/users/users");
const student = require("./routes/student/student");
const post = require("./routes/posts/post");
const mentor = require("./routes/mentor/mentor");
const friendReq = require("./routes/chat/friendRequest");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const SocketIO = require("socket.io");
const http = require("http");
const AWS = require('aws-sdk');
const keys = require("./config/keys");


mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/StudentMentor")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;
const app = express();

// create application/json parser
app.use(bodyParser.json());
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Mehtods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  next();
});

//Passport middleware
app.use(passport.initialize());
//Password config
require("./config/passport")(passport);

// upload Image

app.use("/api/user", user);
app.use("/api/student", student);
app.use("/api/post", post);
app.use("/api/mentor", mentor);
app.use("/api/friendReq", friendReq);

app.post('/translate', (req, res) => {
  const { message, lang } = req.body;
  const params = {
    SourceLanguageCode: 'auto',
    TargetLanguageCode: lang,
    Text: message,
  };

  translate.translateText(params, (err, data) => {
    if (err) {
      return res.send(err);
    };

    res.json(data);
  });
});

let server = http.createServer(app)
const io = SocketIO(server);

const translate = new AWS.Translate({
  accessKeyId: keys.amazonAccessKeyId,
  secretAccessKey: keys.amazonSecretAccessKeyId,
  region: 'us-east-2',
});


server.listen(port, () =>
  console.log(`Server on port no. ${port}`)
);

require("./socketServer/friendReq.js")(io);
// const io = require("./socket").init(server);

// io.on("connection", (socket) => {
//   console.log("Client is connected");
// });
