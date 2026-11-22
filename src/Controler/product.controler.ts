import type { IncomingMessage, ServerResponse } from "http";
import { ProductsServices } from "../services/products.services";
import type { Products } from "../types/product.type";

export const ProductController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  const idParts = url?.split("/");

  const id = idParts && idParts[1] === "products" ? Number(idParts[2]) : null;
  console.log(id);
  console.log(url, method);
  const products = ProductsServices();
  console.log(products);

  if (url === "/products" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" }).end(
      JSON.stringify({
        message: "this is Products route",
        data: { products },
      }),
    );
  } else if (method === "GET" && id !== null) {
    const idParts = url?.split("/");
    const id = idParts && idParts[1] === "products" ? Number(idParts[2]) : null;
    const product = products.find((p: Products) => p.id === id);
    res.writeHead(200, { "content-type": "application/json" }).end(
      JSON.stringify({
        message: `This is No:-${id} product`,
        data: { product },
      }),
    );
  }
};
