import express, { Application, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import "colors";
import { v4 as uuidV4 } from "uuid";
import { Socket, SocketAddress } from "net";

const app: Application = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

// app.get("/", (req: Request, res: Response) => {
//   res.redirect(`/${uuidV4()}`);
// });

// app.get("/:room", (req: Request, res: Response) => {
//   res.send(`<h1>Server is running ${req.params.room}</h1>`);
// });

io.on("connection", (socket: Socket | any) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data: any) => {
    const { userToCall, signalData, from, name } = data;
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data: any) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`[SERVER]: server started on port: ${PORT}`.cyan.underline);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
