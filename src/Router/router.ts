import type { IncomingMessage, ServerResponse } from "http";
import { ProductController } from "../Controler/product.controler";

export const routeHandeler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;

  console.log(url, method);
  if (url === "/" && method === "GET") {
    res
      .writeHead(200, { "content-type": "application/json" })
      .end(JSON.stringify({ message: "You are in Right Path...." }));
  } else if (url?.startsWith("/products") && method === "GET") {
    ProductController(req, res);
  } else
    res
      .writeHead(404, { "content-type": "text/plain" })
      .end("Page not found...");
};
