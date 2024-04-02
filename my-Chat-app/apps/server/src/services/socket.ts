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
    console.log(`SocketServer starting`);
    this._io = new Server({
      cors: {
        origin: "http://localhost:3000",
        allowedHeaders: ["*"],
      },
    });
    sub.subscribe("MESSAGES");
  }
  public init() {
    const io = this._io;
    console.log("init is called");

    io.on("connect", (socket) => {
      console.log(`Socket connected $${socket.id}`);
      socket.on("event:message", (msg: string) => {
        console.log(msg, "event");
        pub.publish("MESSAGES", JSON.stringify({ msg: msg, id: socket.id }));
      });
    });
    sub.on("message", (chennel, message) => {
      console.log(message, "sub.on");
      if (chennel === "MESSAGES") {
        io.emit("MESSAGES", message);
      }
    });
  }
  get io() {
    return this._io;
  }
}

export default SocketServer;
