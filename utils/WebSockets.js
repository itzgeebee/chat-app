class WebSockets {
    constructor() {
        this.users = []
    }

    connection(client) {
        // event fired when the chat room is disconnected
        client.on("disconnect", () => {
            console.log(this.users)
            this.users = this.users.filter((user) => user.socketId !== client.id);
        })
        // add identity of user mapped to the socket id
        client.on("identity", (userId) => {
            this.users.push({
            socketId: client.id,
            userId: userId,
        });
    })
        // subscribe person to chat & other user as well
        client.on("subscribe", (room, otherUserId = "") => {
            this.subscribeOtherUser(room, otherUserId);
            client.join(room);
        });
        // mute a chat room
        client.on("unsubscribe", (room) => {
            client.leave(room);
        });
    }
}


module.exports = WebSockets