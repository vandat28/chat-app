const io = require("socket.io")(8080, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

io.on("connection", (socket) => {
    console.log(`A  ${socket.id} user connected`);

    // Gửi thông báo đến máy khách khi có người dùng kết nối
    socket.emit('userConnected', `A new user ${socket.id} connected`);
    socket.on("message", (message, roomId) => {
        if (roomId) {
            io.to(roomId).emit("message", message)
            console.log("room:", roomId)
            console.log("message:", message)
        } else {
            io.emit("message", message)
        }
    })
    socket.on('joinRoom', (roomId) => {
        // Tham gia vào phòng có roomId
        socket.join(roomId);
    })

})