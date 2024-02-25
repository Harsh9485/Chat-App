import http from "http";
import SocketServer from "./services/socket";

(async () => {
  const socketServer = new SocketServer();
  const httpServer = await http.createServer();

  const PORT = process.env.PORT || 8000;

  socketServer.io.attach(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
  });
})();
