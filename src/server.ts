import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { routeHandeler } from "./Router/router";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    routeHandeler(req, res);
  },
);

server.listen(3000, () => {
  console.log("port Number 3000");
});
