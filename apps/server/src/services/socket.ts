import { Server } from "socket.io";

class SocketServer {
  private _io: Server;
  constructor() {
    console.log("SocketServer constructor called");
    this._io = new Server();
  }

  public initListeners() {
    const io = this.io;
    console.log("init socket listeners");

    io.on("connect", (socket) => {
      console.log(`new Socket connection: ${socket.id}`);
      socket.on("event:message", async ({ message }: { message: String }) => {
        console.log(`new message: ${message}`);
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketServer;
