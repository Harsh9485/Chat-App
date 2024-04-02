import http from "http";
import SocketServer from "./services/socket";

(async () => {
  const httpServer = await http.createServer();
  const socketServer = new SocketServer();
  socketServer.io.attach(httpServer);
  const PORT = 8000;
  httpServer.listen(PORT, () => {
    console.log(`listening server on ${PORT}`);
  });
  socketServer.init();
})();
