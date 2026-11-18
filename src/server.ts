import { createServer, IncomingMessage, Server, ServerResponse } from "http";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;

    console.log(url, method);
    if (url === "/" && method === "GET") {
      res
        .writeHead(200, { "content-type": "application/json" })
        .end(JSON.stringify({message :"You are in Right Path...."}));
    } else
      res
        .writeHead(404, { "content-type": "text/plain" })
        .end("Page not found...");
  },
);

server.listen(3000, () => {
  console.log("port Number 3000");
});
