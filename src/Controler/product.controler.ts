import type { IncomingMessage, ServerResponse } from "http";
import { insertData, ProductsServices } from "../services/products.services";
import type { IProducts } from "../types/product.type";
import { parseBody } from "../utilitys/partsBody";

export const ProductController = async (
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
    const product = products.find((p: IProducts) => p.id === id);
    res.writeHead(200, { "content-type": "application/json" }).end(
      JSON.stringify({
        message: `This is No:-${id} product`,
        data: { product },
      }),
    );
  } else if (method === "POST" && url === "/products") {
    const body = await parseBody(req);
    products.push(body);
    console.log(body);
    insertData(products);

    res.writeHead(200, { "content-type": "application/json" }).end(
      JSON.stringify({
        message: "Products retrived successfully ",
        body: body,
      }),
    );
  }

  else if (method === 'PUT' && id !== null){
    const body = await parseBody(req)
    const productIndex = products.findIndex((p : IProducts) => p.id === id)
    products[productIndex] = body;

    console.log(products[productIndex])
    insertData(products)
    // console.log(productIndex)
    if(productIndex < 0){
         res.writeHead(404, { "content-type": "application/json" }).end(
      JSON.stringify({
        message: "Check your fucking code. then try again",
      }),
    );
    }
    res.writeHead(200, { "content-type": "application/json" }).end(
      JSON.stringify({
        message: "Products update successfully ",
        body: body,
      }),
    );
    

  }
};
