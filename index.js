const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http, {
    cors: {
        origin: "*",
    },
});

let position = {
    x: 200,
    y: 200,
};

let playernamelist = [];

Socketio.on("connection", (socket) => {
    socket.emit("position", position);
    socket.on("move", (data) => {
        switch (data) {
            case "left":
                position.x -= 5;
                Socketio.emit("position", position);
                break;
            case "right":
                position.x += 5;
                Socketio.emit("position", position);
                break;
            case "up":
                position.y -= 5;
                Socketio.emit("position", position);
                break;
            case "down":
                position.y += 5;
                Socketio.emit("position", position);
                break;
        }
    });
    socket.on("Addplayer", (data) => {
        playernamelist.push(data);
        Socketio.emit("playernamelist", playernamelist);
    });
});

Express.get("/", async function(req, res) {
    return res.json({
        success: true,
        message: "Success",
    });
});

const port = process.env.PORT || 3000;
Http.listen(port, () => {
    console.log("Server up and running...");
});