import type { IncomingMessage, ServerResponse } from "http";

type ProductArray = {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
};

export const ProductController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  res
    .writeHead(200, { "content-type": "application/json" })
    .end(JSON.stringify({ message: "this is Products route", data: {} }));
};
