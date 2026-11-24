import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "./src/database/db.json");

export const ProductsServices = () => {
  const products = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(products);
};

export const insertData = (payLoad: any) => {
  fs.writeFileSync(filePath, JSON.stringify(payLoad));
};
