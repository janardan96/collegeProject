module.exports = (io) => {
  var users = {}
  io.on("connection", (socket) => {
    console.log("Connected")

    socket.on('login', (data) => {
      console.log('a user ' + data.userId + ' connected');
      users[socket.id] = data.userId;
      io.emit("online", users)
      // console.log(users)
    });

    // socket.on("friendRequest", (friend) => {
    //   io.sockets.to(friend.receiver).emit("newFriendRequest", {
    //     from: friend.sender,
    //     to: friend.receiver
    //   });
    //   console.log("Reciever", friend.receiver)
    // });

    socket.on("joinRequest", () => {
      socket.emit("privateChat", users)
    });

    socket.on("sendMessage", (message) => {
      console.log("messages", message);
      console.log("Id", socket.id)
    })

    socket.on("disconnect", () => {
      console.log("Disconnected");
      console.log('user ' + users[socket.id] + ' disconnected');
      delete users[socket.id];
      io.emit("offline", users)
    })

    // socket.on("createMessage", (message) => {
    //   console.log(message);

    //   io.emit("newMessage", { 
    //     text: message.text
    //   });
    // });
  });
};
