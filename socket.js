module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User Connected");

    socket.on("joinRequest", (myRequest) => {
      socket.join(myRequest.sender);
    });

    socket.on("friendRequest", (friend) => {
      io.to(friend.receiver).emit("newFriendRequest", {
        from: friend.sender,
        to: friend.receiver
      });
    });
    // socket.on("createMessage", (message) => {
    //   console.log(message);

    //   io.emit("newMessage", {
    //     text: message.text
    //   });
    // });
  });
};
