import type { IncomingMessage, ServerResponse } from "http";
import { insertData, ProductsServices } from "../services/products.services";
import type { IProducts } from "../types/product.type";
import { parseBody } from "../utilitys/partsBody";
import { sendResponse } from "../utilitys/sendResponse";

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
    sendResponse(res, true, 200, "his is Products route", products);
  } else if (method === "GET" && id !== null) {
    const idParts = url?.split("/");
    const id = idParts && idParts[1] === "products" ? Number(idParts[2]) : null;
    const product = products.find((p: IProducts) => p.id === id);

    sendResponse(res, true, 200, `This is No:-${id} product`, product);
  } else if (method === "POST" && url === "/products") {
    const body = await parseBody(req);
    products.push(body);
    console.log(body);
    insertData(products);
    sendResponse(res, true, 200, "Products retrived successfully", body);
  } else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    const productIndex = products.findIndex((p: IProducts) => p.id === id);
    products[productIndex] = body;

    console.log(products[productIndex]);
    insertData(products);
    // console.log(productIndex)
    if (productIndex < 0) {
      sendResponse(res, false, 404, "Check your fucking code. then try again");
    }
    sendResponse(res, true, 200, "Products update successfully ", body);
  } else if (method === "DELETE" && id !== null) {
    const productIndex = products.findIndex((p: IProducts) => p.id === id);
    products.splice(productIndex, 1);
    insertData(products);
    if (productIndex < 0) {
      sendResponse(res, false, 404, "Check your fucking code. then try again");
    }
    sendResponse(res, true, 200, "Products Delete successfully ");
  }
};
