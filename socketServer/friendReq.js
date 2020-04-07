const keys = require("../config/keys");
const AWS = require('aws-sdk');
// aws.config.region = keys.awsRegion
// aws.config.credentials = new aws.Credentials(keys.amazonAccessKeyId, keys.amazonSecretAccessKeyId)

const translateService = new AWS.Translate({
  accessKeyId: keys.amazonAccessKeyId,
  secretAccessKey: keys.amazonSecretAccessKeyId,
  region: keys.awsRegion,
})


var users = {}

const getTranslation = async (msg, sourceLang, destLang) => {
  const params = {
    Text: msg,
    SourceLanguageCode: sourceLang,
    TargetLanguageCode: destLang
  };

  const tranlatedMsg = await translateService.translateText(params, (err, data) => {
    return data;
  }).promise()

  return tranlatedMsg
}

const getActiveUser = (recieverId) => {
  return users[recieverId]
  // for (let i in users) {
  //   console.log("isisss", users[i].userId)
  //   if (users[i].userId === recieverId) {
  //     console.log("ISSSS", users[i])
  //     return users[i].lang
  //   }
  // }
}

module.exports = (io) => {

  io.on("connection", (socket) => {
    console.log("Connected")

    socket.on('login', (data) => {
      console.log('a user ' + data.userId + ' connected');
      users[socket.id] = { ...data, lang: "en" };
      io.sockets.emit("updated-users", users)
      // io.emit("online", users)
      console.log(users)
    });

    socket.on("joinRequest", () => {
      socket.emit("privateChat", users)
    });

    socket.on("chosen-lang", lang => {
      users[socket.id] = { ...users[socket.id], lang: lang }
      console.log(users)
      // io.sockets.emit("updated-users", users)
    })

    socket.on("sendMessage", async (message, callback) => {
      // let activeUser = getActiveUser(message.recieverId)
      // console.log("messages", activeUser);
      console.log(users[socket.id])
      let translatedText = ""
      if (users[socket.id].lang === users[message.recieverId].lang) {
        translatedText = message.message;
        console.log("Pres", translatedText)
      }
      else {
        const translatedMsg = await getTranslation(message.message, users[socket.id].lang, users[message.recieverId].lang)
        translatedText = translatedMsg.TranslatedText
      }
      // let message={message:translatedText}
      io.to(`${message.recieverId}`).emit('message', { message: translatedText });
      console.log("Id", translatedText)
      callback()
    })

    socket.on("disconnect", () => {
      console.log("Disconnected");
      console.log('user ' + users[socket.id] + ' disconnected');
      delete users[socket.id];
      io.sockets.emit("updated-users", users)
      // io.emit("offline", users)
    })

    // socket.on("createMessage", (message) => {
    //   console.log(message);

    //   io.emit("newMessage", { 
    //     text: message.text
    //   });
    // });
  });
};
