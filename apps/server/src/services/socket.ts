import { Server } from "socket.io";
import { Redis } from "ioredis";

const pub = new Redis({
  host: "redis-5c4ce16-panwarharshwardhan67-2324.a.aivencloud.com",
  port: 27788,
  username: "default",
  password: "AVNS_a-r-MrZVDCJaA_1o0v4",
});
const sub = new Redis({
  host: "redis-5c4ce16-panwarharshwardhan67-2324.a.aivencloud.com",
  port: 27788,
  username: "default",
  password: "AVNS_a-r-MrZVDCJaA_1o0v4",
});

class SocketServer {
  private _io: Server;
  constructor() {
    console.log("SocketServer constructor called");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "http://localhost:3000",
      },
    });
    sub.subscribe("MESSAGES");
  }

  public initListeners() {
    const io = this.io;
    console.log("init socket listeners");

    io.on("connect", (socket) => {
      console.log(`new Socket connection: ${socket.id}`);
      socket.on("event:message", async ({ message }: { message: String }) => {
        console.log(`new message: ${message}`);
        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });

    sub.on("message", (chennel, message) => {
      console.log("sub call ");

      if (chennel === "MESSAGES") {
        io.emit("message", message);
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketServer;
