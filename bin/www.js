const app = require('../app');
const port = process.env.PORT || 3000;
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(socket.id)
});

httpServer.listen(port);

// app.listen(port, () => {
//   console.log("Example app listening at http://localhost:" + port);
// });
